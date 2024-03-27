import Navbar from "./components/navbar/Navbar";
import Slide from "./components/slide/Slide";
import Category from "./components/category/Category";
import TablePrice from "./components/tableprice/TablePrice";
import Footer from "./components/footer/Footer";
import { useJwt } from "react-jwt";
import {accessToken} from "./service/AuthService";

function Home() {
    const {decodedToken, isExprired} = useJwt(accessToken);

    return (
        <div className="App">

            {/* Check if accessToken exists */}
            {!accessToken ? <Navbar /> : <Navbar username={decodedToken} />}

            <Slide/>
            <Category/>
            <TablePrice/>
            <Footer/>

        </div>
    );
}

export default Home;