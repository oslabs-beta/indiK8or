import { Grid, Typography } from '@mui/material';
import { useState, useEffect, ReactElement } from 'react';
import '../css/Dashboard.css';
import { DashProps, Pod } from '../../types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Scan from './Scan';

//pass props from parent component (HomePage)
export default function Dashboard(props: DashProps): ReactElement {
  const { dashboardClicked, podClicked, darkMode, setDarkMode } = props;
  const [dashboardUid, setDashboardUid] = useState<string | null>(null);
  const [pods, setPods] = useState<Pod[]>([]);
  const [open, setOpen] = useState(false);
  const [scannedImage, setScannedImage] = useState<string>('');
  const [podName, setPodName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [darkModeToggled, setDarkModeToggled] = useState<boolean>(false);
  console.log('props', props)
  const handleOpen = (): void => {
    if (darkMode){
    setDarkMode(false);
    setDarkModeToggled(true);
    }
    setScannedImage('');
    setLoading(true);
    setOpen(true);
  }

  const handleClose = (): void => {
    if (darkModeToggled) {
      setDarkMode(true);
      setDarkModeToggled(false);
    }
    setOpen(false);
  }

  const getImages = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:4000/pod/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // include cookies from cross origin request
        credentials: 'include',
        body: JSON.stringify({
          podName: podName
        }),
      });
      if (response.ok) {
        // Handle success response
        const images: string = await response.json();
        setScannedImage(images);
        console.log('scanned image', scannedImage)
      }
    } catch (error) {
        // Handle any errors
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    useEffect((): void => {
      if (open) {
      getImages();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

  async function fetchDashBoardData(): Promise<void> {
    try {
      const response = await fetch('http://localhost:4000/dashboard/');
      const data: string = await response.json();
      setDashboardUid(data);
    } catch (error) {
      // Handle any errors
      console.error('Error:', error);
    }
  }

  async function fetchPodData(): Promise<void> {
    try {
      const response = await fetch('http://localhost:4000/pod');
      if (response.ok) {
        const data = await response.json();
        setPods(data);
      }
    } catch (error) {
      console.error('error on fetching pods data: ', error);
    }
  }

  useEffect((): void => {
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
        <TableContainer component={Paper} className='pod-table'>
          <Table sx={{ minWidth: 650,}} aria-label="simple table" >
            <TableHead>
              <TableRow>
                <TableCell>NAME</TableCell>
                <TableCell>READY</TableCell>
                <TableCell>STATUS</TableCell>
                <TableCell>RESTARTS</TableCell>
                <TableCell>AGE</TableCell>
                <TableCell>IP</TableCell>
                <TableCell>NODE</TableCell>
                <TableCell>VULNERABILITY</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pods.map((pod: Pod, index: number) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {pod.NAME}
                  </TableCell>
                  <TableCell align="left">{pod.READY}</TableCell>
                  <TableCell align="left">{pod.STATUS}</TableCell>
                  <TableCell align="left">{pod.RESTARTS}</TableCell>
                  <TableCell align="left">{pod.AGE}</TableCell>
                  <TableCell align="left">{pod.IP}</TableCell>
                  <TableCell align="left">{pod.NODE}</TableCell>
                  <TableCell align="left">
                    <Button 
                      variant="contained" onClick={handleOpen}
                      onClickCapture={() => setPodName(pod.NAME)}
                    >
                      Scan
                    </Button>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    > 
                      {loading ? (
                        <div>Loading...</div>
                      ) : (
                        <Scan scannedImage={scannedImage} />
                      )}
                    </Modal>
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
