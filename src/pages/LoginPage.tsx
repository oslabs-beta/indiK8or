import { useState, useRef, FunctionComponent, ChangeEvent} from 'react';
import {
  IconButton,
  InputAdornment,
  TextField,
  Button,
  Grid,
  Paper,
  Avatar,
  Typography,
  Snackbar,
  Alert,
  Link,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LoginIcon from '@mui/icons-material/Login';
import GitHubIcon from '@mui/icons-material/GitHub'
import '../css/Login.css';
import { useNavigate } from 'react-router-dom';

type LoginState = {
  username: string,
  password: string,
  showPassword: boolean,
  loginError: string,
  showErrorAlert: boolean
}

const LoginPage: FunctionComponent <LoginState> = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>):void => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>):void => {
    setPassword(event.target.value);
  };

  const handleShowPasswordToggle = ():void => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSnackbarClose = ():void => {
    setShowErrorAlert(false);
  };

  const handleSubmit = (event: MouseEvent) => {
    event.preventDefault();

    fetch('http://localhost:4000/login/loginRequest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // include cookies from cross origin request
      credentials: 'include',
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.ok) {
          setUsername('');
          setPassword('');
          navigate('/home');
        } else if (response.status === 404) {
          setLoginError('Invalid username or password');
          setPassword('');
          passwordRef.current.focus();
          setShowErrorAlert(true);
        } else {
          console.error('Server error:', response.statusText);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className='login-back'>
    <Grid
      container
      className="login-grid"
      alignItems="center"
      justifyContent="center"
    >
      <Paper className="login-paper">
        <Grid align="center">
          <Avatar className="login-avatar">
            <LoginIcon />
          </Avatar>
          <h2 className="login-heading">Sign In</h2>
          <Typography variant="caption" gutterBottom>
            Enter your username and password
          </Typography>
        </Grid>
        <form className="login-form" onSubmit={handleSubmit}>
          <TextField
            className="form-field"
            fullWidth
            required
            name="username"
            label="Username"
            placeholder="Enter your username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />

          <TextField
            className="form-field"
            fullWidth
            required
            name="password"
            label="Password"
            placeholder="Enter your password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            error={Boolean(loginError)}
            helperText={loginError}
            inputRef={passwordRef}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPasswordToggle} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            className="form-field"
            type="submit"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
          <Typography variant="body2" align="center">
            Dont have an account?{' '}
            <Link href="/login/signupRequest">Sign up</Link>
          </Typography>
        </form>
        <Grid container justifyContent="center" marginTop="1em">
          <Button
            startIcon={<GitHubIcon />}
            size="large"
            variant="contained"
            color="secondary"
            onClick={() => {
              const githubLoginUrl = 'http://localhost:4000/auth/github';
              window.location.href = githubLoginUrl;
            }}
            >
              Login with Github
            </Button>
        </Grid>
        <div className="snackbar-container">
          <Snackbar
            open={showErrorAlert}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
          >
            <Alert onClose={handleSnackbarClose} severity="error">
              Invalid username or password
            </Alert>
          </Snackbar>
        </div>
      </Paper>
    </Grid>
    </div>
  );
};

export default LoginPage;
