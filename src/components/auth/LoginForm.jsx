import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import { Login } from "../../service/AuthService";
import * as yup from "yup";
import React from "react";
import {useAuth} from "../../context/AuthContext";
import toastr from "toastr";

const schema = yup.object({
    username: yup.string().required("Please enter username"),
    password: yup.string().required("Please enter password"),
})
const LoginForm = () => {
    let navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: {errors},
        resetField
    } = useForm({
        resolver: yupResolver(schema)
    })
    const { login } = useAuth();
    const handleLogin = async (data, e) => {
        e.preventDefault()
        if(data.username && data.password) {
            if(await Login(data.username, data.password)) {
                login();
                navigate("/");
            } else {
                toastr.error("Tên tài khoản hoặc mật khẩu bị sai");
            }
        }
    }
    return (
        <div className='col-lg-6'>
            <div className='row align-items-center justify-content-center h-100 g-0 px-4 px-sm-0'>
                <div className='col col-sm-6 col-lg-7 col-xl-6'>
                    <Link to={"/"} className="d-flex justify-content-center mb-4">
                        <h3 className='text-primary mb-0 display-5'>
                            House
                            <span className="text-black-50">Maid</span>
                            <i className="fa fa-broom text-primary ms-2"></i>
                        </h3>
                    </Link>

                    <div className="text-center mb-5">
                        <h3>Đăng nhập</h3>
                        <p className="text-secondary">Nhận quyền truy cập vào tài khoản của bạn</p>
                    </div>

                    <button className='btn btn-outline-secondary btn-lg w-100 mb-3'>
                        <i className="fa-brands fa-google text-danger me-1 fs-6"></i>
                        Đăng nhập bằng Google
                    </button>

                    <button className='btn btn-outline-secondary btn-lg w-100'>
                        <i className="fa-brands fa-facebook-f text-info me-1 fs-6"></i>
                        Đăng nhập bằng Facebook
                    </button>

                    <div className="position-relative">
                        <hr className="text-secondary divider"/>
                        <div className="divider-content-center">or</div>
                    </div>

                    {/*Form*/}
                    <form onSubmit={handleSubmit(handleLogin)} className="needs-validation">
                        <div className="input-group has-validation mb-3 ">
                            <span className="input-group-text">
                                <i className="fa-solid fa-user"></i>
                            </span>
                            <input type="text"
                                   className={`form-control form-control-lg fs-6
                                       ${errors?.username?.message ? "is-invalid" : ""}`}
                                   {...register("username")}
                                   placeholder="Tên tài khoản"/>
                            <span className="invalid-feedback">{errors?.username?.message}</span>

                        </div>


                        <div className="input-group has-validation mb-3">
                            <span className="input-group-text">
                                <i className="fa-solid fa-lock"></i>
                            </span>
                            <input type="password" className={`form-control form-control-lg fs-6 
                                       ${errors?.password?.message ? "is-invalid" : ""}`}
                                   {...register("password")}
                                   placeholder="Mật khẩu"/>
                            <span className="invalid-feedback">{errors?.password?.message}</span>
                        </div>

                        <div className="input-group mb-3 d-flex justify-content-between">
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="formCheck"/>
                                <label form="formCheck" className="form-check-label text-secondary">
                                    <small>Ghi nhớ tài khoản</small>
                                </label>
                            </div>
                            <div>
                                <small><Link to="#" className="text-info fw-normal">Quên mật khẩu?</Link></small>
                            </div>
                        </div>

                        <button className="button-32 btn-primary btn-lg w-100 mb-3 text-uppercase" type="submit">
                            Đăng nhập
                        </button>
                    </form>

                    <div className="text-center">
                        <small>Bạn chưa có tài khoản? <Link to="/auth?mode=register" className="text-info fw-bold">Đăng ký</Link></small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm