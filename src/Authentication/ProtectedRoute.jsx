import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AppConstant } from "./Constants";
export const ProtectedRoute = ({
  component: Component,
  hasAuthority = [],
  ...rest
}) => {
  const role = window.localStorage.getItem("rid");
  const token = window.localStorage.getItem("sid");
  if (typeof hasAuthority !== typeof []) {
    console.error("Please pass an array of Roles e.x. [ADMIN, USER]");
    hasAuthority = [];
  } else {
    if (hasAuthority.length === 0) {
      hasAuthority = [].concat([AppConstant.ROLE.ADMIN, AppConstant.ROLE.USER]);
    }
  }

  process.env.NODE_ENV === "development" &&
    console.info(`ROLE ACCESS FOR THIS PAGE  -->> [${hasAuthority}]`);
  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          if (
            token !== undefined &&
            token !== "" &&
            token !== null &&
            hasAuthority.includes(role)
          ) {
            return <Component {...props} />;
          } else {
            window.localStorage.clear();
            return (
              <Redirect
                to={{
                  pathname: "/login",
                  state: {
                    from: props.location,
                  },
                }}
              />
            );
          }
        }}
      />
    </div>
  );
};

export default ProtectedRoute;
