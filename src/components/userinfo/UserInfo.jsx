import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import React, {useEffect, useState} from "react";
import './UserInfo.css'
import {useAuth} from "../../context/AuthContext";
import {fetchUserByUserName} from "../../service/AuthService";
import {formatYYYYMMDDToDDMMYYYY} from "../../until/FormatTime";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
    fullName: yup.string()
        .required("Yêu cầu nhập Họ và Tên")
        .matches(/^[a-zA-Z\s]+$/, "Họ và tên chỉ được chứa chữ cái và khoảng trắng")
        .min(3, "Họ và tên ít nhất 3 ký tự")
        .max(50, "Họ và tên không được vượt quá 50 ký tự"),
    email: yup.string()
        .email("VD : example@example.com")
        .required("Yêu cầu nhập email"),
    address: yup.string()
        .required("Yêu cầu nhập địa chỉ")
        .min(10, "Địa chỉ ít nhất 10 ký tự")
        .max(100, "Địa chỉ không được vượt quá 100 ký tự"),
    phone: yup.string()
        .required("Yêu cầu nhập SĐT")
        .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "Yêu cầu nhập đúng số điện thoại")
        .min(10, "SĐT phải có ít nhất 10 số")
        .max(11, "SĐT không được vượt quá 11 số"),
    dob: yup.date()
        .required("Yêu cầu nhập ngày sinh")
        .max(new Date(), "Ngày phải nhỏ hơn ngày hiện tại").typeError("Vui lòng chọn ngày"),
    oldPsw: yup.string()
        .required("Không được để trống")
        .min(6, "Mật khẩu ít nhất 6 kí tự"),
    newPsw: yup.string()
        .required("Không được để trống")
        .matches(/^[^\s]+$/, "Mật khẩu không được có dấu cách")
        .min(6, "Mật khẩu ít nhất 6 kí tự")
        .max(30, "Mật khẩu không được quá 30 kí tự"),
    confirmPsw: yup.string()
        .required("Không được để trống")
        .oneOf([yup.ref("newPsw")], "Mật không khởp")
})
const UserInfo = () => {
    // Khởi tạo state để lưu trữ thông tin của user
    const [isUpdatedUser, setIsUpdatedUser] = useState(true)

    const {isLoggedIn} = useAuth();
    const [dataUser, setDataUser] = useState(JSON.parse(localStorage.getItem("infoUser")) || {});

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
        resetField
    } = useForm({
        resolver: yupResolver(schema)
    })

    const [user, setUser] = useState({
        username: dataUser?.username,
        fullName: dataUser?.fullName,
        email: dataUser?.email,
        dob: dataUser?.dob,
        gender: dataUser?.gender,
        phone: dataUser?.phone,
        address: dataUser?.address,
        urlIMG: dataUser?.fileInfoResDto.url
    })
    useEffect(() => {
        if (dataUser) {
            fetchUserByUserName(dataUser.username).then(res => {
                setDataUser(res)
            })
        }
    }, [dataUser]);


    const handleUpdateTrue = (event) => {
        event.preventDefault();
        setIsUpdatedUser(true);
    }
    const handleUpdateFalse = (event) => {
        event.preventDefault();
        setIsUpdatedUser(false);
    }

    const [isShowPassword, setIsShowPassword] = useState({
        password: false,
        confirmPassword: false,
        oldPassword: false
    });

    const toggleShowPassword = (fieldName) => {
        setIsShowPassword(prevState => ({
            ...prevState,
            [fieldName]: !prevState[fieldName]
        }));
    };


    function getGenderString(gender) {
        if (gender === "FEMALE") {
            return "Nữ";
        } else if (gender === "MALE") {
            return "Nam";
        } else {
            return "Khác";
        }

    }


    function handleUpdatePassword() {

    }

    function handleUpdateInfo() {

    }

    return (
        <>
            <Navbar/>
            <div>
                <nav>
                    <ol className="breadcrumb mb-0 animated slideInDown"
                        style={{fontSize: '20px', marginLeft: '112px', marginTop: '50px'}}>
                        <li className="breadcrumb-item"><a href="/">Trang chủ</a></li>
                        <li className="breadcrumb-item " aria-current="page" style={{color: 'black'}}>Thông tin</li>

                    </ol>
                </nav>
            </div>

            <div className="container" style={{marginLeft: '190px'}}>
                <div className="view-account">
                    <section className="module">
                        <div className="module-inner">
                            <div className="side-bar" style={{marginTop: '70px'}}>
                                <div className="user-info">
                                    <img className="img-profile img-circle img-responsive center-block"
                                         src={user?.urlIMG ? user?.urlIMG : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                         alt="Ảnh cá nhân"/>
                                    <ul className="meta list list-unstyled">
                                        <li className="name">{user.fullName}
                                        </li>
                                        <li className="email"><a href="#">{user.email}</a></li>
                                    </ul>
                                </div>
                                <nav className="side-menu">
                                    <ul className="nav">
                                        <li onClick={handleUpdateTrue}><a href="#"><span
                                            className="fa fa-user"></span> Thông tin</a></li>
                                        <li onClick={handleUpdateFalse}><a href="#"><span
                                            className="fa fa-cog"></span> Đổi mật khẩu</a></li>
                                    </ul>
                                </nav>
                            </div>

                            <div className="d-flex justify-content-center align-items-center">
                                {isUpdatedUser ? (
                                    <form onSubmit={handleSubmit(handleUpdateInfo)} className="needs-validation mb-4"
                                          style={{
                                              maxWidth: '800px',
                                              width: '100%',
                                              borderRadius: '10px',
                                              boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                                              padding: '20px',
                                              margin: '100px'
                                          }}>
                                        <div className="text-left row g-4">
                                            <div className="col-md-12">
                                                <h1>Thông tin cá nhân người dùng</h1>
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <div className="col-md-3">
                                                <label className="form-label" htmlFor="basic-icon-default-fullname">Họ
                                                    và Tên</label>
                                            </div>
                                            <div className="col-md-9">
                                                <div className="input-group input-group-merge">
                                            <span id="basic-icon-default-fullname2" className="input-group-text">
                                                <i className="fa fa-user"></i>
                                            </span>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={user.fullName}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-3 mt-4 row">
                                            <div className="col-md-3">
                                                <label className="form-label" htmlFor="basic-icon-default-address">
                                                    Địa chỉ</label>
                                            </div>
                                            <div className="col-md-9">
                                                <div className="input-group input-group-merge">
                                                    <span className="input-group-text"><i
                                                        className="fa fa-map-marker"></i></span>
                                                    <input
                                                        type="text"
                                                        id="basic-icon-default-address"
                                                        className="form-control"
                                                        value={user.address}
                                                    />

                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <div className="col-md-3">
                                                <label className="form-label"
                                                       htmlFor="basic-icon-default-email">Email</label>
                                            </div>
                                            <div className="col-md-9">
                                                <div className="input-group input-group-merge">
                                                    <span className="input-group-text"><i
                                                        className="fa fa-envelope"></i></span>
                                                    <input
                                                        type="email"
                                                        id="basic-icon-default-email"
                                                        className="form-control"
                                                        value={user.email}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <div className="col-md-3">
                                                <label className="form-label" htmlFor="basic-icon-default-phone">Số điện
                                                    thoại</label>
                                            </div>
                                            <div className="col-md-9">
                                                <div className="input-group input-group-merge">
                                            <span id="basic-icon-default-phone2" className="input-group-text">
                                                <i className="fa fa-phone"></i>
                                            </span>
                                                    <input
                                                        type="number"
                                                        id="basic-icon-default-phone"
                                                        className="form-control phone-mask"
                                                        value={user.phone}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <div className="col-md-3">
                                                <label className="form-label" htmlFor="basic-icon-default-phone">Ngày
                                                    tháng năm sinh</label>
                                            </div>
                                            <div className="col-md-9">
                                                <div className="input-group input-group-merge">
                                        <span id="basic-icon-default-phone2" className="input-group-text">
                                            <i className="fa-solid fa-cake-candles"></i>
                                        </span>
                                                    <input
                                                        type="text"
                                                        id="basic-icon-default-phone"
                                                        className="form-control phone-mask"
                                                        value={user.dob ? formatYYYYMMDDToDDMMYYYY(user.dob) : ""}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-3 row">
                                            <div className="col-md-3">
                                                <label className="form-label" htmlFor="basic-icon-default-phone">Giới
                                                    tính</label>
                                            </div>
                                            <div className="col-md-9">
                                                <div className="input-group input-group-merge">
                                                    <input
                                                        type="text"
                                                        id="basic-icon-default-phone"
                                                        className="form-control phone-mask"
                                                        value={getGenderString(user.gender)}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-center row g-4 ">
                                            <div className="col-md-12">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary border-0 rounded-pill px-4 py-3"
                                                >
                                                    Cập nhật
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                ) : (
                                    <form onSubmit={handleSubmit(handleUpdatePassword)}
                                          className="needs-validation mb-4" style={{
                                        maxWidth: '800px',
                                        width: '100%',
                                        borderRadius: '10px',
                                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                                        padding: '20px',
                                        margin: '100px'
                                    }}>
                                        <div className="text-left row g-4">
                                            <div className="col-md-12">
                                                <h1>Thông tin cá nhân người dùng</h1>
                                            </div>
                                        </div>

                                        <div className="mb-3 row form-group has-validation">
                                            <div className="col-md-3">
                                                <label className="form-label" htmlFor="basic-icon-default-fullname">
                                                    Mật khẩu cũ</label>
                                            </div>
                                            <div className="col-md-9">

                                                <div className="input-group input-group-merge">

                                                        <span id="basic-icon-default-fullname2"
                                                              className="input-group-text">
                                                            <i className="fa-solid fa-key"></i>
                                                        </span>

                                                    <input
                                                        type={`${isShowPassword.oldPassword ? "text" : "password"}`}
                                                        className={`form-control ${errors?.oldPsw?.message ? "is-invalid" : ""}`}
                                                        {...register("oldPassword")}
                                                    />

                                                    <span
                                                        id="hide-password"
                                                        className="input-group-text"
                                                        style={{
                                                            cursor: 'pointer',
                                                            color: '#000',
                                                            background: '#FDF000'
                                                        }}
                                                        onClick={() => toggleShowPassword('oldPsw')}
                                                    >
                                                            <i className={`fa ms-2 ${isShowPassword.oldPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
                                                        </span>
                                                    <span
                                                        className="invalid-feedback">{errors?.oldPsw?.message}</span>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="mb-3 mt-4 row">

                                            <div className="col-md-3">
                                                <label className="form-label" htmlFor="basic-icon-default-address">
                                                    Mật khẩu mới</label>
                                            </div>

                                            <div className="col-md-9 form-group has-validation">

                                                <div className="input-group input-group-merge">
                                                            <span className="input-group-text"><i
                                                                className="fa-solid fa-lock"></i></span>
                                                    <input
                                                        type={`${isShowPassword.password ? "text" : "password"}`}
                                                        className={`form-control ${errors?.newPsw?.message ? "is-invalid" : ""}`}
                                                        {...register("newPsw")}
                                                    />
                                                    <span
                                                        id="hide-password"
                                                        className="input-group-text"
                                                        style={{
                                                            cursor: 'pointer',
                                                            color: '#000',
                                                            background: '#FDF000'
                                                        }}
                                                        onClick={() => toggleShowPassword('password')}
                                                    >
                                                                <i className={`fa ms-2 ${isShowPassword.password ? "fa-eye" : "fa-eye-slash"}`}></i>
                                                            </span>
                                                    <span
                                                        className="invalid-feedback">{errors?.newPsw?.message}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-3 mt-4 row">
                                            <div className="col-md-3">
                                                <label className="form-label" htmlFor="basic-icon-default-address">
                                                    Nhập lại mật khẩu mới</label>
                                            </div>
                                            <div className="col-md-9 form-group has-validation">

                                                <div className="input-group input-group-merge">
                                                    <span className="input-group-text"><i
                                                        className="fa-solid fa-lock"></i></span>
                                                    <input
                                                        type={`${isShowPassword.confirmPassword ? "text" : "password"}`}
                                                        className={`form-control ${errors?.confirmPsw?.message ? "is-invalid" : ""}`}
                                                        {...register("confirmPsw")}
                                                    />
                                                    <span
                                                        id="hide-password"
                                                        className="input-group-text"
                                                        style={{
                                                            cursor: 'pointer',
                                                            color: '#000',
                                                            background: '#FDF000'
                                                        }}
                                                        onClick={() => toggleShowPassword('confirmPassword')}

                                                    >
                                                        <i className={`fa ms-2 ${isShowPassword.confirmPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
                                                        </span>
                                                    <span
                                                        className="invalid-feedback">{errors?.confirmPsw?.message}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-center row g-4 ">
                                            <div className="col-md-12">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary border-0 rounded-pill px-4 py-3"
                                                >
                                                    Cập nhật
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </div>

                        </div>
                    </section>
                </div>
            </div>

            <Footer/>
        </>
    )
}
export default UserInfo;