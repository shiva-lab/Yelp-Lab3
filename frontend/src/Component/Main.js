import React, { Component } from "../../node_modules/react";
import { Route } from "../../node_modules/react-router-dom";
//import { BrowserRouter as Router, Switch, Link } from "../../node_modules/react-router-dom";
import Home from "../views/Home";
import ViewRestProfile from '../Component/Restaurant/Profile/ViewRestProfile'
import ViewUserProfile from '../Component/Users/Profile/ViewUserProfile';
import UserProfile from '../Component/Restaurant/Profile/UserProfile';
import ViewRestUserProfile from '../Component/Users/Profile/ViewRestaurantProfile';
import RestaurantLogin from '../Component/Restaurant/Login/RestaurantLogin'
import RestaurantRegister from '../Component/Restaurant/Login/RestaurantRegister'
import UserLogin from "../Component/Users/Login/UserLogin";
import UserSignup from "../Component/Users/Login/UserSignup";
//Restaurant Menu
import ViewMenu from "../Component/Restaurant/Menu/ViewMenu";
import EditMenu from "../Component/Restaurant/Menu/EditMenu";
import MapContainer from "../Component/Users/Maps/mapContainer"

import AddMenu from "../Component/Restaurant/Menu/AddMenu"
import ViewReview from "../Component/Restaurant/Review/viewreview"
import RUpdateprofile from "../Component/Restaurant/Profile/UpdateProfile"
import OrderView from '../Component/Restaurant/Order/OrderView'
import Logout from "../Component/Restaurant/LandingPage/Logout"
import { BrowserRouter } from "react-router-dom";

import UserViewMenu from "../Component/Users/Menu/UserViewMenu"
import UserUpdateProfile from "../Component/Users/Profile/UserUpdateProfile"
import UserViewOrder from "../Component/Users/Order/UserViewOrder"
import AllRestaurant from "../Component/Users/Home/AllRestaurant";
import AddReview from "../Component/Users/Review/AddReview"


//Create a Main Component
class Main extends Component {
    render() {
        return (
            <div className="fillContent">
                {/* <Route path="/" /> */}
                <BrowserRouter>
                <Route exact path="/" component={Home} />
                <Route path="/ViewRestProfile" render={() => <ViewRestProfile id={localStorage.getItem('restaurant_id')}/>}/>
                <Route path="/ViewUserProfile" render={() => <ViewUserProfile id={localStorage.getItem('user_id')}/>} />
                <Route path="/userProfile" render={() => <UserProfile id={localStorage.getItem('user_id')}/>} />
                <Route path="/RestaurantLogin" component={RestaurantLogin} />
                <Route path="/RestaurantRegister" component={RestaurantRegister} />
                <Route path="/UserLogin" component={UserLogin} />
                <Route path="/UserSignup" component={UserSignup} />
                <Route path="/ViewMenu" component={ViewMenu} />
                <Route path="/rhome" render={() => <ViewRestProfile id={localStorage.getItem('restaurant_id')}/>}/>
                <Route path="/EditMenu" component={EditMenu} />
                <Route path="/rupdateprofile" component={RUpdateprofile}/>
                <Route path="/map" component={MapContainer}/>
                <Route path="/addmenu" component={AddMenu}/>
                <Route path="/viewreview" component={ViewReview}/>
                <Route path="/neworderview" component={OrderView}/>
                <Route path="/userviewmenu" component={UserViewMenu}/>
                <Route path="/userupdateprofile" component={UserUpdateProfile}/>
                <Route path="/uservieworder" component={UserViewOrder}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/allRestaurant" component={AllRestaurant} />
                <Route path="/addreview" component={AddReview} />
                <Route path="/viewrestuserprofile" render={() => <ViewRestUserProfile id={localStorage.getItem('restaurant_id')}/>}  />
                
                </BrowserRouter>
            </div>

        );
    }
}
//Export The Main Component
export default Main;