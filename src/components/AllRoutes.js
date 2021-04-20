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

  //   const routes = useSelector()

  useEffect(() => {
    axios.get("/api/getRoutes").then((res) => {
      // setRoutes(res.data);
      // setFilter(res.data);
      if(mtb){
       res =  routes.filter
       filteredRoutes.push(res)
      }
    });
  }, []);

  function filterBike(bike){
    setFilter(filteredRoutes.filter(e => e.recommended_bike === bike))
  }

  function clearSearch(){
    setFilter(routes);
  }

  // search false show {routes}
  // search true show {filteredRoutes}

  return (
    <div className="body">
      {console.log(routes)}
      {console.log(mtb)}
      {console.log(filteredRoutes)}
      <div className="filter">
        <h3>filter&search</h3>
        <input></input>
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
          <label for="MTB">MTB</label>

          <input
            type="checkbox"
            value="GRAVEL"
            id="GRAVEL"
            onChange={() => filterBike("GRAVEL")}
            name="bike"
          />
          <label for="GRAVEL">GRAVEL</label>

          <input
            type="checkbox"
            value="ROAD"
            id="ROAD"
            onChange={() => filterBike("ROAD")}
            name="bike"
          />
          <label for="ROAD">ROAD</label>
        </form>
        <div>
        <input
            type="checkbox"
            value="WATER"
            id="WATER"
            onChange={() => filterBike("WATER")}
            name="water"
          />
           <label for="WATER">Water</label>
        </div>
        <div>
          <p>water</p>
          <button>yes</button>
          <button>no</button>
        </div>
        <button onClick={()=> clearSearch()}>Clear Search</button>
        <button>Search</button>
      </div>
      <div className="allRoutes">
        {filteredRoutes.map((e) => {
          return(

            <Link className="noLinkLink" to={`/route/${e.route_id}`}>
            <div className="route">
              <h1>NAME</h1>
              <div>
                <p>{e.distance}</p>
                <p>{e.vertical_gain}</p>
                <p>{e.recommended_bike}</p>
                <p>{e.water}</p>
                <p>{e.shops}</p>
              </div>
            </div>
          </Link>
            )
        })}
      </div>
    </div>
  );
}
