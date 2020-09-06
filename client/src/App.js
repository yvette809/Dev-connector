import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/privateRoute";
import "./App.css";
import { loadUser } from "./actions/auth";
import configureStore from "./store";
import setauthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setauthToken(localStorage.token);
}

function App() {
  const store = configureStore();

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <Navbar />
      <Route path="/" exact>
        <Landing />
      </Route>
      <section className="container">
        <Alert />
        <Switch>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <PrivateRoute path="/dashboard" exact>
            <Dashboard />
          </PrivateRoute>
        </Switch>
      </section>
    </Router>
  );
}

export default App;
