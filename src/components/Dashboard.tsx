import { Grid, Typography } from '@mui/material';
import { useState, useEffect, ReactElement } from 'react';
import '../css/Dashboard.css';
import { DashProps } from '../../types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

//pass props from parent component (HomePage)
export default function Dashboard(props: DashProps): ReactElement {
  const { dashboardClicked } = props;
  const { podClicked } = props;
  const [dashboardUid, setDashboardUid] = useState<string | null>(null);
  const [pods, setPods] = useState<Array<object>>([{}]);
  const [openModal, setOpenModal] = useState(false);

  async function fetchDashBoardData() {
    try {
      const response = await fetch('http://localhost:4000/dashboard/');
      const data: string = await response.json();
      setDashboardUid(data);
    } catch (error) {
      // Handle any errors
      console.error('Error:', error);
    }
  }

  async function fetchPodData() {
    console.log('INSIDE FETCH-POD-DATA');
    try {
      const response = await fetch('http://localhost:4000/pod');
      if (response.ok) {
        const data = await response.json();
        console.log('data is: ', data);
        setPods(data);
        console.log('pods are:', pods);
      }
    } catch (error) {
      console.error('error on fetching pods data: ', error);
    }
  }

  useEffect(() => {
    fetchDashBoardData(), fetchPodData();
  }, []);

  if (dashboardClicked) {
    return (
      <Grid
        className="dash-box"
        container
        alignItems="center"
        justifyContent="center"
      >
        <iframe
          className="grafanaDashboard-dashboardExtended"
          src={`http://localhost:3000/d/${dashboardUid}/node-exporter-nodes?orgId=1&refresh=5s`}
          data-testid="DashboardIframe"
        />
      </Grid>
    );
  } else if (podClicked) {
    return (
      <Grid
        className="dash-box"
        container
        alignItems="center"
        justifyContent="center"
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>NAME</TableCell>
                <TableCell >READY</TableCell>
                <TableCell>STATUS</TableCell>
                <TableCell >RESTARTS</TableCell>
                <TableCell >AGE</TableCell>
                <TableCell >IP</TableCell>
                <TableCell >NODE</TableCell>
                <TableCell >VULNERABILITY</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pods.map((pod: any) => (
                <TableRow
                  key={pod.NAME}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{pod.NAME}</TableCell>
                  <TableCell align="left">{pod.READY}</TableCell>
                  <TableCell align="left">{pod.STATUS}</TableCell>
                  <TableCell align="left">{pod.RESTARTS}</TableCell>
                  <TableCell align="left">{pod.AGE}</TableCell>
                  <TableCell align="left">{pod.IP}</TableCell>
                  <TableCell align="left">{pod.NODE}</TableCell>
                  <TableCell align="left">
                  <Button variant="contained" onClick={() => {() => {setOpenModal(true)}}}>Scan</Button>
                  {openModal && <Scan closeModal={setOpenModal} />}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    );
  } else {
    return (
      <Grid container alignItems="center" justifyContent="center">
        <Typography variant="h3" className="dash-typography">
          indiK8or makes viewing your cluster metrics easy!
        </Typography>
      </Grid>
    );
  }
}
