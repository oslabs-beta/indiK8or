import { render, screen, waitFor } from '@testing-library/react';
import HomePage from '../src/pages/HomePage';
import { MemoryRouter } from 'react-router-dom';
import { describe, test, beforeEach } from 'vitest';
import React from 'react'

describe('sidebar', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
  });
// TODO: Delete "as HTMLInputElement"
  test('does not render Sidebar and Dashboard components if isLoggedIn state is false', async () => {
    await waitFor(() => {
      const screenComponent = screen.queryByTestId('screenComponent') as HTMLInputElement;
      expect(screenComponent).toBe(null);
    });

  });

  screen.debug();
});

