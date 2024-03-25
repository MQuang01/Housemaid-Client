
import {Link} from "react-router-dom";
import RatingStars from "./RatingStars";
import {useEffect, useState} from "react";
import axios from "axios";
import {InforUrl} from "../until/InforUrl";
import {fetchCategory} from "../../service/CategoryService";

const Category = () => {
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
        fetchCategory().then((data) => setCategory(data));
    }, []);



    return (
        <div className="container-fluid services" id="service-list">
            <div className="container text-center py-5">
                <div className="text-center mb-5 wow fadeInUp" data-wow-delay=".3s">
                    <h5 className="mb-2 px-3 py-1 text-dark rounded-pill d-inline-block border border-2 border-primary">Dịch
                        vụ nổi bật </h5>
                    <h2>Với trình độ nghiệp vụ được đào tạo bài bản, nhân viên tại đây luôn làm việc với tinh thần trách
                        nhiệm cao nhất.</h2>
                </div>

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
                                                <img src={category.url} style={imgService} alt="domestichelp"/>
                                            </div>
                                        </div>
                                        <h4 style={h4size}>{category.name}</h4>
                                        <RatingStars rating={category.averageRating}/>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    )
}
export default Category;