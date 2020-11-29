import React, { Component, useEffect, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import Navbar from "../../Users/Navbar/uNavbar";
import { getMenuQuery } from "../../../queries/queries";
import { useQuery, useMutation } from "@apollo/client"
import {addToCart, createOrder} from "../../../mutation/mutation"


function UserViewMenu() {

  const history = useHistory()

  const [RestMenuId, setRestMenuId] = useState('')
  const [addcart] = useMutation(addToCart)
  const [addOrder] = useMutation(createOrder, {
    onCompleted(data){
      alert("Order Placed")
    }
  })


  const [orderMode, setOrderMode] = useState('')

  const { data, loading, error, refetch } = useQuery(getMenuQuery, {
    variables: {
      id: RestMenuId || localStorage.getItem('restaurant_id')
    }
  })



  const id = localStorage.getItem('restaurant_id')
  useEffect(() => {
    setRestMenuId(id)
  }, [RestMenuId])

  const PlaceOrder = async (e) => {
    e.preventDefault()
    const menuItem = document.getElementById(e.target.id)
    const cart = await addcart({
      variables: {
        user_id: localStorage.getItem('user_id'),
        restaurant_id: RestMenuId,
        user_name: localStorage.getItem('user_name'),
         itemname: menuItem.children[1].id,
         price: menuItem.children[3].id,
         path: menuItem.children[0].id,
        restaurant_name: localStorage.getItem('restaurantname'),
      }
    })
    
    if (cart.data.AddToCart && orderMode && orderMode!=""  ){
      const _id = cart.data.AddToCart._id
      addOrder({
        variables: {
          id:_id,
          deliverymode: orderMode,
          user_id: localStorage.getItem('user_id')
        }
      })

    } else {
      alert("Fail to Place Order, Try Again")
    }


  }

  if (loading) {
    return <div>Loading menu...</div>;
  } else {
    localStorage.setItem('restaurantname', data.Restaurant[0].restaurantname)
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="main-div-menu">
            <div className="panel" />
            <div>
              <h1 id={data.Restaurant[0]._id} className="heading-menu">{data.Restaurant[0].restaurantname} Restaurant Menu</h1>
              <div className="container">
                <div>
                  <table className="tables">
                    <thead>
                      <tr className="tbl-header">
                        <th>Picture</th>
                        <th>Name</th>
                        <th>Main Ingredients</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Delivery Method</th>
                        <th>Order</th>
                      </tr>
                    </thead>

                    {data.Restaurant[0].menu.map((food) => (
                      <tbody>
                        <tr id= {food._id}>
                          <td id= {food.path}>
                            <img
                              src={food.path}
                              width={150}
                              height={120}
                              mode="fit"
                            />
                          </td>
                          <td id={food.itemname}>{food.itemname} </td>
                          <td id={food.Ingredients}>{food.Ingredients} </td>
                          <td id = {food.price} >{food.price}</td>
                          <td>{food.itemcategory}</td>
                          <td>

                            <select
                              id="deliverymode"
                              name="deliverymode"
                              placeholder="deliverymode"
                              onChange={e => {
                                setOrderMode(e.target.value)
                              }

                              }
                            >
                              <option>Delivery Type</option>
                              <option value="pickup">Pickup</option>
                              <option value="delivery">Delivery</option>
                              
                            </select>
                          </td>
                          <td>
                            <Link to="/PlaceOrder">
                              <button id= {food._id} onClick={PlaceOrder}>
                                Place Order
                            </button>
                            </Link>
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


export default UserViewMenu;
