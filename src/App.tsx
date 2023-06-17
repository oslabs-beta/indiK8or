import './App.css';
import { ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import WelcomePage from './pages/WelcomePage';
import { Provider } from "react-redux"
import { store } from './store'

function App(): ReactElement {
  return (
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login/loginRequest" element={<LoginPage />} />
        <Route path="/login/signupRequest" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
  );
}

export default App;
