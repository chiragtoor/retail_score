import axios from 'axios';

/*
 * Constants used across App
 */
export const BOOKED_LOADS = "booked";
export const ASSIGNED_LOADS = "assigned";
export const CURRENT_LOADS = "current";
export const PAY_PENDING_LOADS = "pay-pending";
export const FULL_HISTORY_LOADS = "history";

/*
 * API Endpoints
 */
export const endpoint = '/';
//export const endpoint = 'http://localhost:4000/api/';
export const drivers_url = endpoint + 'drivers';
export const brokers_url = endpoint + 'brokers';
export const trucks_url = endpoint + 'trucks';
export const trailers_url = endpoint + 'trailers';
export const create_load_url = endpoint + 'truck-loads';
export const update_load_url = endpoint + 'truck-loads/';
export const load_load_info_url = endpoint + 'truck-loads/';
export const booked_loads_url = endpoint + 'truck-loads?type=booked';
export const assigned_loads_url = endpoint + 'truck-loads?type=assigned';
export const current_loads_url = endpoint + 'truck-loads?type=current';
export const pending_pay_loads_url = endpoint + 'truck-loads?type=pending-pay';
export const all_loads_url = endpoint + 'truck-loads';
export const load_counts_url = endpoint + 'truck-load-stats';
export const create_broker_url = endpoint + 'brokers';
export const update_broker_url = endpoint + 'brokers/';
export const load_broker_info_url = endpoint + 'brokers/';
export const create_driver_url = endpoint + 'drivers';
export const load_driver_info_url = endpoint + 'drivers/';
export const create_truck_url = endpoint + 'trucks';
export const load_truck_url = endpoint + 'trucks/';
export const create_trailer_url = endpoint + 'trailers';
export const load_trailer_url = endpoint + 'trailers/';
export const create_broker_contact_url = endpoint + 'broker-contacts';
export const load_broker_contact_url = endpoint + 'broker-contacts/';

/*
 * API Related Action Types
 */
 export const API_LOAD_DRIVERS = 'API_LOAD_DRIVERS';
 export const API_LOAD_BROKERS = 'API_LOAD_BROKERS';
 export const API_LOAD_LOADS = 'API_LOAD_LOADS';
 export const API_LOAD_TRUCKS = 'API_LOAD_TRUCKS';
 export const API_LOAD_TRAILERS = 'API_LOAD_TRAILERS';
 export const API_LOAD_BROKER_PROFILE = 'API_LOAD_BROKER_PROFILE';

 /*
  * API Related Actions
  */
export function loadBookedLoads() {
  return function(dispatch) {
    return axios.get(booked_loads_url).then(response => {
      dispatch(receiveLoads(response.data.truck_loads));
    }).catch(response => {
      console.error(response);
    });
  }
}

export function loadAssignedLoads() {
  return function(dispatch) {
    return axios.get(assigned_loads_url).then(response => {
      dispatch(receiveLoads(response.data.truck_loads));
    }).catch(response => {
      console.error(response);
    });
  }
}

export function loadCurrentLoads() {
  return function(dispatch) {
    return axios.get(current_loads_url).then(response => {
      dispatch(receiveLoads(response.data.truck_loads));
    }).catch(response => {
      console.error(response);
    });
  }
}

export function loadPendingPayLoads() {
  return function(dispatch) {
    return axios.get(pending_pay_loads_url).then(response => {
      dispatch(receiveLoads(response.data.truck_loads));
    }).catch(response => {
      console.error(response);
    });
  }
}

export function loadAllLoads() {
  return function(dispatch) {
    return axios.get(all_loads_url).then(response => {
      dispatch(receiveLoads(response.data.truck_loads));
    }).catch(response => {
      console.error(response);
    });
  }
}

export function receiveLoads(loads) {
  return {type: API_LOAD_LOADS, loads};
}

export function loadDrivers() {
  return function(dispatch) {
    return axios.get(drivers_url).then(response => {
      dispatch(receiveDrivers(response.data.drivers));
    }).catch(response => {
      console.error(response);
    });
  }
}

function receiveDrivers(drivers) {
  return {type: API_LOAD_DRIVERS, drivers};
}

export function loadTrucks() {
  return function(dispatch) {
    return axios.get(trucks_url).then(response => {
      dispatch(receiveTrucks(response.data.trucks));
    }).catch(response => {
      console.error(response);
    });
  }
}

function receiveTrucks(trucks) {
  return {type: API_LOAD_TRUCKS, trucks};
}

export function loadTrailers() {
  return function(dispatch) {
    return axios.get(trailers_url).then(response => {
      dispatch(receiveTrailers(response.data.trailers));
    }).catch(response => {
      console.error(response);
    });
  }
}

function receiveTrailers(trailers) {
  return {type: API_LOAD_TRAILERS, trailers};
}

export function loadBrokers() {
  return function(dispatch) {
    return axios.get(brokers_url).then(response => {
      dispatch(receiveBrokers(response.data.brokers));
    }).catch(response => {
      console.error(response);
    });
  }
}

function receiveBrokers(brokers) {
  return {type: API_LOAD_BROKERS, brokers};
}

export function loadBrokerProfile(brokerId) {
  return function(dispatch) {
    return axios.get(load_broker_info_url + brokerId).then(response => {
      dispatch(receiveBrokerProfile(response.data.broker));
    });
  }
}

function receiveBrokerProfile(broker) {
  return {type: API_LOAD_BROKER_PROFILE, broker};
}

export function submitLoad(loadInfo) {
  return function(dispatch) {
    return axios.post(create_load_url, loadInfo).then(response => {
      dispatch(resetLoadForm());
    }).catch(response => {
      console.error(response);
    });
  }
}

export function updateLoad(loadId, loadInfo) {
  return function(dispatch) {
    return axios.put(update_load_url + loadId, loadInfo).then(response => {
      dispatch(resetLoadForm());
    }).catch(response => {
      console.error(response);
    });
  }
}

export function loadCounts() {
  return function(dispatch) {
    return axios.get(load_counts_url).then(response => {
      dispatch(updateBookedCount(response.data.counts.booked));
      dispatch(updateAssignedCount(response.data.counts.assigned));
      dispatch(updateCurrentCount(response.data.counts.current));
      dispatch(updatePendingCount(response.data.counts.pending));
    }).catch(response => {
      console.error(response);
    });
  }
}

export const UPDATE_BOOKED_COUNT = 'UPDATE_BOOKED_COUNT';
export const UPDATE_ASSIGNED_COUNT = 'UPDATE_ASSIGNED_COUNT';
export const UPDATE_CURRENT_COUNT = 'UPDATE_CURRENT_COUNT';
export const UPDATE_PENDING_COUNT = 'UPDATE_PENDING_COUNT';

export function updateBookedCount(bookedCount) {
  return {type: UPDATE_BOOKED_COUNT, bookedCount};
}

export function updateAssignedCount(assignedCount) {
  return {type: UPDATE_ASSIGNED_COUNT, assignedCount};
}

export function updateCurrentCount(currentCount) {
  return {type: UPDATE_CURRENT_COUNT, currentCount};
}

export function updatePendingCount(pendingCount) {
  return {type: UPDATE_PENDING_COUNT, pendingCount};
}

/*
 * Load List Action Types
 */
export const UPDATE_LOAD_LIST_TYPE = 'UPDATE_LOAD_LIST_TYPE';
export const REMOVE_LOAD_LIST_LOAD = 'REMOVE_LOAD_LIST_LOAD';

/*
 * Load List Actions
 */
export function updateLoadListType(listType) {
  return {type: UPDATE_LOAD_LIST_TYPE, listType};
}

export function removeLoadFromList(loadId) {
  return {type: REMOVE_LOAD_LIST_LOAD, loadId};
}

export function startAssignedLoad(loadId) {
  return function(dispatch) {
    return axios.put(update_load_url + loadId, {"truck_load":{"status": 2}}).then(response => {
      dispatch(removeLoadFromList(loadId));
    }).catch(response => {
      console.error(response);
    });
  }
}

export function completeCurrentLoad(loadId) {
  return function(dispatch) {
    return axios.put(update_load_url + loadId, {"truck_load":{"status": 3}}).then(response => {
      dispatch(removeLoadFromList(loadId));
    }).catch(response => {
      console.error(response);
    });
  }
}

export function paidLoad(loadId) {
  return function(dispatch) {
    return axios.put(update_load_url + loadId, {"truck_load":{"status": 4}}).then(response => {
      dispatch(removeLoadFromList(loadId));
    }).catch(response => {
      console.error(response);
    });
  }
}

/*
 * Load Form Action Types
 */
export const UPDATE_LF_BROKER_ID = 'UPDATE_LF_BROKER_ID';
export const UPDATE_LF_BROKER_REF_NUM = 'UPDATE_LF_BROKER_REF_NUM';
export const UPDATE_LF_INITIAL_RATE = 'UPDATE_LF_INITIAL_RATE';
export const ADD_LF_PICKUP = 'ADD_LF_PICKUP';
export const UPDATE_LF_PICKUP_ID = 'UPDATE_LF_PICKUP_ID';
export const UPDATE_LF_PICKUP_REF_NUMS = 'UPDATE_LF_PICKUP_REF_NUMS';
export const UPDATE_LF_PICKUP_DATE = 'UPDATE_LF_PICKUP_DATE';
export const UPDATE_LF_PICKUP_TIME = 'UPDATE_LF_PICKUP_TIME';
export const UPDATE_LF_PICKUP_NAME = 'UPDATE_LF_PICKUP_NAME';
export const UPDATE_LF_PICKUP_STREET_ADDRESS = 'UPDATE_LF_PICKUP_STREET_ADDRESS';
export const UPDATE_LF_PICKUP_CITY = 'UPDATE_LF_PICKUP_CITY';
export const UPDATE_LF_PICKUP_STATE = 'UPDATE_LF_PICKUP_STATE';
export const UPDATE_LF_PICKUP_COUNTRY = 'UPDATE_LF_PICKUP_COUNTRY';
export const UPDATE_LF_PICKUP_POSTAL_CODE = 'UPDATE_LF_PICKUP_POSTAL_CODE';
export const DELETE_LF_PICKUP = 'DELETE_LF_PICKUP';
export const ADD_LF_DELIVERY = 'ADD_LF_DELIVERY';
export const UPDATE_LF_DELIVERY_ID = 'UPDATE_LF_DELIVERY_ID';
export const UPDATE_LF_DELIVERY_REF_NUMS = 'UPDATE_LF_DELIVERY_REF_NUMS';
export const UPDATE_LF_DELIVERY_DATE = 'UPDATE_LF_DELIVERY_DATE';
export const UPDATE_LF_DELIVERY_TIME = 'UPDATE_LF_DELIVERY_TIME';
export const UPDATE_LF_DELIVERY_NAME = 'UPDATE_LF_DELIVERY_NAME';
export const UPDATE_LF_DELIVERY_STREET_ADDRESS = 'UPDATE_LF_DELIVERY_STREET_ADDRESS';
export const UPDATE_LF_DELIVERY_CITY = 'UPDATE_LF_DELIVERY_CITY';
export const UPDATE_LF_DELIVERY_STATE = 'UPDATE_LF_DELIVERY_STATE';
export const UPDATE_LF_DELIVERY_COUNTRY = 'UPDATE_LF_DELIVERY_COUNTRY';
export const UPDATE_LF_DELIVERY_POSTAL_CODE = 'UPDATE_LF_DELIVERY_POSTAL_CODE';
export const DELETE_LF_DELIVERY = 'DELETE_LF_DELIVERY';
export const UPDATE_LF_DRIVER_ID = 'UPDATE_LF_DRIVER_ID';
export const UPDATE_LF_NOTES = 'UPDATE_LF_NOTES';
export const RESET_LF = 'RESET_LF';
export const PRE_FILL_LF = 'PRE_FILL_LF';
export const LOAD_LOAD_INFO = 'LOAD_LOAD_INFO';
export const UPDATE_SUBMIT_TYPE = 'UPDATE_SUBMIT_TYPE';
export const UPDATE_LOAD_ID = 'UPDATE_LOAD_ID';
export const UPDATE_LF_CONTACT_NAME = 'UPDATE_LF_CONTACT_NAME';
export const UPDATE_LF_CONTACT_NUMBER = 'UPDATE_LF_CONTACT_NUMBER';
export const UPDATE_LF_CONTACT_EMAIL = 'UPDATE_LF_CONTACT_EMAIL';

/* Load Form Actions */
export function loadLoadInfo(loadId) {
  return function(dispatch) {
    return axios.get(load_load_info_url + loadId).then(response => {

      dispatch(updateLoadId(loadId));

      var truck_load = response.data.truck_load;

      if(truck_load.reference_number) {
        dispatch(updateLoadFormBrokerRefNum(truck_load.reference_number));
      }
      if(truck_load.notes) {
        dispatch(updateLoadFormNotes(truck_load.notes));
      }
      if(truck_load.driver_id) {
        dispatch(updateLoadFormDriverId(truck_load.driver_id))
      }
      if(truck_load.broker_id) {
        dispatch(updateLoadFormBrokerId(truck_load.broker_id));
      }
      if(truck_load.initial_rate) {
        dispatch(updateLoadFormInitialRate(truck_load.initial_rate));
      }
      if(truck_load.contact_name) {
        dispatch(updateLoadFormContactName(truck_load.contact_name));
      }
      if(truck_load.contact_email) {
        dispatch(updateLoadFormContactEmail(truck_load.contact_email));
      }
      if(truck_load.contact_number) {
        dispatch(updateLoadFormContactNumber(truck_load.contact_number));
      }
      if(truck_load.notes) {
        dispatch(updateLoadFormNotes(truck_load.notes));
      }

      if(truck_load.pickups) {
        var pickups = truck_load.pickups;
        for(var i = 0; i < pickups.length; i++) {
          var pickup = pickups[i];
          if(i != 0) {
            dispatch(addLoadFormPickup());
          }
          dispatch(updateLoadFormPickupId(i, pickup.id));
          dispatch(updateLoadFormPickupDate(i, pickup.appointment_date));
          dispatch(updateLoadFormPickupTime(i, pickup.appointment_time));
          dispatch(updateLoadFormPickupName(i, pickup.name));
          dispatch(updateLoadFormPickupRefNums(i, pickup.reference_number));
          dispatch(updateLoadFormPickupStreetAddress(i, pickup.street_address));
          dispatch(updateLoadFormPickupCity(i, pickup.city));
          dispatch(updateLoadFormPickupState(i, pickup.state));
          dispatch(updateLoadFormPickupCountry(i, pickup.country));
          dispatch(updateLoadFormPickupPostalCode(i, pickup.postal_code));
        }
      }

      if(truck_load.deliveries) {
        var deliveries = truck_load.deliveries;
        for(var i = 0; i < deliveries.length; i++) {
          var delivery = deliveries[i];
          if(i != 0) {
            dispatch(addLoadFormDelivery());
          }
          console.log("LoadLoadForm()");
          console.log(delivery);
          dispatch(updateLoadFormDeliveryId(i, delivery.id));
          dispatch(updateLoadFormDeliveryDate(i, delivery.appointment_date));
          dispatch(updateLoadFormDeliveryTime(i, delivery.appointment_time));
          dispatch(updateLoadFormDeliveryName(i, delivery.name));
          dispatch(updateLoadFormDeliveryRefNums(i, delivery.reference_number));
          dispatch(updateLoadFormDeliveryStreetAddress(i, delivery.street_address));
          dispatch(updateLoadFormDeliveryCity(i, delivery.city));
          dispatch(updateLoadFormDeliveryState(i, delivery.state));
          dispatch(updateLoadFormDeliveryCountry(i, delivery.country));
          dispatch(updateLoadFormDeliveryPostalCode(i, delivery.postal_code));
        }
      }
    }).catch(response => {
      console.error(response);
    });
  }
}

export function updateLoadFormContactName(contactName) {
  return {type: UPDATE_LF_CONTACT_NAME, contactName};
}

export function updateLoadFormContactEmail(contactEmail) {
  return {type: UPDATE_LF_CONTACT_EMAIL, contactEmail};
}

export function updateLoadFormContactNumber(contactNumber) {
  return {type: UPDATE_LF_CONTACT_NUMBER, contactNumber};
}

export function updateLoadFormPickupId(index, pickupId) {
  return {type: UPDATE_LF_PICKUP_ID, index, pickupId};
}

export function updateLoadFormDeliveryId(index, deliveryId) {
  return {type: UPDATE_LF_DELIVERY_ID, index, deliveryId};
}

export function updateLoadId(updateLoadId) {
  return {type: UPDATE_LOAD_ID, updateLoadId};
}

export function resetLoadForm() {
  return {type: RESET_LF};
}

export function updateLoadFormBrokerId(brokerId) {
  return { type: UPDATE_LF_BROKER_ID, brokerId };
}

export function updateLoadFormBrokerRefNum(brokerRefNum) {
  return { type: UPDATE_LF_BROKER_REF_NUM, brokerRefNum };
}

export function updateLoadFormInitialRate(initialRate) {
  return { type: UPDATE_LF_INITIAL_RATE, initialRate };
}

export function addLoadFormPickup() {
  return { type: ADD_LF_PICKUP };
}

export function deleteLoadFormPickup(index) {
  return { type: DELETE_LF_PICKUP, index };
}

export function updateLoadFormPickupRefNums(index, refNums) {
  return { type: UPDATE_LF_PICKUP_REF_NUMS, index, refNums };
}

export function updateLoadFormPickupDate(index, date) {
  return { type: UPDATE_LF_PICKUP_DATE, index, date };
}

export function updateLoadFormPickupTime(index, time) {
  return { type: UPDATE_LF_PICKUP_TIME, index, time };
}

export function updateLoadFormPickupName(index, name) {
  return { type: UPDATE_LF_PICKUP_NAME, index, name };
}

export function updateLoadFormPickupStreetAddress(index, address) {
  return { type: UPDATE_LF_PICKUP_STREET_ADDRESS, index, address };
}

export function updateLoadFormPickupCity(index, city) {
  return { type: UPDATE_LF_PICKUP_CITY, index, city };
}

export function updateLoadFormPickupState(index, state) {
  return { type: UPDATE_LF_PICKUP_STATE, index, state };
}

export function updateLoadFormPickupCountry(index, country) {
  return { type: UPDATE_LF_PICKUP_COUNTRY, index, country };
}

export function updateLoadFormPickupPostalCode(index, postalCode) {
  return { type: UPDATE_LF_PICKUP_POSTAL_CODE, index, postalCode };
}

export function addLoadFormDelivery() {
  return { type: ADD_LF_DELIVERY };
}

export function deleteLoadFormDelivery(index) {
  return { type: DELETE_LF_DELIVERY, index };
}

export function updateLoadFormDeliveryRefNums(index, refNums) {
  return { type: UPDATE_LF_DELIVERY_REF_NUMS, index, refNums };
}

export function updateLoadFormDeliveryDate(index, date) {
  return { type: UPDATE_LF_DELIVERY_DATE, index, date };
}

export function updateLoadFormDeliveryTime(index, time) {
  return { type: UPDATE_LF_DELIVERY_TIME, index, time };
}

export function updateLoadFormDeliveryName(index, name) {
  return { type: UPDATE_LF_DELIVERY_NAME, index, name };
}

export function updateLoadFormDeliveryStreetAddress(index, address) {
  return { type: UPDATE_LF_DELIVERY_STREET_ADDRESS, index, address };
}

export function updateLoadFormDeliveryCity(index, city) {
  return { type: UPDATE_LF_DELIVERY_CITY, index, city };
}

export function updateLoadFormDeliveryState(index, state) {
  return { type: UPDATE_LF_DELIVERY_STATE, index, state };
}

export function updateLoadFormDeliveryCountry(index, country) {
  return { type: UPDATE_LF_DELIVERY_COUNTRY, index, country };
}

export function updateLoadFormDeliveryPostalCode(index, postalCode) {
  return { type: UPDATE_LF_DELIVERY_POSTAL_CODE, index, postalCode };
}

export function updateLoadFormDriverId(driverId) {
  return { type: UPDATE_LF_DRIVER_ID, driverId };
}

export function updateLoadFormNotes(notes) {
  return { type: UPDATE_LF_NOTES, notes };
}


/* Quick Load Action Types */
export const UPDATE_QL_INITIAL_RATE = 'UPDATE_QL_INITIAL_RATE';
export const UPDATE_QL_ORIGIN = 'UPDATE_QL_ORIGIN';
export const UPDATE_QL_PICKUP = 'UPDATE_QL_PICKUP';
export const ADD_QL_PICKUP = 'ADD_QL_PICKUP';
export const DELETE_QL_PICKUP = 'DELETE_QL_PICKUP';
export const UPDATE_QL_DELIVERY = 'UPDATE_QL_DELIVERY';
export const ADD_QL_DELIVERY = 'ADD_QL_DELIVERY';
export const DELETE_QL_DELIVERY = 'DELETE_QL_DELIVERY';
export const RESET_QL_FORM = 'RESET_QL_FORM';

/*
 * Quick Load Actions
 */
export function addQuickLoadPickup() {
  return {type: ADD_QL_PICKUP};
}

export function addQuickLoadDelivery() {
  return {type: ADD_QL_DELIVERY};
}

export function updateQuickLoadOrigin(value) {
  return {type: UPDATE_QL_ORIGIN, origin: value};
}

export function updateQuickLoadInitialRate(value) {
  return {type: UPDATE_QL_INITIAL_RATE, rate: value};
}

export function updateQuickLoadPickup(value, index) {
  return {type: UPDATE_QL_PICKUP, pickup: value, index: index};
}

export function updateQuickLoadDelivery(value, index) {
  return {type: UPDATE_QL_DELIVERY, delivery: value, index: index};
}

export function deleteQuickLoadPickup(index) {
  return {type: DELETE_QL_PICKUP, index: index};
}

export function deleteQuickLoadDelivery(index) {
  return {type: DELETE_QL_DELIVERY, index: index};
}

export function resetQuickLoadForm() {
  return {type: RESET_QL_FORM};
}

export function convertQuickLoadtoLoadForm(initialRate, origin, pickups, deliveries) {
  return function(dispatch) {
    dispatch(updateLoadFormInitialRate(initialRate));
    for(var i = 0; i < pickups.length; i++) {
      var pickup = pickups[i];
      if(i != 0) {
        dispatch(addLoadFormPickup());
      }
      dispatch(updateLoadFormPickupCity(i, pickup));
    }
    for(var i = 0; i < deliveries.length; i++) {
      var delivery = deliveries[i];
      if(i != 0) {
        dispatch(addLoadFormDelivery());
      }
      dispatch(updateLoadFormDeliveryCity(i, delivery));
    }
  }
}

export const UPDATE_BF_BROKER_ID = 'UPDATE_BF_BROKER_ID';
export const UPDATE_BF_BROKER_NAME = 'UPDATE_BF_BROKER_NAME';
export const UPDATE_BF_BROKER_STREET_ADDRESS = 'UPDATE_BF_BROKER_STREET_ADDRESS';
export const UPDATE_BF_BROKER_CITY = 'UPDATE_BF_BROKER_CITY';
export const UPDATE_BF_BROKER_STATE = 'UPDATE_BF_BROKER_STATE';
export const UPDATE_BF_BROKER_COUNTRY = 'UPDATE_BF_BROKER_COUNTRY';
export const UPDATE_BF_BROKER_POSTAL_CODE = 'UPDATE_BF_BROKER_POSTAL_CODE';
export const UPDATE_BF_FACTOR_RATE = 'UPDATE_BF_FACTOR_RATE';
export const RESET_BF = 'RESET_BF';

export function updateBrokerFormBrokerId(brokerId) {
  return {type: UPDATE_BF_BROKER_ID, brokerId};
}

export function updateBrokerFormBrokerName(brokerName) {
  return {type: UPDATE_BF_BROKER_NAME, brokerName};
}

export function updateBrokerFormBrokerStreetAddress(brokerStreetAddress) {
  return {type: UPDATE_BF_BROKER_STREET_ADDRESS, brokerStreetAddress};
}

export function updateBrokerFormBrokerCity(brokerCity) {
  return {type: UPDATE_BF_BROKER_CITY, brokerCity};
}

export function updateBrokerFormBrokerState(brokerState) {
  return {type: UPDATE_BF_BROKER_STATE, brokerState};
}

export function updateBrokerFormBrokerCountry(brokerCountry) {
  return {type: UPDATE_BF_BROKER_COUNTRY, brokerCountry};
}

export function updateBrokerFormBrokerPostalCode(brokerPostalCode) {
  return {type: UPDATE_BF_BROKER_POSTAL_CODE, brokerPostalCode};
}

export function updateBrokerFormFactorRate(factorRate) {
  return {type: UPDATE_BF_FACTOR_RATE, factorRate};
}

export function resetBrokerForm() {
  return {type: RESET_BF};
}

export function submitBroker(brokerInfo) {
  return function(dispatch) {
    return axios.post(create_broker_url, brokerInfo).then(response => {
      dispatch(resetBrokerForm());
    }).catch(response => {
      console.error(response);
    });
  }
}

export function updateBroker(brokerId, brokerInfo) {
  return function(dispatch) {
    return axios.put(update_broker_url + brokerId, brokerInfo).then(response => {
      dispatch(resetBrokerForm());
    }).catch(response => {
      console.error(response);
    });
  }
}

export function loadBrokerInfo(brokerId) {
  return function(dispatch) {
    return axios.get(load_broker_info_url + brokerId).then(response => {
      dispatch(updateBrokerFormBrokerId(brokerId));

      var broker = response.data.broker;

      if(broker.name) {
        dispatch(updateBrokerFormBrokerName(broker.name));
      }
      if(broker.street_address) {
        dispatch(updateBrokerFormBrokerStreetAddress(broker.street_address));
      }
      if(broker.city) {
        dispatch(updateBrokerFormBrokerCity(broker.city));
      }
      if(broker.state) {
        dispatch(updateBrokerFormBrokerState(broker.state));
      }
      if(broker.country) {
        dispatch(updateBrokerFormBrokerCountry(broker.country));
      }
      if(broker.postal_code) {
        dispatch(updateBrokerFormBrokerPostalCode(broker.postal_code));
      }
      if(broker.factor_rate) {
        dispatch(updateBrokerFormFactorRate(broker.factor_rate));
      }
    });
  }
}

export const UPDATE_DF_DRIVER_ID = 'UPDATE_DF_DRIVER_ID';
export const UPDATE_DF_DRIVER_NAME = 'UPDATE_DF_DRIVER_NAME';
export const UPDATE_DF_DRIVER_PHONE_NUMBER = 'UPDATE_DF_DRIVER_PHONE_NUMBER';
export const UPDATE_DF_DRIVER_EMAIL_ADDRESS = 'UPDATE_DF_DRIVER_EMAIL_ADDRESS';
export const UPDATE_DF_TRUCK_ID = 'UPDATE_DF_TRUCK_ID';
export const UPDATE_DF_TRAILER_ID = 'UPDATE_DF_TRAILER_ID';
export const RESET_DF = 'RESET_DF';

export function updateDriverFormDriverId(driverId) {
  return {type: UPDATE_DF_DRIVER_ID, driverId};
}

export function updateDriverFormTruckId(truckId) {
  return {type: UPDATE_DF_TRUCK_ID, truckId};
}

export function updateDriverFormTrailerId(trailerId) {
  return {type: UPDATE_DF_TRAILER_ID, trailerId};
}

export function updateDriverFormDriverName(driverName) {
  return {type: UPDATE_DF_DRIVER_NAME, driverName};
}

export function updateDriverFormDriverPhoneNumber(driverPhoneNumber) {
  return {type: UPDATE_DF_DRIVER_PHONE_NUMBER, driverPhoneNumber};
}

export function updateDriverFormDriverEmailAddress(driverEmailAddress) {
  return {type: UPDATE_DF_DRIVER_EMAIL_ADDRESS, driverEmailAddress};
}

export function resetDriverForm() {
  return {type: RESET_DF};
}

export function submitDriver(driverInfo) {
  return function(dispatch) {
    return axios.post(create_driver_url, driverInfo).then(response => {
      dispatch(resetDriverForm());
    }).catch(response => {
      console.error(response);
    });
  }
}

export function updateDriver(driverId, driverInfo) {
  return function(dispatch) {
    return axios.put(update_driver_url + driverId, driverInfo).then(response => {
      dispatch(resetDriverForm());
    }).catch(response => {
      console.error(response);
    });
  }
}

export function loadDriverInfo(driverId) {
  return function(dispatch) {
    return axios.get(load_driver_info_url + driverId).then(response => {
      dispatch(updateDriverFormDriverId(driverId));

      var driver = response.data.driver;

      if(driver.name) {
        dispatch(updateDriverFormDriverName(driver.name));
      }
      if(driver.phone_number) {
        dispatch(updateDriverFormDriverPhoneNumber(driver.phone_number));
      }
      if(driver.email_address) {
        dispatch(updateDriverFormDriverEmailAddress(driver.email_address));
      }
    });
  }
}

export const UPDATE_BCF_BROKER_CONTACT_ID = 'UPDATE_BCF_BROKER_CONTACT_ID';
export const UPDATE_BCF_BROKER_CONTACT_NAME = 'UPDATE_BCF_BROKER_CONTACT_NAME';
export const UPDATE_BCF_BROKER_CONTACT_PHONE_NUMBER = 'UPDATE_BCF_BROKER_CONTACT_PHONE_NUMBER';
export const UPDATE_BCF_BROKER_CONTACT_EMAIL_ADDRESS = 'UPDATE_BCF_BROKER_CONTACT_EMAIL_ADDRESS';
export const UPDATE_BCF_BROKER_CONTACT_BROKER_ID = 'UPDATE_BCF_BROKER_CONTACT_BROKER_ID';
export const RESET_BCF = 'RESET_BCF';

export function updateBrokerContactFormBrokerId(brokerContactBrokerId) {
  return {type: UPDATE_BCF_BROKER_CONTACT_BROKER_ID, brokerContactBrokerId};
}

export function updateBrokerContactFormBrokerContactId(brokerContactId) {
  return {type: UPDATE_BCF_BROKER_CONTACT_ID, brokerContactId};
}

export function updateBrokerContactFormBrokerContactName(brokerContactName) {
  return {type: UPDATE_BCF_BROKER_CONTACT_NAME, brokerContactName};
}

export function updateBrokerContactFormBrokerContactPhoneNumber(brokerContactPhoneNumber) {
  return {type: UPDATE_BCF_BROKER_CONTACT_PHONE_NUMBER, brokerContactPhoneNumber};
}

export function updateBrokerContactFormBrokerContactEmailAddress(brokerContactEmailAddress) {
  return {type: UPDATE_BCF_BROKER_CONTACT_EMAIL_ADDRESS, brokerContactEmailAddress};
}

export function resetBrokerContactForm() {
  return {type: RESET_BCF};
}

export function submitBrokerContact(brokerContactInfo) {
  return function(dispatch) {
    return axios.post(create_broker_contact_url, brokerContactInfo).then(response => {
      dispatch(resetBrokerContactForm());
    }).catch(response => {
      console.error(response);
    });
  }
}

export function updateBrokerContact(brokerContactId, brokerContactInfo) {
  return function(dispatch) {
    return axios.put(update_broker_contact_url + brokerContactId, brokerContactInfo).then(response => {
      dispatch(resetBrokerContactForm());
    }).catch(response => {
      console.error(response);
    });
  }
}

export function loadBrokerContactInfo(brokerContactId) {
  return function(dispatch) {
    return axios.get(load_broker_contact_info_url + brokerContactId).then(response => {
      dispatch(updateBrokerContactFormBrokerId(brokerContactId));

      var brokerContact = response.data.broker_contact;

      if(brokerContact.broker_id) {
        dispatch(updateBrokerContactFormBrokerId(brokerContact.broker_id));
      }

      if(brokerContact.name) {
        dispatch(updateBrokerContactFormBrokerContactName(brokerContact.name));
      }
      if(brokerContact.phone_number) {
        dispatch(updateBrokerContactFormBrokerContactPhoneNumber(brokerContact.phone_number));
      }
      if(brokerContact.email_address) {
        dispatch(updateBrokerContactFormBrokerContactEmailAddress(brokerContact.email_address));
      }
    });
  }
}

export const UPDATE_TRAILER_FORM_TRUCK_ID = 'UPDATE_TRAILER_FORM_TRUCK_ID';
export const UPDATE_TRAILER_FORM_TRUCK_NAME = 'UPDATE_TRAILER_FORM_TRUCK_NAME';
export const RESET_TRAILER_FORM = 'RESET_TRAILER_FORM';

export function updateTrailerFormTrailerId(trailerId) {
  return {type: UPDATE_TRAILER_FORM_TRUCK_ID, trailerId};
}

export function updateTrailerFormTrailerName(trailerName) {
  return {type: UPDATE_TRAILER_FORM_TRUCK_NAME, trailerName};
}

export function resetTrailerForm() {
  return {type: RESET_TRAILER_FORM};
}

export function submitTrailer(trailerInfo) {
  return function(dispatch) {
    return axios.post(create_trailer_url, trailerInfo).then(response => {
      dispatch(resetTrailerForm());
    }).catch(response => {
      console.error(response);
    });
  }
}

export function updateTrailer(trailerId, trailerInfo) {
  return function(dispatch) {
    return axios.put(update_trailer_url + trailerId, trailerInfo).then(response => {
      dispatch(resetTrailerForm());
    }).catch(response => {
      console.error(response);
    });
  }
}

export function loadTrailerInfo(trailerId) {
  return function(dispatch) {
    return axios.get(load_trailer_info_url + trailerId).then(response => {
      dispatch(updateTrailerFormTrailerId(trailerId));

      var trailer = response.data.trailer;

      if(trailer.name) {
        dispatch(updateTrailerFormTrailerName(trailer.name));
      }
    });
  }
}

export const UPDATE_TRUCK_FORM_TRUCK_ID = 'UPDATE_TRUCK_FORM_TRUCK_ID';
export const UPDATE_TRUCK_FORM_TRUCK_NAME = 'UPDATE_TRUCK_FORM_TRUCK_NAME';
export const RESET_TRUCK_FORM = 'RESET_TRUCK_FORM';

export function updateTruckFormTruckId(truckId) {
  return {type: UPDATE_TRUCK_FORM_TRUCK_ID, truckId};
}

export function updateTruckFormTruckName(truckName) {
  return {type: UPDATE_TRUCK_FORM_TRUCK_NAME, truckName};
}

export function resetTruckForm() {
  return {type: RESET_TRUCK_FORM};
}

export function submitTruck(truckInfo) {
  return function(dispatch) {
    return axios.post(create_truck_url, truckInfo).then(response => {
      dispatch(resetTruckForm());
    }).catch(response => {
      console.error(response);
    });
  }
}

export function updateTruck(truckId, truckInfo) {
  return function(dispatch) {
    return axios.put(update_truck_url + truckId, truckInfo).then(response => {
      dispatch(resetTruckForm());
    }).catch(response => {
      console.error(response);
    });
  }
}

export function loadTrailerInfo(truckId) {
  return function(dispatch) {
    return axios.get(load_truck_info_url + truckId).then(response => {
      dispatch(updateTruckFormTruckId(truckId));

      var truck = response.data.truck;

      if(truck.name) {
        dispatch(updateTruckFormTruckName(truck.name));
      }
    });
  }
}