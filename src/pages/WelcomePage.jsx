import { Grid, Paper, Link, Button, Container } from '@mui/material';
import '../css/Welcome.css';
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
    <Container className="welcome-container">
      <h2 className="welcome-heading">Welcome</h2>
      <Button className="signin" variant="text" href="/login/loginRequest">
        Sign in
      </Button>
      <Button className="signup" variant="outlined" href="/login/signupRequest">
        Sign up
      </Button>
    </Container>
  );
};

export default WelcomePage;
