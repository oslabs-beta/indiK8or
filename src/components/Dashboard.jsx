import React from 'react'
import { Box } from '@mui/material'
import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [dashboardUid, setDashboardUid] = useState(null);
  async function fetchData() {
    try {
      const response = await fetch('http://localhost:4000/dashboard/');
      const data = await response.json();
      // Do something with the data
      setDashboardUid(data);
      console.log(data);
    } catch (error) {
      // Handle any errors
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box>
      {dashboardUid ? (
     <iframe className="grafanaDashboard dashboardExtended" src={`http://localhost:3000/d/${dashboardUid}/node-exporter-nodes?orgId=1&refresh=5s`} width='1200' height='1320'/>
      ) : (
        <p></p>
      )}
    </Box>
  );
}

export default Dashboard
