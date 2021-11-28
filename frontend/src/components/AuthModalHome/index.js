import { useState, useEffect } from "react";
import { Modal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "../AuthModal/AuthModal.css";

export default function AuthModalHome() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [toggle, setToggle] = useState(true);
  const user = useSelector((state) => state.session?.user);

  useEffect(() => {
    if (user) history.push(`/@profile/${user.id}`);
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors([]);
    await setCredential("");
    await setPassword("");
    const fetchedUser = await dispatch(
      sessionActions.login({ credential, password })
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
    if(fetchedUser?.id) history.push(`/@profile/${fetchedUser.id}`);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      const fetchedUser = await dispatch(
        sessionActions.signup({ email, password })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
      if(fetchedUser?.id) history.push(`/@profile/${fetchedUser.id}`);
    }
    return setErrors(["Passwords must match"]);
  };

  const dispatchDemoLogin = () => {
    dispatch(
      sessionActions.login({
        credential: "dougdemo@demodome.io",
        password: "password",
      })
    ).then(() => {
      return history.push("/@profile/1");
    });
    // setDemo(true);
  };

  return (
    <>
      <button className="nav-bar-buttons home-buttons" onClick={() => setShowModal(true)}>
        Enter AlphaTrade
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="auth-modal-wrapper">
            <h1>Welcome to AlphaTrade</h1>
            <h2>{toggle ? "Login" : "Signup"}</h2>
            {toggle ? (
              <form onSubmit={handleLogin}>
                <ul>
                  {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                  ))}
                </ul>
                <label>Email</label>
                <input
                  type="text"
                  value={credential}
                  onChange={(e) => setCredential(e.target.value)}
                  required
                />
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button className="nav-bar-buttons btn-auth-demo" type="submit">
                  Log In
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignup}>
                <ul>
                  {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                  ))}
                </ul>
                <label>Email</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label>Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button className="nav-bar-buttons btn-auth-demo" type="submit">
                  Sign Up
                </button>
              </form>
            )}
            <div className="auth-toggle-phrase-wrap">
              <span>
                {toggle ? "Need an account?" : "Already have an account?"}
              </span>
              <button
                className="btn-auth-toggle"
                onClick={() => setToggle(!toggle)}
              >
                {toggle ? "Sign up!" : "Login!"}
              </button>
            </div>
            <div className="line-box-wrap">
              <div></div>
              <span>or</span>
              <div></div>
            </div>
            <div>Tour the app with a Demo User</div>
            <button
              className="nav-bar-buttons btn-auth-demo"
              onClick={dispatchDemoLogin}
            >
              Demo User
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
