
import cookie from "react-cookies";
import Navbar from "../Navbar/uNavbar";
import StartRating from "./StarRating";
import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { s3Sign, addReview } from "../../../mutation/mutation"
import axios from "axios"

function AddReview (){

  const [review, setreview] = useState('')
  const [selectedFile, setselectedFile] = useState([]);
  const [userreview] = useMutation(addReview, {
    onCompleted() {
      alert(" Review Added!")
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


  const AddReviewSubmit = async (e) => {
    e.preventDefault() 
    console.log(localStorage.getItem('restaurant_id_review'), localStorage.getItem('order_id_review'), localStorage.getItem('user_id_review'))
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
    await userreview({
      variables: {
        review_desc: review,
        rating: localStorage.getItem('ratingselectedstars'),
        restaurant_id: localStorage.getItem('restaurant_id_review'),
        path: url,
        order_id: localStorage.getItem('order_id_review'),
        user_id: localStorage.getItem('user_id_review'),
        email: localStorage.getItem('user_name_review')
      }
    })

  }



  return (
    <div>
      <Navbar />
      <div class="container">
        <div class="login-form">
          <div class="main-div">
            <div class="panel"></div>

            <div>
              <div>
                <h1 class="heading">Provide Review</h1>
                <form onSubmit={AddReviewSubmit} enctype="multipart/form-data">
                  <textarea
                    style={{ borderRadius: "3px" }}
                    id="review"
                    name="review"
                    cols="30"
                    rows="10"
                    placeholder="Add Your Review"
                    value={review}
                    onChange={e => {
                      setreview(e.target.value)
                    }}
                  ></textarea>
                  <br />
                  <br />

                  <StartRating />

                  <br />
                  <br />
                  <input
                    type="file"
                    name="myfile"
                    onChange={onUpload}
                    required
                  />
                  <br />
                  <br />
                  <input
                    class="btn btn-primary"
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
 
export default AddReview;
