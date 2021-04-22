import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { v4 as randomString } from "uuid";
import Dropzone from "react-dropzone";
import { GridLoader } from "react-spinners";
import Header from "./Header";
import Upload from "./Upload";
import AllRoutes from "./AllRoutes";
import Footer from "./Footer";
import Route from "./RoutePage";

function App(props) {




  return (
    <div className="mainApp">
      {console.log(props)}

      <Header />
      <AllRoutes />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
