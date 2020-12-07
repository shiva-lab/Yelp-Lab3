import React, { useEffect } from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';



class Home extends Component {

   componentDidMount(){
      localStorage.removeItem('restaurant_id')
      localStorage.removeItem('user_id')
      localStorage.removeItem('search1')
      localStorage.removeItem('search2')
      localStorage.removeItem('email')
   }


   home() {
      return (
         <div>
            <div class="y-container homepage-hero homepage-hero_bg">
               <div class="y-container_content">
                  <div class="hero-header js-main-header">
                     <div class="arrange arrange--18">
                        <div class="arrange_unit arrange_unit--fill">
                           <div class="hero-header_nav hero-header_nav--main nowrap">
                              <ul class="header-nav" id="header-nav">
                                 <li id="talk" class="header-nav_item " data-analytics-label="talk">
                                    <a class="header-nav_link">
                                       <Link class="link-home" to="/RestaurantRegister">Restaurant Sign Up</Link>
                                    </a>
                                 </li>
                                 <li id="events" class="header-nav_item" data-analytics-label="events">
                                    <a class="header-nav_link" href="/RestaurantLogin">
                                       <Link class="link-home" to="/RestaurantLogin">Restaurant Login</Link>
                                    </a>
                                 </li>
                              </ul>
                           </div>
                        </div>
                        {/* <!--Login Signup Section--> */}
                        <div class="arrange_unit nowrap">
                           <ul class="header-nav hero-header_nav main-header_account">
                              <li class="header-nav_item u-space-r2" id="header-log-in">
                                 <a class="header-nav_link header-nav_link--log-in " href="/UserLogin" data-analytics-label="login">
                                    <Link class="link-home" to="/UserLogin">Login</Link>
                                 </a>
                              </li>
                              <li class="header-nav_item u-space-r0 " id="header-sign-up" data-analytics-label="signup">
                                 <a class="ybtn ybtn--primary header-nav_button nowrap">
                                    <Link class="link-home" to="/UserSignup">Sign Up</Link>
                                 </a>
                              </li>
                           </ul>
                        </div>
                     </div>
                  </div>
                  {/* <!--Adding Logo Through CSS--> */}
                  <div class="homepage-hero_inner">
                     <div class="u-text-centered">
                        <h1 class="homepage-hero_logo" id="logo">
                           <a href="/">Yelp</a>
                        </h1>
                     </div>


                     <div class="u-text-centered homepage-hero_photo-owner u-size-full">
                        <div data-hypernova-key="homepage__4df10ec47b3a69a592bdc358e7cc029de9ded942__homepage__PhotoAuthorText__dynamic" data-hypernova-id="6a46b050-6a68-4e95-9749-d748d5a58dee">
                           <p>Photo by <a className="homepage-hero_photo-owner-link" ><strong>Shiva Pandey</strong></a></p>
                        </div>

                     </div>
                  </div>
               </div>
            </div>
      <div className="main-footer_city-landscape-img" role="presentation" />
         </div>
      )

   }

   render() {
      return this.home()
   }

}
export default Home