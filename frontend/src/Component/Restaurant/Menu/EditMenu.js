import React, { Component, useState } from "react";
import { useMutation } from '@apollo/client';
import Navbar from "../../Restaurant/NavBar/rNavbar";
import { s3Sign, editMenu } from "../../../mutation/mutation"
import axios from "axios"

function EditMenu() {
  const [itemname, setitemname] = useState('')
  const [itemdescription, setitemdescription] = useState('')
  const [ingredients, setingredients] = useState('')
  const [price, setprice] = useState('')
  const [itemcategory, setitemcategory] = useState('')
  const [selectedFile, setselectedFile] = useState([]);



  const [restaurantEditMenu] = useMutation(editMenu, {
    onCompleted() {
      alert(" Menu Edited!")
    }
  })
  const [sign] = useMutation(s3Sign)


  const uploadToS3 = async (file, signedRequest) => {
    const options = {
      headers: {
        "Content-Type": file.type
      }
    };
    await axios.put(signedRequest, file, options)
  };


  const onUpload = (e) => {
    setselectedFile(e.target.files)
  }


  const EditMenuSubmit = async (e) => {
    e.preventDefault()
    const response = await sign({
      variables: {
        filename: selectedFile[0].name,
        filetype: selectedFile[0].type
      }
    }).catch(e => {
      console.log(e)
    })
    const { url, signedRequest } = response.data.signS3
    await uploadToS3(selectedFile[0], signedRequest)
    await restaurantEditMenu({
      variables: {
        itemname: itemname,
        restaurant_id: localStorage.getItem('restaurant_id'),
        menu_id: localStorage.getItem('item_id_menudetails'),
        price: price,
        item_description: itemdescription,
        itemcategory: itemcategory,
        quantity: "1",
        Ingredients: ingredients,
        path: url
      }
    })
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="login-form">
          <div className="main-div">
            <div className="panel"></div>

            <div>
              <div>
                <h1 className="heading">Update a Menu Item</h1>
                <form onSubmit={EditMenuSubmit}>
                  <input
                    style={{ borderRadius: "3px" }}
                    type="text"
                    id="itemname"
                    name="itemname"
                    placeholder="Item Name"
                    value={itemname}
                    onChange={e => {
                      setitemname(e.target.value)
                    }}
                  />
                  <br />
                  <br />

                  <textarea
                    style={{ borderRadius: "3px" }}
                    id="itemdescription"
                    name="itemdescription"
                    cols="30"
                    rows="10"
                    placeholder="Item Description"
                    value={itemdescription}
                    onChange={e => {
                      setitemdescription(e.target.value)
                    }}
                  ></textarea>
                  <br />
                  <br />
                  <textarea
                    style={{ borderRadius: "3px" }}
                    id="ingredients"
                    name="ingredients"
                    cols="30"
                    rows="5"
                    placeholder="Main Ingredients"
                    value={ingredients}
                    onChange={e => {
                      setingredients(e.target.value)
                    }}
                  ></textarea>
                  <br />
                  <br />
                  <input
                    style={{ borderRadius: "3px" }}
                    type="text"
                    id="price"
                    name="price"
                    placeholder="Price in USD"
                    value={price}
                    onChange={e => {
                      setprice(e.target.value)
                    }}
                  />
                  <br />
                  <br />

                  <input
                    type="file"
                    name="photos"
                    onChange={onUpload}


                  />

                  <br />
                  <br />

                  <select
                    value={itemcategory}
                    onChange={e => {
                      setitemcategory(e.target.value)
                    }}
                    id="itemcategory"
                    name="itemcategory"
                    placeholder="Item Category"
                  >
                    <option>Select Item Category</option>
                    <option value="appetizer">Appetizer</option>
                    <option value="salads">Salads</option>
                    <option value="maincourse">Main Course</option>
                    <option value="dessert">Desserts</option>
                    <option value="beverages">Bevereges</option>
                  </select>

                  <br />
                  <br />

                  <input
                    className="btn btn-primary"
                    type="submit"
                    value="Submit"
                  ></input>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}
export default EditMenu;