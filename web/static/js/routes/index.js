import React from "react";
import { Route, IndexRoute } from "react-router";

import Base from "../containers/Base";

import HomepageContainer from "../containers/Homepage";
import PDPContainer from "../containers/PDP";
import SRPContainer from "../containers/SRP";

import mixpanel from 'mixpanel-browser';
import MixpanelProvider from 'react-mixpanel';

mixpanel.init("ae0fd077786c8096959a7c297b28d99b");

export default (
	<MixpanelProvider mixpanel={mixpanel}>
		<Route path="/" component={Base}>
		  <IndexRoute component={HomepageContainer} />

		  <Route path="/" component={HomepageContainer} />
		  <Route path="/pdp" component={PDPContainer} />
		  <Route path='/properties/:propertyId' component={PDPContainer} />
		  <Route path='/retail-space-for-lease/:city' component={SRPContainer} />

		</Route>
	</MixpanelProvider>
);

