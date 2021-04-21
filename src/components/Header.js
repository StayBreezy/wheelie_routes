import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "../App.css";
import { Link, useHistory } from "react-router-dom";
import { updateUser, logout } from "../redux/userReducer";

export default function Header(props) {
  const userState = useSelector((state) => state.userReducer);
  const history = useHistory();
  const dispatch = useDispatch()



  const handleClick = () =>{
if(!userState.isLoggedIn){
alert("Login to upload")
}else {
history.push('/upload')
}
  }

  const handleLogout = () => {
    dispatch(logout())
  }


  if(userState.isLoggedIn){
    return <div className="header">
    {console.log(userState)}
    <Link to="/" className="noLinkLink">
      <h1>WheelieRoutes</h1>
    </Link>
    <nav className="nav">
      <Link to="/"><p>Search</p></Link>
      <Link to="/upload">
        <p className="pLink" onClick={() => handleClick()}>Upload</p>
      </Link>
      {/* if no user then link to auth. if user link to profile and profile button */}
       <p className="pLink" onClick={() => handleLogout()}>logout</p>
      <Link to={`/profile/${userState.username}`} className="noLinkLink profileImg">
        <p>Profile</p>
      </Link>
    </nav>
  </div>
  }
  return (
    <div className="header">
      {console.log(userState)}
      <Link to="/" className="noLinkLink">
        <h1>WheelieRoutes</h1>
      </Link>
      <nav className="nav">
        <p>Search</p>
          <p onClick={() => handleClick()}>Upload</p>
        {/* if no user then link to auth. if user link to profile and profile button */}
        <Link to="/login" className="noLinkLink">
         <p >login</p>
        </Link>
        <Link to="/profile" className="noLinkLink profileImg">
          <p>Profile</p>
        </Link>
      </nav>
    </div>
  );
}
