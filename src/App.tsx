import "./App.css";
import { ReactElement, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import WelcomePage from "./pages/WelcomePage";
import { ROUTES } from "./constants/routes";

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
      <Route path={ROUTES.ROOT} element={<WelcomePage />} />
      <Route
        path={ROUTES.LOGIN}
        element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
      />
      <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
      <Route
        path={ROUTES.HOME}
        element={isAuthenticated ? <HomePage /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default App;
