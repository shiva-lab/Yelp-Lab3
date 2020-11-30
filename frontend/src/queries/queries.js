import { gql } from 'apollo-boost';

export const getProfileQuery = gql`
    query getProfileQuery($id: ID!){
        Restaurant (_id: $id){
            _id
            restaurantname
            location
            restpass
            Emailid
            rdescription
            ts
            contactinfo
            cuisine
            timings
            zipcode
            lat
            lng
            address
            rating
            modeofdelivery
            delivery_method
            website
            path
            path1
            path2
            path3
            menu {
                itemname
                price
            }
        }
    }
`;

export const getUserProfileQuery = gql`
  query getUserProfileQuery($id: ID!) {
    User(_id: $id){
        user_name
        fname
        lname
        Emailid
        mobile
        userpass
        image
        ts
        dob
        city
        country
        path
        bio
        favorites
        username
        zipcode
        things_i_love
        find_me_in
        myblog
        ustate
        nick_name
        headline
        yelpingsince
      } 
}
`;

export const getMenuQuery = gql`

    query getMenu($id: ID!){
        Restaurant (_id: $id){
            _id
            restaurantname
            menu {
              _id
              itemname
              price
              item_description
              path
              itemcategory
              quantity
              Ingredients
            } 
        }
    }`;

export const getReviewQuery = gql`

    query getReview($id: ID!){
        Restaurant (_id: $id){
            review {
              path
              email
              review_desc
              rating
            } 
        }
    }`;


    export const getNewOrders = gql`

    query getNewOrder{
        Order {
            _id
          restaurant_id
          user_id
          user_name
          deliverymode
          orderstatus
          ts
        }
        
    }`;


    export const getUserOrders = gql`

    query getUserOrder($user_id: String){
        Order (user_id :$user_id){
            _id
          restaurant_id
          user_id
          user_name
          deliverymode
          orderstatus
          ts
        }
        
    }`;

    export const getAllRestaurant = gql`
    {
        Restaurant{
            _id
            restaurantname
            path
            rdescription
            contactinfo
            address
            location
            lat
            lng
        }
    }
    
    `;
