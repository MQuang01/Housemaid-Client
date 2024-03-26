
import Home from "./components/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Suspense} from "react";
import Booking from "./components/booking/Booking";

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
