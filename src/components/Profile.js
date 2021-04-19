import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";

export default function Profile(props) {
  const [routes, setRoutes] = useState([]);
  const { userId } = props.match.params.id;
  // const {user}

  useEffect(() => {
    axios
      .get("/api/getMyRoutes", userId)
      .then((res) => {
        setRoutes(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  });
  return (
    <div>
      <Header />
      <section>
        {/* <h1>{user.name}</h1> */}
        <div classname="personalRoutes">
          PERSONAL ROUTES
          {routes.map}
        </div>
      </section>
    </div>
  );
}
