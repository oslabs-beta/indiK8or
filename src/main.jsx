import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App.jsx'
import './index.css'
import SignupPage from './pages/Signup.jsx'
import LoginPage from './pages/Login.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App />  */}
    {/* <SignupPage/> */}
    <LoginPage/>
  </React.StrictMode>,
)
