import { expect, test, vi, SpyInstance } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";
import SignupPage from '../src/pages/SignupPage';
import React from 'react';

// TODO: Fix all import orders and delete all of the "as HTMLInputElement".

test('renders signup form', () => {
    render(
        <Router>
          <SignupPage />
        </Router>
      );

  // Assert that the signup form is rendered
  const firstNameInput = screen.getByPlaceholderText('Enter your first name') as HTMLInputElement;
  const lastNameInput = screen.getByPlaceholderText('Enter your last name') as HTMLInputElement;
  const usernameInput = screen.getByPlaceholderText('Enter your username') as HTMLInputElement;
  const passwordInput = screen.getByPlaceholderText('Enter your password') as HTMLInputElement;
  const confirmPasswordInput = screen.getByPlaceholderText('Confirm your password') as HTMLInputElement;
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
  const firstNameInput = screen.getByPlaceholderText('Enter your first name') as HTMLInputElement;
  const lastNameInput = screen.getByPlaceholderText('Enter your last name') as HTMLInputElement;
  const usernameInput = screen.getByPlaceholderText('Enter your username') as HTMLInputElement;
  const passwordInput = screen.getByPlaceholderText('Enter your password') as HTMLInputElement;
  const confirmPasswordInput = screen.getByPlaceholderText('Confirm your password') as HTMLInputElement;

  fireEvent.change(firstNameInput, { target: { value: 'John' } });
  fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
  fireEvent.change(usernameInput, { target: { value: 'johndoe' } });
  fireEvent.change(passwordInput, { target: { value: 'password' } });
  fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });

  // Expect that the form fields have the correct values
  // TODO: here after you delete all of the as HTMLElement, change the following lines like so "expect((firstNameInput as HTMLInputElement).value).toBe('John');"
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
    const firstNameInput = screen.getByPlaceholderText('Enter your first name') as HTMLInputElement;
    const lastNameInput = screen.getByPlaceholderText('Enter your last name') as HTMLInputElement;
    const usernameInput = screen.getByPlaceholderText('Enter your username') as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText('Enter your password') as HTMLInputElement;
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm your password') as HTMLInputElement;
    const submitButton = screen.getByText('Submit');
  
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(usernameInput, { target: { value: 'johndoe' } });
    fireEvent.change(passwordInput, { target: { value: 'Password1!' } });
    // This cost me hours, test password should also match regex conditions
    fireEvent.change(confirmPasswordInput, { target: { value: 'Password1!' } });
  
    // Mock the fetch POST request specifically for signup
    const fetchMockSuccess: SpyInstance<[input: RequestInfo | URL, init?: RequestInit | undefined], Promise<Response>> = 
      vi.spyOn(window, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      } as Response);
  
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
    // Assert that the URL has changed to the login page
    expect(window.location.pathname).toBe('/login/loginRequest');
    // Restore the original implementation of fetch
    fetchMockSuccess.mockRestore();
  });