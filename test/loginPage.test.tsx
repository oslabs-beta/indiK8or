import { render, screen, fireEvent, waitFor} from "@testing-library/react";
import { expect, test, vi, SpyInstance } from 'vitest'
import { BrowserRouter as Router } from "react-router-dom";
import LoginPage from '../src/pages/LoginPage';
import React from 'react';

test("renders the login form", () => {
  render(
    <Router>
      <LoginPage />
    </Router>
  );

  // Find the username input field by its label text
  const usernameInput = screen.getByPlaceholderText("Enter your username") as HTMLInputElement;

  // Find the password input field by its label text
  const passwordInput = screen.getByPlaceholderText("Enter your password") as HTMLInputElement;

  // Find the login button by its visible text content
  const loginButton = screen.getByText("Login") as HTMLInputElement;

  // Assert that the form elements are present
  expect(usernameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
});

test("input fields capture user input correctly", () => {
  render(
    <Router>
      <LoginPage />
    </Router>
  );

  // Find the username input field by its label text
  const usernameInput = screen.getByPlaceholderText("Enter your username") as HTMLInputElement;
  const passwordInput = screen.getByPlaceholderText("Enter your password") as HTMLInputElement;

  // Create fake input values
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  const testUsername = "testuser";
  const testPassword = "testpassword";
  fireEvent.change(usernameInput, { target: { value: testUsername } });
  fireEvent.change(passwordInput, { target: { value: testPassword } });

  // Assert that the input values are updated correctly
  expect(usernameInput.value).toBe(testUsername);
  expect(passwordInput.value).toBe(testPassword);
});

test('submits the login form and sends a fetch POST request', async () => {
  render(
    <Router>
      <LoginPage />
    </Router>
  );

  const usernameInput = screen.getByPlaceholderText('Enter your username') as HTMLInputElement;
  const passwordInput = screen.getByPlaceholderText('Enter your password') as HTMLInputElement;
  const loginButton = screen.getByText('Login') as HTMLInputElement;
  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'testpassword'} });

  // Mock the fetch POST request
  const fetchMockSuccess: SpyInstance<[input: RequestInfo | URL, init?: RequestInit | undefined], Promise<Response>> = 
    vi.spyOn(window, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    } as Response);

  fireEvent.click(loginButton);

  // Wait for the fetch POST request to complete
  await waitFor(() => {
    expect(fetchMockSuccess).toHaveBeenCalled();
    expect(fetchMockSuccess).toHaveBeenCalledWith(
      'http://localhost:4000/login/loginRequest',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username: 'testuser',
          password: 'testpassword',
        }),
      }
    );
  });
      // Assert that the URL has changed to the homepage
      expect(window.location.pathname).toBe('/home');
      // Restore the original implementation of fetch
      fetchMockSuccess.mockRestore();
});