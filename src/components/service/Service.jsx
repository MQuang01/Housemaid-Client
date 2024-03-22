
import {Link} from "react-router-dom";
import RatingStars from "./RatingStars";
import {useEffect, useState} from "react";
import axios from "axios";

const Service = () => {
    const imgService = {
        height: '118px',
        width: '163px',
        objectFit: 'cover',
        borderRadius: '22px',
        alignItems: 'center', justifyContent: 'center', display: 'flex'
    }
    const h4size = {
        height: '60px'
    }
    const [categories, setCategory] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://192.168.1.39:8080/api/categories');
                setCategory(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
        fetchData()
    }, []);

    return (
        <div className="container-fluid services py-5" id="service-list">
            <div className="container text-center py-5">
                <div className="text-center mb-5 wow fadeInUp" data-wow-delay=".3s">
                    <h5 className="mb-2 px-3 py-1 text-dark rounded-pill d-inline-block border border-2 border-primary">Dịch
                        vụ nổi bật </h5>
                    <h2>Với trình độ nghiệp vụ được đào tạo bài bản, nhân viên tại đây luôn làm việc với tinh thần trách
                        nhiệm cao nhất.</h2>
                </div>

<<<<<<< HEAD:src/components/service/Service.jsx
                <div className="row g-5" style={{'--bs-gutter-x': '0.1rem' }}>


                    <div className="col-xxl-2 col-lg-4 col-md-6 col-sm-12 mx-auto wow fadeInUp service-tag" data-wow-delay=".3s">
                        <Link to="/booking" onClick={() => window.scrollTo(0, 0)}>
                        <div className="bg-light rounded p-5 services-item">
                            <div className="d-flex" style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                                <div className="mb-4">
                                    <img src={"/assets/img/domestichelp.jpg"} style={imgService} alt="domestichelp"/>
                                </div>
                            </div>
                            {/*<img src={domestichelp} style={imgService} alt="domestichelp"/>*/}
                            <h4 style={h4size}>Giúp việc nhà</h4>

                            <RatingStars rating={3.4}/>
                        </div>
                        </Link>
                    </div>
                    <div className="col-xxl-2 col-lg-4 col-md-6 col-sm-12 mx-auto wow fadeInUp service-tag" data-wow-delay=".5s">
                        <div className="bg-light rounded p-5 services-item">
                            <div className="d-flex" style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                                <div className="mb-4">
                                    <img src={"assets/img/cook.jpg"} style={imgService} alt="domestichelp"/>
                                </div>
                            </div>
                            <h4 className="text-center" style={h4size}>Nấu ăn</h4>
                            <RatingStars rating={3.4}/>

                        </div>
                    </div>
                    <div className="col-xxl-2 col-lg-4 col-md-6 col-sm-12 mx-auto wow fadeInUp service-tag" data-wow-delay=".7s">
                        <div className="bg-light rounded p-5 services-item">
                            <div className="d-flex" style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                                <div className="mb-4">
                                    <img src={"/assets/img/babysitter.jpg"} style={imgService} alt="domestichelp"/>
                                </div>
                            </div>
                            <h4 className="text-center" style={h4size}>Trông trẻ</h4>
                            <RatingStars rating={3.4}/>

                        </div>
                    </div>
                    <div className="col-xxl-2 col-lg-4 col-md-6 col-sm-12 mx-auto wow fadeInUp service-tag" data-wow-delay=".9s">
                        <div className="bg-light rounded p-5 services-item">
                            <div className="d-flex" style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                                <div className="mb-4">
                                    <img src={"/assets/img/allrounder.png"} style={imgService} alt="domestichelp"/>
                                </div>
                            </div>
                            <h4 className="text-center" style={h4size}>Giúp việc đa năng</h4>
                            <RatingStars rating={3.4}/>

                        </div>
                    </div>
                    <div className="col-xxl-2 col-lg-4 col-md-6 col-sm-12 mx-auto wow fadeInUp service-tag" data-wow-delay=".9s">
                        <div className="bg-light rounded p-5 services-item">
                            <div className="d-flex" style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                                <div className="mb-4">
                                    <img src={"/assets/img/livein.jpeg"} style={imgService} alt="domestichelp"/>
                                </div>
                            </div>
                            <h4 className="text-center" style={h4size}>Giúp việc 24/7</h4>
                            <RatingStars rating={3.4}/>

                        </div>
                    </div>
=======
                <div className="row g-5" style={{'--bs-gutter-x': '0.1rem'}}>
                    {categories.map((category, index) => {
                        return (
                            <div key={index} className="col-xxl-2 col-lg-4 col-md-6 col-sm-12 mx-auto wow fadeInUp service-tag"
                                 data-wow-delay=".3s">
                                <Link to="/booking" onClick={() => window.scrollTo(0, 0)}>
                                    <div className="bg-light rounded p-5 services-item">
                                        <div className="d-flex"
                                             style={{alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
                                            <div className="mb-4">
                                                <img src={category.fileInfo.url} style={imgService} alt="domestichelp"/>
                                            </div>
                                        </div>
                                        <h4 style={h4size}>{category.name}</h4>
                                        <RatingStars rating={3.4}/>
                                    </div>
                                </Link>
                            </div>

                        )
                    })}

>>>>>>> 7e4c943eaa07c987a191d01b02a8b04f500a5e96:src/Components/Service/Service.jsx
                </div>

            </div>
        </div>
    )
}
export default Service;