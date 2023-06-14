import { expect, test, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";
import SignupPage from '../src/pages/SignupPage';

test('renders signup form', () => {
    render(
        <Router>
          <SignupPage />
        </Router>
      );

  // Assert that the signup form is rendered
  const firstNameInput = screen.getByPlaceholderText('Enter your first name');
  const lastNameInput = screen.getByPlaceholderText('Enter your last name');
  const usernameInput = screen.getByPlaceholderText('Enter your username');
  const passwordInput = screen.getByPlaceholderText('Enter your password');
  const confirmPasswordInput = screen.getByPlaceholderText('Confirm your password');
  const submitButton = screen.getByText('Submit');

  expect(firstNameInput).toBeInTheDocument();
  expect(lastNameInput).toBeInTheDocument();
  expect(usernameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(confirmPasswordInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test('handles input field changes', () => {
    render(
        <Router>
          <SignupPage />
        </Router>
      );

  // Simulate user input in form fields
  const firstNameInput = screen.getByPlaceholderText('Enter your first name');
  const lastNameInput = screen.getByPlaceholderText('Enter your last name');
  const usernameInput = screen.getByPlaceholderText('Enter your username');
  const passwordInput = screen.getByPlaceholderText('Enter your password');
  const confirmPasswordInput = screen.getByPlaceholderText('Confirm your password');

  fireEvent.change(firstNameInput, { target: { value: 'John' } });
  fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
  fireEvent.change(usernameInput, { target: { value: 'johndoe' } });
  fireEvent.change(passwordInput, { target: { value: 'password' } });
  fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });

  // Expect that the form fields have the correct values
  expect(firstNameInput.value).toBe('John');
  expect(lastNameInput.value).toBe('Doe');
  expect(usernameInput.value).toBe('johndoe');
  expect(passwordInput.value).toBe('password');
  expect(confirmPasswordInput.value).toBe('password');
});

test('handles form submission', async () => {
    render(
      <Router>
        <SignupPage />
      </Router>
    );
  
    // Simulate user input in form fields
    const firstNameInput = screen.getByPlaceholderText('Enter your first name');
    const lastNameInput = screen.getByPlaceholderText('Enter your last name');
    const usernameInput = screen.getByPlaceholderText('Enter your username');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm your password');
    const submitButton = screen.getByText('Submit');
  
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(usernameInput, { target: { value: 'johndoe' } });
    fireEvent.change(passwordInput, { target: { value: 'Password1!' } });
    // This cost me hours, test password should also match regex conditions
    fireEvent.change(confirmPasswordInput, { target: { value: 'Password1!' } });
  
    // Mock the fetch POST request specifically for signup
    const fetchMockSuccess = vi.spyOn(window, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });
  
    // Submit the form
    fireEvent.click(submitButton);
  
    // Wait for the async operation to complete
    await waitFor(() => {
      expect(fetchMockSuccess).toHaveBeenCalled();
      expect(fetchMockSuccess).toHaveBeenCalledWith(
        'http://localhost:4000/login/signupRequest',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: 'johndoe',
            firstName: 'John',
            lastName: 'Doe',
            password: 'Password1!',
          }),
        }
      );
    });
  });