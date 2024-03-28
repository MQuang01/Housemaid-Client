import Navbar from "../navbar/Navbar";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import './OrderConfirm.css'
import Footer from "../footer/Footer";
const OrderConfirm = () => {
    const [user, setUser] = useState({
        fullName: 'Nguyễn Văn A',
        email: 'ngva@gmail.com',
        address: 'Huế',
        phone: '01923912',
        dob: '02/05/2002',
        gender: 'male',
        username: 'nguyenvanaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        password: '123123',
        createdAt: '16/02/2023',
        fileInfoResDto:'https://bootdey.com/img/Content/avatar/avatar1.png'
    });

    return(
        <>
        <Navbar/>
            <div>
                <nav >
                    <ol className="breadcrumb mb-0 animated slideInDown" style={{fontSize:'20px',marginLeft:'112px',marginTop:'50px'}}>
                        <li className="breadcrumb-item" ><a href="/">Trang chủ</a></li>
                        <li className="breadcrumb-item" ><a href="/booking">Đặt lịch</a></li>
                        <li className="breadcrumb-item " aria-current="page">Xác nhận đơn hàng</li>
                    </ol>
                </nav>
            </div>

            <div className="container-fluid py-3 wow fadeInUp" data-wow-delay=".3s">
                <div className="container py-3">
                    <div className="bg-light px-4 py-3 rounded">
                        <div className="text-center">
                            <Link to={"/"} className="d-flex justify-content-center mb-4">
                                <h3 className='text-primary mb-0 display-5'>
                                    House
                                    <span className="text-black-50">Maid</span>
                                    <i className="fa fa-broom text-primary ms-2"></i>
                                </h3>
                            </Link>

                            <h3 className="display-5 mb-5">Công ty HOUSEMAID</h3>

                            <div className="d-flex justify-content-center align-items-center" >
                                <div className="mb-3 mt-4 row" style={{maxWidth: '700px', width: '100%', borderRadius:'10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', padding:'20px'}}>
                                    <label className="form-label" >Địa chỉ</label>
                                    <div className="order-confirm" >
                                        <div className="user-info">
                                            <h4>Thông tin khách hàng</h4>

                                            <div className="order-info">
                                                    <h6>Tên khách hàng: </h6>
                                                    <h6>{user.fullName}</h6>
                                            </div>
                                            <div className="order-info">
                                                <h6>Địa chỉ: </h6>
                                                <h6>{user.address}</h6>
                                            </div>
                                            <div className="order-info">
                                                <h6>Email: </h6>
                                                <h6>{user.email}</h6>
                                            </div>
                                            <div className="order-info">
                                                <h6>Số điện thoại: </h6>
                                                <h6>{user.phone}</h6>
                                            </div>

                                        </div>
                                        <div className="bill-info">

                                            <h4>Thông tin hóa đơn</h4>

                                            <div className="order-info">
                                                <h6>Dịch vụ đã chọn:</h6>
                                                <h6>{user.phone}</h6>
                                            </div>
                                            <div className="order-info">
                                                <h6>Chi tiết dịch vụ:</h6>
                                            </div>
                                            <table className="table-container">
                                                <thead>
                                                    <tr>
                                                        <th>Tên công việc</th>
                                                        <th>Số lượng</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Pest Control-1</td>
                                                        <td>30 phút/đơn vị</td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <div className="order-info">
                                                <h6>Số lượng nhân viên: </h6>
                                                <h6>{user.phone}</h6>
                                            </div>
                                            <div className="order-info">
                                                <h6>Ngày bắt đầu: </h6>
                                                <h6>{user.phone}</h6>
                                            </div>
                                            <div className="order-info">
                                                <h6>Thời gian bắt đầu làm việc: </h6>
                                                <h6>{user.phone}</h6>
                                            </div>
                                            <div className="order-info">
                                                <h6>Ghi chú: </h6>
                                                <h6>{user.phone}</h6>
                                            </div>
                                            <div className="order-info">
                                                <h6>Tổng thời gian: </h6>
                                                <h6>{user.phone}</h6>
                                            </div>
                                            <div className="order-info">
                                                <h6>Tổng giá tiền: </h6>
                                                <h6>{user.phone}</h6>
                                            </div>


                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>


        </>
    )
}

export default OrderConfirm;