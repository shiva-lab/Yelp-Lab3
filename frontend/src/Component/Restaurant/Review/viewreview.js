import React, { Component, useState } from "react";
import Navbar from "../../Restaurant/NavBar/rNavbar";
import { useQuery } from "@apollo/client"
import { getReviewQuery } from "../../../queries/queries"

// import Modal from 'react-modal';
function ViewReview() {

    const { data, loading, error } = useQuery(getReviewQuery, {
        variables: {
            id: localStorage.getItem('restaurant_id')
           // id: "5fa22a30a6e3a3660cde53d4"
        }
    })

    if (loading) {
        return (
            <div>
                Please Wait!
            </div>
        )
    } else {
        const reviews = data.Restaurant[0].review
        return (
            <div>
                <div>
                    <div>

                        <Navbar />
                        <div className="container">
                            <div className="main-div-menu">
                                <div className="panel" />
                                <div>
                                    <h1 className="heading-menu">Reviews</h1>
                                    <div className="container">
                                        <div>
                                            <table className="tables">
                                                <thead>
                                                    <tr className="tbl-header">
                                                        <th>Picture</th>
                                                        <th>Name</th>
                                                        <th>Description</th>
                                                        <th>Rating</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {reviews.map(review => {
                                                        return (<tr>
                                                            <td> <img src={review.path} style={{ height: "150px", width: "150px" }}></img></td>
                                                            <td> {review.email}</td>
                                                            <td> {review.review_desc}</td>
                                                            <td>{review.rating} </td>
                                                        </tr>)
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

export default ViewReview;
