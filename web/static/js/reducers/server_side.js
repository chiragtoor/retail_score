// web/static/js/reducers/server_side.js
import {SSR_OFF} from "../actions";

const initialState = false;

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "SERVER_SIDE_INIT":
      return action.server_side;
    case SSR_OFF:
      return false;
    default:
      return state;
  }
}