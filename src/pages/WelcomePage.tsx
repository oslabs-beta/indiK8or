import { Button, Container, IconButton } from "@mui/material";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAuth } from '../hooks/useAuth'
import { BallTriangle } from 'react-loader-spinner';
import { WELCOME_CONTENT } from '../constants/content';
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "../css/Welcome.scss";
import logo from "../assets/logo1.png";

const WelcomePage: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  /*
  When welcome page loads, check to see if active session exists for user based off of SSID cookie. 
  If active session is found, redirect user to HomePage
  */
  const { isLoading, error } = useAuth();

  return (
    <>
      {isLoading && (
        <div className="loading-spinner-overlay">
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            visible={true}
          />
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>Something went wrong: {error.message}</p>
        </div>
      )}

      <div id="back">
        <Container className="welcome-container">
          <img className="logo" src={logo} alt='indiK8or-logo' loading='eager'></img>
          <h1 className="intro-heading">
            {WELCOME_CONTENT.HEADING}
          </h1>
          <h2 className="intro">
            {WELCOME_CONTENT.DESCRIPTION}
          </h2>
          <Button
            className="signin"
            variant="text"
            onClick={() => navigate("/login/loginRequest")}
          >
            Sign in
          </Button>
          <Button
            className="signup"
            variant="outlined"
            onClick={() => navigate("/login/signupRequest")}
          >
            Sign up
          </Button>
          <Container className="button-container">
            <Button className="authors" variant="text" disabled={true}>
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
            <IconButton
              className="github"
              href="https://github.com/WandefulWorld"
            >
              <GitHubIcon></GitHubIcon>
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
            <IconButton className="github" href="https://github.com/babonjmc">
              <GitHubIcon></GitHubIcon>
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
            <IconButton className="github" href="https://github.com/LeRocque">
              <GitHubIcon></GitHubIcon>
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
            <IconButton className="github" href="https://github.com/kneazle714">
              <GitHubIcon></GitHubIcon>
            </IconButton>
          </Container>
        </Container>
      </div>
    </>
  );
};

export default WelcomePage;
