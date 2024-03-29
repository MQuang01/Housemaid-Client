import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import {useState} from "react";
import './UserInfo.css'

const UserInfo = () => {
    // Khởi tạo state để lưu trữ thông tin của user
    const [user, setUser] = useState({
        fullName: 'Nguyễn Văn A',
        email: 'ngva@gmail.com',
        address: 'Huế',
        phone: '01923912',
        dob: '02/05/2002',
        gender: 'male',
        username: 'nguyenvana',
        password: '123123',
        createdAt: '16/02/2023',
        fileInfoResDto:'https://bootdey.com/img/Content/avatar/avatar1.png'
    });

    const [isUpdatedUser, setIsUpdatedUser] = useState(true)

    // Hàm xử lý sự kiện khi giá trị của input thay đổi
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser({
            ...user,
            [name]: value
        });
    };

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
        console.log(isShowPassword)
    };




    return (
        <>
        <Navbar/>
            <div>
                <nav >
                    <ol className="breadcrumb mb-0 animated slideInDown" style={{fontSize:'20px',marginLeft:'112px',marginTop:'50px'}}>
                        <li className="breadcrumb-item" ><a href="/">Trang chủ</a></li>
                        <li className="breadcrumb-item " aria-current="page" style={{color:'black'}}>Thông tin</li>

                    </ol>
                </nav>
            </div>

            <div className="container" style={{marginLeft:'190px'}}>
                <div className="view-account">
                    <section className="module">
                        <div className="module-inner">
            <div className="side-bar" style={{marginTop:'70px'}}>
                <div className="user-info">
                    <img className="img-profile img-circle img-responsive center-block" src={user.fileInfoResDto} alt=""/>
                        <ul className="meta list list-unstyled">
                            <li className="name">{user.fullName}
                            </li>
                            <li className="email"><a href="#">{user.email}</a></li>
                        </ul>
                </div>
                <nav className="side-menu">
                    <ul className="nav">
                        <li onClick={handleUpdateTrue}><a href="#"><span className="fa fa-user"></span> Thông tin</a></li>
                        <li onClick={handleUpdateFalse}><a href="#"><span className="fa fa-cog"></span> Đổi mật khẩu</a></li>    
                    </ul>
                </nav>
            </div>

            <div className="d-flex justify-content-center align-items-center" >
                {isUpdatedUser ? (
                    <form action="#" className="mb-4" style={{maxWidth: '800px', width: '100%', borderRadius:'10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', padding:'20px',margin:'100px'}}>
                        <div className="text-left row g-4">
                            <div className="col-md-12">
                                <h1>Thông tin cá nhân người dùng</h1>
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <div className="col-md-3">
                                <label className="form-label" htmlFor="basic-icon-default-fullname">Họ và Tên</label>
                            </div>
                            <div className="col-md-9">
                                <div className="input-group input-group-merge">
                                    <span id="basic-icon-default-fullname2" className="input-group-text">
                                        <i className="fa fa-user"></i>
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control"


                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-3 mt-4 row">
                            <div className="col-md-3">
                                <label className="form-label" htmlFor="basic-icon-default-address">Địa chỉ</label>
                            </div>
                            <div className="col-md-9">
                                <div className="input-group input-group-merge">
                                    <span className="input-group-text"><i className="fa fa-map-marker"></i></span>
                                    <input
                                        type="text"
                                        id="basic-icon-default-address"
                                        className="form-control"


                                    />

                                </div>
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <div className="col-md-3">
                                <label className="form-label" htmlFor="basic-icon-default-email">Email</label>
                            </div>
                            <div className="col-md-9">
                                <div className="input-group input-group-merge">
                                    <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                                    <input
                                        type="email"
                                        id="basic-icon-default-email"
                                        className="form-control"



                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <div className="col-md-3">
                                <label className="form-label" htmlFor="basic-icon-default-phone">Số điện thoại</label>
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



                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <div className="col-md-3">
                                <label className="form-label" htmlFor="basic-icon-default-phone">Ngày tháng năm sinh</label>
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


                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <div className="col-md-3">
                                <label className="form-label" htmlFor="basic-icon-default-phone">Giới tính</label>
                            </div>
                            <div className="col-md-9">
                                <div className="input-group input-group-merge">

                                    <input
                                        type="text"
                                        id="basic-icon-default-phone"
                                        className="form-control phone-mask"

                                        // value={user.gender}
                                        // onChange={handleInputChange}
                                        // disabled={true}

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
                                    Update
                                </button>
                            </div>
                        </div>
                    </form>
                ) : (
                    <form action="#" className="mb-4" style={{maxWidth: '800px', width: '100%', borderRadius:'10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', padding:'20px',margin:'100px'}}>
                        <div className="text-left row g-4">
                            <div className="col-md-12">
                                <h1>Thông tin cá nhân người dùng</h1>
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <div className="col-md-3">
                                <label className="form-label" htmlFor="basic-icon-default-fullname">Mật khẩu cũ</label>
                            </div>
                            <div className="col-md-9">
                                <div className="input-group input-group-merge">
                    <span id="basic-icon-default-fullname2" className="input-group-text"><i className="fa-solid fa-key"></i></span>
                                    <input
                                        type={`${isShowPassword.oldPassword ? "text" : "password"}`}
                                        className="form-control"
                                    />

                                    <span
                                        id="hide-password"
                                        className="input-group-text"
                                        style={{cursor: 'pointer', color: '#000', background: '#FDF000'}}
                                        onClick={() => toggleShowPassword('oldPassword')}
                                    >
                                        <i className={`fa ms-2 ${isShowPassword.oldPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="mb-3 mt-4 row">
                            <div className="col-md-3">
                                <label className="form-label" htmlFor="basic-icon-default-address">Mật khẩu mới</label>
                            </div>
                            <div className="col-md-9">
                                <div className="input-group input-group-merge">
                                    <span className="input-group-text"><i className="fa-solid fa-lock"></i></span>
                                    <input
                                        type={`${isShowPassword.password ? "text" : "password"}`}
                                        className="form-control"

                                    />
                                    <span
                                        id="hide-password"
                                        className="input-group-text"
                                        style={{cursor: 'pointer', color: '#000', background: '#FDF000'}}
                                        onClick={() => toggleShowPassword('password')}
                                    >
                                        <i className={`fa ms-2 ${isShowPassword.password ? "fa-eye" : "fa-eye-slash"}`}></i>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="mb-3 mt-4 row">
                            <div className="col-md-3">
                                <label className="form-label" htmlFor="basic-icon-default-address">Nhập lại mật khẩu mới</label>
                            </div>
                            <div className="col-md-9">
                                <div className="input-group input-group-merge">
                                    <span className="input-group-text"><i className="fa-solid fa-lock"></i></span>
                                    <input
                                        type={`${isShowPassword.confirmPassword ? "text" : "password"}`}
                                        className="form-control"

                                    />
                                    <span
                                        id="hide-password"
                                        className="input-group-text"
                                        style={{cursor: 'pointer', color: '#000', background: '#FDF000'}}
                                        onClick={() => toggleShowPassword('confirmPassword')}

                                    >
                                        <i className={`fa ms-2 ${isShowPassword.confirmPassword ? "fa-eye" : "fa-eye-slash"}`}></i>

                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="text-center row g-4 ">
                            <div className="col-md-12">
                                <button
                                    type="button"
                                    className="btn btn-primary border-0 rounded-pill px-4 py-3"
                                >
                                    Update password
                                </button>
                            </div>
                        </div>
                    </form>
                )}
            </div>

                        </div></section></div></div>

        <Footer/>
        </>
    )
}
export default UserInfo;