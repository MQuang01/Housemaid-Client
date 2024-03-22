import React, {useEffect, useState} from "react"
import './LoginSignUp.css'
import {Link} from "react-router-dom";
import axios from "axios";
import toastr from 'toastr';
const LoginSignUp = () => {

        const [formData, setFormData] = useState({
            username: "",
            password: ""
        });
        const [errors, setErrors] = useState({});

        const handleValidation = (name) => {
            const formErrors = { ...errors };
            let formIsValid = true;

            if (!formData[name]) {
                formIsValid = false;
                formErrors[name] = `${name.charAt(0).toUpperCase() + name.slice(1)} cannot be empty`;
            } else {
                clearError(name);
            }

            setErrors(formErrors);
            return formIsValid;
        }
        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });

            if (value !== "") {
                clearError(name);
            }
        }
        const clearError = (name) => {
            setErrors({ ...errors, [name]: "" });
        };
        const handleBlur = (name, value) => {
            if (value === "") {
                handleValidation(name);
            }
        }
        const handleSubmit = async (e) => {
            e.preventDefault();
            if (formData.password && formData.username) {
                try {
                    // const response = await axios.post("http://192.168.1.39:8080/login", formData);
                    toastr.success("Login success");
                } catch (error) {
                    toastr.error("Login fail");
                }
            } else {
                handleValidation("username");
                handleValidation("password");
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
            <div className='col-lg-6' style={{display: "none"}}>
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
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="fa-solid fa-user"></i>
                                </span>
                                <input type="text" className="form-control form-control-lg fs-6"
                                       name="username"
                                       onBlur={(e) => handleBlur("username", e.target.value)}
                                       value={formData.username}
                                       onChange={handleChange}
                                       placeholder="Username"/>
                            </div>
                            <div className="input-group mb-3">
                                {errors["username"] && <small className="text-danger mt-1 ms-2">
                                    <i className="fa-solid fa-circle-exclamation"></i> {errors["username"]}</small>}
                            </div>

                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="fa-solid fa-lock"></i>
                                </span>
                                <input type="password" className="form-control form-control-lg fs-6"
                                       name="password"
                                       onBlur={(e) => handleBlur("password", e.target.value)}
                                       value={formData.password}
                                       onChange={handleChange}
                                       placeholder="Password"/>
                            </div>
                            <div className="input-group mb-3">
                                { errors["password"] && <small className="text-danger mt-1 ms-2">
                                    <i className="fa-solid fa-circle-exclamation"></i> {errors["password"]}</small> }
                            </div>

                            <div className="input-group mb-3 d-flex justify-content-between">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="formCheck"/>
                                    <label form="formCheck" className="form-check-label text-secondary">
                                        <small>Remeber Me</small>
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

            {/*Right Login Side*/}
            <div className='col-lg-6' style={{display: "block"}}>
                <div className='row align-items-center justify-content-center h-100 g-0 px-4 px-sm-0'>
                    <div className='col col-sm-6 col-lg-7 col-xl-10'>
                        <Link to={"/"} className="d-flex justify-content-center mb-4">
                            <h3 className='text-primary mb-0 display-5'>
                                House
                                <span className="text-black-50">Maid</span>
                                <i className="fa fa-broom text-primary ms-2"></i>
                            </h3>
                        </Link>

                        <div className="text-center mb-5">
                            <h3>Sign Up</h3>
                            <p className="text-secondary">Create an account now to gain access.</p>
                        </div>


                        <div className="position-relative">
                            <hr className="text-secondary divider" />
                            <div className="divider-content-center"></div>
                        </div>

                        {/*Form*/}
                        <form onSubmit={handleSubmit}>

                            <div className="row mb-3">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label className="mb-1 ms-1">Full Name</label>
                                        <input type="text" className="form-control"
                                               placeholder="Enter full name"/>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label className="mb-1 ms-1">Gender</label>
                                        <input type="email" className="form-control"
                                               placeholder="Enter email"/>
                                    </div>
                                </div>
                            </div>


                            <button className="button-32 btn-primary btn-lg w-100 mb-3" type="submit">Login</button>
                        </form>

                        <div className="text-center">
                            <small>Do you already have an account? <Link to="#"
                                                                         className="text-info fw-bold">Login</Link></small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginSignUp;