import { useState, useRef } from 'react';
import { IconButton, InputAdornment, TextField, Button, Grid, Paper, Avatar, Typography, Snackbar, Alert, Link } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LoginIcon from '@mui/icons-material/Login';
import '../css/Login.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const passwordRef = useRef(null);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleShowPasswordToggle = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSnackbarClose = () => {
    setShowErrorAlert(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:4000/login/loginRequest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Login successful');
          setUsername('');
          setPassword('');
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
    <Grid container className="login-grid" alignItems="center" justifyContent="center">
      <Paper className="login-paper">
        <Grid align="center">
          <Avatar className="login-avatar">
            <LoginIcon />
          </Avatar>
          <h2 className="login-heading">Login</h2>
          <Typography variant="caption" gutterBottom>Enter your username and password</Typography>
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

          <Button className="form-field" type="submit" variant="contained" color="primary">Login</Button>
          <Typography variant="body2" align="center">
            Don't have an account? <Link href="/login/signupRequest">Sign up</Link>
          </Typography>
        </form>
        <div className="snackbar-container">
          <Snackbar open={showErrorAlert} autoHideDuration={3000} onClose={handleSnackbarClose}>
            <Alert onClose={handleSnackbarClose} severity="error">
              Invalid username or password
            </Alert>
          </Snackbar>
        </div>
      </Paper>
    </Grid>
  );
};

export default LoginPage;

