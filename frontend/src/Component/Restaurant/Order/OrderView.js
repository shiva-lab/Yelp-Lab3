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
  
  const [changeStatus] = useMutation(updateOrderStatus, {
    onCompleted(data){
      setfilterorder('')
    }
  })

  const [orderstatus, setorderstatus] = useState('')
  const [filterorder, setfilterorder] = useState('')

  const { data, loading, error, refetch } = useQuery(getNewOrders,{
    variables: {
      restaurant_id: localStorage.getItem('restaurant_id'),
      orderstatus: filterorder
    }
  })

  const [allOrder, setallOrders] = useState(data)


  const handleUserClick = (e) => {
    localStorage.setItem("user_id", e.target.id);
    history.push('/userProfile')

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
  const optionsDelivery = ["Order Received","Preparing", "On the way", "Delivered", "Rejected"]
  const optionsPickUp = ["Order Received","Preparing", "Pick up Ready", "Picked up", "Rejected"]
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
                      value={filterorder}
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
                            <th>Image</th>
                            <th>Item Name</th>
                            <th>UserName</th>
                            <th>Delivery Mode</th>
                            <th>Current Status</th>
                            <th>Update Status</th>
                            <th></th>

                          </tr>
                        </thead>
                        <tbody>
                          {order.map(item => {
                            let optionTemplate = (item.deliverymode == "delivery") ? optionsDeliveryTemplate : optionsPickUpTemplate
                            return (
                              <tr>
                                <td> {item.ts} </td>
                                <td> <img src={item.cart[0].path} style={{height: "100px", width: "100px"}}></img> </td>
                                <td> {item.cart[0].itemname} </td>
                                
                                <td id={item.user_id} onClick={handleUserClick} style={{color: "blue"}}> {item.user_name} </td>
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

    );
  }

}

export default NewOrderView;
