import Navbar from "./navbar/Navbar";
import Slide from "./slide/Slide";
import Service from "./service/Service";
import TablePrice from "./tablePrice/TablePrice";
import Footer from "./footer/Footer";

function Home() {
    return (
        <div className="App">

            <Navbar/>
            <Slide/>
            <Service/>
            <TablePrice/>
            <Footer/>

        </div>
    );
}

export default Home;