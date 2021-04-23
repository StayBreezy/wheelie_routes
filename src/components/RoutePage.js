import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet-gpx";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import { v4 as randomString } from "uuid";
import "../App.css";
import { Link, useHistory } from "react-router-dom";

import axios from "axios";
import Dropzone from "react-dropzone";
import { GridLoader } from "react-spinners";

export default function Route(props) {
  const { id } = props.match.params;
  const [gpx, setGpx] = useState("");
  const [route, setRoute] = useState({});
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const userState = useSelector((state) => state.userReducer);
  // const {user_id} = userState.id;
  const [route_id, setRouteId] = useState("");
  const [nameChange, setNameChange] = useState("");
  const [isEditing, setEditing] = useState(false);
  const history = useHistory();

  useEffect(() => {
    axios
      .post(`/api/getRoute/${id}`)
      .then((res) => {
        setGpx(res.data[0].gpx);
        setRoute(res.data[0]);
        setRouteId(res.data[0].route_id);
      })
      .catch((err) => console.log(err));
  }, []);

  //   useEffect(() => {
  // axios.post("/api/getComments", {route_id})
  // .then(res => {
  //   setComments(res.data)
  // })
  //   }, [route_id])

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

  const handleEdit = () => {
    setEditing(true);
  };
  const handleSubmitEdit = () => {
    axios.put("/api/editRouteName", { nameChange, route_id }).then((res) => {
      setRoute(res.data[0]);
      setEditing(false);
    });
  };

  const handleDelete = () => {
    axios.delete(`/api/deleteRoute/${route_id}`).then((res) => {
      history.push("/");
    });
  };

  // const handleClick = () => {
  //   axios.post('/api/postComment', {comment, user_id, route_id})
  //   .then(res =>{
  //     setComments(res.data)
  //   })
  // }

  return (
    <div>
      {console.log(route_id)}
      {console.log(route)}
      {/* {console.log(routes)} */}
      <Header />
      <div className="routeH1">
        <h1 className="routePageH1">{route.name}</h1>
      </div>
      <div className="bigMap">
        <div id="map" className="bigMap"></div>
      </div>
      <button
        onClick={() => handleEdit()}
        className={userState.id === route.user_id ? "deleteBtn" : "noDisplay"}
      >
        Edit
      </button>
      <input
        type="text"
        onChange={(e) => setNameChange(e.target.value)}
        className={isEditing ? "" : "noDisplay"}
      />
      <button
        className={isEditing ? "" : "noDisplay"}
        onClick={() => handleSubmitEdit()}
      >
        Submit
      </button>
      <button
        className={userState.id === route.user_id ? "deleteBtn" : "noDisplay"}
        onClick={() => handleDelete()}
      >
        DELETE
      </button>
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
      {/* <div>
        <h2>Comments:</h2>
        <div className="commentSec">
        <textarea onChange={e => setComment(e.target.value)}className="commentInput" id="comment" name="comment" />
        <button className={userState.isLoggedIn ? "postBtn" : "noPostBtn"} onClick={()=> handleClick()}>Post</button>
        <p className={userState.isLoggedIn ? "noPostBtn" : ""}>Must be Logged in to Post</p>
        {comments.map(e => {
          <p>{e.comment}</p>
          <p>by: {e.user_id}</p>
        })}
        </div>
      </div> */}
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
