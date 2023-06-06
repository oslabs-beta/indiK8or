import { Grid, Paper, Link } from '@mui/material';
import '../css/Login.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const WelcomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:4000/login/isLoggedIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // include cookies from cross origin request
        credentials: 'include',
        body: JSON.stringify({}),
      })
      .then((response) => {
        console.log(response);
        if (response.status === 302) {
          // Handle success response
          // Update the state to indicate user creation success
          navigate('/home');
        }
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  }, [navigate]);

  return (
    <Grid
      container
      className="login-grid"
      alignItems="center"
      justifyContent="center"
    >
      <Paper className="login-paper">
        <Grid align="center">
          <h2 className="login-heading">Welcome</h2>
        </Grid>
        <Link href="/login/signupRequest">Sign up</Link>
        <Link href="/login/loginRequest">Log in</Link>
      </Paper>
    </Grid>
  );
};

export default WelcomePage;
