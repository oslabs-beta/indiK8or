import React from 'react';
import { render, screen, waitFor} from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import Dashboard from '../src/components/Dashboard';

test('renders iframe when dashboardClicked is true', async () => {
    const dashboardUid = 'dashboard123';
    // Mock the fetch request
    const fetchMockSuccess = vi
      .spyOn(window, 'fetch')
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(dashboardUid),
      } as Response);
  
    render(<Dashboard dashboardClicked={true} podClicked={false} />);
  
    // Wait for the async operation to complete
    await waitFor(async () => {
      const iframe = await screen.findByTestId('DashboardIframe') as HTMLIFrameElement;
      expect(iframe).toBeInTheDocument();
      expect(iframe.src).toContain(`http://localhost:3000/d/${dashboardUid}/node-exporter-nodes?orgId=1&refresh=5s`);
    });
  
    // Assert that fetch is called with the correct URL
    expect(fetchMockSuccess).toHaveBeenCalledWith('/dashboard/');
  });
  
  test('renders Typography when dashboardClicked is false', () => {
  
    render(<Dashboard dashboardClicked={false} podClicked={false} />);
  
    // Assert that the Typography component is rendered with the correct text
    const typography: HTMLElement = screen.getByText('indiK8or makes viewing your cluster metrics easy!');
    expect(typography).toBeInTheDocument();
  });