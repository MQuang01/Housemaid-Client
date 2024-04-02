import {useAuth} from "../../context/AuthContext";
import {Route, RedirectFunction, useNavigate, Outlet, Navigate, Routes} from "react-router-dom";
import OrderConfirm from "../orderconfirm/OrderConfirm";
import Order from "../order/Order";


function PrivateRoute(props) {
    let {component: Component, children, render, path, ...rest} = props

    return localStorage.getItem('accessToken') ? (
        <Outlet/>
    ) : (
        <Navigate to={"/auth?mode=login&redirect_url=" + window.location.pathname}/>
    )

}

export default PrivateRoute