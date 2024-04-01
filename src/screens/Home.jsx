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
            <CartMaid />
            <TablePrice/>
            <Footer/>

        </div>
    );
}

export default Home;