import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import './App.css';


function App() {
  return (
    <Router>
    <Navbar/>
    <Route path ='/' exact><Landing/></Route>
    <section className= "container">
      <Switch>
      <Route path ='/register' exact><Register/></Route>
      <Route path ='/login' exact><Login/></Route>
     </Switch>
    </section>
   </Router>
  
  );
}

export default App;
