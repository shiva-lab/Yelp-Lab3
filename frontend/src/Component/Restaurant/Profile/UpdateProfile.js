import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import Navbar from "../NavBar/rNavbar";
import { s3Sign, updateRestProfile } from "../../../mutation/mutation"
import { useHistory } from "react-router-dom";
import axios from "axios"

function RUpdateprofile() {
  const history = useHistory()
  const [sign] = useMutation(s3Sign)
  const [restUpdate] = useMutation(updateRestProfile, {
    onCompleted() {
      alert("Profile has been updated!")
      history.push('/rhome')
    }
  })
  const [rdescription, setdescription] = useState('')
  const [timings, settimings] = useState('')
  const [address, setaddress] = useState('')
  const [contactinfo, setcontactinfo] = useState('')
  const [Emailid, setEmailid] = useState('')
  const [cuisine, setcuisine] = useState('')
  const [zipcode, setzipcode] = useState('')
  const [location, setlocation] = useState('')
  const [website, setwebiste] = useState('')
  const [lat, setlat] = useState('')
  const [lng, setlng] = useState('')
  const [modeofdelivery, setmodeofdelivery] = useState('')
  const [delivery_method, setdelivery_method] = useState('')
  const [selectedFile, setselectedFile] = useState([]);

  const uploadToS3 = async (signedFiles) => {

    const promises = []
    signedFiles.forEach(e => {
      const options = {
        headers: {
          "Content-Type": e[1].type
        }
      };
      promises.push(axios.put(e[0], e[1], options))
    })
    await Promise.all(promises)
  };

  const onUpload = (e) => {
    setselectedFile(e.target.files)
  }

  const updateProfile = async (e) => {
    e.preventDefault()
    const signedFiles = []
    const urls = []
    var i
    for (i = 0; i < selectedFile.length; i++) {
      const response = await sign({
        variables: {
          filename: selectedFile[i].name,
          filetype: selectedFile[i].type
        }
      }).catch(e => {
        console.log(e)
      })
      const { url, signedRequest } = response.data.signS3
      signedFiles.push([signedRequest, selectedFile[i]])
      urls.push(url)
    }
    await uploadToS3(signedFiles).catch(err => console.log("Error", err))
    console.log(urls)
    await restUpdate({
      variables: {
        id: localStorage.getItem('restaurant_id'),
        location,
        Emailid,
        rdescription,
        contactinfo: parseFloat(contactinfo),
        cuisine,
        timings,
        zipcode: parseInt(zipcode),
        lat,
        lng,
        address,
        modeofdelivery,
        delivery_method,
        website,
        path: urls[0] || "",
        path1: urls[1] || "",
        path2: urls[2] || "",
        path3: urls[3] || ""
      }
    })

  }

  return (
    <div>
      <div>
        <div>
          <Navbar />
          <div>
            <div className="body">
              <div className="row">
                <div className="column">
                  <div className="container">
                    <div className="login-form">
                      <div className="panel"></div>
                      <div>
                        <h1 className="heading">Restaurant Profile Update</h1>
                        <form onSubmit={updateProfile}>
                          <br />
                          <textarea
                            style={{ borderRadius: "3px" }}
                            id="description"
                            name="description"
                            cols="30"
                            rows="10"
                            placeholder="A Brief Bio about your Restaurant"
                            value={rdescription}
                            onChange={e => {
                              setdescription(e.target.value)
                            }}
                          ></textarea>
                          <br />
                          <br />

                          <textarea
                            style={{ borderRadius: "3px" }}
                            cols="30"
                            rows="5"
                            type="text"
                            id="timings"
                            name="timings"
                            placeholder="Infomation about Restaurant Hours and Off Days"
                            value={timings}
                            onChange={e => {
                              settimings(e.target.value)
                            }}
                          ></textarea>
                          <br />
                          <br />
                          <textarea
                            style={{ borderRadius: "3px" }}
                            cols="30"
                            rows="5"
                            type="text"
                            id="address"
                            name="address"
                            placeholder="Address"
                            value={address}
                            onChange={e => {
                              setaddress(e.target.value)
                            }}
                          ></textarea>
                          <br />
                          <br />
                          <input
                            type="text"
                            style={{ borderRadius: "3px" }}
                            id="contactinfo"
                            name="contactinfo"
                            placeholder="Contact Number"
                            value={contactinfo}
                            onChange={e => {
                              setcontactinfo(e.target.value)
                            }}
                          />
                          <br />
                          <br />
                          <input
                            type="text"
                            style={{ borderRadius: "3px" }}
                            id="emailid"
                            name="email"
                            placeholder="Email id"
                            value={Emailid}
                            onChange={e => {
                              setEmailid(e.target.value)
                            }}
                          />
                          <br />
                          <br />

                          <input
                            style={{ borderRadius: "3px" }}
                            type="text"
                            id="cuisine"
                            name="cuisine"
                            placeholder="Cuisine"
                            value={cuisine}
                            onChange={e => {
                              setcuisine(e.target.value)
                            }}
                          />
                          <br />
                          <br />
                          <input
                            style={{ borderRadius: "3px" }}
                            type="location"
                            id="location"
                            name="location"
                            placeholder="location"
                            value={location}
                            onChange={e => {
                              setlocation(e.target.value)
                            }}
                          />
                          <br />
                          <br />

                          <input
                            style={{ borderRadius: "3px" }}
                            type="zipcode"
                            id="zipcode"
                            name="zipcode"
                            placeholder="Zip Code"
                            value={zipcode}
                            onChange={e => {
                              setzipcode(e.target.value)
                            }}
                          />
                          <br />
                          <br />
                          <input
                            style={{ borderRadius: "3px" }}
                            type="text"
                            id="website"
                            name="website"
                            placeholder="Website"
                            value={website}
                            onChange={e => {
                              setwebiste(e.target.value)
                            }}
                          />
                          <br />
                          <br />

                          <input
                            style={{ borderRadius: "3px" }}
                            type="text"
                            id="lat"
                            name="lat"
                            placeholder="Latitude"
                            value={lat}
                            onChange={e => {
                              setlat(e.target.value)
                            }}
                          />
                          <br />
                          <br />
                          <input
                            style={{ borderRadius: "3px" }}
                            type="text"
                            id="lng"
                            name="lng"
                            placeholder="Longitude"
                            value={lng}
                            onChange={e => {
                              setlng(e.target.value)
                            }}
                          />
                          <br />
                          <br />

                          <select
                            value={modeofdelivery}
                            onChange={e => {
                              setmodeofdelivery(e.target.value)
                            }}
                            id="modeofdelivery"
                            name="modeofdelivery"
                          >
                            <option>Delivery Mode</option>
                            <option value="pickup">Pickup</option>
                            <option value="delivery">Delivery</option>
                          </select>
                          <br />
                          <br />

                          <select
                            value={delivery_method}
                            onChange={e => {
                              setdelivery_method(e.target.value)
                            }}
                            id="delivery_method"
                            name="delivery_method"
                          >
                            <option>Delivery Method</option>
                            <option value="curbsidepickup">
                              Cubside Pickup
                              </option>
                            <option value="delivery">Yelp Delivery</option>
                            <option value="dine-in">Dine In</option>
                          </select>
                          <br />
                          <br />
                          <div className="cartbtn" align="center">
                            <input
                              type="file"
                              name="photos"
                              onChange={onUpload}
                              multiple

                            />
                          </div>

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
          </div>
        </div>
      </div>
    </div>
  );




}

export default RUpdateprofile;
