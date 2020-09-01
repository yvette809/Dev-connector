import React, { useState,useEffect } from "react";
import axios from 'axios';

const Register = () => {
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

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      console.log("passwords do not match");
    } else {
      const newUser ={
          name,
          email,
          password
      }

      try{
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const body = JSON.stringify(newUser)
        const res = await axios.post('/api/users', body, config)
        console.log(res.data)

    }catch(error){
        console.log(error)
    }
    }

   
  }

//   useEffect(()=>{
//       onSubmit()
//   },[])



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
        <input type="submit" className="btn btn-primary" value="Register" onClick={onSubmit}/>
      </form>
      <p className="my-1">
        Already have an account? <a href="login.html">Sign In</a>
      </p>
    </>
  );
};

export default Register;
