import Navbar from "./navbar/Navbar";
import Slide from "./slide/Slide";
import Category from "./category/Category";
import TablePrice from "./tableprice/TablePrice";
import Footer from "./footer/Footer";

function Home() {
    return (
        <div className="App">

            <Navbar/>
            <Slide/>
            <Category/>
            <TablePrice/>
            <Footer/>

        </div>
    );
}

export default Home;