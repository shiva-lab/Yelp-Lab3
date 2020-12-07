import React, { Component, useState } from "react";
import cookie from "react-cookies";
import { useMutation } from '@apollo/client';
import { userLogin } from '../../../mutation/mutation'
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";


function UserLogin() {
  const history = useHistory()
  const [loginuser, {loading, error}] = useMutation(userLogin, {
    onCompleted(data){
      localStorage.setItem('token', data.LoginUser.token)
      localStorage.setItem('user_id', data.LoginUser._id);
      localStorage.setItem('user_name', data.LoginUser.user_name);
      history.push('/allRestaurant')
    }
  });
  const [Emailid, setEmailId] = useState('')
  const [userpass, setuserpass] = useState('')

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
                      <h1 class="heading">User Login</h1>
                      <br />
                    </div>
                    <form onSubmit={e => {
                      e.preventDefault();
                      loginuser({
                        variables: {
                          Emailid: Emailid,
                          userpass: userpass
                        },

                      }).catch(err => {
                        console.log("Error", err)
                        alert(err.message)
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
                        id="userpass"
                        name="userpass"
                        placeholder="Password"
                        value={userpass}
                        onChange={e => {
                          setuserpass(e.target.value)
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
                        Don't Have an account? <Link to="/UserSignup">Sign up</Link>
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



export default UserLogin