import axios from 'axios';

/*
 * Constants used across App
 */

/*
 * API Endpoints
 */
const endpoint = "/api/"
const load_properties_endpoint = endpoint + "properties";
const load_property_endpoint = endpoint + "property";

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

export function receiveProperties(properties) {
  return {type: RECEIVE_PROPERTIES, properties};
}

/*
 * Property Types & Actions
 */
 export const RECEIVE_PROPERTY = 'RECEIVE_PROPERTY';

export function loadProperty(propertyId) {
  return function(dispatch) {
    return axios.get(`${load_property_endpoint}/${propertyId}`).then(response => {
      dispatch(receiveProperty(response.data.property));
    }).catch(response => {
      console.error(response);
    });
  }
}

export function receiveProperty(property) {
  return {type: RECEIVE_PROPERTY, property};
}
