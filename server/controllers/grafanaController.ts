import { Request, Response, NextFunction } from 'express';

const grafanaController: any = {};

grafanaController.nodeExporter = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    const username = 'admin';
    const password = 'prom-operator';
    console.log('Inside grafanaController.nodeExporter');
    // Encode username and password (required to send via fetch)
    const encodedCredentials = btoa(`${username}:${password}`);
    try {
      const response = await fetch('http://localhost:3000/api/search?query=Node%20Exporter%20/%20Nodes', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Basic ${encodedCredentials}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('successful api fetch, data.uid', data[0].uid)
        res.locals.node = data[0].uid;
        return next();
      } else {
        console.error('Failed to fetch dashboard:', response.status, response.statusText);
        res.sendStatus(500);
      }
    } catch (error) {
      const errMessage = {
        log: 'Error occurred during grafana node-exporter fetch',
        status: 500,
        message: `${error} error occured in grafanaController.nodeExporter`
      }
      return next(errMessage);
    }
}

export { grafanaController };