import './App.css' 
import { Routes,Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import HomePage from './pages/HomePage'

function App() {

  return (
    <Routes>
    <Route path='/' element={<LoginPage />} />
    <Route path='/login/signupRequest' element={<SignupPage />} />
    <Route path='/home' element={<HomePage />} />
    </Routes>
  )
}

export default App
