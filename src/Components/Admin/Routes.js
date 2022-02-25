import React, { lazy, Suspense } from "react";
import ProtectedRoute from "../../Authentication/ProtectedRoute";
import { Switch, useRouteMatch } from "react-router-dom";
import { AppConstant } from "../../Authentication/Constants";
const Home = lazy(() => import("./Components/Home"));
const Category = lazy(() => import("./Components/Category"));
function Routes() {
  let { path } = useRouteMatch();
  // const {
  //   match: { url, path },
  // } = props;
  return (
    <>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Switch>
          <ProtectedRoute
            path={`${path}`}
            component={Home}
            hasAuthority={[AppConstant.ROLE.ADMIN]}
            exact
          />
          <ProtectedRoute
            path={`${path}/category`}
            component={Category}
            hasAuthority={[AppConstant.ROLE.ADMIN]}
          />
        </Switch>
      </Suspense>
    </>
  );
}

export default Routes;
