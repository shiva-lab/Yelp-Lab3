import React, { Component, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client"

import Navbar from "../../Users/Navbar/uNavbar";
import MapContainer from "../Maps/mapContainer";
import { getAllRestaurant } from "../../../queries/queries"




function AllRestaurant (){
  const history = useHistory()
  const [search, setSearch] = useState('')
  const { data, loading, error, refetch } = useQuery(getAllRestaurant)

  const OrderRest = (e) => {
    e.preventDefault()
    localStorage.setItem('restaurant_id',e.target.id)
    localStorage.setItem('restaurantname', e.target.name)
    history.push("/userviewmenu")
  }

  if (loading) {
    return (
      <div>
        Please Wait!
      </div>
    )
  } else {

    let allRest = data.Restaurant
    if (search && search !== ""){
      allRest = allRest.filter(e => {
        if( (e.restaurantname && e.restaurantname.includes(search)) || 
        (e.location && e.location.includes(search)) || 
        (e.address && e.address.includes(search)) || 
        (e.rdescription && e.rdescription.includes(search) )|| 
        (e.contactinfo && String(e.contactinfo).includes(search))){
          return e
        }
      })
    }



    return (
      <div>
        <div>
          <div>
            <Navbar />
            <br />
            <br />

            <form
              method="get"
              action="#"
              id="header_find_form"
              class="business-search-form main-search yform u-space-b0 js-business-search-form"
              role="search"
            >
              <div class="arrange arrange--equal arrange--stack-small">
                <div class="arrange_unit">
                  <div class="main-search_suggestions-field search-field-container find-decorator">
                    <label
                      class="pseudo-input business-search-form_input business-search-form_input--find"
                      for="find_desc"
                    >
                      <div class="pseudo-input_wrapper">
                        <span class="pseudo-input_text business-search-form_input-text">
                          Find
                        </span>
                        <span class="pseudo-input_field-holder">
                          <input
                            autocomplete="off"
                            id="find_desc"
                            maxlength="64"
                            name="find_desc"
                            placeholder="Restaurant,Food, City, delivery,Neighborhoods..."
                            class="pseudo-input_field business-search-form_input-field"
                            aria-autocomplete="list"
                            tabindex="1"
                            onChange={e => {
                              setSearch(e.target.value)
                            }

                            }
                          />
                        </span>
                      </div>
                    </label>
                    <div class="main-search_suggestions suggestions-list-container search-suggestions-list-container hidden">
                      <ul
                        class="suggestions-list"
                        role="listbox"
                        aria-label="Search results"
                      ></ul>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            <div>
              <div className="grid-container">
                <div className="ResDescription">
                  <div>
                    <div>
                      <table className="tables">
                        <thead>
                          <tr className="tbl-header">
                            <th>Name</th>
                            <th>Picture</th>

                            <th>Description</th>
                            <th>Contact Info</th>
                            <th>Address</th>
                            <th>City/Location</th>
                            <th>Order Now</th>
                          </tr>
                        </thead>
                        <tbody>
                        {
                          allRest.map(rest => {
                            return (
                              <tr>
                                <td>
                                {rest.restaurantname}
                                </td>
                                <td>
                               <img src={rest.path} style={{height: "100px",width: "100px"}} />
                                </td>
                                <td>
                                {rest.rdescription}
                                </td>
                                <td>
                                {rest.contactinfo}
                                </td>
                                <td>
                                {rest.address}
                                </td>
                                <td>
                                {rest.location}
                                </td>
                                <td>
                                <button id={rest._id} name={rest.restaurantnam} onClick={OrderRest}>Order Now</button>
                                </td>
                              </tr>
                            )
                          })
                        }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="maparea">
                  {/* <MapContainer latlng={this.state.latlng} /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );


                      }
  }

export default AllRestaurant;
