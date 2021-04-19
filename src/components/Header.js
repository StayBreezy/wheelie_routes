import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "../App.css";
import { Link } from "react-router-dom";

export default function Header(props){
  const userState = useSelector(state => state.userReducer)
  return (
    <div className="header">
      <Link to="/" className="noLinkLink">
        <h1>WheelieRoutes</h1>
      </Link>
      <nav className="nav">
        <p>Search</p>
        <Link to="/upload"><p>Upload</p></Link>
        {/* if no user then link to auth. if user link to profile and profile button */}
        <Link to="/login">
          <p>login</p>
        </Link>
        <Link to="/profile" className="noLinkLink profileImg"><p></p></Link>
      </nav>
    </div>
  );
};
