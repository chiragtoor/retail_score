import axios from 'axios';

/*
 * Constants used across App
 */

export const SCORE_FASHION = 0;
export const SCORE_WELLNESS = 1;
export const SCORE_RESTAURANT = 2;

export const UPDATE_SCORE_TYPE = 'UPDATE_SCORE_TYPE';

export function updateScoreType(scoreType) {
  return {type: UPDATE_SCORE_TYPE, scoreType};
}

export function scoreByFashion() {
  return function (dispatch) {
    dispatch(updateScoreType(SCORE_FASHION));
  }
}
export function scoreByWellness() {
  return function (dispatch) {
    dispatch(updateScoreType(SCORE_WELLNESS));
  }
}
export function scoreByRestaurant() {
  return function (dispatch) {
    dispatch(updateScoreType(SCORE_RESTAURANT));
  }
}


export const SORT_RS = 0;
export const SORT_PRICE = 1;
export const SORT_SQ_FT = 2;

export function numberToString(number) {
  return number.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

/*
 * API Endpoints
 */
const endpoint = "/api/"
const load_properties_endpoint = endpoint + "properties";
const load_property_endpoint = endpoint + "property";
const send_message_url = endpoint + 'messages';

/*
 * State Management Types & Actions
 */
export const SSR_OFF = "SSR_OFF";
export function turnOffSSRFlag() {
  return {type: SSR_OFF, false};
}

/*
 * Properties Types & Actions
 */
 export const RECEIVE_PROPERTIES = 'RECEIVE_PROPERTIES';

export function loadProperties(city, state) {
  return function(dispatch) {
    return axios.get(`${load_properties_endpoint}?city=${city}&state=${state}`).then(response => {
      dispatch(receiveProperties(response.data.properties));
    }).catch(response => {
      console.error(response);
    });
  }
}

export function submitContact(data) {
  return function(dispatch) {
    axios.post(send_message_url, data).then(function (response) {
      console.log(response);
  }).catch(function (response) {
      console.error(response);
    });
  }
}

export function receiveProperties(properties) {
  return {type: RECEIVE_PROPERTIES, properties};
}

/*
 * Property Types & Actions
 */
 export const RECEIVE_PROPERTY = 'RECEIVE_PROPERTY';

export function loadProperty(propertyId) {
  return function(dispatch) {
    return axios.get(`${load_properties_endpoint}/${propertyId}`).then(response => {
      dispatch(receiveProperty(response.data.property));
    }).catch(response => {
      console.error(response);
    });
  }
}

export function receiveProperty(property) {
  return {type: RECEIVE_PROPERTY, property};
}
