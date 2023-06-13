import { render, screen, fireEvent, waitFor} from "@testing-library/react";
import { expect, test, vi } from 'vitest'
import { BrowserRouter as Router } from "react-router-dom";
import LoginPage from '../src/pages/LoginPage';

test("renders the login form", () => {
  render(
    <Router>
      <LoginPage />
    </Router>
  );

  // Find the username input field by its label text
  const usernameInput = screen.getByPlaceholderText("Enter your username");

  // Find the password input field by its label text
  const passwordInput = screen.getByPlaceholderText("Enter your password");

  // Find the login button by its visible text content
  const loginButton = screen.getByText("Login");

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
  const usernameInput = screen.getByPlaceholderText("Enter your username");
  const passwordInput = screen.getByPlaceholderText("Enter your password");

  // Create fake input values
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

  const usernameInput = screen.getByPlaceholderText('Enter your username');
  const passwordInput = screen.getByPlaceholderText('Enter your password');
  const loginButton = screen.getByText('Login');

  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'testpassword'} });

  // Mock the fetch POST request
  const fetchMockSuccess = vi.spyOn(window, 'fetch').mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve({ success: true }),
  });

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
});