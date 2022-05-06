import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./Authentication/ProtectedRoute";
import { AppConstant } from "./Authentication/Constants";
import Cart from "./Components/Cart";
const Home = lazy(() => import("./Components/Home"));
const Register = lazy(() => import("./Components/Login-Register/Register"));
const Login = lazy(() => import("./Components/Login-Register/Login"));
const Profile = lazy(() => import("./Components/Profile/Profile"));
const Verification = lazy(() =>
  import("./Components/Login-Register/Verification")
);
const AdminLogin = lazy(() => import("./Components/Login-Register/AdminLogin"));
const AdminHome = lazy(() => import("./Components/Admin/Main"));
const SingleProductPage = lazy(() => import("./Components/SingleProductPage"));

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
            <Route path="/product/:id" component={SingleProductPage} exact />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/verify" component={Verification} />
            <Route path="/admin/login" component={AdminLogin} />
            <Route path="/admin/login" component={AdminLogin} />
            <Route path="/admin/home" component={AdminHome} />
            <ProtectedRoute
              path="/cart"
              component={Cart}
              hasAuthority={[AppConstant.ROLE.USER]}
            />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default Routes;
