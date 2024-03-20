import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Slide from "./Components/Slide/Slide";
import Service from "./Components/Service/Service";
import TablePrice from "./Components/TablePrice/TablePrice";
function App() {
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

export default App;
