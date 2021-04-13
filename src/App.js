import React, {useState} from 'react';
import './App.css';
import axios from 'axios';
import { v4 as randomString } from 'uuid';
import Dropzone from 'react-dropzone';
import { GridLoader } from 'react-spinners';
import Header from './components/Header';
import Upload from './components/Upload';
import Filter from './components/Filter';
import Footer from './components/Footer';

function App() {
    return <div>
        <Header />
        <Upload />
        <Filter />
        {/* {map over arr on state} */}
        <Footer />
    </div>;
  }

  export default App;
