import React, { useState,useEffect } from "react";
import {connect} from 'react-redux'
import{Link} from 'react-router-dom'
//import {setAlert} from '../../actions/alert'


const Register = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  // const onChange = e =>{
  //     setFormData({...formData, [e.currentTarget.value]:e.currentTarget.value})
  // }

  const onSubmit =  e => {
    e.preventDefault();
    if(password !== password2){
      console.log('passwords do not match')
    }else{
      console.log('success')
    }
  
   
    // props.setAlert("passwords do not match", 'danger');
   
    }

   
  return (
    <>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => setFormData(e.currentTarget.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => setFormData(e.currentTarget.value)}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setFormData(e.currentTarget.value)}
            minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password2}
            onChange={(e) => setFormData(e.currentTarget.value)}
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login"> Sign In </Link>
      </p>
    </>
  );
};

// export default connect(null, {setAlert}) (Register);
export default Register
