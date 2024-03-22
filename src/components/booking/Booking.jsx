import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

const Booking = () => {

    return (
        <>
        <Navbar/>

        <div className="container-fluid py-5 wow fadeInUp" data-wow-delay=".3s">
            <div className="container py-5">
                <div className="bg-light px-4 py-5 rounded">
                    <div className="text-center">
                        <h1 className="display-5 mb-5">Find Your Pest Control Services</h1>
                    </div>
                    <form className="text-center mb-4" action="#">
                        <div className="row g-4">
                            <div className="col-xl-10 col-lg-12">
                                <div className="row g-4">
                                    <div className="col-md-6 col-xl-3">
                                        <select className="form-select p-3 border-0">
                                            <option value="Type Of Service" className="">Type Of Service</option>
                                            <option value="Pest Control-2">Pest Control-2</option>
                                            <option value="Pest Control-3">Pest Control-3</option>
                                            <option value="Pest Control-4">Pest Control-4</option>
                                            <option value="Pest Control-5">Pest Control-5</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 col-xl-3">
                                        <input type="text" className="form-control p-3 border-0" placeholder="Name"/>
                                    </div>
                                    <div className="col-md-6 col-xl-3">
                                        <input type="text" className="form-control p-3 border-0" placeholder="Phone"/>
                                    </div>
                                    <div className="col-md-6 col-xl-3">
                                        <input type="email" className="form-control p-3 border-0" placeholder="Email"/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-2 col-lg-12">
                                <input type="button" className="btn btn-primary w-100 p-3 border-0" value="GET STARTED"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

            <Footer/>
        </>
    )
}

export default Booking;