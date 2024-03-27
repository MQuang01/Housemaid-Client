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
                  <div className="carousel-item active" >
                      <img src={"/assets/img/carousel-1.jpg"} className="img-fluid w-100" alt="First slide" />
                      <div className="carousel-caption">
                          <div className="container carousel-content" style={{marginTop:"-100px"}}>
                              <h4 className="text-white mb-4 animated slideInDown">Vì một ngôi nhà sạch đẹp</h4>
                              <h5 className="text-white display-1 mb-4 animated slideInDown">Dịch vụ vệ sinh nhà ở mới giá rẻ 2024</h5>
                              <ul style={{fontSize:'20px'}}>
                                  <li>Cam kết giá tốt nhất</li>
                                  <li>Chất lượng hàng đầu</li>
                                  <li>Chiết khấu hấp dẫn</li>
                                  <li>Chăm sóc khách hàng 5 sao</li>
                                  <li>Công nghệ vệ sinh tốt nhất</li>

                              </ul>
                              <a href="#service-list" className="me-2"><button type="button" className="px-5 py-3 btn btn-primary border-2 rounded-pill animated slideInDown" onClick={() => setToastContent("Hãy thử chọn dịch vụ!")}>Đặt dịch vụ</button></a>
                          </div>
                      </div>
                  </div>
                  <div className="carousel-item">
                      <img src={"/assets/img/carousel-2.jpg"} className="img-fluid w-100" alt="Second slide"/>
                      <div className="carousel-caption">
                          <div className="container carousel-content" style={{marginTop:"-100px"}}>
                              <h4 className="text-white mb-4 animated slideInDown">Vì một ngôi nhà sạch đẹp</h4>
                              <h5 className="text-white display-1 mb-4 animated slideInDown">Dịch vụ vệ sinh nhà ở mới giá rẻ 2024</h5>
                              <ul style={{fontSize:'20px'}}>
                                  <li>Cam kết giá tốt nhất</li>
                                  <li>Chất lượng hàng đầu</li>
                                  <li>Chiết khấu hấp dẫn</li>
                                  <li>Chăm sóc khách hàng 5 sao</li>
                                  <li>Công nghệ vệ sinh tốt nhất</li>

                              </ul>
                              <a href="#service-list" className="me-2"><button type="button" className="px-5 py-3 btn btn-primary border-2 rounded-pill animated slideInDown" onClick={() => setToastContent("Hãy thử chọn dịch vụ!")}>Đặt dịch vụ</button></a>
                          </div>
                      </div>
                  </div>
                  <div className="carousel-item">
                      <img src={"/assets/img/carousel-3.jpg"} className="img-fluid w-100" alt="Third slide"/>
                      <div className="carousel-caption">
                          <div className="container carousel-content" style={{marginTop:"-100px"}}>
                              <h4 className="text-white mb-4 animated slideInDown">Vì một ngôi nhà sạch đẹp</h4>
                              <h5 className="text-white display-1 mb-4 animated slideInDown">Dịch vụ vệ sinh nhà ở mới giá rẻ 2024</h5>
                              <ul style={{fontSize:'20px'}}>
                                  <li>Cam kết giá tốt nhất</li>
                                  <li>Chất lượng hàng đầu</li>
                                  <li>Chiết khấu hấp dẫn</li>
                                  <li>Chăm sóc khách hàng 5 sao</li>
                                  <li>Công nghệ vệ sinh tốt nhất</li>

                              </ul>
                              <a href="#service-list" className="me-2"><button type="button" className="px-5 py-3 btn btn-primary border-2 rounded-pill animated slideInDown" onClick={() => setToastContent("Hãy thử chọn dịch vụ!")}>Đặt dịch vụ</button></a>
                          </div>
                      </div>
                  </div>
                  <div className="carousel-item">
                      <img src={"/assets/img/carousel-4.jpg"} className="img-fluid w-100" alt="Fourth slide"/>
                      <div className="carousel-caption">
                          <div className="container carousel-content" style={{marginTop:"-100px"}}>
                              <h4 className="text-white mb-4 animated slideInDown">Vì một ngôi nhà sạch đẹp</h4>
                              <h5 className="text-white display-1 mb-4 animated slideInDown">Dịch vụ vệ sinh nhà ở mới giá rẻ 2024</h5>
                              <ul style={{fontSize:'20px'}}>
                                  <li>Cam kết giá tốt nhất</li>
                                  <li>Chất lượng hàng đầu</li>
                                  <li>Chiết khấu hấp dẫn</li>
                                  <li>Chăm sóc khách hàng 5 sao</li>
                                  <li>Công nghệ vệ sinh tốt nhất</li>

                              </ul>
                              <a href="#service-list" className="me-2"><button type="button" className="px-5 py-3 btn btn-primary border-2 rounded-pill animated slideInDown" onClick={() => setToastContent("Hãy thử chọn dịch vụ!")}>Đặt dịch vụ</button></a>
                          </div>
                      </div>
                  </div>
                  <div className="carousel-item">
                      <img src={"/assets/img/carousel-5.jpg"} className="img-fluid w-100" alt="Fifth slide"/>
                      <div className="carousel-caption">
                          <div className="container carousel-content" style={{marginTop:"-100px"}}>
                              <h4 className="text-white mb-4 animated slideInDown">Vì một ngôi nhà sạch đẹp</h4>
                              <h5 className="text-white display-1 mb-4 animated slideInDown">Dịch vụ vệ sinh nhà ở mới giá rẻ 2024</h5>
                              <ul style={{fontSize:'20px'}}>
                                  <li>Cam kết giá tốt nhất</li>
                                  <li>Chất lượng hàng đầu</li>
                                  <li>Chiết khấu hấp dẫn</li>
                                  <li>Chăm sóc khách hàng 5 sao</li>
                                  <li>Công nghệ vệ sinh tốt nhất</li>

                              </ul>
                              <a href="#service-list" className="me-2"><button type="button" className="px-5 py-3 btn btn-primary border-2 rounded-pill animated slideInDown" onClick={() => setToastContent("Hãy thử chọn dịch vụ!")}>Đặt dịch vụ</button></a>
                          </div>
                      </div>
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

      </div>

  )
}

export default Slide;