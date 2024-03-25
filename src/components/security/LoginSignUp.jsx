import React, {useEffect, useState} from "react"
import './LoginSignUp.css'
import {Link} from "react-router-dom";
import axios from "axios";
import toastr from 'toastr';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {set, useForm} from "react-hook-form";

const schema = yup.object({
    username: yup.string().required("Please enter username"),
    password: yup.string().required("Please enter password"),
})
const LoginSignUp = () => {

        const {
            register,
            handleSubmit,
            formState: {errors},
            resetField
        } = useForm({
            resolver: yupResolver(schema)
        })

        const handleLogin = async (data, e) => {
            e.preventDefault()
            if(data.username && data.password) {
                try {
                    const response = await axios.post("http://localhost:8080/api/auths/login", data)
                    console.log(response)
                    toastr.success(response.data)
                } catch (error) {
                    resetField("password", {keepError: true})
                    toastr.error("Wrong username or password");
                }
            }
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
                            <hr className="text-secondary divider" />
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
                            <small>Don't have an account? <Link to="#" className="text-info fw-bold">Sign Up</Link></small>
                        </div>
                    </div>
                </div>
            </div>

            {/*Right Register Side*/}
            {/*<div className='col-lg-6' style={{display: "none"}}>*/}
            {/*    <div className='row align-items-center justify-content-center h-100 g-0 px-4 px-sm-0'>*/}
            {/*        <div className='col col-sm-6 col-lg-7 col-xl-10'>*/}
            {/*            <Link to={"/"} className="d-flex justify-content-center mb-4">*/}
            {/*                <h3 className='text-primary mb-0 display-5'>*/}
            {/*                    House*/}
            {/*                    <span className="text-black-50">Maid</span>*/}
            {/*                    <i className="fa fa-broom text-primary ms-2"></i>*/}
            {/*                </h3>*/}
            {/*            </Link>*/}

            {/*            <div className="text-center mb-5">*/}
            {/*                <h3>Sign Up</h3>*/}
            {/*                <p className="text-secondary">Create an account now to gain access.</p>*/}
            {/*            </div>*/}


            {/*            <div className="position-relative">*/}
            {/*                <hr className="text-secondary" />*/}
            {/*                <div className="divider-content-center"></div>*/}
            {/*            </div>*/}

            {/*            /!*Form*!/*/}
            {/*            <form onSubmit={handleSubmit}>*/}

            {/*                <div className="row align-items-center">*/}
            {/*                    <div className="col-lg-6 mb-3">*/}
            {/*                        <div className="form-group">*/}
            {/*                            <label className="mb-1 ms-1">Full Name</label>*/}
            {/*                            <input type="text" className="form-control is-invalid"*/}
            {/*                                   placeholder="Enter full name"/>*/}
            {/*                            <span className="invalid-feedback">Please enter full name</span>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <div className="col-lg-6 mb-3">*/}
            {/*                        <div className="form-group">*/}
            {/*                            <label className="mb-1 ms-1">Gender</label>*/}
            {/*                            <div className="d-flex">*/}
            {/*                                <div className="form-check form-check-inline">*/}
            {/*                                    <input className="form-check-input" type="radio"*/}
            {/*                                           name="optionsGender" value="MALE"/>*/}
            {/*                                    <label className="form-check-label">MALE</label>*/}
            {/*                                </div>*/}
            {/*                                <div className="form-check form-check-inline">*/}
            {/*                                    <input className="form-check-input" type="radio"*/}
            {/*                                           name="optionsGender" value="FEMALE"/>*/}
            {/*                                    <label className="form-check-label">FEMALE</label>*/}
            {/*                                </div>*/}
            {/*                                <div className="form-check form-check-inline">*/}
            {/*                                    <input className="form-check-input" type="radio"*/}
            {/*                                           name="optionsGender" value="OTHER"/>*/}
            {/*                                    <label className="form-check-label">OTHER</label>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}

            {/*                <div className="row align-items-center">*/}
            {/*                    <div className="col-lg-6 mb-3">*/}
            {/*                        <div className="form-group">*/}
            {/*                            <label className="mb-1 ms-1">Email</label>*/}
            {/*                            <input type="email" className="form-control"*/}
            {/*                                   placeholder="Enter email"/>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <div className="col-lg-6 mb-3">*/}
            {/*                        <div className="form-group">*/}
            {/*                            <label className="mb-1 ms-1">Address</label>*/}
            {/*                            <input type="text" className="form-control"*/}
            {/*                                   placeholder="Enter address"/>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}

            {/*                <div className="row align-items-center">*/}
            {/*                    <div className="col-lg-6 mb-3">*/}
            {/*                        <div className="form-group">*/}
            {/*                            <label className="mb-1 ms-1">Phone</label>*/}
            {/*                            <input type="email" className="form-control"*/}
            {/*                                   placeholder="Enter phone"/>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <div className="col-lg-6 mb-3">*/}
            {/*                        <div className="form-group">*/}
            {/*                            <label className="mb-1 ms-1">Date of birth</label>*/}
            {/*                            <input type="date" className="form-control"/>*/}
            {/*                        </div>*/}

            {/*                    </div>*/}
            {/*                </div>*/}

            {/*                <div className="row align-items-center">*/}
            {/*                    <div className="form-group mb-3">*/}
            {/*                        <label className="mb-1 ms-1">Address</label>*/}
            {/*                        <input type="text" className="form-control"*/}
            {/*                               placeholder="Enter address"/>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*                <div className="row align-items-center">*/}
            {/*                    <div className="form-group mb-3">*/}
            {/*                        <label className="mb-1 ms-1">Username</label>*/}
            {/*                        <input type="text" className="form-control"*/}
            {/*                               placeholder="Enter username"/>*/}
            {/*                    </div>*/}
            {/*                </div>*/}

            {/*                <div className="row align-items-center">*/}
            {/*                    <div className="col-lg-6 mb-3">*/}
            {/*                        <div className="form-group">*/}
            {/*                            <label className="mb-1 ms-1">Password</label>*/}
            {/*                            <input type="email" className="form-control"*/}
            {/*                                   placeholder="Enter password"/>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <div className="col-lg-6 mb-3">*/}
            {/*                        <div className="form-group">*/}
            {/*                            <label className="mb-1 ms-1">Confirm Password</label>*/}
            {/*                            <input type="text" className="form-control"*/}
            {/*                                   placeholder="Enter confirm password"/>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}

            {/*                <button className="button-32 btn-primary btn-lg w-100 mb-3" type="submit">Register</button>*/}
            {/*            </form>*/}

            {/*            <div className="text-center">*/}
            {/*                <small>Do you already have an account? <Link to="#" className="text-info fw-bold">Login</Link></small>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}

export default LoginSignUp;