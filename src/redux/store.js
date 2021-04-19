import { createStore, combineReducers } from "redux";
import routeReducer from "./routeReducer";
import pictureReducer from "./pictureReducer";
import {devToolsEnhancer} from 'redux-devtools-extension';
import userReducer from "./userReducer";

const allReducers = combineReducers({
  routeReducer,
  pictureReducer,
  userReducer,
});
export default createStore(allReducers, devToolsEnhancer());
