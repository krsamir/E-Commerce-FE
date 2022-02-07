import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./Authentication/ProtectedRoute";
import { AppConstant } from "./Authentication/Constants";
const Home = lazy(() => import("./Components/Home"));
const Register = lazy(() => import("./Components/Login-Register/Register"));
const Login = lazy(() => import("./Components/Login-Register/Login"));
const Profile = lazy(() => import("./Components/Profile/Profile"));
const Verification = lazy(
  () => import("./Components/Login-Register/Verification")
);

function Routes() {
  return (
    <div>
      <Router>
        <Suspense fallback={<h2>Loading...</h2>}>
          <Switch>
            <ProtectedRoute
              path="/profile"
              component={Profile}
              hasAuthority={[AppConstant.ROLE.USER]}
            />
            <Route path="/" component={Home} exact />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/verify" component={Verification} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default Routes;
