import "./HomePage.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { login, logout } from "../../store/session";

export default function HomePage() {
  const history = useHistory();
  const [demo, setDemo] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const dispatchDemoLogin = () => {
    dispatch(login("DougD@demo.dome", "DemoDome"));
    history.push('/1')
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
    history.push("/")
  };

  return (
    <div>
      <div className="banner-img-container">
          <img src="https://res.cloudinary.com/dan-purcell-2021/image/upload/v1637104657/robinhood_clone/home-background-1_p9cicp.webp" alt="banner-1" />
      </div>
    </div>
  );
}
