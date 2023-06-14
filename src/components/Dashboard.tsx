import { Grid, Typography } from '@mui/material'
import { useState, useEffect } from 'react';
import '../css/Dashboard.css'
import PropTypes from 'prop-types'

//pass props from parent component (HomePage)
export default function Dashboard(props) {
  const { dashboardClicked } = props;
  const [dashboardUid, setDashboardUid] = useState(null);
  
  async function fetchData() {
    try {
      const response = await fetch('http://localhost:4000/dashboard/');
      const data = await response.json();
      // Do something with the data
      setDashboardUid(data);
    } catch (error) {
      // Handle any errors
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return dashboardClicked ? (
    <Grid className='dash-box' container alignItems="center" justifyContent="center"> 
    
        <iframe className="grafanaDashboard-dashboardExtended" src={`http://localhost:3000/d/${dashboardUid}/node-exporter-nodes?orgId=1&refresh=5s`} data-testid='DashboardIframe'/>
  
</Grid>) 
: <Grid container alignItems="center" justifyContent="center"> 
    <Typography variant='h3' className='dash-typography'>indiK8or makes viewing your cluster metrics easy!</Typography>
    </Grid>
}

Dashboard.propTypes = {
  dashboardClicked: PropTypes.bool,
}


