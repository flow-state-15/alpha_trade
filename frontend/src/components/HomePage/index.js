import "./HomePage.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login, logout, restoreUser } from "../../store/session";
import AuthModalHome from "../AuthModalHome";

export default function HomePage() {
  const history = useHistory();
  const [demo, setDemo] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const dispatchDemoLogin = () => {
    dispatch(login("DougD@demo.dome", "DemoDome"));
    history.push("/1");
    setDemo(true);
  };

  function loginClick() {
    history.push("/login");
  }

  function signupClick() {
    history.push("/sign-up");
  }

  const onLogout = async (e) => {
    await dispatch(logout());
    history.push("/");
  };

  const enterApp = async () => {
    if (user) {
      await dispatch(restoreUser());
      history.push("/@profile/:userId");
    }
  };

  return (
    <div className="home-wrapper">
      <div className="banner-img-container">
        <img
          src="https://res.cloudinary.com/dan-purcell-2021/image/upload/v1637104657/robinhood_clone/home-background-1_p9cicp.webp"
          alt="banner-1"
        />
      <div className="home-text-overlay">
        <p>
          Trade in a simulated environment and view options data that is withheld from some popular brokers!<br/><br/> AlphaTrade can be used alongside your favorite chart analysis tools to get a feel for the market without signing up for a broker.
        </p>
      </div>
      </div>
      {user ? (
        <button className="nav-bar-buttons home-buttons" onClick={enterApp}>
        Enter AlphaTrade
      </button>
      ) : (
        <AuthModalHome />
      )}
    </div>
  );
}
