import { render } from '@testing-library/react';
import App from '../src/App';
import { MemoryRouter } from 'react-router-dom';

describe('App', () => {
  it('renders headline', () => {
    render(
      <MemoryRouter>
        <App title="React" />
      </MemoryRouter>
    );
  });
});