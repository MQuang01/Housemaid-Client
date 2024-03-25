import Home from "./components/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Suspense} from "react";
import Booking from "./components/booking/Booking";
import Login from "./components/auth/Login";

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
                        </Routes>
                    </Suspense>
                {/*</AuthProvider>*/}
            </BrowserRouter >
            {/*<ToastContainer />*/}
        </>
    )
}

export default App;
