import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import L from "leaflet";
import "../App.css";
import "leaflet-gpx";
import axios from "axios";
import { v4 as randomString } from "uuid";
import Dropzone from "react-dropzone";
import { GridLoader } from "react-spinners";
import Header from './Header';

export default function Upload(props) {
  const [isUploading, setUploading] = useState(false);
  const [url, setUrl] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [data, setData] = useState({});
  const [bike, setBike] = useState("");
  const [map, setMap] = useState("");
  const [water, setWater] = useState(false);
  const [shops, setShops] = useState(false);
  const [success, setSuccess] = useState(false);
  const [description, setDescription] = useState("");
  const state = useSelector(state => state.userReducer)

  const dispatch = useDispatch();

  useEffect(() => {
    setUploaded(true);
    if (url != "") {
      var map = L.map("map");
      L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          'Map data &copy; <a href="http://www.osm.org">OpenStreetMap</a>',
      }).addTo(map);
      new L.GPX(url, { async: true })
        .on("loaded", function (e) {
          map.fitBounds(e.target.getBounds());
          setData({
            distanceM: e.target.get_distance() / 1000,
            vertical_gainM: e.target.get_elevation_gain(),
            distanceI: e.target.get_distance_imp(),
            vertical_gainI: e.target.get_elevation_gain_imp(),
          });
        })
        .addTo(map);
    }
  }, [url]);
  const getSignedRequest = ([file]) => {
    setUploading(true);

    const fileName = `${randomString()}-${file.name.replace(/\s/g, "-")}`;

    axios
      .get("/api/signs3", {
        params: {
          "file-name": fileName,
          "file-type": file.type,
        },
      })
      .then((response) => {
        const { signedRequest, url } = response.data;
        uploadFile(file, signedRequest, url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadFile = (file, signedRequest, url) => {
    const options = {
      headers: {
        "Content-Type": file.type,
      },
    };

    axios
      .put(signedRequest, file, options)
      .then((response) => {
        setUploading(false);
        setUrl(url);
        // THEN DO SOMETHING WITH THE URL. SEND TO DB USING POST REQUEST OR SOMETHING
      })
      .catch((err) => {
        setUploading(false);
        console.log(err);
      });
  };

  function handleClick() {
    axios
      .post("/api/uploadroute", { url, data, bike, water, shops, description })
      .then((res) => setSuccess(true))
      .catch((err) => console.log(err));
  }

  return (
    <div className="App">
      {console.log(state.isLoggedIn)}
      <Header />
      <h1>Upload Route</h1>
      <Dropzone
        onDropAccepted={getSignedRequest}
        accept=".gpx"
        multiple={false}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              position: "relative",
              width: 160,
              height: 80,
              borderWidth: 5,
              marginTop: 25,
              borderColor: "gray",
              borderStyle: "dashed",
              borderRadius: 5,
              display: "inline-block",
              fontSize: 17,
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {isUploading ? (
              <GridLoader />
            ) : (
              <p>Drop files here, or click to select files</p>
            )}
          </div>
        )}
      </Dropzone>
      <div>
        <p>{`Distance(ft/m): ${data.distanceI}/${data.distanceM}`}</p>
        <p>{`Vertical Gain(ft/m): ${data.vertical_gainI}/${data.vertical_gainM}`}</p>
        <form>
          <p>Recommended Bike</p>
          <input
            type="radio"
            value="MTB"
            id="MTB"
            onChange={() => setBike("MTB")}
            name="bike"
          />
          <label for="MTB">MTB</label>

          <input
            type="radio"
            value="GRAVEL"
            id="GRAVEL"
            onChange={() => setBike("GRAVEL")}
            name="bike"
          />
          <label for="GRAVEL">GRAVEL</label>

          <input
            type="radio"
            value="ROAD"
            id="ROAD"
            onChange={() => setBike("ROAD")}
            name="bike"
          />
          <label for="ROAD">ROAD</label>
        </form>
        <form>
          <p>Water on Route</p>
          <input
            type="radio"
            value="true"
            id="true"
            onChange={() => setBike(true)}
            name="bike"
          />
          <label for="true">True</label>

          <input
            type="radio"
            value="false"
            id="false"
            onChange={() => setBike(false)}
            name="bike"
          />
          <label for="false">false</label>
        </form>
        <p>Description (max: 300 characters)</p>
        <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
<button onClick={() => handleClick()}>Submit</button>
        <div id="map"></div>
      </div>
    </div>
  );
}
