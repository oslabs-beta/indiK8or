import { render, screen } from '@testing-library/react';
import HomePage from '../src/pages/HomePage.jsx';
import { describe, it, expect } from 'vitest';
// import Dashboard from '../src/components/Dashboard.jsx';

describe('renders Sidebar and Dashboard component correctly', ()=> {
  
    describe('sidebar', () => {
      test('renders sidebar', () => {
       render(<HomePage />);
       const sidebarComponent = screen.getByTestId('sidebarComponent');
       expect(sidebarComponent).toBeInTheDocument();
      })
    });

    // describe('dashboard', () => {
    //     test('renders sidebar', () => {
    //      render(<HomePage />);
    //      const dashboardComponent = screen.getByTestId('dashboardComponent');
    //      expect(dashboardComponent).toBeInTheDocument();
    //     })
    //   });
})

