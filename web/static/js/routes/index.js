import React from "react";
import { Route, IndexRoute } from "react-router";

import Base from "../containers/Base";

import HomepageContainer from "../containers/Homepage";
import SearchResultsPage from "../containers/SearchResultsPage";

export default (
	<Route path="/">
	  <IndexRoute component={HomepageContainer} />

	  <Route path="/" component={HomepageContainer} />
	  <Route path='/retail-space-for-lease/:city' component={SearchResultsPage} />
	</Route>
);

