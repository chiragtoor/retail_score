import React from "react";
import { Route, IndexRoute } from "react-router";

import Base from "../containers/Base";

import HomepageContainer from "../containers/Homepage";
import SearchResultsPage from "../containers/SearchResultsPage";
import PDPContainer from "../containers/PDP";

export default (
	<Route path="/">
	  <IndexRoute component={HomepageContainer} />
	  <Route path='/retail-space-for-lease/:city' component={SearchResultsPage} />
    <Route path='/properties/:propertyId' component={PDPContainer} />
	</Route>
);

