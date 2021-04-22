import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import "../App.css";
import { Link, useHistory } from "react-router-dom";
import { updateUser, logout } from "../redux/userReducer";

export default function Header(props) {
  const userState = useSelector((state) => state.userReducer);
  const history = useHistory();
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false)

  const handleClick = () => {
    if (!userState.isLoggedIn) {
      alert("Login to upload");
    } else {
      history.push("/upload");
    }
  };

  const menu = () => {
    if(isOpen){
      if(userState.isLoggedIn){

        return <nav className="nav navSmall">
        <button className="noBtnBtn" onClick={() => setOpen(false)}>X</button>
      <div className="navLinks">

      <Link to="/" className="noLinkLink">
        <p>Search</p>
      </Link>
      <Link className="noLinkLink" to="/upload">
        <p  onClick={() => handleClick()}>
          Upload
        </p>
      </Link>
      {/* if no user then link to auth. if user link to profile and profile button */}
      <Link className="noLinkLink"><p onClick={() => handleLogout()}>
        logout
      </p></Link>
      <Link
        to={`/profile/${userState.username}`}
        className="noLinkLink profileImg"
        >
        <p>Profile</p>
      </Link>
        </div>
    </nav>
        } else {
          return <nav className="nav navSmall">
          <Link to="/" className="noLinkLink">
            <p>Search</p>
          </Link>
          <Link to="/upload">
            <p className="pLink" onClick={() => handleClick()}>
              Upload
            </p>
          </Link>
          {/* if no user then link to auth. if user link to profile and profile button */}
          <p className="pLink" onClick={() => handleLogout()}>
            logout
          </p>
          <Link
            to={`/profile/${userState.username}`}
            className="noLinkLink profileImg"
          >
            <p>Profile</p>
          </Link>
        </nav>
        }
    } else {
      return <button className="menuBtn" onClick={() => setOpen(true)}><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-menu-2" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg></button>
    }
    }

  const handleLogout = () => {
    dispatch(logout());
  };

  if (userState.isLoggedIn) {
    return (
      <div className="header">
        {console.log(userState)}
        <Link to="/" className="noLinkLink">
          <h1 className="mainHeader">WheelieRoutes</h1>
        </Link>
        {menu()}
        <nav className="nav navBig">
          <Link to="/" className="noLinkLink">
            <p>Search</p>
          </Link>
          <Link to="/upload">
            <p className="pLink" onClick={() => handleClick()}>
              Upload
            </p>
          </Link>
          {/* if no user then link to auth. if user link to profile and profile button */}
          <p className="pLink" onClick={() => handleLogout()}>
            logout
          </p>
          <Link
            to={`/profile/${userState.username}`}
            className="noLinkLink profileImg"
          >
            <p>Profile</p>
          </Link>
        </nav>
      </div>
    );
  }
  return (
    <div className="header">
      {console.log(userState)}
      <Link to="/" className="noLinkLink">
        <h1 className="mainHeader">WheelieRoutes</h1>
      </Link>
      {menu()}
      <nav className="nav navBig">
          <Link to="/" className="noLinkLink">
            <p>Search</p>
          </Link>
          <Link to="/upload">
            <p className="pLink" onClick={() => handleClick()}>
              Upload
            </p>
          </Link>
          {/* if no user then link to auth. if user link to profile and profile button */}
          <p className="pLink" onClick={() => handleLogout()}>
            logout
          </p>
          <Link
            to={`/profile/${userState.username}`}
            className="noLinkLink profileImg"
          >
            <p>Profile</p>
          </Link>
        </nav>

    </div>
  );
}
