import React, {useEffect, useState} from "react"
import './LoginRegister.css'
import {Link, useNavigate} from "react-router-dom";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {set, useForm} from "react-hook-form";
import {fetchLogin} from "../../service/Login";
import ModalRegister from "./ModalRegister";

const schema = yup.object({
    username: yup.string().required("Please enter username"),
    password: yup.string().required("Please enter password"),
})
const Login = () => {

    const nav = useNavigate();
    const {
        register,
        handleSubmit,
        formState: {errors},
        resetField
    } = useForm({
        resolver: yupResolver(schema)
    })

    const [isModalOpen, setModalOpen] = useState(-1)

    function setStatus(newStatusModal) {
        setModalOpen(newStatusModal.show)
    }

    const handleLogin = async (data, e) => {
        e.preventDefault()
        const response = await fetchLogin(data.username, data.password)
        if (response) {
            localStorage.setItem("jwt", JSON.stringify(response))
            nav("/")
        }

        resetField("password", {keepError: true})
    }

    return (

        <div className='row vh-100 g-0'>
            {/*Left Side*/}
            <div className='col-lg-6 position-relative d-none d-lg-block'>
                <div className='bg-holder' style={{backgroundImage: `url("/assets/img/login.png")`}}>
                </div>
            </div>

            {/*Right Login Side*/}
            <div className='col-lg-6' style={{display: "block"}}>
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
                            <h3>Login</h3>
                            <p className="text-secondary">Get access to your account</p>
                        </div>

                        <button className='btn btn-outline-secondary btn-lg w-100 mb-3'>
                            <i className="fa-brands fa-google text-danger me-1 fs-6"></i>
                            Login with Google
                        </button>

                        <button className='btn btn-outline-secondary btn-lg w-100'>
                            <i className="fa-brands fa-facebook-f text-info me-1 fs-6"></i>
                            Login with Facebook
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
                                       placeholder="Username"/>
                                <span className="invalid-feedback">{errors?.username?.message}</span>

                            </div>


                            <div className="input-group has-validation mb-3">
                                <span className="input-group-text">
                                    <i className="fa-solid fa-lock"></i>
                                </span>
                                <input type="password" className={`form-control form-control-lg fs-6 
                                       ${errors?.password?.message ? "is-invalid" : ""}`}
                                       {...register("password")}
                                       placeholder="Password"/>
                                <span className="invalid-feedback">{errors?.password?.message}</span>
                            </div>

                            <div className="input-group mb-3 d-flex justify-content-between">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="formCheck"/>
                                    <label form="formCheck" className="form-check-label text-secondary">
                                        <small>Remember Me</small>
                                    </label>
                                </div>
                                <div>
                                    <small><Link to="#" className="text-info fw-normal">Forgot Password?</Link></small>
                                </div>
                            </div>

                            <button className="button-32 btn-primary btn-lg w-100 mb-3" type="submit">Login</button>
                        </form>

                        <div className="text-center">
                            <small>Don't have an account?
                                <button style={{background: "none", border: "none"}} className="text-info fw-bold"
                                        onClick={() => setModalOpen(1)}>
                                    Sign Up
                                </button>
                            </small>
                        </div>
                    </div>
                </div>
            </div>

            <ModalRegister show={isModalOpen} setShow={setStatus}></ModalRegister>
        </div>
    )
}

export default Login;