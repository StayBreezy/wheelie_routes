import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { v4 as randomString } from "uuid";
import Dropzone from "react-dropzone";
import { GridLoader } from "react-spinners";
import Header from "./Header";
import Upload from "./Upload";
import Filter from "./Filter";
import Footer from "./Footer";
import RoutePage from "./RoutePage";

function App() {
  return (
    <div>
      <Header />
      <Filter />
      <RoutePage />
      <Footer />
    </div>
  );
}

export default App;
