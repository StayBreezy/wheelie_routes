import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Header from "./Header";
import "../App.css";
import { Link } from "react-router-dom";

export default function Profile(props) {
  const [routes, setRoutes] = useState([]);
  const userState = useSelector((state) => state.userReducer);
  const [id, setId] = useState(null);

  useEffect(() => {
    setId(userState.id);
  }, []);

  useEffect(() => {
    axios
      .post("/api/getMyRoutes", { id })
      .then((res) => {
        setRoutes(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const isTrue = (thing) => {
    if (thing) {
      return "Yes";
    } else {
      return "No";
    }
  };

  // const s3delete = function (params) {
  //     return new Promise((resolve, reject) => {
  //       s3.createBucket({
  //           Bucket: BUCKET_NAME        /* Put your bucket name */
  //       }, function () {
  //           s3.deleteObject(params, function (err, data) {
  //               if (err) console.log(err);
  //               else
  //                   console.log(
  //                       "Successfully deleted file from bucket";
  //                   );
  //               console.log(data);
  //           });
  //       });
  //   });
  // };

  return (
    <div>
      {console.log(routes)}
      <Header />
      <section>
        <h1>{userState.username}'s Routes</h1>
        <div classname="personalRoutes">
          <div className="allRoutes">
            {routes.map((e) => {
              return (
                <Link className="noLinkLink" to={`/route/${e.route_id}`}>
                  <div className="route">
                    <div className="routeNameDiv">
                      <h1 className="routeName">{e.name}</h1>
                    </div>
                    <div className="routeInfo">
                      <div className="vars">
                        <p>Distance: {e.distance}</p>
                        <p>Vertical Gain:{e.vertical_gain}</p>
                      </div>
                      <div className="vars">
                        <p>Recommended Bike: {e.recommended_bike}</p>
                        <p>Water: {isTrue(e.water)}</p>
                        <p>Shops: {isTrue(e.shops)}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
