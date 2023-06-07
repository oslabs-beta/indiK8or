import { Box, Grid, Typography } from '@mui/material'
import { useState, useEffect } from 'react';
import '../css/Dashboard.css'

//pass props from parent component (HomePage)
export default function Dashboard(props) {

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

  return props.dashboardClicked ? (
    <Grid container alignItems="center" justifyContent="center"> 
    <Box className='dash-box'>
        <iframe className="grafanaDashboard dashboardExtended" src={`http://localhost:3000/d/${dashboardUid}/node-exporter-nodes?orgId=1&refresh=5s`} width='1300' height='800'/>
    </Box> 
</Grid>) 
: <Grid container alignItems="center" justifyContent="center"> 
    <Typography variant='h3' className='dash-typography'>indiK8or make viewing your cluster easy!</Typography>
    </Grid>
}





