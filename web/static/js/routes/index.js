import React from "react";
import { Route, IndexRoute } from "react-router";

import Base from "../containers/Base";

import HomepageContainer from "../containers/Homepage";
import PDPContainer from "../containers/PDP";
import SRPContainer from "../containers/SRP";
import CustomerProfile from "../containers/CustomerProfile";
import TargetCustomerSearch from "../containers/TargetCustomerSearch";
import CP from "../containers/CP";
import Test from "../containers/Test";

export default (
	<Route path="/" component={Base}>
	  <IndexRoute component={HomepageContainer} />

	  <Route path="/" component={HomepageContainer} />
	  <Route path='/customer' component={CustomerProfile} />
	  <Route path='/targetcustomer/1' component={TargetCustomerSearch} />
    <Route path='/targetcustomer/2' component={CP} />
	  <Route path="/pdp" component={PDPContainer} />
	  <Route path='/properties/:propertyId' component={PDPContainer} />
	  <Route path='/retail-space-for-lease/:city' component={SRPContainer} />

	</Route>
);

