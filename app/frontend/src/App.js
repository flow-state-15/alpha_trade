import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import { loadPortfolios } from "./store/portfolios";
import { loadWatchlists } from "./store/watchlists";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UserPage from "./components/UserPage";
import Footer from "./components/Footer";
import Handle404 from "./components/Handle404"
import "./App.css";
import "./reset.css";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state.session.user);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    // if (user) {
      // (() => {
      //   dispatch(loadPortfolios(user?.id)).then(() =>
      //     dispatch(loadWatchlists(user?.id))
      //   );
      // })();
    // }
  }, []);

  return (
    <div id="app_container">
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <ProtectedRoute exact path="/@profile/:userId">
            <UserPage />
          </ProtectedRoute>
          <ProtectedRoute
            exact
            path="/@profile/:user_id/portfolios/:portfolio_id"
          ></ProtectedRoute>
          <ProtectedRoute
            exact
            path="/@profile/:user_id/watchlists/:watchlist_id"
          ></ProtectedRoute>
          <ProtectedRoute
            exact
            path="/@profile/:user_id/transactions"
          ></ProtectedRoute>
          <Handle404 />
        </Switch>
      )}
      <Footer />
    </div>
  );
}

export default App;
