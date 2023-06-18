import { Container, Button, IconButton } from '@mui/material';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../css/Welcome.scss';
import logo from '../assets/logo1.png';

const WelcomePage = () => {
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    const checkLoggedIn = async (): Promise<void> => {
      try {
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
          // Handle success response
          // Update the state to indicate user creation success
          navigate('/home');
        }
      } catch (error) {
          // Handle any errors
          console.error(error);
        }
      };
      checkLoggedIn();
  }, [navigate]);

  return (
    <div id="back">
      <img className="logo" src={logo}></img>
      <Container className="welcome-container">
        <h1 className="intro-heading">
          Introducing indiK8or: Simplify and Visualize Your Kubernetes
          Environment
        </h1>
        <h2 className="intro">
          We are excited to present our powerful Kubernetes visualization tool,
          designed to enhance your Kubernetes cluster management experience.
          With our tool, you can gain valuable insights into the structure,
          status, and performance of your Kubernetes environment, empowering you
          to make informed decisions and optimize your infrastructure.
        </h2>
        <Button className="signin" variant="text" href="/login/loginRequest">
          Sign in
        </Button>
        <Button
          className="signup"
          variant="outlined"
          href="/login/signupRequest"
        >
          Sign up
        </Button>
        <Container className="button-container">
          <Button
            className="authors"
            variant="text"
            disabled={true}
          >
            Our engineers:
          </Button>
          <Button className="name" variant="text" disabled={true}>
            Ivy Wang
          </Button>
          <IconButton
            className="linkedin"
            href="https://www.linkedin.com/in/wanwang12/"
          >
            <LinkedInIcon></LinkedInIcon>
          </IconButton>
          <Button className="name" variant="text" disabled={true}>
            Julian Babon
          </Button>
          <IconButton
            className="linkedin"
            href="https://www.linkedin.com/in/julianbabon/"
          >
            <LinkedInIcon></LinkedInIcon>
          </IconButton>
          <Button className="name" variant="text" disabled={true}>
            Tadd LeRocque
          </Button>
          <IconButton
            className="linkedin"
            href="https://www.linkedin.com/in/tadd-lerocque-120a0287/"
          >
            <LinkedInIcon></LinkedInIcon>
          </IconButton>
          <Button className="name" variant="text" disabled={true}>
            Yueran Li
          </Button>
          <IconButton
            className="linkedin"
            href="https://www.linkedin.com/in/yueran-li-ba79bb46/"
          >
            <LinkedInIcon></LinkedInIcon>
          </IconButton>
        </Container>
      </Container>
    </div>
  );
};

export default WelcomePage;
