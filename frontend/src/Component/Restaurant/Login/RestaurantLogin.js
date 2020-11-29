import React, { Component, useState } from "react";
import cookie from "react-cookies";
import { useMutation } from '@apollo/client';
import { restaurantLogin } from '../../../mutation/mutation'
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";


function RestaurantLogin() {
  const history = useHistory()
  const [loginrestaurant, { loading, error }] = useMutation(restaurantLogin, {
    onCompleted(data) {
      localStorage.setItem('token', data.LoginRestaurant.token)
      localStorage.setItem('restaurant_id', data.LoginRestaurant._id);
      history.push('/rhome')
    }
  });
  const [Emailid, setEmailId] = useState('')
  const [restpass, setrestpass] = useState('')

  return (
    <div>
      <div>
        <div class="body">
          <div class="row">
            <div class="column">
              <div class="container">
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
                      <h1 class="heading">Restaurant Login</h1>
                      <br />
                    </div>
                    <form onSubmit={e => {
                      e.preventDefault();
                      loginrestaurant({
                        variables: {
                          Emailid: Emailid,
                          restpass: restpass
                        },

                      }).catch(err => {
                        console.log("Error", err)
                      });
                    }}>
                      <input
                        type="text"
                        style={{ borderRadius: "3px" }}
                        id="Emailid"
                        name="Emailid"
                        placeholder="Email"
                        value={Emailid}
                        onChange={e => {
                          setEmailId(e.target.value)
                        }}
                        required
                      />
                      <br />
                      <br />

                      <input
                        type="password"
                        style={{ borderRadius: "3px" }}
                        id="restpass"
                        name="restpass"
                        placeholder="Password"
                        value={restpass}
                        onChange={e => {
                          setrestpass(e.target.value)
                        }}
                        required
                      />
                      <br />
                      <br></br>

                      <button
                        class="btn btn-primary"
                      >
                        Login
                      </button>

                      <p className="text-center">
                        Don't Have an account? <Link to="/RestaurantSignUp">Sign up</Link>
                      </p>
                    </form>
                  </div>

                </div>


                <div class="signup signup-image"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



export default RestaurantLogin