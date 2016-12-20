// web/static/js/reducers/properties.js
import {RECEIVE_PROPERTY} from "../actions";

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case RECEIVE_PROPERTY:
      return action.property;
    default:
      return state;
  }
}