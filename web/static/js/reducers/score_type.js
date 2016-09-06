// web/static/js/reducers/properties.js
import {UPDATE_SCORE_TYPE, SCORE_FASHION} from "../actions";

const initialState = [];

export default function score_type(state = SCORE_FASHION, action = {}) {
  switch (action.type) {
    case UPDATE_SCORE_TYPE:
      return action.scoreType;
    default:
      return state;
  }
}