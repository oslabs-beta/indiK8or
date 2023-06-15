import { Grid, Typography } from '@mui/material';
import { useState, useEffect, ReactElement } from 'react';
import { PodProps } from '../../types';

const Pods = (props: PodProps): ReactElement => {
  const { podClicked } = props;

  async function fetchData() {
    try {
      const response = await fetch('http://localhost:4000/pod');
      if (response.ok) {
        const data = await response.json();
        console.log('data is: ', data);
      }
    } catch (error) {
      console.error('error on fetching pods data: ', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Grid
      className="dash-box"
      container
      alignItems="center"
      justifyContent="center"
    >
      PODS ARE HERE
    </Grid>
  );
};

export default Pods;
