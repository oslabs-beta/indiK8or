import { render } from '@testing-library/react';
import App from '../src/App';
import { MemoryRouter } from 'react-router-dom';
import React from 'react'
import { describe, test } from 'vitest'


describe('App', () => {
  test('renders headline', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });
});