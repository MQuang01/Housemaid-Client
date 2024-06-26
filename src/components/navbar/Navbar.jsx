import React, {useEffect, useState} from 'react'
import { Link } from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import {useJwt} from "react-jwt";

const Navbar = () => {
    const { isLoggedIn, logout } = useAuth();
    const [dataUser, setDataUser] = useState( {}) ;

    useEffect(() => {
        if(localStorage.getItem("infoUser")) {
            setDataUser(JSON.parse(localStorage.getItem("infoUser")));
        }
    }, [])


    const handleLogout = () => {
        logout();
        window.location.href = "/";
        localStorage.clear();
        // sessionStorage.removeItem('user');
    }


    return(
        <>
        <div className="container-fluid topbar-top bg-primary">
            <div className="container">
                <div className="d-flex justify-content-between topbar py-2">
                    <div className="d-flex align-items-center flex-shrink-0 topbar-info">
                        <a href="#" className="me-4 text-secondary"><i className="fas fa-map-marker-alt me-2 text-dark"></i>28 Nguyễn Tri Phương</a>
                        <a href="#" className="me-4 text-secondary"><i className="fas fa-phone-alt me-2 text-dark"></i>+(84) 123 456 84 </a>
                        <a href="#" className="text-secondary"><i className="fas fa-envelope me-2 text-dark"></i>housemaid.huecity@gmail.com</a>
                    </div>
                    <div className="text-end pe-4 me-4 border-end border-dark search-btn">
                        <div className="search-form">
                            <form method="post" action="/index.html">
                                <div className="form-group">
                                    <div className="d-flex">
                                        <input type="search" className="form-control border-0 rounded-pill" name="search-input" value="" placeholder="Tìm kiếm" required="" />
                                        <button type="submit" value="Search Now!" className="btn"><i className="fa fa-search text-dark"></i></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-center topbar-icon">
                        <a href="#" className="me-4"><i className="fab fa-facebook-f text-dark"></i></a>
                        <a href="#" className="me-4"><i className="fab fa-twitter text-dark"></i></a>
                        <a href="#" className="me-4"><i className="fab fa-instagram text-dark"></i></a>
                    </div>
                </div>
            </div>
        </div>


        <div className="container-fluid bg-dark">
            <div className="container">
                <nav className="navbar navbar-dark navbar-expand-lg py-lg-0">
                    <a href="/" className="navbar-brand">
                        <h1 className="text-primary mb-0 display-5">House<span className="text-white">Maid</span><i className="fa fa-broom text-primary ms-2"></i></h1>
                    </a>
                    <button className="navbar-toggler bg-primary" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="fa fa-bars text-dark"></span>
                    </button>
                    <div className="collapse navbar-collapse me-n3" id="navbarCollapse">
                        <div className="navbar-nav ms-auto d-flex align-items-center">
                            <a href="/" className="nav-item nav-link active">Trang chủ</a>
                            <a href="about.html" className="nav-item nav-link">Thông tin</a>
                            <a href="#service-list" className="nav-item nav-link">Dịch vụ</a>
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Mục lục</a>
                                <div className="dropdown-menu m-0 bg-primary">
                                    <a href="#table-price" className="dropdown-item">Bảng giá</a>
                                    <a href="testimonial.html" className="dropdown-item">Testimonial</a>
                                </div>
                            </div>
                            <a href="contact.html" className="nav-item nav-link">Liên hệ</a>
                            {isLoggedIn ? (
                                <div className="nav-item dropdown" title={dataUser?.fullName}>
                                    <a href="#" className="nav-link">
                                        <img className="rounded-circle"
                                             src={dataUser?.fileInfoResDto ? dataUser?.fileInfoResDto.url : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                             alt="user.png" style={{width: 50, height: 40}}/>
                                    </a>
                                    <div className="dropdown-menu m-0 bg-primary">
                                        <a href="/profile" className="dropdown-item">Trang cá nhân</a>
                                        <a href="#" className="dropdown-item" onClick={handleLogout}>Đăng xuất</a>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <Link to="/auth?mode=login" className="nav-item nav-link">Đăng nhập</Link>||
                                    <Link to="/auth?mode=register" className="nav-item nav-link">Đăng ký</Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>
            </div>
        </div>
        </>
        // Navbar End
    )
}

export default Navbar