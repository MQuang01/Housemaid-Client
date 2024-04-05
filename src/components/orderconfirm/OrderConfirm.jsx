import Navbar from "../navbar/Navbar";
import {Link, useLocation, useParams, useSearchParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import './OrderConfirm.css'
import Footer from "../footer/Footer";
import {useDispatch, useSelector} from "react-redux";
import {fetchOrderByCode} from "../../service/OrderService";
import {formatMoney} from "../../until/FormatMoney";
import {formatMinutesToDetail, formatYYYYMMDDToDDMMYYYY} from "../../until/FormatTime";

const OrderConfirm = () => {
    const [infoUser, setInfoUser] = useState({});
    const dispatch = useDispatch();
    const location = useLocation();
    //const searchParams = new URLSearchParams(location.search);
    const [searchParams, setSearchParams] = useSearchParams();

    const cod = searchParams.get('cod');
    const userId = searchParams.get('userId');

    const [dataUser, setDataUser] = useState(JSON.parse(localStorage.getItem("infoUser")) || {});
    const [dataOrder, setDataOrder] = useState({});



    useEffect(() => {
        if (dataUser) {
            // console.log(cod, userId);

            fetchOrderByCode(cod, userId).then(res => {
                setDataOrder(res)
            })
            setInfoUser({
                phone: dataUser.phone || "",
                email: dataUser.email || "",
                name: dataUser.fullName || ""
            });
        }
    }, [dataUser]);

    return (
        <>
            <Navbar/>
            <div>
                <nav>
                    <ol className="breadcrumb mb-0 animated slideInDown"
                        style={{fontSize: '20px', marginLeft: '112px', marginTop: '50px'}}>
                        <li className="breadcrumb-item"><a href="/">Trang chủ</a></li>
                        <li className="breadcrumb-item"><a href="/booking">Đặt lịch</a></li>
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

                            <div className="d-flex justify-content-center align-items-center">
                                <div className="mb-3 mt-4 row" style={{
                                    maxWidth: '700px',
                                    width: '100%',
                                    borderRadius: '10px',
                                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                                    padding: '20px'
                                }}>
                                    <label className="form-label">Địa chỉ</label>
                                    <div className="order-confirm">
                                        <div className="user-info">
                                            <h4>Thông tin khách hàng</h4>

                                            <div className="order-info">
                                                <h6>Tên khách hàng: </h6>
                                                <h6>{infoUser.name}</h6>
                                            </div>
                                            <div className="order-info">
                                                <h6>Địa chỉ: </h6>
                                                <h6>{dataOrder.address || ""}</h6>
                                            </div>
                                            <div className="order-info">
                                                <h6>Email: </h6>
                                                <h6>{infoUser.email}</h6>
                                            </div>
                                            <div className="order-info">
                                                <h6>Số điện thoại: </h6>
                                                <h6>{infoUser.phone}</h6>
                                            </div>

                                        </div>
                                        <div className="bill-info">

                                            <h4>Thông tin hóa đơn</h4>

                                            <div className="order-info">
                                                <h6>Số lượng nhân viên: </h6>
                                                <h6>{dataOrder.quantityEmployee || ""}</h6>
                                            </div>
                                            <div className="order-info">
                                                <h6>Ngày làm việc: </h6>
                                                <h6>{dataOrder.workDay? formatYYYYMMDDToDDMMYYYY(dataOrder.workDay) : ""}</h6>
                                            </div>
                                            <div className="order-info">
                                                <h6>Thời gian bắt đầu: </h6>
                                                <h6>{dataOrder.timeStart || ""}</h6>
                                            </div>
                                            <div className="order-info">
                                                <h6>Thời gian kết thúc: </h6>
                                                <h6>{dataOrder.timeEnd || ""}</h6>
                                            </div>
                                            <div className="order-info">
                                                <h6>Ghi chú: </h6>
                                                <h6>{dataOrder.note || ""}</h6>
                                            </div>
                                            <div className="order-info">
                                                <h6>Tổng giá tiền: </h6>
                                                <h6>{dataOrder.total? formatMoney(dataOrder.total) : ""}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*<LoadingModal isLoading={isLoading}></LoadingModal>*/}
            <Footer/>


        </>
    )
}

export default OrderConfirm;