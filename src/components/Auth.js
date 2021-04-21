import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/userReducer";
import Header from "./Header";
import axios from "axios";

function Auth(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const dispatch = useDispatch();

  function register() {
    axios
      .post("/api/auth/register", { username, password })
      .then((res) => {
        props.history.push("/");
        dispatch(updateUser(res.data));
      })
      .catch((err) => {
        console.log(err);
        setErrMsg("Username Taken!");
      });
  }

  function login() {
    axios
      .post("/api/auth/login", { username, password })
      .then((res) => {
        props.history.push("/");
        // console.log(res.data);
        dispatch(updateUser(res.data));
      })
      .catch((err) => {
        console.log(err);
        setErrMsg("Username/Password doesn't match!");
      });
  }

  return (
    <div className="auth">
      <Header />
      <div className="auth-container">
        {/* <img src={logo} alt="logo" />
        <h1 className="auth-title">Helo</h1>
        {errMsg && (
          <h3 className="auth-error-msg">
            {errMsg}{" "}
            <span onClick={this.closeErrorMessage}>X</span>
          </h3>
        )} */}
        <div className="auth-input-box">
          <p>Username:</p>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="auth-input-box">
          <p>Password:</p>
          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="auth-button-container">
          <button className="dark-button" onClick={login}>
            {" "}
            Login{" "}
          </button>
          <button className="dark-button" onClick={register}>
            {" "}
            Register{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
