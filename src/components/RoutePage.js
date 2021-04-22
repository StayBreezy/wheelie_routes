import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet-gpx";
import Header from "./Header";
import { v4 as randomString } from "uuid";
import "../App.css";
import axios from "axios";
import Dropzone from "react-dropzone";
import { GridLoader } from "react-spinners";

export default function Route(props) {
  const { id } = props.match.params;
  const [gpx, setGpx] = useState("");
  const [route, setRoute] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .post(`/api/getRoute/${id}`)
      .then((res) => {
        setGpx(res.data[0].gpx);
        setRoute(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (gpx !== "") {
      var map = L.map("map", {
        zoomControl: false,
        scrollWheelZoom: true,
      });
      L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          'Map data &copy; <a href="http://www.osm.org">OpenStreetMap</a>',
      }).addTo(map);
      // URL to your GPX file or the GPX itself
      new L.GPX(gpx, { async: true })
        .on("loaded", function (e) {
          map.fitBounds(e.target.getBounds());
        })
        .addTo(map);
    }
  }, [gpx]);

  const [isUploading, setUploading] = useState(false);
  const [url, setUrl] = useState("");

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
        if (err.response.status === 403) {
          alert(
            `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${err.stack}`
          );
        } else {
          alert(`ERROR: ${err.status}\n ${err.stack}`);
        }
      });
  };

  const isTrue = (thing) => {
    if (thing) {
      return "Yes";
    } else {
      return "No";
    }
  };

  return (
    <div>
      {console.log(id)}
      {console.log(route)}
      {/* {console.log(routes)} */}
      <Header />
      <div className="routeH1">
      <h1 className="routePageH1">{route.name}</h1>
      </div>
      <div className="bigMap">
        <div id="map" className="bigMap"></div>
      </div>
      <div className="routePageInfo">
        <h2>Route Info:</h2>
        <div className="routePageInfoInfo">
      <p>Distance: {route.distance}mi</p>
      <p>Vertical Gain: {route.vertical_gain}ft</p>
      <p>Recommended Bike: {route.recommended_bike}</p>
      <p>Water: {isTrue(route.water)}</p>
      <p>Shops: {isTrue(route.shops)}</p>
        </div>
      </div>
      {/* <div>General recommendations</div> */}
      {/* <h3>Add imgs</h3>
      <Dropzone
        onDropAccepted={getSignedRequest}
        accept="image/*"
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
      </Dropzone> */}
      {/* <div className="comments">
        <h2>Comments</h2>
        {comments.map(e => {
          return
          <div className="comment">
            <p>{e.comment}</p>
            <p>{e.user_id}</p>
          </div> */}
        {/* })} */}
      {/* </div> */}
    </div>
  );
}
