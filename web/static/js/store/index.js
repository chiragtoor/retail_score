// web/static/js/store/index.js
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import reducers from "reducers";


export default function configureStore(initialState) {
  return createStore(
    reducers,
    initialState,
    applyMiddleware(thunkMiddleware)
  );
}