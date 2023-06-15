import { expect, test, vi } from 'vitest';
import { render, screen, waitFor} from '@testing-library/react';
import Dashboard from '../src/components/Dashboard';
import React from 'react';

test('renders iframe when dashboardClicked is true', async () => {
    const dashboardUid: string = 'dashboard123' as string;
    const dashboardClicked: boolean = true as boolean;
  
    // Mock the fetch request
    const fetchMockSuccess = vi
      .spyOn(window, 'fetch')
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(dashboardUid),
      } as Response);
  
    render(<Dashboard dashboardClicked={dashboardClicked} />);
  
    // Wait for the async operation to complete
    await waitFor(async () => {
      const iframe = await screen.findByTestId('DashboardIframe') as HTMLIFrameElement;
      expect(iframe).toBeInTheDocument();
      expect(iframe.src).toContain(`http://localhost:3000/d/${dashboardUid}/node-exporter-nodes?orgId=1&refresh=5s`);
    });
  
    // Assert that fetch is called with the correct URL
    expect(fetchMockSuccess).toHaveBeenCalledWith('http://localhost:4000/dashboard/');
  });
  
  test('renders Typography when dashboardClicked is false', () => {
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    const dashboardClicked: boolean = false;
  
    render(<Dashboard dashboardClicked={dashboardClicked} />);
  
    // Assert that the Typography component is rendered with the correct text
    const typography: HTMLElement = screen.getByText('indiK8or makes viewing your cluster metrics easy!');
    expect(typography).toBeInTheDocument();
  });