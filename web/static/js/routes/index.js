import React from "react";
import { Route, IndexRoute } from "react-router";

import Base from "../containers/Base";

import HomepageContainer from "../containers/Homepage";
import PDPContainer from "../containers/PDP";
import SRPContainer from "../containers/SRP";

export default (
<Route path="/" component={Base}>
  <IndexRoute component={HomepageContainer} />

  <Route path="/srp" component={SRPContainer} />
  <Route path="/pdp" component={PDPContainer} />

</Route>
);