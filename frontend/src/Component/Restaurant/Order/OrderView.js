import React, { Component, useState, Link, useEffect } from "react";
import Navbar from "../../Restaurant/NavBar/rNavbar";
import { useQuery, useMutation } from "@apollo/client"
import { getNewOrders } from "../../../queries/queries"
// import Moment from 'react-moment';
// import 'moment-timezone';
import { useHistory } from "react-router-dom";
import { updateOrderStatus } from "../../../mutation/mutation"



function NewOrderView() {
  const history = useHistory()
  
  const [changeStatus] = useMutation(updateOrderStatus)

  const [orderstatus, setorderstatus] = useState('')
  const [filterorder, setfilterorder] = useState('')

  const { data, loading, error, refetch } = useQuery(getNewOrders,{
    variables: {
      orderstatus: filterorder
    }
  })

  const [allOrder, setallOrders] = useState(data)


  const handleUserClick = (e) => {
    localStorage.setItem("user_id", e.target.id);
    history.push('/ViewUserProfile')

  }

  
  const OrderStatusChange = (e) => {
    e.preventDefault()
    changeStatus({
      variables: {
        id: e.target.id,
        orderstatus: orderstatus
      }
    })

  }
  const optionsDelivery = ["Order Received","Preparing", "On the way", "Delivered"]
  const optionsPickUp = ["Order Received","Preparing", "Pick up Ready", "Picked up"]
  let optionsDeliveryTemplate = optionsDelivery.map(o => {
    return <option key = {o} value={o}>{o}</option>
  })
  let optionsPickUpTemplate = optionsPickUp.map(o => {
    return <option key = {o} value={o}>{o}</option>
  })

  if (loading) {
    return (
      <div>
        Please Wait!
      </div>
    )
  } else {
    let order = data.Order
    if(filterorder && filterorder !== " "){
      order = order.filter(e => {if(e.orderstatus == filterorder) return e})
    }
    return (
      <div>
        <div>
          <div>
            <Navbar />
            <div className="container">
              <div className="main-div-menu">
                <div className="panel" />

                <div>
                  <h1 className="heading-menu">Orders</h1>
                  &nbsp;
                &nbsp;&nbsp;&nbsp;
                <span> Filter by Status  </span>
                <select
                      id="filter"
                      name="filter"
                      placeholder="filter"
                      onChange={e => {
                        setfilterorder(e.target.value)
                      }}
                    >
                    
                      <option value=" ">Filter</option>
                      <option value="New Order">New Order</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Rejected">Cancelled</option>
                    </select> &nbsp;
                 
                  <br />
                  <div className="container">
                    <div>
                      <table className="tables">
                        <thead>
                          <tr className="tbl-header">
                            <th>Date/Time</th>
                            <th>Order ID</th>
                            <th>UserName</th>
                            <th>Delivery Mode</th>
                            <th>Current Status</th>
                            <th>Update Status</th>
                            <th></th>

                          </tr>
                        </thead>
                        <tbody>
                          {order.map(item => {
                            let optionTemplate = (item.deliverymode == "Delivery") ? optionsDeliveryTemplate : optionsPickUpTemplate
                            return (
                              <tr>
                                <td> {item.ts} </td>
                                <td> {item._id} </td>
                                <td id={item.user_id} onClick={handleUserClick}> {item.user_name} </td>
                                <td> {item.deliverymode} </td>
                                <td> {item.orderstatus} </td>
                                <td>
                                  <select
                                    onChange={e => {
                                      setorderstatus(e.target.value)
                                    }}
                                    id="updatestatus"
                                    name="updatestatus"
                                    placeholder="updatestatus"
                                  >
                                    {optionTemplate}
                                  </select>
                                </td>

                                <td>
                                  <button id={item._id}
                                    onClick={OrderStatusChange}
                                  >
                                    Update Status
                            </button>

                                </td>
                              </tr>
                            )

                          })}

                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default NewOrderView;
