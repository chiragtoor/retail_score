// web/static/js/containers/index.js
import React from "react";
import { Provider } from "react-redux";
import { Router, RouterContext, browserHistory, createMemoryHistory, match } from "react-router";

import configureStore from "../store";
import routes from "../routes";

import MixpanelProvider from 'react-mixpanel';

export default class Index extends React.Component {
  render() {
    let initialState, history, router, component;
    if (typeof window === "undefined") {
      initialState = this.props.initial_state;
      history = createMemoryHistory();
      match({ routes, location: this.props.location, history }, (err, redirect, props) => {
        if (props) {
          router = <RouterContext { ...props } />;
        }
        // Since it's a very basic app, we don't handle any errors, however in real app you will have do this.
        // Please, refer to https://github.com/reactjs/react-router/blob/master/docs/guides/ServerRendering.md
        // to find more relevant information.
        const store = configureStore(initialState);
        component = <Provider store={store}>
                      {router}
                    </Provider>;
      });
    } else {
      const mixpanel = require('mixpanel-browser');
      mixpanel.init("ae0fd077786c8096959a7c297b28d99b");

      initialState = window.__INITIAL_STATE__;
      history = browserHistory;
      router = <Router history={history}>
        {routes}
      </Router>;
      const store = configureStore(initialState);
      component = <MixpanelProvider mixpanel={mixpanel}>
                    <Provider store={store}>
                      {router}
                    </Provider>
                  </MixpanelProvider>;
    }

    return component;
  }
}