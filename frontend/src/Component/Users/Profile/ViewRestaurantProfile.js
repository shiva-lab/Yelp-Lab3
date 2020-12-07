import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getProfileQuery } from '../../../queries/queries';
import {MapContainer} from "../../Users/Maps/mapContainer"
import Navbar from "../../Users/Navbar/uNavbar"
import { Link, Redirect, useHistory } from "react-router-dom";


class ViewRestUserProfile extends Component {
  displayProfile(){
      var data = this.props.data;
      if(data.loading){
          return( <div>Loading profile...</div> );
      } 
      else {
          return data.Restaurant.map((food) => (
                  <div className="row">
                    <div>
                      <div>
                        <div>
                          <br />
                          <img src={food.path} width={400} height={250} mode="fit" />
                          <img src={food.path1} width={400} height={250} mode="fit" />
                          <img src={food.path2} width={400} height={250} mode="fit" />
                          <img src={food.path3} width={400} height={250} mode="fit" />
                        </div>
                        <div className="login-form">
                          <div className="main-div-ru">
                            <div>
                              <div>
                                <div>
                                  <table>
                                    <thead>
                                      <tr>
                                        <th className="profilepagefont">
                                          <h1>
                                            <b>
                                              {food.restaurantname}
                                            </b>
                                          </h1>
                                        </th>
                                      </tr>
                                      <tr><td>
                                          <Link to="/userviewmenu">
                                            <button
                                              className="btn btn-danger"
                                            >
                                              View Menu
                                            </button>
                                          </Link>
                                        </td>
                                        <td>
                                          <Link to="/addreview">
                                            <button
                                              className="btn btn-danger"
                                              // onClick={this.handleReviewClick(
                                              //   food._id,
                                              //   food.user_id
                                              // )}
                                            >
                                              Rate Restaurant
                                            </button>
                                          </Link>
                                        </td>
                                      </tr>
      
                                      <tr>
                                        <th className="profilepagefont">Address</th>
                                        <td className="profiletdfont">
                                          {food.address}
                                        </td>
                                      </tr>
                                      <tr>
                                        <th className="profilepagefont">City</th>
                                        <td className="profiletdfont">
                                          {food.location}{" "}
                                        </td>
                                      </tr>
                                      <tr>
                                        <th className="profilepagefont">Zipcode</th>
                                        <td className="profiletdfont">
                                          {food.zipcode}
                                        </td>
                                      </tr>
                                      <tr>
                                        <th className="profilepagefont">
                                          Description
                                        </th>
                                        <td className="profiletdfont">
                                          {food.rdescription}{" "}
                                        </td>
                                      </tr>
      
                                      <tr>
                                        <th className="profilepagefont">Cuisine</th>
                                        <td className="profiletdfont">
                                          {food.cuisine}{" "}
                                        </td>
                                      </tr>
                                      <tr>
                                        <th className="profilepagefont">
                                          Mode Of delivery
                                        </th>
                                        <td className="profiletdfont">
                                          {food.modeofdelivery}{" "}
                                        </td>
                                      </tr>
                                      <tr>
                                        <th className="profilepagefont">
                                          Delivery Method{" "}
                                        </th>
                                        <td className="profiletdfont">
                                          {food.delivery_method}{" "}
                                        </td>
                                      </tr>
                                      <tr>
                                        <th className="profilepagefont">Timings</th>
                                        <td className="profiletdfont">
                                          {food.timings}
                                        </td>
                                      </tr>
      
                                      <tr>
                                        <th className="profilepagefont">Website</th>
                                        <td className="profiletdfont">
                                          {food.website}
                                        </td>
                                      </tr>
                                      <tr>
                                        <th className="profilepagefont">Rating</th>
                                        <td className="profiletdfont">
                                          {food.rating}
                                        </td>
                                      </tr>
                                      <tr>
                                        <th className="profilepagefont">
                                          Contact Number
                                        </th>
                                        <td className="profiletdfont">
                                          {food.contactinfo}{" "}
                                        </td>
                                      </tr>
      
                                      <tr>
                                        <th className="profilepagefont">
                                          Email Address
                                        </th>
                                        <td className="profiletdfont">
                                          {food.Emailid}{" "}
                                        </td>
                                      </tr>
                                    </thead>
                                    <tbody />
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="signup">
                          <div className="maparea">
                            { <MapContainer latlng={[{ latitude: 37.377270327707286, longitude: -122.03075869601092 }]} />}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
       
      }
  }
  render(){
      return(
        <div>
          <Navbar/>
              <div className="body">
              { this.displayProfile()}
          </div>
        </div>
          
      )
  }
}
const id = localStorage.getItem('restaurant_id')

export default graphql(getProfileQuery, {
  options: (props) => ({
    variables: {
      id: props.id
    }
  })
})(ViewRestUserProfile);