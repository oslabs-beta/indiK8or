import {  render, waitFor, act } from '@testing-library/react';
import HomePage from '../src/pages/HomePage.jsx';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
// import Dashboard from '../src/components/Dashboard.jsx';

describe('renders Sidebar and Dashboard component successfully', ()=> {
  
    it('renders the homepage with sidebar and dashboard components when user is logged in', async () => {
    
        const { getByTestId } = await render(
          <MemoryRouter>
            <HomePage loggedIn={true} />
          </MemoryRouter>
        );
        const screenElement = getByTestId('screenElement');
        expect(screenElement).toBeInTheDocument();
      });
   

  });

