import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authInstance } from "../../utils/APIRoutes";
import "./AuthStyles.scss";

const Auth = () => {
  //State
  const [signIn, setSignIn] = useState(true);
  //Sign up
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //Sign in
  const [loginUser, setLoginUser] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  //Errors
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginUsernameError, setLoginUsernameError] = useState(false)
  const [loginPasswordError, setLoginPasswordError] = useState(false)

  useEffect(() => {
    const verifySession = async() => {
      const data = await JSON.parse(localStorage.getItem('current'))
      if(data){
        navigate('/')
      }
    } 
    verifySession()
  },[])

  //functions
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!(username.length >= 3 && username.length <= 20)) {
      return setUsernameError(true);
    } else {
      setUsernameError(false);
    }

    if (password.length < 8) {
      return setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    const data = {
      username,
      email,
      password,
    };

    try {
      const response = await authInstance.post("/register", data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("current", JSON.stringify(response.data.user));
      // console.log(JSON.parse(localStorage.getItem("current")));
      navigate("/setavatar");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const data = {
      username: loginUser,
      password: loginPassword,
    };
    try {
      const response = await authInstance.post("/login", data);
      // console.log(response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("current", JSON.stringify(response.data.user));
      navigate("/");
    } catch (error) {
      const {status} = error.response
      if(status === 404){
        setLoginUsernameError(true)
      }else{
        setLoginUsernameError(false)
      }
      
      if(status === 401){
        setLoginPasswordError(true)
      }else{
        setLoginPasswordError(false)
      }
    }
  };

  return (
    <section className="auth">
      <div className="auth-container">
        {/* Sign Up */}
        <div
          className="sign-up"
          style={{
            transform: !signIn && "translateX(100%)",
            opacity: !signIn && "1",
            zIndex: !signIn && "5",
          }}
        >
          <form onSubmit={(e) => handleSignUp(e)}>
            <h1>Create account</h1>
            <input
              type="text"
              placeholder="Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input type="submit" value="Sign up" className="auth-button" />

            <div
              className="auth-error"
              style={{
                display: usernameError || passwordError ? "block" : "none",
              }}
            >
              <p style={{ display: usernameError ? "block" : "none" }}>
                Username must contain 3-22 characters.
              </p>
              <p style={{ display: passwordError ? "block" : "none" }}>
                Password too short, must have at least 8 characters.
              </p>
            </div>
          </form>
        </div>

        <div
          className="sign-in"
          style={{ transform: !signIn && "translateX(100%)" }}
        >
          <form onSubmit={(e) => handleSignIn(e)}>
            <h1> Sign in to ChatFrenzy </h1>
            <input
              type="text"
              placeholder="Name"
              value={loginUser}
              onChange={(e) => setLoginUser(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            {/* <Link className="anchor" to="/">
              Forgot your password?
            </Link> */}
            <input type="submit" value="Sign in" className="auth-button" />
            <div
              className="auth-error"
              style={{
                display: loginUsernameError || loginPasswordError ? "block" : "none",
              }}
            >
              <p style={{ display: loginUsernameError ? "block" : "none" }}>
                Username not found.
              </p>
              <p style={{ display: loginPasswordError ? "block" : "none" }}>
                Incorrect password.
              </p>
            </div>
            
          </form>
        </div>

        <div
          className="OverlayContainer"
          style={{ transform: !signIn && "translateX(-100%)" }}
        >
          <div
            className="Overlay"
            style={{ transform: !signIn && "translateX(50%)" }}
          >
            <div
              className="OverlayPanel LeftOverlayPanel"
              style={{ transform: !signIn && "translateX(0)" }}
            >
              <h1>Let the chatting begin!</h1>
              <p>
                {" "}
                Sign in to ChatFrenzy
              </p>
              <button className="GhostButton" onClick={() => setSignIn(true)}>
                {" "}
                Sign In{" "}
              </button>
            </div>

            <div
              className="OverlayPanel RightOverlayPanel"
              style={{ transform: !signIn && "translateX(20%)" }}
            >
              <h1>Join the Frenzy</h1>
              <p>Sign Up for ChatFrenzy today!</p>
              <button className="GhostButton" onClick={() => setSignIn(false)}>
                {" "}
                Sign Up{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;
