import Navbar from "../components/navbar/Navbar";
import Slide from "../components/slide/Slide";
import Category from "../components/category/Category";
import TablePrice from "../components/tableprice/TablePrice";
import Footer from "../components/footer/Footer";
import React from "react";
import CartMaid from "../components/cart-maid/CartMaid";


function Home() {

    return (
        <div className="App">

            <Navbar/>
            <Slide/>
            <Category/>
            {/*<CartMaid />*/}
            <TablePrice/>
            <Footer/>
            <button className="btn btn-primary rounded-circle border-3 cart-item">
                <img src={"../assets/img/maidA.png"} alt="cartMaid.png" className="w-100"/>
            </button>
        </div>
    );
}

export default Home;