import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import cookie from "react-cookies";
//import Navbar from "../rNavbar"
import { graphql } from 'react-apollo';
import { getMenuQuery } from '../../../queries/queries';
import Navbar from "../NavBar/rNavbar";

class ViewMenu extends React.Component {

  handleClick(item_id) {
    return function () {
      console.log(item_id);
      localStorage.setItem('item_id_menudetails', item_id);
      return <Redirect to="/editmenu" />;
    };
  }
  displayMenu() {
    var data = this.props.data;
    console.log(data)
    if (data.loading) {
      return (<div>Loading menu...</div>);
    }
    else {
      return (
        <div className="container">
          <div className="main-div-menu">
            <div className="panel" />
            <div>
              <h1 className="heading-menu">Restaurant Menu</h1>
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
                        <th>Edit Item</th>
                      </tr>
                    </thead>

                    {data.Restaurant[0].menu.map((food) =>
                      <tbody>
                        <tr>
                          <td>
                            <img
                              src={food.path}
                              width={150}
                              height={120}
                              mode="fit"
                            />
                          </td>
                          <td>
                            {food.itemname}
                            {' '}
                          </td>
                          <td>
                            {food.Ingredients}
                            {' '}
                          </td>
                          <td>{food.price}</td>
                          <td>{food.itemcategory}</td>
                          <td>
                            <Link to="/editmenu">
                              <button onClick={this.handleClick(food._id)}>Edit</button>
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
  render() {
    return (
      <div className="body">
        <Navbar />
        { this.displayMenu()}
      </div>
    )
  }
}


export default graphql(getMenuQuery, {
  options: (props) => ({
    variables: {
      id: localStorage.getItem('restaurant_id')
    }
  })
})(ViewMenu);
