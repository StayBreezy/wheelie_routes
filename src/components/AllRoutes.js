import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {} from "../redux/routeReducer";
import axios from "axios";
import "../App.css";

export default function AllRoutes(props) {
  const [routes, setRoutes] = useState([]);
  const [filteredRoutes, setFilter] = useState([]);
  const [mtb, setMtb] = useState(false);
  const [gravel, setGravel] = useState(false);
  const [road, setRoad] = useState(false);
  const [water, setWater] = useState(false);
  const [shops, setShops] = useState(false);
  const [miles, setMiles] = useState(true);
  // const [submit, setSubmit] = useState(false)

  //   const routes = useSelector()

  useEffect(() => {
    axios.get("/api/getRoutes").then((res) => {
      setRoutes(res.data);
      setFilter(res.data);
    });
  }, []);

  function handleSubmit() {
    setFilter([]);
    if ((mtb && gravel && road) || (!mtb && !gravel && !road)) {
      setFilter(routes);
    } else if (mtb && !gravel && !road) {
      setFilter(
        routes.filter((e) => {
          return e.recommended_bike === "MTB";
        })
      );
    } else if (gravel && !mtb && !road) {
      return setFilter(
        routes.filter((e) => {
          return e.recommended_bike === "GRAVEL";
        })
      );
    } else if (road && !mtb && !gravel) {
      setFilter(
        routes.filter((e) => {
          return e.recommended_bike === "ROAD";
        })
      );
    } else if (mtb && gravel && !road) {
      setFilter(
        routes.filter((e) => {
          return (
            e.recommended_bike === "GRAVEL" || e.recommended_bike === "MTB"
          );
        })
      );
    } else if (mtb && !gravel && road) {
      setFilter(
        routes.filter((e) => {
          return e.recommended_bike === "ROAD" || e.recommended_bike === "MTB";
        })
      );
    } else if (!mtb && gravel && road) {
      setFilter(
        routes.filter((e) => {
          return (
            e.recommended_bike === "GRAVEL" || e.recommended_bike === "ROAD"
          );
        })
      );
    }
    if (water && shops) {
      setFilter(
        filteredRoutes.filter((e) => {
          return e.water === water && e.shops === shops;
        })
      );
    } else if (water) {
      setFilter(
        filteredRoutes.filter((e) => {
          return e.water === water;
        })
      );
    } else if (shops) {
      setFilter(
        filteredRoutes.filter((e) => {
          return e.shops === shops;
        })
      );
    }
  }

  const isTrue = (thing) => {
    if (thing) {
      return "Yes";
    } else {
      return "No";
    }
  };

  const mileSwitch = () =>{
    if(miles){
      return "mi"
    }else{
      return "km"
    }
  }

  const feetSwitch = () =>{
    if(miles){
      return "ft"
    }else {
      return "m"
    }
  }
  // search false show {routes}
  // search true show {filteredRoutes}

  return (
    <div className="body">
      {console.log(routes)}
      {console.log(mtb)}
      {console.log(filteredRoutes)}
      <div className="filter">
        <h3>Route Filters: </h3>
        {/* <input></input> */}
        {/* <div>
          <p>distance</p>
          <button>yes</button>
          <button>no</button>
        </div>
        <div>
          <p>Vertical Gain</p>
          <button>yes</button>
          <button>no</button>
        </div> */}
        <form>
          <p>Recommended Bike</p>
          <input
            type="checkbox"
            value="MTB"
            id="MTB"
            onChange={() => setMtb(!mtb)}
            name="bike"
          />
          <label for="MTB">Mtb</label>

          <input
            type="checkbox"
            value="GRAVEL"
            id="GRAVEL"
            onChange={() => setGravel(!gravel)}
            name="bike"
          />
          <label for="GRAVEL">Gravel</label>

          <input
            type="checkbox"
            value="ROAD"
            id="ROAD"
            onChange={() => setRoad(!road)}
            name="bike"
          />
          <label for="ROAD">Road</label>
        </form>
        <div>
          <input
            type="checkbox"
            value="WATER"
            id="WATER"
            onChange={() => setWater(!water)}
            name="water"
          />
          <label for="WATER">Has water?</label>
        </div>
        <div>
          <input
            type="checkbox"
            value="SHOPS"
            id="SHOPS"
            onChange={() => setShops(!shops)}
            name="SHOPS"
          />
          <label for="SHOPS">Has shops?</label>
        </div>
        <button onClick={() => handleSubmit()}>Search</button>
      </div>
      <div className="allRoutes">
        {filteredRoutes.map((e) => {
          return (
            <Link className="noLinkLink" to={`/route/${e.route_id}`}>
              <div className="route">
                <div className="routeNameDiv">
                <h1 className="routeName">{e.name}</h1>
                </div>
                <div className="routeInfo">
                <div className="vars">
                  <p>Distance: {e.distance}{mileSwitch()}</p>
                  <p>Vertical Gain:{e.vertical_gain}{feetSwitch()}</p>
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
  );
}
