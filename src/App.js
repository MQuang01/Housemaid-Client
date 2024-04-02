import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import {Suspense, useEffect, useState} from "react";
import Order from "./components/order/Order";
import Auth from "./components/auth/Auth";
import {AuthProvider, useAuth} from "./context/AuthContext";
import Home from "./screens/Home";
import {Provider} from 'react-redux';
import UserInfo from "./components/userinfo/UserInfo";
import OrderConfirm from "./components/orderconfirm/OrderConfirm";
import store from "./reducer/StoreRedux";
import PrivateRoute from "./components/privateroute/PrivateRoute";


function App() {
    // let [isAuth, setIsAuth] = useState(false);
    // let auth = useAuth();

    return (
        <>
            <Provider store={store}>
                <BrowserRouter>
                    <AuthProvider>
                        <Suspense>
                            <Routes>
                                <Route path='/auth' element={<Auth/>}/>
                                <Route path='/' element={<Home/>}/>
                                <Route path='/booking' element={<Order/>} />
                                {/*<Route path='/userinfo' element={<UserInfo/>}/>*/}

                                <Route path='/confirm/*' element={<PrivateRoute/>}>
                                    <Route path='' element={<OrderConfirm/>}/>
                                    {/*<Route path=':orderCode' element={<OrderConfirm/>}/>*/}
                                </Route>

                                {/*<Route*/}
                                {/*    path="/confirm/:orderCode/userId=:userId"*/}
                                {/*    element={<PrivateRoute><OrderConfirm /></PrivateRoute>}*/}
                                {/*/>*/}

                            </Routes>
                        </Suspense>

                    </AuthProvider>
                </BrowserRouter>
            </Provider>
        </>
    )
}

export default App;
