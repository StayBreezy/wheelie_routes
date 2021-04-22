import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import L from "leaflet";
import "../App.css";
import "leaflet-gpx";
import axios from "axios";
import { v4 as randomString } from "uuid";
import Dropzone from "react-dropzone";
import { GridLoader } from "react-spinners";
import Header from "./Header";

export default function Upload(props) {
  const [isUploading, setUploading] = useState(false);
  const [url, setUrl] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [data, setData] = useState({});
  const [recommended_bike, setBike] = useState("");
  const [map, setMap] = useState("");
  const [water, setWater] = useState(false);
  const [shops, setShops] = useState(false);
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const state = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();
  const history = useHistory();

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
        initMap(url);
      })
      .catch((err) => {
        setUploading(false);
        console.log(err);
      });
  };

  function handleClick() {
    axios
      .post("/api/uploadroute", {
        url,
        data,
        recommended_bike,
        water,
        shops,
        name,
      })
      .then((res) => {
        setSuccess(true);
        history.push(`/route/${res.data[0].route_id}`)
      })
      .catch((err) => console.log(err));
  }

  function initMap(url) {
    var map = L.map("map");
    console.log(url);
    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data &copy; <a href="http://www.osm.org">OpenStreetMap</a>',
    }).addTo(map);
    new L.GPX(url, { async: true })
      .on("loaded", function (e) {
        map.fitBounds(e.target.getBounds());
        setData({
          distanceM: parseFloat(e.target.get_distance() / 1000).toFixed(2),
          vertical_gainM: parseFloat(e.target.get_elevation_gain()).toFixed(0),
          distanceI: parseFloat(e.target.get_distance_imp()).toFixed(2),
          vertical_gainI: parseFloat(e.target.get_elevation_gain_imp()).toFixed(
            0
          ),
        });
      })
      .addTo(map);
  }

  return (
    <div className="App">
      {/* {console.log(recommended_bike)} */}
      {console.log()}
      {console.log()}
      {/* {console.log(state.isLoggedIn)} */}
      <Header />
      <h1>Step 1: Upload Route</h1>
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
              <p>Drop your .gpx here, or click to open file.</p>
            )}
          </div>
        )}
      </Dropzone>
      <div id="map" className="bigMap"></div>
      <div>
        <h1>Step 2: Info on Route</h1>
        <p>{`Distance(miles/kilometers): ${data.distanceI}/${data.distanceM}`}</p>
        <p>{`Vertical Gain(feet/meters): ${data.vertical_gainI}/${data.vertical_gainM}`}</p>
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
            onChange={() => setWater(true)}
            name="bike"
          />
          <label for="true">Yes</label>

          <input
            type="radio"
            value="false"
            id="false"
            onChange={() => setWater(false)}
            name="bike"
          />
          <label for="false">No</label>
        </form>
        <form>
          <p>Shops on Route</p>
          <input
            type="radio"
            value="true"
            id="true"
            onChange={() => setShops(true)}
            name="bike"
          />
          <label for="true">Yes</label>

          <input
            type="radio"
            value="false"
            id="false"
            onChange={() => setShops(false)}
            name="bike"
          />
          <label for="false">No</label>
        </form>
        <p>Name Route</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <h1>
          Step 3:
          <button className="submitBtn" onClick={() => handleClick()}>
            Submit
          </button>
        </h1>
      </div>
    </div>
  );
}
