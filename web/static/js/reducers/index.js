// web/static/js/reducers/index.js
import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import properties from "./properties";
import property from "./property";

export default combineReducers({
  routing: routerReducer,
  properties,
  property
});