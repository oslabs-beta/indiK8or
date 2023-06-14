import { expect, test, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from '../src/components/Sidebar';

// Test to check if sidebar component renders
test('if the logo element renders', () => {
  render(
    <Router>
      <Sidebar />
    </Router>
  );

  // Find the sidebar button elements
  const logoElement = screen.getByAltText('logo');
  const dashboardButton = screen.getByTestId('DashboardButton');
  const logoutButton = screen.getByTestId('LogoutButton');
  const themeButton = screen.getByTestId('ThemeButton');

  // Assert that the elements are in the document
  expect(logoElement).toBeInTheDocument();
  expect(dashboardButton).toBeInTheDocument();
  expect(logoutButton).toBeInTheDocument();
  expect(themeButton).toBeInTheDocument();
});

// Test to check if the dashboard button click is handled correctly
test('handles dashboard button click', () => {
  // Create a variable to track whether the dashboard button is clicked
  let dashboardClicked = false;

  // Mock the handleDashboard function
  const handleDashboard = vi.fn(() => {
    dashboardClicked = true;
  });

  render(
    <Router>
      <Sidebar handleDashboard={handleDashboard} />
    </Router>
  );

  const dashboardButton = screen.getByTestId('DashboardButton');

  // Simulate dashboard button click
  fireEvent.click(dashboardButton);

  // Assert that dashboardClicked is true
  expect(dashboardClicked).toBe(true);
});

// Test to check if the theme button toggles dark mode correctly
test('theme button toggles dark mode on click', () => {
  // Create a mock function for setDarkMode
  let darkMode = false;
  const setDarkMode = vi.fn(() =>{
    darkMode = true
  });
  

  render(
    <Router>
      <Sidebar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    </Router>
  );

  // Simulate theme button click
  fireEvent.click(screen.getByTestId('ThemeButton'));

  // Assert that setDarkMode is called with the expected arguments
  expect(setDarkMode).toHaveBeenCalledTimes(1);

  // Assert that the callback function returns the updated darkMode value (true)
  expect(darkMode).toBe(true);
});

// Test to check if the logout button click is handled correctly
test('handles logout button click', async () => {
  render(
    <Router>
      <Sidebar/>
    </Router>
  );

  // Mock the fetch POST request specifically for logout
  const fetchMockSuccess = vi
    .spyOn(window, 'fetch')
    .mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

  // Simulate logout button click
  const logoutButton = screen.getByTestId('LogoutButton');
  fireEvent.click(logoutButton);

  // Wait for the async operation to complete
  await waitFor(() => {
    // Assert that fetchMockSuccess is called with the expected arguments
    expect(fetchMockSuccess).toHaveBeenCalled();
    expect(fetchMockSuccess).toHaveBeenCalledWith(
      'http://localhost:4000/logout',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: expect.any(String),
      })
    );
  });
});