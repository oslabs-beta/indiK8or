import { expect, test, vi } from 'vitest';
import { render, screen, waitFor} from '@testing-library/react';
import Dashboard from '../src/components/Dashboard';
import React from 'react';

test('renders iframe when dashboardClicked is true', async () => {
    // TODO: you don't need to declare string type here. simply write like this "const dashboardUid = 'dashboard123';"
    const dashboardUid: string = 'dashboard123' as string;
    // TODO: you don't need to specify boolean here. typescript can figure out boolean on its own. so simply write like this "const dashboardClicked = true;"
    const dashboardClicked: boolean = true as boolean;
  
    // Mock the fetch request
    const fetchMockSuccess = vi
      .spyOn(window, 'fetch')
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(dashboardUid),
      } as Response);
  
    // TODO: the prop "podClicked is a required prop, but it's not passed in here". if you are not testing "podClicked", you can simply pass in like this "render(<Dashboard dashboardClicked={dashboardClicked} podClicked />);"
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
    // Same as above or you can just pass it in like "render(<Dashboard dashboardClicked={false} podClicked />);"
    const dashboardClicked = false as boolean;
  
    // TODO: Same as above
    render(<Dashboard dashboardClicked={dashboardClicked} />);
  
    // Assert that the Typography component is rendered with the correct text
    const typography: HTMLElement = screen.getByText('indiK8or makes viewing your cluster metrics easy!');
    expect(typography).toBeInTheDocument();
  });