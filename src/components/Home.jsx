import Navbar from "./navbar/Navbar";
import Slide from "./slide/Slide";
import Category from "./category/Category";
import TablePrice from "./tableprice/TablePrice";
import Footer from "./footer/Footer";
import { useJwt } from "react-jwt";
import {accessToken} from "../service/AuthService";

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