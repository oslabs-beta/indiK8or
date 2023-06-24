import { ChangeEvent, FormEvent, ReactElement, useState, useRef} from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Alert, Avatar, Button, Grid,IconButton, InputAdornment, Paper, Snackbar, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import '../css/Signup.scss';

const SignupPage = (): ReactElement => {
  const [username, setUsername] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string>('');
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [showConflictAlert, setShowConflictAlert] = useState<boolean>(false);
  const passwordConfirmationRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const navigate: NavigateFunction = useNavigate();
  
  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setUsername(event.target.value);
  };

  const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLastName(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmationChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPasswordConfirmation(event.target.value);
  };

  const handleShowPasswordToggle = (): void => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleShowPasswordConfirmationToggle = (): void => {
    setShowPasswordConfirmation((prevShowPasswordConfirmation) => !prevShowPasswordConfirmation);
  };

  const handleSnackbarClose = (): void => {
    setShowSuccessAlert(false); 
  };

  const handleConflictSnackbarClose = (): void => {
    setShowConflictAlert(false);
  };
 
  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    // Check if passwords match, if it does not change state of password error and clear the input field
    if (password !== passwordConfirmation) {
        setPasswordError('Passwords does not match');
        setPasswordConfirmation('');
        passwordConfirmationRef.current?.focus();
        return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Check if password meets the required criteria
    if (!passwordRegex.test(password)) {
        setPasswordError('Password must be at least 8 characters long and include a capital letter, a number, and a symbol');
        setPassword('');
        passwordRef.current?.focus();
        return;
    }
    /*
    Send user info to backend.
    If user is successfully created, redirect them to LoginPage.
    If user was not created, show conflict.
    */
    try {
      const response = await fetch('/login/signupRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, firstName, lastName, password }),
      });
      if (response.ok) {
          setShowSuccessAlert(true);
          navigate('/login/loginRequest');
      } else if (response.status === 409) {
        setShowConflictAlert(true);
        setUsername('');
        setPassword('');
        setPasswordConfirmation('');
        passwordRef.current?.focus();
        return;   
      } else {
        console.error('Server error:', response.statusText)
      }
  } catch(error) {
      console.error(error);
    }
    setUsername('');
    setFirstName('');
    setLastName('');
    setPassword('');
    setPasswordConfirmation('');
  };

  return (
    <div className='signup-back'>
    <Grid container className="signup-grid" alignItems="center" justifyContent="center">
    <Paper className='signup-paper'>
        <Grid className='signup-head'>
            <Avatar id='signup-avatar'>
                <AddCircleOutlineOutlinedIcon />
            </Avatar >
            <h2 className='signup-heading'> Sign Up</h2>
            <Typography variant='caption' gutterBottom>Please fill this form to create an account </Typography>
        </Grid>
        <form className='signup-form' onSubmit={handleSubmit}>

            <TextField className='form-field'
            fullWidth
            required 
            name='firstName' 
            label='First Name' 
            placeholder='Enter your first name' 
            type="text" 
            value={firstName}
            onChange={handleFirstNameChange} />

            <TextField className='form-field'
            fullWidth
            required 
            name='lastName' 
            label='Last Name' 
            placeholder='Enter your last name' 
            type="text" 
            value={lastName} 
            onChange={handleLastNameChange}/>

            <TextField className='form-field'
            fullWidth
            required  
            name='username' 
            label='Username' 
            placeholder='Enter your username' 
            type="text" 
            value={username} 
            onChange={handleUsernameChange}/>

            <TextField className='form-field'
            fullWidth
            required  
            name='password' 
            label='Password' 
            placeholder='Enter your password' 
            type={showPassword ? 'text' : 'password'} 
            value={password}
            onChange={handlePasswordChange} 
            helperText={passwordError || '*Password should be at least 8 characters long and include a capital letter, a number, and a symbol.'} 
            error={Boolean(passwordError)}
            inputRef={passwordRef}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={handleShowPasswordToggle} edge='end'>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}/>

            <TextField className='form-field'
            fullWidth
            required  
            label='Confirm Password' 
            placeholder='Confirm your password' 
            type={showPasswordConfirmation ? 'text' : 'password'} 
            value={passwordConfirmation}
            onChange={handlePasswordConfirmationChange} 
            error={Boolean(passwordError)} 
            helperText={passwordError}
            inputRef={passwordConfirmationRef}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={handleShowPasswordConfirmationToggle} edge='end'>
                      {showPasswordConfirmation ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}/>

            <Button className='form-field' type='submit' variant='contained' color='primary'>Submit</Button>
        </form>
        <div className='snackbar-container'>
          <Snackbar open={showSuccessAlert} autoHideDuration={3000} onClose={handleSnackbarClose}>
              <Alert onClose={handleSnackbarClose} severity='success'>
                  User created successfully!
              </Alert>
          </Snackbar>
          <Snackbar open={showConflictAlert} autoHideDuration={3000} onClose={handleConflictSnackbarClose}>
              <Alert onClose={handleConflictSnackbarClose} severity='error'>
                  Account already exists!
              </Alert>
          </Snackbar>
        </div>
    </Paper>
</Grid>
</div>
  );
};

export default SignupPage;