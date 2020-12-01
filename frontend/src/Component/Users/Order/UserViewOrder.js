import React, { Component, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Navbar from "../Navbar/uNavbar";
import { graphql } from "react-apollo";
import { getUserOrders } from "../../../queries/queries";

class UserViewOrder extends React.Component {

  displayOrder() {
    var data = this.props.data;
    console.log(data);
    if (data.loading) {
      return <div>Loading Order...</div>;
    } else {
      return (
        <div className="container">
          <div className="main-div-menu">
            <div className="panel" />
            <div>
              <h1 className="heading-menu">User Orders</h1>
              <div className="container">
                <div>
                  <table className="tables">
                    <thead>
                      <tr className="tbl-header">
                        <th>Date/Time</th>
                        <th>Restaurant ID</th>
                        <th>User ID</th>
                        <th>User Name</th>
                        <th>Delivery Mode</th>
                        <th>Status</th>
                        <th>Review</th>
                      </tr>
                    </thead>

                    {data.Order.map((food) => (
                      <tbody>
                        <tr>
                          <td>{food.ts} </td>
                          <td>{food.restaurant_id} </td>
                          <td>{food.user_id} </td>
                          <td>{food.user_name}</td>
                          <td>{food.deliverymode}</td>
                          <td>{food.orderstatus}</td>
                          <td>
                          <Link to="/addreview">
                            <button
                          onClick={this.handleReviewClick(
                            food._id,
                            food.restaurant_id,
                            food.user_id,
                            food.user_name
                          )}
                          >Add Review</button>
                          </Link></td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  handleReviewClick(order_id, restaurant_id, user_id, user_name) {
    return function () {
      console.log("OrderID:", order_id);
      localStorage.setItem("order_id_review", order_id);
      console.log("Restaurant ID:", restaurant_id);
      localStorage.setItem("restaurant_id_review", restaurant_id);
      console.log("User ID:", user_id);
      localStorage.setItem("user_id_review", user_id);
      localStorage.setItem("user_name_review", user_name);

      return <Redirect to="/addreview" />;
    };
  }
  render() {
    return (
      <div className="body">
        <Navbar />
        {this.displayOrder()}
      </div>
    );
  }
}

export default graphql(getUserOrders, {
  options: (props) => ({
    variables: {
      user_id: localStorage.getItem("user_id"),
    },
  }),
})(UserViewOrder);
