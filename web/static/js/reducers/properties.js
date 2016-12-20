// web/static/js/reducers/properties.js
import {RECEIVE_PROPERTIES} from "../actions";

const initialState = [];

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case RECEIVE_PROPERTIES:
      return action.properties;
    default:
      return state;
  }
}