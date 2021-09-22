import React, { useContext } from "react";
import SessionContext from "./session/SessionContext";
import { Switch, Route, Redirect } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Account from "../pages/Account";
import Home from "../pages//Home/Home";
import Profile from "../pages/Profile/Profile";
import CreatePost from "../pages/Post/Createpost";

export default function Routes() {
  const {
    session: {
      user: { token, role },
    },
  } = useContext(SessionContext);

  return (
    <Switch>
      <PublicRoute exact path="/account" component={Account} token={token} />
      <PrivateRoute role={role} exact path="/" component={Home} token={token} />
      <PrivateRoute role={role} exact path="/newpost" component={CreatePost} token={token} />

      <PrivateRoute
        role={role}
        path="/dashnoard"
        component={Profile}
        token={token}
      />
      <PrivateRoute
        role={role}
        exact
        path="/profile"
        component={Profile}
        token={token}
      />
      <Route
        component={NotFound}
      />


    </Switch>
  );
}
function PublicRoute({ path, component: Component, token, ...props }) {
  return (
    <>
      <Route
        {...props}
        path={path}
        render={(props) =>
          token ? <Redirect to="/" /> : <Component {...props} />
        }
      />
    </>
  );
}

function PrivateRoute({ path, component: Component, token, role, ...props }) {
  return (
    <Route
      {...props}
      path={path}
      render={(props) => {
        let redirectTo = null;
        if (!token) redirectTo = "/account";

        switch (role) {
          case "admin":
            if (["/profile"].includes(path)) redirectTo = "/dashboard";
            break;
          case "user":
            if (path.indexOf("dashboard") > -1) redirectTo = "/";
            break;
          default:
            break;
        }

        if (redirectTo) return <Redirect to={redirectTo} />;
        return <Component {...props} />;
      }}
    />
  );
}
