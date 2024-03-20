import domestichelp from "../../img/domestichelp.jpg";
import cook from "../../img/cook.jpg";
import babysitter from "../../img/babysitter.jpg"
import allrounder from "../../img/allrounder.png"
import livein from "../../img/livein.jpeg"
const Service = () => {
    const imgService = {
        height: '118px',
        width: '163px',
        objectFit: 'cover',
        // marginTop: '-20px',
        // marginLeft: '-20px',
        // marginBottom: '20px',
        borderRadius: '22px',
        alignItems: 'center', justifyContent: 'center', display: 'flex'
    }
    const h4size ={
        height: '40px'
    }
    return(
        <div className="container-fluid services py-5">
            <div className="container text-center py-5">
                <div className="text-center mb-5 wow fadeInUp" data-wow-delay=".3s">
                    <h5 className="mb-2 px-3 py-1 text-dark rounded-pill d-inline-block border border-2 border-primary">Our Featured Services</h5>
                    {/*<h1 className="display-5">Our  Services</h1>*/}
                    <h2>Hire professionals, Experienced specifically for your needs</h2>
                </div>

                <div className="row g-5" style={{'--bs-gutter-x': '0.1rem' }}>


                    <div className="col-xxl-2 col-lg-4 col-md-6 col-sm-12 mx-auto wow fadeInUp service-tag" data-wow-delay=".3s">
                        <div className="bg-light rounded p-5 services-item">
                            <div className="d-flex" style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                                <div className="mb-4">
                                    <img src={domestichelp} style={imgService} alt="domestichelp"/>

                                </div>
                            </div>
                            {/*<img src={domestichelp} style={imgService} alt="domestichelp"/>*/}
                            <h4 style={h4size}>Domestic Help</h4>

                        </div>
                    </div>
                    <div className="col-xxl-2 col-lg-4 col-md-6 col-sm-12 mx-auto wow fadeInUp service-tag" data-wow-delay=".5s">
                        <div className="bg-light rounded p-5 services-item">
                            <div className="d-flex" style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                                <div className="mb-4">
                                    <img src={cook} style={imgService} alt="domestichelp"/>
                                </div>
                            </div>
                            <h4 className="text-center" style={h4size}>Cooks</h4>

                        </div>
                    </div>
                    <div className="col-xxl-2 col-lg-4 col-md-6 col-sm-12 mx-auto wow fadeInUp service-tag" data-wow-delay=".7s">
                        <div className="bg-light rounded p-5 services-item">
                            <div className="d-flex" style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                                <div className="mb-4">
                                    <img src={babysitter} style={imgService} alt="domestichelp"/>
                                </div>
                            </div>
                            <h4 className="text-center" style={h4size}>Babysitter</h4>

                        </div>
                    </div>
                    <div className="col-xxl-2 col-lg-4 col-md-6 col-sm-12 mx-auto wow fadeInUp service-tag" data-wow-delay=".9s">
                        <div className="bg-light rounded p-5 services-item">
                            <div className="d-flex" style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                                <div className="mb-4">
                                    <img src={allrounder} style={imgService} alt="domestichelp"/>
                                </div>
                            </div>
                            <h4 className="text-center" style={h4size}>All-rounders</h4>

                        </div>
                    </div>
                    <div className="col-xxl-2 col-lg-4 col-md-6 col-sm-12 mx-auto wow fadeInUp service-tag" data-wow-delay=".9s">
                        <div className="bg-light rounded p-5 services-item">
                            <div className="d-flex" style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                                <div className="mb-4">
                                    <img src={livein} style={imgService} alt="domestichelp"/>
                                </div>
                            </div>
                            <h4 className="text-center" style={h4size}>24 Hrs - Live In</h4>

                        </div>
                    </div>
                </div>

                <button type="button" className="btn btn-primary border-0 rounded-pill px-4 py-3 mt-4 wow fadeInUp" data-wow-delay=".3s">More Services</button>
            </div>
        </div>
    )
}
export default Service;