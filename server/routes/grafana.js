import express from "express";
import fetch from "node-fetch";

const grafanaRouter = express.Router();

grafanaRouter.get('/tags', async (req, res) => {
  const username = 'admin';
  const password = 'prom-operator';
  console.log('Inside grafanaRouter');
  // Encode username and password (required to send via fetch)
  const encodedCredentials = btoa(`${username}:${password}`);
  try {
    const response = await fetch('http://localhost:3000/?orgId=1/api/dashboards/tags', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Basic ${encodedCredentials}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data)
      res.json(data);
      
    } else {
      console.error('Failed to fetch tags:', response.status, response.statusText);
      res.sendStatus(500);
    }
  } catch (error) {
    console.error('Error:', error);
    res.sendStatus(500);
  }
});



export default grafanaRouter;