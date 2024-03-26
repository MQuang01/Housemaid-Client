import React, {useEffect, useState} from 'react'
import axios from "axios";
import toastr from "toastr";

const Slide = () => {
    const [toastContent, setToastContent] = useState("");

    useEffect(() => {
        if (toastContent) {
            toastr.success(toastContent);
            setToastContent("");
        }
    })

    return (
      <div className="container-fluid carousel px-0 pb-5">
          <div id="carouselId" className="carousel slide" data-bs-ride="carousel">
              <ol className="carousel-indicators">
                  <li data-bs-target="#carouselId" data-bs-slide-to="0" className="active" aria-current="true" aria-label="First slide"></li>
                  <li data-bs-target="#carouselId" data-bs-slide-to="1" aria-label="Second slide"></li>
                  <li data-bs-target="#carouselId" data-bs-slide-to="2" aria-label="Third slide"></li>
                  <li data-bs-target="#carouselId" data-bs-slide-to="3" aria-label="Fourth slide"></li>
                  <li data-bs-target="#carouselId" data-bs-slide-to="4" aria-label="Fifth slide"></li>

              </ol>
              <div className="carousel-inner" role="listbox">
                  <div className="carousel-item active">
                      <img src={"/assets/img/carousel-1.jpg"} className="img-fluid w-100" alt="First slide" />
                  </div>
                  <div className="carousel-item">
                      <img src={"/assets/img/carousel-2.jpg"} className="img-fluid w-100" alt="Second slide"/>
                  </div>
                  <div className="carousel-item">
                      <img src={"/assets/img/carousel-3.jpg"} className="img-fluid w-100" alt="Third slide"/>
                  </div>
                  <div className="carousel-item">
                      <img src={"/assets/img/carousel-4.jpg"} className="img-fluid w-100" alt="Fourth slide"/>
                  </div>
                  <div className="carousel-item">
                      <img src={"/assets/img/carousel-5.jpg"} className="img-fluid w-100" alt="Fifth slide"/>
                  </div>

              </div>
              <button className="carousel-control-prev btn btn-primary border border-2 border-start-0 border-primary" type="button" data-bs-target="#carouselId" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next btn btn-primary border border-2 border-end-0 border-primary" type="button" data-bs-target="#carouselId" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
              </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
              <button type="button" className="btn btn-primary border-0 rounded-pill px-4 py-3 mt-4 wow fadeInUp" data-wow-delay=".3s" onClick={() => setToastContent("Hãy thử chọn dịch vụ!")}>
                  Đặt dịch vụ
              </button>
          </div>
      </div>

  )
}

export default Slide;