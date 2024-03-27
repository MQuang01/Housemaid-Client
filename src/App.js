import Home from "./screens/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Suspense} from "react";
import Booking from "./components/booking/Booking";
import Auth from "./components/auth/Auth";
import {AuthProvider} from "./context/AuthContext";

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
                        </Routes>
                    </Suspense>
                </AuthProvider>
            </BrowserRouter >
        </>
    )
}

export default App;
