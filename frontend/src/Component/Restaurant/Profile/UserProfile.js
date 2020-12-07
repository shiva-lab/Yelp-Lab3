import React from "react";
import { graphql } from 'react-apollo';
import { getUserProfileQuery } from '../../../queries/queries';
import Navbar from "../NavBar/rNavbar";

class UserProfile extends React.Component {
  displayProfile(){
    var data = this.props.data;
    if(data.loading){
        return( <div>Loading profile...</div> );
    } 
    else {
        return data.User.map((userprofile) => (
          <div className="main-div-menu">
          <div className="panel" />
          <div>
            <h1 className="heading-menu">User Profile</h1>
            <div className="container" />
            <table>
              <thead>
                <tr>
                  <th className="profilepagefont">First Name</th>
                  <td className="profiletdfont">
                    <b>
                      {userprofile.fname}
                      {' '}
                    </b>
                  </td>
                </tr>
                <tr>
                  <th className="profilepagefont">Last Name</th>
                  <td className="profiletdfont">
                    <b>
                      {userprofile.lname}
                      {' '}
                    </b>
                  </td>
                </tr>

                <tr>
                  <th className="profilepagefont"> Profile Image</th>
                  <td>
                    <img
                      src={userprofile.path}
                      width={200}
                      height={200}
                      mode="fit"
                    />
                  </td>
                </tr>

                <tr>
                  <th className="profilepagefont">Email ID</th>
                  <td className="profiletdfont">{userprofile.Emailid}</td>
                </tr>
                <tr>
                  <th className="profilepagefont">City</th>
                  <td className="profiletdfont">
                    {userprofile.city}
                    {' '}
                  </td>
                </tr>
                <tr>
                  <th className="profilepagefont">Zipcode</th>
                  <td className="profiletdfont">{userprofile.zipcode || "94850"}</td>
                </tr>
                <tr>
                  <th className="profilepagefont">Description</th>
                  <td className="profiletdfont">
                    {userprofile.bio}
                    {' '}
                  </td>
                </tr>

                <tr>
                  <th className="profilepagefont">Username</th>
                  <td className="profiletdfont">
                    {userprofile.user_name}
                    {' '}
                  </td>
                </tr>
                <tr>
                  <th className="profilepagefont">Nick Name</th>
                  <td className="profiletdfont">
                    {userprofile.nick_name}
                    {' '}
                  </td>
                </tr>
                <tr>
                  <th className="profilepagefont">Favorites</th>
                  <td className="profiletdfont">
                    {userprofile.favorites}
                    {' '}
                  </td>
                </tr>

                <tr>
                  <th className="profilepagefont">Website/MyBlog</th>
                  <td className="profiletdfont">{userprofile.myblog}</td>
                </tr>
                <tr>
                  <th className="profilepagefont">Contact Number</th>
                  <td className="profiletdfont">
                    {userprofile.mobile}
                    {' '}
                  </td>
                </tr>
                <tr>
                  <th className="profilepagefont">Yelping Since</th>
                  <td className="profiletdfont">
                    {userprofile.yelpingsince}
                    {' '}
                  </td>
                </tr>
                <tr>
                  <th className="profilepagefont">Things I love</th>
                  <td className="profiletdfont">
                    {userprofile.things_i_love}
                    {' '}
                  </td>
                </tr>
                <tr>
                  <th className="profilepagefont">Headline</th>
                  <td className="profiletdfont">
                    {userprofile.headline}
                    {' '}
                  </td>
                </tr>
                <tr>
                  <th className="profilepagefont">Date of Birth</th>
                  <td className="profiletdfont">
                    {userprofile.dob}
                    {' '}
                  </td>
                </tr>
                <tr>
                  <th className="profilepagefont">State</th>
                  <td className="profiletdfont">
                    {userprofile.ustate}
                    {' '}
                  </td>
                </tr>
              </thead>
              <tbody />
            </table>
          </div>
        </div>
      ))
    }
}
render(){
    return(
        <div className="body">
           
          <Navbar/>
          <div className="container">
          <div className="row">
            <div className="login-form">
        
            { this.displayProfile()}
            </div>
            </div>
            </div>
        </div>
    )
}
}
export default graphql(getUserProfileQuery,{
  options: (props) => ({
    variables: {
      id: props.id
    }
  })
})(UserProfile);
