import { useState, useEffect, ReactElement } from "react";
import { Grid, Typography } from "@mui/material";
import "../css/Dashboard.css";
import PodTable from "./PodTable";
import { DashProps, Pod } from "../../types";

export default function Dashboard({
  dashboardClicked,
  podClicked,
}: DashProps): ReactElement {
  const [dashboardUid, setDashboardUid] = useState<string>("");
  const [pods, setPods] = useState<Pod[]>([]);
  const [open, setOpen] = useState(false);
  const [scannedImage, setScannedImage] = useState<string>("");
  const [imageName, setImageName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  /* 
  When SCAN button is clicked, fetch image scans from backend and set as scannedImage state.
  While images are being scanned, set Loading to true, then set open to true.
  Finally, after images are received from backend, set Loading to false.
  */
  const handleOpen = (): void => {
    getImages();
    setLoading(true);
    setOpen(true);
  };
  // When outside of modal is clicked, set Open to false
  const handleClose = (): void => {
    setOpen(false);
  };

  /*
  When getImages is called by clicking SCAN button, send POST to backend with imageName as request body.
  If request is successful, set scannedImage with returned JSON result.
  Finally, set Loading to false
  */
  const getImages = async (): Promise<void> => {
    try {
      const response = await fetch("/scan/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // include cookies from cross origin request
        credentials: "include",
        body: JSON.stringify({
          imageName: imageName,
        }),
      });
      if (response.ok) {
        const images: string = await response.json();
        setScannedImage(images);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // GET dashboard id from backend and store in dashboardUid state
  const fetchDashBoardData = async (): Promise<void> => {
    try {
      const response = await fetch("/dashboard/");
      const data: string = await response.json();
      setDashboardUid(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // GET pods from backend and store in pods state
  const fetchPodData = async (): Promise<void> => {
    try {
      const response = await fetch("/pod");
      if (response.ok) {
        const data = await response.json();
        setPods(data);
      }
    } catch (error) {
      console.error("error on fetching pods data: ", error);
    }
  };
  // When page loads, call fetchDashBoardData and fetchPodData
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
        <PodTable
          pods={pods}
          handleOpen={handleOpen}
          handleClose={handleClose}
          loading={loading}
          scannedImage={scannedImage}
          setImageName={setImageName}
          open={open}
        />
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
