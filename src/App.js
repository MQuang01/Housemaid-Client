import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Suspense, useEffect, useState} from "react";
import Order from "./components/order/Order";
import Auth from "./components/auth/Auth";
import {AuthProvider} from "./context/AuthContext";
import Home from "./screens/Home";

import UserInfo from "./components/userinfo/UserInfo";
import OrderConfirm from "./components/orderconfirm/OrderConfirm";


function App() {

    return(
        <>
            <BrowserRouter>
                <AuthProvider>
                    <Suspense>
                        <Routes>
                            <Route path='/auth' element={<Auth />} />
                            <Route path='/' element={<Home/>} />
                            <Route path='/booking' element={<Order />} />
                            <Route path='/userinfo' element={<UserInfo />} />
                            <Route path='/orderconfirm' element={<OrderConfirm />} />
                        </Routes>
                    </Suspense>
                </AuthProvider>
            </BrowserRouter >
        </>
    )
}

export default App;
