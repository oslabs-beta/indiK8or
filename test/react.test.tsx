import { render, screen, waitFor } from '@testing-library/react';
import HomePage from '../src/pages/HomePage';
import { MemoryRouter } from 'react-router-dom';

describe('sidebar', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
  });

  it('does not render Sidebar and Dashboard components if isLoggedIn state is false', async () => {
    await waitFor(() => {
      const screenComponent = screen.queryByTestId('screenComponent');
      expect(screenComponent).toBe(null);
    });

  });

  screen.debug();
});

