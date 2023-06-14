import { expect, test, vi } from 'vitest';
import { render, screen, waitFor} from '@testing-library/react';
import Dashboard from '../src/components/Dashboard';

test('renders iframe when dashboardClicked is true', async () => {
    const dashboardUid = 'dashboard123';
    const dashboardClicked = true;
  
    // Mock the fetch request
    const fetchMockSuccess = vi
      .spyOn(window, 'fetch')
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(dashboardUid),
      });
  
    render(<Dashboard dashboardClicked={dashboardClicked} />);
  
    // Wait for the async operation to complete
    await waitFor(async () => {
      const iframe = await screen.findByTestId('DashboardIframe');
      expect(iframe).toBeInTheDocument();
      expect(iframe.src).toContain(`http://localhost:3000/d/${dashboardUid}/node-exporter-nodes?orgId=1&refresh=5s`);
    });
  
    // Assert that fetch is called with the correct URL
    expect(fetchMockSuccess).toHaveBeenCalledWith('http://localhost:4000/dashboard/');
  });
  
  test('renders Typography when dashboardClicked is false', () => {
    const dashboardClicked = false;
  
    render(<Dashboard dashboardClicked={dashboardClicked} />);
  
    // Assert that the Typography component is rendered with the correct text
    const typography = screen.getByText('indiK8or makes viewing your cluster metrics easy!');
    expect(typography).toBeInTheDocument();
  });