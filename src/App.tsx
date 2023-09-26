import "./App.css";
import { ReactElement, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import WelcomePage from "./pages/WelcomePage";

function App(): ReactElement {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await fetch("/login/isLoggedIn", {
          credentials: "include",
        });

        if (response.status === 303) {
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error(error);
        setIsAuthenticated(false);
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route
        path="/login/loginRequest"
        element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
      />
      <Route path="/login/signupRequest" element={<SignupPage />} />
      <Route
        path="/home"
        element={isAuthenticated ? <HomePage /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default App;
