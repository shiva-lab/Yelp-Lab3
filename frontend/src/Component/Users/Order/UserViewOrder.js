import React, { Component, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Navbar from "../Navbar/uNavbar";
import { useQuery, useMutation } from "@apollo/client"
import { getUserOrders } from "../../../queries/queries";
import { useHistory } from "react-router-dom";

function UserViewOrder() {
  const history = useHistory()

  const [sortorder, setsortorder] = useState(1)
  const [filterorder, setfilterorder] = useState('')

  const { data, loading, error, refetch } = useQuery(getUserOrders,{
    variables: {
      user_id: localStorage.getItem('user_id'),
      orderstatus: filterorder,
      order_by: {
        fields: "ts",
        direction: parseInt(sortorder)
      }
    }
  })

  const addreview = (e) => {
    localStorage.setItem('restaurant_id_review', e.target.name);
    localStorage.setItem('order_id_review', e.target.id);
    localStorage.setItem('user_id_review', data.Order[0].user_id);
    localStorage.setItem('user_name_review', data.Order[0].user_name);
    history.push("/addReview")
  }


  if (loading) {
    return (
      <div>
        Please Wait!
      </div>
    )
  } else {
    let order = data.Order
    console.log(order)
    console.log(filterorder)
    if(filterorder && filterorder !== " "){
      order = order.filter(e => {if(e.orderstatus == filterorder || e.deliverymode == filterorder) return e})
    }
    return (
      <div>
        <Navbar/>
         <div className="container">
        <div className="main-div-menu">
          <div className="panel" />
          <div>
            <h1 className="heading-menu">User Orders</h1>
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
                      <option value="Order Received">Order Received</option>
                      <option value="Preparing">Preparing</option>
                      <option value="On the way">On the way</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Pick up Ready">Pick up Ready</option>
                      <option value="Picked up">Picked up</option>

                    </select> &nbsp;



                    <span>Sort </span>
                <select
                      id="sort"
                      name="sort"
                      placeholder="sort"
                      onChange={e => {
                        setsortorder(e.target.value)
                      }}
                    >
                    
                      <option value=" ">Filter</option>
                      <option value="1">Asc</option>
                      <option value="-1">Desc</option>
           

                    </select> &nbsp;
                 
                  <br />



            <div className="container">
              <div>
                <table className="tables">
                  <thead>
                    <tr className="tbl-header">
                      <th>Date/Time</th>
                      <th>Restaurant Name</th>
                      <th>Image</th>
                      <th>Item Name</th>
                      <th>User Name</th>
                      <th>Delivery Mode</th>
                      <th>Status</th>
                      <th>Review</th>
                    </tr>
                  </thead>
  
                  {order.map((food) => (
                    <tbody>
                      <tr>
                        <td>{food.ts} </td>
                        <td>{food.cart[0].restaurant_name} </td>
                        <td ><img src={food.cart[0].path} style={{height: "100px" , width: "100px"}}/></td>
                        <td>{food.cart[0].itemname} </td>
                        <td>{food.user_name}</td>
                        <td>{food.deliverymode}</td>
                        <td>{food.orderstatus}</td>
                        <td>
                          <button id={food._id} name={food.restaurant_id} onClick={addreview}
                        >Add Review </button>
                        </td>
                      </tr>
                    </tbody>
                  ))}
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
export default UserViewOrder