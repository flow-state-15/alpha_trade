import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import LoginFormModal from "./components/LoginFormModal";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import './App.css';
import "./reset.css";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div id="app_container">
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/">
            <HomePage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/login">
            <LoginFormModal />
          </Route>
          <ProtectedRoute path="/@profile/:userId">
          </ProtectedRoute>
          <ProtectedRoute path="/@profile/:user_id/portfolios/:portfolio_id">
          </ProtectedRoute>
          <ProtectedRoute path="/@profile/:user_id/watchlists/:watchlist_id">
          </ProtectedRoute>
          <ProtectedRoute path="/@profile/:user_id/transactions">
          </ProtectedRoute>
        </Switch>
      )}
    </div>
  );
}

export default App;