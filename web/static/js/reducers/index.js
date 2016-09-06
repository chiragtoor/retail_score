// web/static/js/reducers/index.js
import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import properties from "./properties";
import property from "./property";
import server_side from "./server_side";
import score_type from "./score_type";

export default combineReducers({
  routing: routerReducer,
  server_side,
  properties,
  property,
  score_type
});