import Navbar from "./Navbar/Navbar";
import Slide from "./Slide/Slide";
import Service from "./Service/Service";
import TablePrice from "./TablePrice/TablePrice";
import Footer from "./Footer/Footer";

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