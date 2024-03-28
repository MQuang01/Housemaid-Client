export const Carousel = ({ active ,urlImage, title1, title2, title3, listHighlight }) => {
    return (
        <div className={`carousel-item ${active ? "active": ""}`}>
            <img src={urlImage} className="img-fluid w-100" alt="Third slide"/>
            <div className="carousel-caption">
                <div className="container carousel-content">
                    <h1 className="text-primary text-uppercase mb-2 animated slideInDown">{title1}</h1>
                    <h1 className="text-white text-uppercase mb-3 animated slideInDown">{title2}</h1>
                    <h1 className="text-white text-uppercase display-2 mb-3 animated slideInDown ">
                        {title3}</h1>
                    <div className="mb-1 d-flex align-items-center justify-content-center">
                        <hr style={{width: 888}}/>
                    </div>
                    <ul style={{fontSize: '20px', marginBottom: 40}}>
                        {listHighlight.map((highlight, index) => {
                            return <li className="text-uppercase list-unstyled" style={{lineHeight: 1.5}} key={index}>
                                <i className="text-primary fa-solid fa-check me-3"></i>{highlight}
                            </li>
                        })}

                    </ul>
                    <a href="#service-list">
                        <button
                            style={{marginLeft: 30}}
                            type="button"
                            className="px-5 py-3 btn btn-primary border-2 rounded-pill animated slideInDown">
                            Đặt dịch vụ
                        </button>
                    </a>
                </div>
            </div>
        </div>
    )
}