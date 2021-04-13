import { createStore, combineReducers } from "redux";
import routeReducer from "./routeReducer";
import pictureReducer from "./pictureReducer";
import userReducer from "./userReducer";

const allReducers = combineReducers({
  routes: routeReducer,
  pictures: pictureReducer,
  user: userReducer,
});
export default allReducers;
