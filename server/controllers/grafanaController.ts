import { NextFunction, Request, Response } from "express";

const grafanaController = {
  nodeExporter: async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const username = "admin";
    const password = "prom-operator";
    // Encode username and password (required to send via fetch)
    const encodedCredentials = btoa(`${username}:${password}`);
    try {
      // fetching grafana api
      const response = await fetch(
        "http://localhost:3000/api/search?query=Node%20Exporter%20/%20Nodes",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Basic ${encodedCredentials}`,
          },
        },
      );
      // if response received, save the uid on the response body to res.local
      if (response.ok) {
        const data = await response.json();
        res.locals.node = data[0].uid;
        return next();
      } else {
        // if response is not received, send status code 500
        res.sendStatus(500);
      }
    } catch (error) {
      const errMessage = {
        log: `Error occurred during grafana node-exporter fetch ${error}`,
        status: 500,
        message: {
          err: `Unable to reach Grafana`,
        },
      };
      return next(errMessage);
    }
  },
};
export { grafanaController };
