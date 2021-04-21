import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Header from "./Header";
import '../App.css'
import { Link } from "react-router-dom";

export default function Profile(props) {
  const [routes, setRoutes] = useState([]);
  const userState = useSelector((state) => state.userReducer);
  const [id, setId] = useState(null)

useEffect(()=>{
setId(userState.id)
},[])


  useEffect(() => {
    axios
      .post("/api/getMyRoutes", {id})
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

  return (
    <div>
      {console.log(routes)}
      <Header />
      <section>
        <h1>{userState.username}</h1>
        <div classname="personalRoutes">
          PERSONAL ROUTES
          {routes.map((e) => {
            return (
              <Link className="noLinkLink" to={`/route/${e.route_id}`}>
                <div className="route">
                  <h1>{e.name}</h1>
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
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
