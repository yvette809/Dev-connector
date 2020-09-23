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
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
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
          <Route path="/profiles" exact>
            <Profiles />
          </Route>
          <PrivateRoute path="/dashboard" exact>
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute path="/create-profile" exact>
            <CreateProfile />
          </PrivateRoute>
          <PrivateRoute path="/edit-profile" exact>
            <EditProfile />
          </PrivateRoute>
          <PrivateRoute path="/add-experience" exact>
            <AddExperience />
          </PrivateRoute>
          <PrivateRoute path="/add-education" exact>
            <AddEducation />
          </PrivateRoute>
          <PrivateRoute path="/posts" exact>
            <Posts />
          </PrivateRoute>
          <PrivateRoute path="/posts/:id" exact>
            <Post />
          </PrivateRoute>
        </Switch>
      </section>
    </Router>
  );
}

export default App;
