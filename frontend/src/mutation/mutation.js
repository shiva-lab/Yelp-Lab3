import { gql } from '@apollo/client';

export const userLogin = gql`
mutation userLogin($Emailid: String!, $userpass: String!){
    LoginUser(Emailid: $Emailid ,userpass: $userpass) {
        _id
        Emailid
        token
        user_name
      }
}
`;


export const userRegister = gql`
mutation($Emailid: String!, $userpass: String!,$user_name: String!, $zipcode: String! ) {
    RegisterUser(Emailid: $Emailid, userpass:$userpass, user_name: $user_name, zipcode: $zipcode) {
      _id
      Emailid
      token
    }
}
`;

export const restaurantLogin = gql`
mutation restaurantLogin($Emailid: String!, $restpass: String!){
    LoginRestaurant(Emailid: $Emailid, restpass:$restpass) {
        _id
        Emailid
        token
      }
}`;

export const restaurantRegister = gql`
mutation ($Emailid: String!, $restpass: String!, $restaurantname: String!, $location: String!){
    RegisterRestaurant(Emailid: $Emailid, restpass:$restpass, restaurantname: $restaurantname, location: $location) {
      _id
      Emailid
      token
    }
}`;

export const s3Sign = gql`
  mutation s3Sign($filename: String!, $filetype: String!){
    signS3(filename: $filename, filetype: $filetype){
      url
      signedRequest
    }
  }`;


  export const updateRestProfile = gql`
  mutation updateRestProfile(
    $id: ID!
      $location: String!
      $Emailid:  String!
      $rdescription: String!
      $contactinfo: Float!
      $cuisine: String!
      $timings: String!
      $zipcode: Int!
      $lat: String!
      $lng: String!
      $address: String!
      $modeofdelivery: String!
      $delivery_method: String!
      $website: String!
      $path: String!
      $path1: String!
      $path2: String!
      $path3: String!
  ){
    UpdateRestaurantProfile(
      id: $id
      location: $location
      Emailid: $Emailid
      rdescription: $rdescription
      contactinfo: $contactinfo
      cuisine: $cuisine
      timings: $timings
      zipcode: $zipcode
      lat: $lat
      lng: $lng
      address: $address
      modeofdelivery: $modeofdelivery
      delivery_method: $delivery_method
      website: $website
      path: $path
      path1: $path1
      path2: $path2
      path3: $path3
    ) {
      _id
      location
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
    }
  }
  `;


  export const editMenu = gql`
  mutation editMenu(
  	$restaurant_id: ID!
  	$menu_id: ID!
    $itemname: String!
    $price:  String!
    $item_description: String!
    $quantity: String!
    $itemcategory: String!
    $Ingredients: String!
    $path: String!
){
  EditRestaurantMenu(
    itemname: $itemname
    restaurant_id: $restaurant_id
    menu_id: $menu_id
    price: $price
    item_description: $item_description
    itemcategory: $itemcategory
    quantity: $quantity
    Ingredients: $Ingredients
    path: $path
  ) {
    _id
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
}
  
  `;

  export const addMenu = gql`
  mutation addMenu(
  	$restaurant_id: ID!
    $itemname: String!
    $price:  String!
    $item_description: String!
    $quantity: String!
    $itemcategory: String!
    $Ingredients: String!
    $path: String!
){
  AddRestaurantMenu(
    itemname: $itemname
    restaurant_id: $restaurant_id
    price: $price
    item_description: $item_description
    itemcategory: $itemcategory
    quantity: $quantity
    Ingredients: $Ingredients
    path: $path
  ) {
    _id
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

export const updateOrderStatus = gql`

mutation updateOrderStatus($id: ID! , $orderstatus: String!){
  UpdateOrderStatus(_id: $id, orderstatus:$orderstatus){
    _id
    restaurant_id
    user_id
    user_name
    deliverymode
    orderstatus
    ts
  }
}

`;

export const updateUserProfile = gql`
mutation updateUserProfile(
  $id: ID!
  $user_name: String!
    $bio: String!
    $headline: String!
    $fname: String!
    $lname: String!
    $dob: Date!
    $city: String!
    $ustate: String!
    $country: String!
    $nickname: String!
    $emailid: String!
    $mobile: String!
    $address: String!
    $favorites: String!
    $myblog: String!
    $things_ilove: String!
    $find_me_in: String!
    $path: String!
){
  UpdateUserProfile(
    id: $id,
    user_name: $user_name,
        bio: $bio,
        headline:$headline,
        fname:$fname,
        lname:$lname,
        dob:$dob,
        city:$city,
        ustate:$ustate,
        country:$country,
        nick_name:$nickname,
        Emailid:$emailid,
        mobile:$mobile,
        address:$address,
        favorites:$favorites,
        myblog:$myblog,
        things_i_love:$things_ilove,
        find_me_in:$find_me_in,
        path:$path,
  ) {
    _id
    user_name
        bio,
        headline,
        fname,
        lname,
        dob,
        city,
        ustate,
        country,
        nick_name,
        Emailid,
        mobile,
        address,
        favorites,
        myblog,
        things_i_love,
        find_me_in,
        path,
  }
}
`;


export const addToCart = gql`
mutation addtoCart($user_id: ID!
  $restaurant_id: ID!
  $user_name: String!
  $itemname: String!
  $price: String!
  $path: String!
  $restaurant_name: String!
){
  AddToCart(user_id: $user_id, 
    restaurant_id: $restaurant_id, 
    user_name: $user_name,
  itemname: $itemname,
  price: $price
  path: $path
  restaurant_name: $restaurant_name) {
    _id
  }
}

`;


export const createOrder = gql`
mutation createOrder($id: ID!, $user_id: ID! , $deliverymode: String!){
  CreateOrder(_id: $id, user_id: $user_id, deliverymode: $deliverymode){
    _id
  }



}

`;


export const addReview = gql`
mutation addReview($review_desc: String!, $rating: String!, $restaurant_id: ID!, $user_id: ID!, $order_id: ID, $path: String!, $email: String! ){
  AddRestaurantReview(review_desc:$review_desc, rating: $rating, restaurant_id: $restaurant_id, user_id:$user_id, order_id: $order_id, email:$email, path: $path ){
    _id
    review {
      review_desc
      rating
      restaurant_id
      path
      order_id
      user_id
      email
    }
  }
}`