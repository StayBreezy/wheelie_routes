import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet-gpx";
import Header from "./Header";
import { v4 as randomString } from "uuid";
import axios from "axios";
import Dropzone from "react-dropzone";
import { GridLoader } from "react-spinners";

export default function Route(props) {
  const {id} = props.match.params.id;
  const [gpx, setGpx] = useState('');
  const [route, setRoute] = useState({})

  axios.get(`/api/getRoute/${id}`)
    .then(res => {
      setGpx(res.data.gpx);
     setRoute(res.data)
    })
    .catch(err => console.log(err))

  useEffect(() => {
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
        console.log(e.target.get_distance() / 1000);
      })
      .addTo(map);
  });

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

  return (
    <div>
      <Header />
      <div id="map" className="bigMap"></div>
      <p>distance</p>
      <p>vertical gain</p>
      <p>elapsed time</p>
      <p>recommended bike</p>
      <p>water</p>
      <p>shops</p>
      <div>General recommendations</div>
      <h3>Add imgs</h3>
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
      </Dropzone>
    </div>
  );
}
