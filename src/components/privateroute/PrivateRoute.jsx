import {useAuth} from "../../context/AuthContext";
import {Route, RedirectFunction, useNavigate, Outlet, Navigate} from "react-router-dom";
import OrderConfirm from "../orderconfirm/OrderConfirm";
import Order from "../order/Order";


function PrivateRoute(props) {
    let {component: Component, children, render, path, ...rest} = props
    let auth = useAuth();

    console.log("auth", auth)
    return auth.isLoggedIn ?
            <Outlet {...props}/>
        :
        null
        // <Navigate to={"/auth?mode=login&redirect_url=" + window.location.pathname}/>
    // }
    // if (element === Order){
    //     return auth.isLoggedIn ? <Outlet /> : <Navigate to={"/auth?mode=login&redirect_url="+window.location.pathname}/>
    // }
    // return auth.isLoggedIn ? <Outlet /> : <Navigate to={"/"}/>
}

export default PrivateRoute