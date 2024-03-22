
import Home from "./components/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Suspense} from "react";
import Booking from "./components/booking/Booking";
import LoginSignUp from "./components/security/LoginSignUp"
function App() {
    return(
        <>
            <BrowserRouter>
                {/*<AuthProvider>*/}
                    <Suspense>
                        <Routes>
                            <Route path='/login' element={<LoginSignUp />} />
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
