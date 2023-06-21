import { ChangeEvent, FormEvent, ReactElement, useState, useRef } from 'react';
import { Alert, Avatar, Button, Grid, IconButton, InputAdornment, Link, Paper, Snackbar, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import GitHubIcon from '@mui/icons-material/GitHub'
import LoginIcon from '@mui/icons-material/Login';
import '../css/Login.scss';
import { NavigateFunction, useNavigate } from 'react-router-dom';

const LoginPage = (): ReactElement => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);

  const passwordRef = useRef<HTMLInputElement | null>(null);
  const navigate: NavigateFunction = useNavigate();

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

  /*
  When user clicks login, send their credentials to the backend.
  If they succesfully logged in, redirect them to HomePage.
  If password or username was incorrect, notify user.
  */
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
    const response = await fetch('http://localhost:4000/login/loginRequest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // include cookies from cross origin request
      credentials: 'include',
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      setUsername('');
      setPassword('');
      navigate('/home');
    } else if (response.status === 404) {
      setLoginError('Invalid username or password');
      setPassword('');
      passwordRef.current?.focus();
      setShowErrorAlert(true);
    } else {
      console.error('Server error:', response.statusText);
    }
  } catch (error) {
    console.error(error);
  }
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
        <Grid className='signIn'>
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
            className="oauth"
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
