import Navbar from "./components/navbar/Navbar";
import Slide from "./components/slide/Slide";
import Category from "./components/category/Category";
import TablePrice from "./components/tableprice/TablePrice";
import Footer from "./components/footer/Footer";
import {accessToken} from "./service/AuthService";
import {useEffect} from "react";

function Home() {
    // useEffect(() => {
    //     localStorage.removeItem("listJob");
    //     localStorage.removeItem("confirmPolicy");
    //     localStorage.removeItem("timeApprox");
    //     localStorage.removeItem("infoForm2");
    //     localStorage.removeItem("totalOrderPrice");
    // }, []);

    return (
        <div className="App">

            <Navbar />
            <Slide/>
            <Category/>
            <TablePrice/>
            <Footer/>

        </div>
    );
}

export default Home;