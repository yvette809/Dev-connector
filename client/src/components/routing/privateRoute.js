import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const privateRoute = ({
  component: component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated && !loading ? (
        <Redirect to="/login" />
      ) : (
        <component {...props} />
      )
    }
  />
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(privateRoute);
