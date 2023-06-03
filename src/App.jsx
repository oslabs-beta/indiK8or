import './App.css' 
import { Routes,Route } from 'react-router-dom'
import LoginPage from './pages/Login'
import SignupPage from './pages/Signup'

function App() {

  return (
    <Routes>
    <Route path='/' element={<LoginPage />} />
    <Route path='/login/signupRequest' element={<SignupPage />} />
    </Routes>
  )
}

export default App
