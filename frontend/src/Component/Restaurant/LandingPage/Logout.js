import { useHistory } from "react-router-dom";



function Logout (){
    const history = useHistory()

    localStorage.removeItem('restaurant_id')
    localStorage.removeItem('user_id')
    localStorage.removeItem('token')
    localStorage.removeItem('user_name')
    localStorage.removeItem('restaurantname')
    history.push("/")

    return null
}

export default Logout