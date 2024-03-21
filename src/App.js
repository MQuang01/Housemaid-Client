import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Slide from "./Components/Slide/Slide";
import Service from "./Components/Service/Service";
import TablePrice from "./Components/TablePrice/TablePrice";
import Home from "./Components/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Suspense} from "react";
import Booking from "./Components/Booking/Booking";
function App() {
    return(
        <>
            <BrowserRouter>
                {/*<AuthProvider>*/}
                    <Suspense>
                        <Routes>
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
