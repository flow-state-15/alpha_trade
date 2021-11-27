import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  NavLink,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import { login, logout, restoreUser } from "../../store/session";
import { loadPortfolios } from "../../store/portfolios";
import { loadWatchlists } from "../../store/watchlists";
import AuthModal from "../AuthModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [demo, setDemo] = useState(false);
  const user = useSelector((state) => state.session.user);

  const dispatchDemoLogin = () => {
    dispatch(
      login({ credential: "dougdemo@demodome.io", password: "password" })
    ).then(() => {
      return history.push("/@profile/1");
    });
    setDemo(true);
  };

  function loginClick() {
    history.push("/login");
    return <Redirect to="/login" />;
  }

  function signupClick() {
    history.push("/signup");
  }

  const onLogout = async (e) => {
    await dispatch(logout());
    history.push("/");
  };

  const enterApp = async () => {
    if (user) {
      await dispatch(restoreUser());
      history.push("/@profile/:userId");
    } else {
      history.push("/login");
    }
  };

  useEffect(() => {
    dispatch(loadPortfolios(user?.id));
    dispatch(loadWatchlists(user?.id));
  }, []);

  return (
    <>
      <nav className="navbar">
        <div>
          <NavLink
            exact
            to="/"
            style={{ textDecoration: "none" }}
            className="home-icon-container"
          >
            <span className="logo-text">AlphaTrade</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={50}
              height={50}
              viewBox="0 0 500 500"
              className="home-icon"
            >
              <path d="M214.5 73.7c-18.3 2.2-36 7-52.5 14.3-11.1 4.9-30.1 16.1-41.9 24.7-15.3 11.1-54 50.8-56.8 58.3-.4.8-3.1 5.2-6.2 9.8-9.9 14.7-12 18.4-20.2 34.7C24.8 239.6 21.3 250.2 17 275c-1.9 10.6-1.2 28.3 1.5 41.9 2.9 14.3 3.4 15.7 8.6 26.3 10.4 21 35.9 45.6 55 53 25.7 9.9 38 12.3 59.9 11.5 21.3-.8 42.9-5 72.2-14.2 9.4-3 37.4-16.7 48.4-23.8 29.8-19.1 37.8-25.4 57.9-45.7 16.9-17 28.3-30.3 33.1-38.7 1.5-2.6 5.1-8 8-11.8 6.9-9.3 32.1-47.7 35.4-54 1.5-2.7 6.6-11.1 11.3-18.5 14.5-22.8 26.5-42.4 29.9-48.9 1.8-3.3 8.9-15.4 15.8-26.7 17.5-28.8 25-41.5 25-42.4 0-.7-50.7-2-75-2l-13.5.1-17.4 26.3c-9.6 14.5-18.2 28-19.2 30.1-1 2-2.9 5.2-4.3 7-1.4 1.7-8.3 11.9-15.5 22.6-7.2 10.7-14.7 21.6-16.6 24.4-2 2.7-4.2 6.3-4.9 8-1.3 2.9-8.6 13.5-29.6 43.1-5.8 8.2-11.7 16.9-13.1 19.4-1.5 2.5-3.7 5.6-5.1 7-1.3 1.4-5.7 6.8-9.8 12-23.3 30-42 48.8-66.1 66.4-8.5 6.1-24.1 12.6-36.8 15.2-16.9 3.4-30.8-.2-41.2-10.6-4.9-4.9-9.3-14.6-12.5-27.2-2.1-8.7-2.9-31.2-1.5-42.3 1.3-9.9 7-32.9 10.3-41.5 3.7-9.7 21.8-44.7 27.7-53.7 3.2-4.9 7.6-12 9.9-16 9.1-16.1 25.2-34.5 37.7-43.1 18.1-12.4 30.8-17.5 43.5-17.6 16.2-.2 23.1 5.3 38.3 30.6 2.6 4.2 5.2 8.9 5.8 10.5.9 2.5 11.9 28.7 15.4 36.8.7 1.6 2.1 5.6 3.1 8.7 1 3.2 2.1 5.8 2.5 5.8.4 0 2.9-2.8 5.6-6.2 2.6-3.5 6.7-8.5 9.1-11.1 2.3-2.7 5.4-6.7 6.9-8.9 3.4-5.5 19.6-26.3 24.1-31l3.5-3.7-1.8-4.8c-4.9-13.1-12.1-24-22-33.6-16.8-16.3-36.4-25.5-62-29.2-9-1.3-32.2-1.8-40-.8zM368.4 286.1c-7.1 8.5-13.8 16.7-14.9 18.4-1 1.6-4.4 5.7-7.5 9-3.1 3.3-8 8.8-10.9 12.3l-5.3 6.2 3.2 9.3c4.1 11.6 5 13.7 11.6 27.2 5.7 11.9 9.8 16.8 18.2 22.2 8.4 5.4 28.1 11.4 43.7 13.2 19.9 2.4 32.1.9 50.4-6 12.2-4.7 17.1-7.8 26.4-16.8l6.7-6.5v-8c0-7.5-.1-7.8-1.7-6.4-7.4 6.6-35.2 10.1-48.4 6.2-14.3-4.3-24.8-12.4-32.3-25.1-5.9-10-10.2-20.9-18.9-47.7l-7.4-22.8-12.9 15.3z" />
            </svg>
          </NavLink>
        </div>
        <div className="nav-button-wrap">
          {/* {user ? <Redirect to={`/@profile/${user.id}`} /> : null} */}
          {user ? (
            <>
              {location.pathname === "/" && (
                <button className="nav-bar-buttons" onClick={enterApp}>
                  Enter App
                </button>
              )}
              <button className="nav-bar-buttons" onClick={onLogout}>
                Logout
              </button>
            </>
          ) : (
            <div className="nav-button-wrap">
              <button className="nav-bar-buttons" onClick={dispatchDemoLogin}>
                Demo User
              </button>
              {/* <button
                className="nav-bar-buttons"
                onClick={() => loginClick()}
                exact={true}
                activeClassName="active"
              >
                Login
              </button>
              <button
                className="nav-bar-buttons"
                onClick={() => signupClick()}
                exact={true}
                activeClassName="active"
              >
                Sign Up
              </button> */}
              <AuthModal />
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navigation;
