import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { expect, test, vi, SpyInstance } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Sidebar from "../src/components/Sidebar";

const sidebarProps = {
  userId: "exampleUserId",
  darkMode: false,
  handleDashboard: vi.fn(),
  setDarkMode: vi.fn(),
  dashboardClicked: false,
  handlePod: vi.fn(),
  podClicked: false,
};

// Test to check if sidebar component renders
test("should render the logo element renders", () => {
  render(
    <Router>
      <Sidebar {...sidebarProps} />
    </Router>,
  );

  // Find the sidebar button elements
  const logoElement = screen.getByAltText("logo") as HTMLInputElement;
  const dashboardButton = screen.getByTestId(
    "DashboardButton",
  ) as HTMLInputElement;
  const logoutButton = screen.getByTestId("LogoutButton") as HTMLInputElement;
  const themeButton = screen.getByTestId("ThemeButton") as HTMLInputElement;

  // Assert that the elements are in the document
  expect(logoElement).toBeInTheDocument();
  expect(dashboardButton).toBeInTheDocument();
  expect(logoutButton).toBeInTheDocument();
  expect(themeButton).toBeInTheDocument();
});

// Test to check if the dashboard button click is handled correctly
test("should handle dashboard button click", () => {
  render(
    <Router>
      <Sidebar {...sidebarProps} />
    </Router>,
  );

  const dashboardButton: HTMLElement = screen.getByTestId("DashboardButton");

  // Simulate dashboard button click
  fireEvent.click(dashboardButton);

  // Assert that dashboardClicked is true
  expect(sidebarProps.handleDashboard).toHaveBeenCalled();
});

// Test to check if the theme button toggles dark mode correctly
test("should toggle dark mode on theme button click", () => {
  render(
    <Router>
      <Sidebar {...sidebarProps} />
    </Router>,
  );

  // Simulate theme button click
  fireEvent.click(screen.getByTestId("ThemeButton"));

  // Assert that setDarkMode is called with the expected arguments
  expect(sidebarProps.setDarkMode).toHaveBeenCalled();
});

// Test to check if the logout button click is handled correctly
test("should handle logout button click", async () => {
  render(
    <Router>
      <Sidebar {...sidebarProps} />
    </Router>,
  );

  // Mock the fetch POST request specifically for logout
  const fetchMockSuccess: SpyInstance<
    [input: RequestInfo | URL, init?: RequestInit | undefined],
    Promise<Response>
  > = vi.spyOn(window, "fetch").mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve({ success: true }),
  } as Response);

  // Mock window.alert
  const mockAlert: SpyInstance<[message?: string], void> = vi
    .spyOn(window, "alert")
    .mockImplementation((message) => {
      expect(message).toBe(
        "You have been successfully logged out. Redirecting to Welcome Page",
      );
    });

  // Simulate logout button click
  const logoutButton: HTMLElement = screen.getByTestId("LogoutButton");
  fireEvent.click(logoutButton);

  // Wait for the async operation to complete
  await waitFor(() => {
    // Assert that fetchMockSuccess is called with no arguments
    expect(fetchMockSuccess).toHaveBeenCalled();
    expect(fetchMockSuccess).toHaveBeenCalledWith(
      "/logout",
      expect.objectContaining({}),
    );
  });
  // Assert that window.alert is called when fetch is successful
  expect(mockAlert).toHaveBeenCalled();

  // Assert that the URL has changed to the Welcome Page
  expect(window.location.pathname).toBe("/");

  // Restore the original implementation of window.alert and fetch
  mockAlert.mockRestore();
  fetchMockSuccess.mockRestore();
});
