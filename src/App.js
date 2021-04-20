import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import { v4 as randomString } from "uuid";
import Dropzone from "react-dropzone";
import { GridLoader } from "react-spinners";
import Header from "./components/Header";
import routes from "./routes";
import Upload from "./components/Upload";
// import Filter from "./components/Filter";
import Footer from "./components/Footer";
import RoutePage from "./components/RoutePage";

function App() {
  return <div>{routes}</div>;
}

export default App;
