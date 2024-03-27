import Home from "./components/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Suspense, useState} from "react";
import Booking from "./components/booking/Booking";

import Login from "./components/auth/Login";
import UserInfo from "./components/userinfo/UserInfo";

function App() {

    return(
        <>
            <BrowserRouter>
                {/*<AuthProvider>*/}
                    <Suspense>
                        <Routes>
                            <Route path='/login' element={<Login />} />
                            <Route path='/' element={<Home/>} />
                            <Route path='/booking' element={<Booking />} />
                            <Route path='/userinfo' element={<UserInfo />} />
                        </Routes>
                    </Suspense>
                {/*</AuthProvider>*/}
            </BrowserRouter >
            {/*<ToastContainer />*/}
        </>
    )
}

export default App;
