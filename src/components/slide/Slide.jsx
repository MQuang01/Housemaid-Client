import React from 'react'
import {Carousel} from "./Carousel";

const Slide = () => {

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

                  <Carousel active="active" urlImage="/assets/img/carousel-1.jpg"
                            title1="Thuởng thức"
                            title2="Một ngôi nhà sạch sẽ, một cách dễ dàng"
                            title3="Với dịch vụ giúp việc bán thời gian của chúng tôi"
                            {...{
                                listHighlight: [
                                    "Dịch vụ giúp việc bán thời gian chuyên nghiệp và kinh nghiệm",
                                    "Dịch vụ vệ sinh nhanh chóng và hiệu quả",
                                    "Không có phí ẩn",
                                    "Dịch vụ vệ sinh một lần và định kỳ điều có sẵn",
                                    "Đảm bảo 100% sự hài lòng"
                                ]
                            }}
                  />
                  <Carousel urlImage="/assets/img/carousel-2.jpg"
                            title1="Tận hưởng"
                            title2="Một ngôi nhà sạch sẽ, một cách dễ dàng"
                            title3="Với dịch vụ giúp việc bán thời gian của chúng tôi"
                            {...{
                                listHighlight: [
                                    "Dịch vụ giúp việc bán thời gian chuyên nghiệp và kinh nghiệm",
                                    "Dịch vụ vệ sinh nhanh chóng và hiệu quả",
                                    "Không có phí ẩn",
                                    "Dịch vụ vệ sinh một lần và định kỳ điều có sẵn",
                                    "Đảm bảo 100% sự hài lòng"
                                ]
                            }}
                  />
                  <Carousel urlImage="/assets/img/carousel-3.jpg"
                            title1="Trải nghiệm"
                            title2="Một ngôi nhà sạch sẽ, một cách dễ dàng"
                            title3="Với dịch vụ giúp việc bán thời gian của chúng tôi"
                            {...{
                                listHighlight: [
                                    "Dịch vụ giúp việc bán thời gian chuyên nghiệp và kinh nghiệm",
                                    "Dịch vụ vệ sinh nhanh chóng và hiệu quả",
                                    "Không có phí ẩn",
                                    "Dịch vụ vệ sinh một lần và định kỳ điều có sẵn",
                                    "Đảm bảo 100% sự hài lòng"
                                ]
                            }}
                  />
                  <Carousel urlImage="/assets/img/carousel-4.jpg"
                            title1="Chiêm ngưỡng"
                            title2="Một ngôi nhà sạch sẽ, một cách dễ dàng"
                            title3="Với dịch vụ giúp việc bán thời gian của chúng tôi"
                            {...{
                                listHighlight: [
                                    "Dịch vụ giúp việc bán thời gian chuyên nghiệp và kinh nghiệm",
                                    "Dịch vụ vệ sinh nhanh chóng và hiệu quả",
                                    "Không có phí ẩn",
                                    "Dịch vụ vệ sinh một lần và định kỳ điều có sẵn",
                                    "Đảm bảo 100% sự hài lòng"
                                ]
                            }}
                  />
                  <Carousel urlImage="/assets/img/carousel-5.jpg"
                            title1="Sưởi ấm"
                            title2="Một ngôi nhà sạch sẽ, một cách dễ dàng"
                            title3="Với dịch vụ giúp việc bán thời gian của chúng tôi"
                            {...{
                                listHighlight: [
                                    "Dịch vụ giúp việc bán thời gian chuyên nghiệp và kinh nghiệm",
                                    "Dịch vụ vệ sinh nhanh chóng và hiệu quả",
                                    "Không có phí ẩn",
                                    "Dịch vụ vệ sinh một lần và định kỳ điều có sẵn",
                                    "Đảm bảo 100% sự hài lòng"
                                ]
                            }}
                  />

              </div>
              <button className="carousel-control-prev btn btn-primary border border-2 border-start-0 border-primary"
                      type="button" data-bs-target="#carouselId" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next btn btn-primary border border-2 border-end-0 border-primary"
                      type="button" data-bs-target="#carouselId" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
              </button>
          </div>

      </div>

    )
}

export default Slide;