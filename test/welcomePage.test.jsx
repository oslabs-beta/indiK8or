import { expect, test} from 'vitest'
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";
import WelcomePage from '../src/pages/WelcomePage';

test('renders welcome page correctly', () => {
    render(
        <Router>
          <WelcomePage />
        </Router>
      );

    // Assert Header and button links work
    expect(screen.getByText('Introducing indiK8or: Simplify and Visualize Your Kubernetes Environment')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Sign in' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Sign up' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Ivy Wang' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Julian Babon' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Yueran Li' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Tadd LeRocque' })).toBeInTheDocument();
  });