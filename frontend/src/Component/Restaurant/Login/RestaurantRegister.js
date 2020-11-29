import React, { useState } from "react";

import { Redirect } from "react-router";
import { useMutation } from '@apollo/client';
import { restaurantRegister } from '../../../mutation/mutation'
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";



function RestaurantRegister() {
  const history = useHistory()
  const [registerRestaurant, { loading, error }] = useMutation(restaurantRegister, {
    onCompleted() {
      alert("You are registered! Login In now!")
      history.push('/RestaurantLogin')
    }
  })
  const [Emailid, setEmailId] = useState('')
  const [restpass, setrestpass] = useState('')
  const [restaurantname, setrestaurantname] = useState('')
  const [location, setLocation] = useState('')

  return (
    <div class="body">
      {/* <Header /> */}
      <div>
        <div class="login-form">
          <div class="main-div-ru">
            <br />
            <br />
            <br />
            <br /> <br />

            
            <br />
            <br />
            <br />
            <div class="panel">
              <h1 class="heading">Sign Up for Yelp</h1>
              <p>Connect with great local Restaurants</p>
              <br />
            </div>
            <form onSubmit={e => {
              e.preventDefault()
              if (restpass && restaurantname && location && Emailid) {
                registerRestaurant({
                  variables: {
                    Emailid,
                    restpass,
                    restaurantname,
                    location
                  }
                })
              } else {
                alert("Fields cannot be blank")
              }
            }}>
              <input
                style={{ borderRadius: "3px" }}
                type="text"
                id="restaurantname"
                name="restaurantname"
                placeholder="Restaurant Name"
                onChange={e => {
                  setrestaurantname(e.target.value)
                }}
              />
              <br />
              <br />

              <input
                style={{ borderRadius: "3px" }}
                type="text"
                id="Emailid"
                name="Emailid"
                placeholder="Email Address"
                onChange={e => {
                  setEmailId(e.target.value)
                }}
              />
              <br />
              <br />

              <input
                style={{ borderRadius: "3px" }}
                type="password"
                id="restpass"
                name="restpass"
                placeholder="Password"
                onChange={e => {
                  setrestpass(e.target.value)
                }}
              />
              <br />
              <br />

              <input
                style={{ borderRadius: "3px" }}
                type="text"
                id="location"
                name="location"
                placeholder="City"
                onChange={e => {
                  setLocation(e.target.value)
                }}
              />
              <br />

              <div>
                <br />
                <br />
                <button class="btn btn-primary">
                  <b>Create your account</b>
                </button>
              </div>
              <p className="text-center">
                Have an account? <Link to="/RestaurantLogin">Sign in</Link>
              </p>
            </form>
          </div>
          <div class="signup signup-image"></div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantRegister;
