import { expect, test} from 'vitest'
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";
import WelcomePage from '../src/pages/WelcomePage';
import React from 'react'

test('renders welcome page correctly', () => {
    render(
        <Router>
          <WelcomePage />
        </Router>
      );

    // Assert Header and button links work
    // TODO: Delete all of the "as HTMLInputElement"
    expect(screen.getByText('Introducing indiK8or: Simplify and Visualize Your Kubernetes Environment')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Sign in' }) as HTMLInputElement).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Sign up' }) as HTMLInputElement).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Ivy Wang' }) as HTMLInputElement).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Julian Babon' }) as HTMLInputElement).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Yueran Li' }) as HTMLInputElement).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Tadd LeRocque' }) as HTMLInputElement).toBeInTheDocument();
  });