import { useEffect } from "react";
import { Button, Container, IconButton } from "@mui/material";
import { NavigateFunction, useNavigate } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "../css/Welcome.scss";
import logo from "../assets/logo1.png";

const WelcomePage = () => {
  const navigate: NavigateFunction = useNavigate();
  /*
  When welcome page loads, check to see if active session exists for user based off of SSID cookie. 
  If active session is found, redirect user to HomePage
  */
  useEffect(() => {
    const checkLoggedIn = async (): Promise<void> => {
      try {
        const response = await fetch("/login/isLoggedIn", {
          // include cookies from cross origin request
          credentials: "include",
        });
        if (response.status === 302) {
          navigate("/home");
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkLoggedIn();
  }, [navigate]);

  return (
    <div id="back">
      <Container className="welcome-container">
        <img className="logo" src={logo}></img>
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
  );
};

export default WelcomePage;
