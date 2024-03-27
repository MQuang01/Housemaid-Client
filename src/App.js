import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Suspense} from "react";
import Booking from "./components/booking/Booking";
import Auth from "./components/auth/Auth";
import {AuthProvider} from "./context/AuthContext";
import Home from "./screens/Home";

import Login from "./components/auth/Login";
import UserInfo from "./components/userinfo/UserInfo";


function App() {

    return(
        <>
            <BrowserRouter>
                <AuthProvider>
                    <Suspense>
                        <Routes>
                            <Route path='/auth' element={<Auth />} />
                            <Route path='/' element={<Home/>} />
                            <Route path='/booking' element={<Booking />} />
                            <Route path='/userinfo' element={<UserInfo />} />
                        </Routes>
                    </Suspense>
                </AuthProvider>
            </BrowserRouter >
        </>
    )
}

export default App;
