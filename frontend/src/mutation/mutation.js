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
    $bio: String!
    $headline: String!
    $fname: String!
    $lname: String!
    $dob: String!
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
        bio: $bio,
        headline:$headline,
        fname:$fname,
        lname:$lname,
        dob:$dob,
        city:$city,
        ustate:$ustate,
        country:$country,
        nickname:$nickname,
        emailid:$emailid,
        mobile:$mobile,
        address:$address,
        favorites:$favorites,
        myblog:$myblog,
        things_ilove:$things_ilove,
        find_me_in:$find_me_in,
        path:$path,
  ) {
    _id
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