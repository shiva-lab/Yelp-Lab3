import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Navbar from "../Navbar/uNavbar";
import { s3Sign, updateUserProfile } from "../../../mutation/mutation";
import { useHistory } from "react-router-dom";
import axios from "axios";

function UserUpdateProfile() {
  const history = useHistory();
  const [sign] = useMutation(s3Sign);
  const [userUpdate] = useMutation(updateUserProfile, {
    onCompleted() {
      alert("Profile has been updated!");
      history.push("/ViewUserProfile");
    },
  });
  const [username, setusername] = useState("");
  const [bio, setbio] = useState("");
  const [headline, setheadline] = useState("");
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [dob, setdob] = useState("");
  const [city, setcity] = useState("");
  const [ustate, setustate] = useState("");
  const [country, setcountry] = useState("");
  const [nickname, setnickname] = useState("");
  const [emailid, setemail] = useState("");
  const [mobile, setmobile] = useState("");
  const [address, setaddress] = useState("");
  const [favorites, setfavorites] = useState("");
  const [myblog, setmyblog] = useState("");
  const [things_ilove, setthings_ilove] = useState("");
  const [find_me_in, setfind_me_in] = useState("");
  const [selectedFile, setselectedFile] = useState([]);

  const uploadToS3 = async (file, signedRequest) => {
    const options = {
      headers: {
        "Content-Type": file.type,
      },
    };
    await axios.put(signedRequest, file, options);
  };
  const onUpload = (e) => {
    setselectedFile(e.target.files);
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    const response = await sign({
      variables: {
        filename: selectedFile[0].name,
        filetype: selectedFile[0].type,
      },
    }).catch((e) => {
      console.log(e);
    });
    const { url, signedRequest } = response.data.signS3;
    await uploadToS3(selectedFile[0], signedRequest);
    await userUpdate({
      variables: {
        id: localStorage.getItem("user_id"),
        user_name: username,
        bio,
        headline,
        fname,
        lname,
        dob,
        city,
        ustate,
        country,
        nickname,
        emailid,
        mobile,
        address,
        favorites,
        myblog,
        things_ilove,
        find_me_in,
        path: url,
      },
    });
  }
    return (
      <div>
        <div>
          <Navbar />

          <div class="container">
        
              <div class="login-form">
                <div class="main-div">
                  <div class="panel"></div>
                  <div>
                    <h1 class="heading">User Profile Update</h1>
                    <form onSubmit={updateProfile}>
                    <lable>Username</lable>
                      <br />
                      <textarea
                        style={{ borderRadius: "3px" }}
                        id="bio"
                        name="bio"
                        cols="30"
                        rows="10"
                        placeholder="Bio"
                        value={username}
                        onChange={e => {
                          setusername(e.target.value)
                        }}
                      ></textarea>
                      
                      <br />
                      <lable>Bio</lable>
                      <br />
                      <textarea
                        style={{ borderRadius: "3px" }}
                        id="bio"
                        name="bio"
                        cols="30"
                        rows="10"
                        placeholder="Bio"
                        value={bio}
                        onChange={e => {
                          setbio(e.target.value)
                        }}
                      ></textarea>
                      <br />
                      <br />
                      <lable>Headline</lable>
                      <br />
                      <input
                        type="text"
                        style={{ borderRadius: "3px" }}
                        id="headline"
                        name="headline"
                        placeholder="Headline"
                        value={headline}
                        onChange={e => {
                          setheadline(e.target.value)
                        }}
                      />
                      <br />
                      <br />
                      <lable>First Name</lable>
                      <br />
                      <input
                        type="text"
                        style={{ borderRadius: "3px" }}
                        id="fname"
                        name="fname"
                        placeholder="First Name"
                        value={fname}
                        onChange={e => {
                          setfname(e.target.value)
                        }}
                      />
                      <br />
                      <br />
                      <lable>Last Name</lable>
                      <br />
                      <input
                        type="text"
                        style={{ borderRadius: "3px" }}
                        type="text"
                        id="lname"
                        name="lname"
                        placeholder="LastName"
                        value={lname}
                        onChange={e => {
                          setlname(e.target.value)
                        }}
                      />
                      <br />
                      <br />
                      <lable>Date of Birth</lable>
                      <br />
                      <input
                        type="date"
                        style={{ borderRadius: "3px" }}
                        id="dob"
                        name="dob"
                        placeholder="DOB"
                        value={dob}
                        onChange={e => {
                          setdob(e.target.value)
                        }}
                      />
                      <br />
                      <br />
                      <lable>City</lable> <br />
                      <input
                        style={{ borderRadius: "3px" }}
                        type="text"
                        id="city"
                        name="city"
                        placeholder="City"
                        value={city}
                        onChange={e => {
                          setcity(e.target.value)
                        }}
                      />
                      <br />
                      <br />
                      <lable>State </lable> <br />
                      <input
                        style={{ borderRadius: "3px" }}
                        type="text"
                        id="ustate"
                        name="ustate"
                        placeholder="State"
                        value={ustate}
                        onChange={e => {
                          setustate(e.target.value)
                        }}
                      />
                      <br />
                      <br />
                      <lable>Country</lable>
                      <br />
                      <input
                        style={{ borderRadius: "3px" }}
                        type="text"
                        id="country"
                        name="country"
                        placeholder="Country"
                        value={country}
                        onChange={e => {
                          setcountry(e.target.value)
                        }}
                      />
                      <br />
                      <br />
                      <lable>Nick Name</lable>
                      <br />
                      <input
                        style={{ borderRadius: "3px" }}
                        type="text"
                        id="nickname"
                        name="nickname"
                        placeholder="Nick Name"
                        value={nickname}
                        onChange={e => {
                          setnickname(e.target.value)
                        }}
                      />
                      <br />
                      <br />
                      <lable>Email Address</lable>
                      <br />
                      <input
                        style={{ borderRadius: "3px" }}
                        type="text"
                        id="emailid"
                        name="emailid"
                        placeholder="Email Address"
                        value={emailid}
                        onChange={e => {
                          setemail(e.target.value)
                        }}
                      />
                      <br />
                      <br />
                      <lable>Mobile Number</lable>
                      <br />
                      <input
                        style={{ borderRadius: "3px" }}
                        type="text"
                        id="mobile"
                        name="mobile"
                        placeholder="Mobile"
                        value={mobile}
                        onChange={e => {
                          setmobile(e.target.value)
                        }}
                      />
                      <br />
                      <br />
                      <lable>Physical Address</lable>
                      <br />
                      <input
                        style={{ borderRadius: "3px" }}
                        type="text"
                        id="address"
                        name="address"
                        placeholder="Address"
                        value={address}
                        onChange={e => {
                          setaddress(e.target.value)
                        }}
                      />
                      <br />
                      <br />
                      <lable>Favorites</lable>
                      <br />
                      <input
                        style={{ borderRadius: "3px" }}
                        type="text"
                        id="favorites"
                        name="favorites"
                        placeholder="Favorites"
                        value={favorites}
                        onChange={e => {
                          setfavorites(e.target.value)
                        }}
                      />
                      <br />
                      <br />
                      <lable>MyBlog/Website</lable>
                      <br />
                      <input
                        style={{ borderRadius: "3px" }}
                        type="text"
                        id="myblog"
                        name="myblog"
                        placeholder="My Blog"
                        value={myblog}
                        onChange={e => {
                          setmyblog(e.target.value)
                        }}
                      />
                      <br />
                      <br />
                      <lable>Things I Love</lable>
                      <br />
                      <input
                        style={{ borderRadius: "3px" }}
                        type="text"
                        id="things_ilove"
                        name="things_ilove"
                        placeholder="Things I Love"
                        value={things_ilove}
                        onChange={e => {
                          setthings_ilove(e.target.value)
                        }}
                      />
                      <br />
                      <br />
                      <lable>Find Me in</lable>
                      <br />
                      <input
                        style={{ borderRadius: "3px" }}
                        type="text"
                        id="find_me_in"
                        name="find_me_in"
                        placeholder="find me in"
                        value={find_me_in}
                        onChange={e => {
                          setfind_me_in(e.target.value)
                        }}
                      />
                      <br />
                      <br />
                      <br />
                      <lable>Profile Pic</lable>
                      <br />
                      <input
                              type="file"
                              name="photos"
                              onChange={onUpload}

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

export default UserUpdateProfile;
