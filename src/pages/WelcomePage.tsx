import { useEffect } from 'react';
import { Button, Box, Container, Grid, IconButton, Typography } from '@mui/material';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../css/Welcome.scss';
import logo from '../assets/logo1.png';
import WelcomeGif from '../assets/WelcomeGif.gif';

const WelcomePage = () => {
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    // Function to check if the user is logged in
    const checkLoggedIn = async (): Promise<void> => {
      try {
        // Send a POST request to the server to check if the user is logged in
        const response = await fetch('http://localhost:4000/login/isLoggedIn', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // include cookies from cross origin request
          credentials: 'include',
          body: JSON.stringify({}),
        });
        if (response.status === 302) {
          // Handle the success response by navigating to the '/home' route
          navigate('/home');
        }
      } catch (error) {
        // Handle any errors
        console.error(error);
      }
    };
    // Call the checkLoggedIn function when the component mounts
    checkLoggedIn();
  }, [navigate]);

  return (
    <div id="back">
      <Container className="welcome-container">
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <img className="logo" src={logo} alt="Logo" />
          </Grid>
          <Grid item>
            <Typography variant="h3" align="center" gutterBottom>
              Simplify and Visualize Your Kubernetes Environment
            </Typography>
          </Grid>
          <Grid item>
            <img className="welcome-gif" src={WelcomeGif} alt="GIF" />
          </Grid>
          <Grid item>
            <Typography variant="h5" align="left">
              We are excited to present our powerful Kubernetes visualization tool,
              designed to enhance your Kubernetes cluster management experience.
              With our tool, you can gain valuable insights into the structure,
              status, and performance of your Kubernetes environment, empowering you
              to make informed decisions and optimize your infrastructure.
            </Typography>
          </Grid>
          <Grid item>
            <Button className="signin" variant="text" href="/login/loginRequest">
              Sign in
            </Button>
            <Button className="signup" variant="outlined" href="/login/signupRequest">
              Sign up
            </Button>
          </Grid>
          <Grid item>
            <Box className="team-container">
              <Typography variant="body1" className="authors" align="center">
                Meet the Team
              </Typography>
              <Grid container>
                <Grid item>
                  <Box className="team-box">
                    <img src='https://user-images.githubusercontent.com/112515781/246527162-176051e8-ef3e-410f-bc76-b808f36c28df.png' alt="Ivy Wang" />
                    <Typography variant="subtitle1">Ivy Wang</Typography>
                    <Box display="flex">
                      <IconButton href="https://www.linkedin.com/in/wanwang12/">
                        <LinkedInIcon />
                      </IconButton>
                      <IconButton href="https://github.com/WandefulWorld">
                        <GitHubIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>
                <Grid item>
                  <Box className="team-box">
                    <img src='https://user-images.githubusercontent.com/112515781/246527230-794a60b7-b0b2-461c-b0de-f698ee506387.png' alt="Julian Babon" />
                    <Typography variant="subtitle1">Julian Babon</Typography>
                    <Box display="flex">
                      <IconButton href="https://www.linkedin.com/in/julianbabon/">
                        <LinkedInIcon />
                      </IconButton>
                      <IconButton href="https://github.com/babonjmc">
                        <GitHubIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>
                <Grid item>
                  <Box className="team-box">
                    <img src='https://user-images.githubusercontent.com/112515781/246527136-5d6998e9-07cf-4189-81d9-291b09188063.png' alt="Tadd LeRocque" />
                    <Typography variant="subtitle1">Tadd LeRocque</Typography>
                    <Box display="flex">
                      <IconButton href="https://www.linkedin.com/in/tadd-lerocque-120a0287/">
                        <LinkedInIcon />
                      </IconButton>
                      <IconButton href="https://github.com/LeRocque">
                        <GitHubIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>
                <Grid item>
                  <Box className="team-box">
                    <img src='https://user-images.githubusercontent.com/112515781/246527192-120f2037-7659-461d-a762-1c81421ad5e7.png' alt="Yueran Li" />
                    <Typography variant="subtitle1">Yueran Li</Typography>
                    <Box display="flex">
                      <IconButton href="https://www.linkedin.com/in/yueran-li-ba79bb46/">
                        <LinkedInIcon />
                      </IconButton>
                      <IconButton href="https://github.com/kneazle714">
                        <GitHubIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default WelcomePage;