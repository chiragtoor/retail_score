// web/static/js/reducers/index.js
import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import visitors from "./visitors";

export default combineReducers({
  routing: routerReducer,
  visitors
});