import React, { useState } from "react";

import { Redirect } from "react-router";
import { useMutation } from '@apollo/client';
import { userRegister } from '../../../mutation/mutation'
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";


function UserSignup () {
  const history = useHistory()
  const [registerUser, {loading, error}] = useMutation(userRegister,{
    onCompleted(){
      alert("You are registered! Login In now!")
      history.push('/UserLogin')
    }
  })
  const [Emailid, setEmailId] = useState('')
  const [userpass, setuserpass] = useState('')
  const [user_name, setuser_name] = useState('')
  const [zipcode, setzipcode] = useState('')

  return (
     
    <div class="body">
      {/* <Header /> */}
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
                  <h1 class="heading">User SignUp</h1>
                  <br />
                </div>
                <form onSubmit={ e=> {
                  e.preventDefault()
                  if ( Emailid && userpass && user_name && zipcode){
                    registerUser({
                      variables: {
                        Emailid,
                        userpass,
                        user_name,
                        zipcode
                      }
                    })
                  } else {
                    alert("Fields cannot be blank")
                  }
                  
                }
                }>
                  <input
                    style={{ borderRadius: "3px" }}
                    type="text"
                    id="user_name"
                    name="user_name"
                    placeholder="Username"
                    onChange={e => {
                      setuser_name(e.target.value)
                    }}
                  />
                  <br />
                  <br />

                  <input
                    style={{ borderRadius: "3px" }}
                    type="text"
                    id="Emailid"
                    name="Emailid"
                    placeholder="email ID"
                    onChange={e => {
                      setEmailId(e.target.value)
                    }}
                  />
                  <br />
                  <br />

                  <input
                    style={{ borderRadius: "3px" }}
                    type="password"
                    id="userpass"
                    name="userpass"
                    placeholder="Password"
                    onChange={e => {
                      setuserpass(e.target.value)
                    }}
                  />
                  <br />
                  <br />
                  <input
                    style={{ borderRadius: "3px" }}
                    type="number"
                    id="zipcode"
                    name="zipcode"
                    placeholder="Zipcode"
                    onChange={e => {
                      setzipcode(e.target.value)
                    }}
                  />
                  <br />
                  <br />

                  <button class="btn btn-primary">
                    SignUp
                  </button>

                  <p className="text-center">
                    Have an account? <Link to="/UserLogin">Sign in</Link>
                  </p>
                </form>
              </div>
              <div class="signup signup-image"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
);
  
}

export default UserSignup;
