import React from "react";
import { Route, IndexRoute } from "react-router";

import HomepageContainer from "../containers/Homepage";
import SearchResultsPage from "../containers/SearchResultsPage";
import PropertyDetailsPage from "../containers/PropertyDetailsPage";

export default (
	<Route path="/">
	  <IndexRoute component={HomepageContainer} />
	  <Route path='/retail-space-for-lease/:city' component={SearchResultsPage} />
    <Route path='/properties/:propertyId' component={PropertyDetailsPage} />
	</Route>
);

