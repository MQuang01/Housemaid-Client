import React from 'react'

const Footer =() => {
    return (

    <div className="container-fluid footer py-5 wow fadeIn" data-wow-delay=".3s">
            <div className="container py-5">
                <div className="row g-4 footer-inner">
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-item">
                            <h4 className="text-white fw-bold mb-4">About PestKit.</h4>
                            <p>Nostrud exertation ullamco labor nisi aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</p>
                            <p className="mb-0"><a className="" href="#">PestKit </a> &copy; 2023 All Right Reserved.</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-item">
                            <h4 className="text-white fw-bold mb-4">Usefull Link</h4>
                            <div className="d-flex flex-column align-items-start">
                                <a className="btn btn-link ps-0" href=""><i className="fa fa-check me-2"></i>About Us</a>
                                <a className="btn btn-link ps-0" href=""><i className="fa fa-check me-2"></i>Contact Us</a>
                                <a className="btn btn-link ps-0" href=""><i className="fa fa-check me-2"></i>Our Services</a>
                                <a className="btn btn-link ps-0" href=""><i className="fa fa-check me-2"></i>Terms & Condition</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-item">
                            <h4 className="text-white fw-bold mb-4">Services Link</h4>
                            <div className="d-flex flex-column align-items-start">
                                <a className="btn btn-link ps-0" href=""><i className="fa fa-check me-2"></i>Apartment Cleaning</a>
                                <a className="btn btn-link ps-0" href=""><i className="fa fa-check me-2"></i>Office Cleaning</a>
                                <a className="btn btn-link ps-0" href=""><i className="fa fa-check me-2"></i>Car Washing</a>
                                <a className="btn btn-link ps-0" href=""><i className="fa fa-check me-2"></i>Green Cleaning</a>
                            </div>
                            
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-item">
                            <h4 className="text-white fw-bold mb-4">Contact Us</h4>
                            <a href="" className="btn btn-link w-100 text-start ps-0 pb-3 border-bottom rounded-0"><i className="fa fa-map-marker-alt me-3"></i>123 Street, CA, USA</a>
                            <a href="" className="btn btn-link w-100 text-start ps-0 py-3 border-bottom rounded-0"><i className="fa fa-phone-alt me-3"></i>+012 345 67890</a>
                            <a href="" className="btn btn-link w-100 text-start ps-0 py-3 border-bottom rounded-0"><i className="fa fa-envelope me-3"></i>info@example.com</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;