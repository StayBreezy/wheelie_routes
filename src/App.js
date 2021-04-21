import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { v4 as randomString } from "uuid";
import Dropzone from "react-dropzone";
import { GridLoader } from "react-spinners";
import Header from "./components/Header";
import routes from "./routes";
import { useDispatch, useSelector } from "react-redux";

import {updateUser} from './redux/userReducer';
import Upload from "./components/Upload";
// import Filter from "./components/Filter";
import Footer from "./components/Footer";
import RoutePage from "./components/RoutePage";


function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    axios.get('/api/auth/me')
    .then(res =>
      dispatch(updateUser(res.data)))
  }, [])
  return <div className="mainApp">{routes}</div>;
}

export default App;
