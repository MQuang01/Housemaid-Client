import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {fetchRegister} from "../../service/AuthService";
import * as yup from "yup";
import './Auth.css'
import {date} from "yup";
import toastr from "toastr";
import LoadingModal from "../loading/LoadingModal";


const schema = yup.object({
    typeUser: yup.string().required("Yêu cầu chọn kiểu tài khoản"),
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
    username: yup.string().required("Yêu cầu nhập tài khoản")
        .min(6, "Tài khoản ít nhất 6 ký tự")
        .max(20, "Tài khoản không được vượt quá 16 ký tự")
        .matches(/^\w+$/, "Tài khoản chỉ được chứa chữ cái, số và dấu gạch dưới"),
    password: yup.string().required("Yêu cầu nhập mật khẩu")
        .min(6, "Mật khẩu ít nhất 6 kí tự")
        .matches(/^[^\s]+$/, "Mật khẩu không được có dấu cách")
        .max(30, "Mật khẩu không được quá 30 kí tự"),
    confirmPassword: yup.string().required("Yêu cầu xác nhận mật khẩu")
        .oneOf([yup.ref("password")], "Mật khẩu không khớp"),
    gender: yup.string().oneOf(["MALE", "FEMALE", "OTHER"]).nullable().required("Vui lòng chọn giới tính"),
})

const RegisterForm = ({setMode}) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState();
    const [typeUser, setTypeUser] = useState('CUSTOMER');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
        resetField
    } = useForm({
        resolver: yupResolver(schema)
    })

    const [isConfirmPolicy, setIsConfirmPolicy] = useState(JSON.parse(localStorage.getItem('confirmPolicy') || 'false'));
    const [formData, setFormData] = useState(JSON.parse(localStorage.getItem('formData')) || {});

    // useEffect(() => {
    //
    // }, [formData]);

    useEffect(() => {
        localStorage.setItem("confirmPolicy", JSON.stringify(isConfirmPolicy));
    }, [isConfirmPolicy]);

    const handleFileChange = (event) => {
        const file = event.target.files[0]
        setSelectedFile(file);
    };

    const handleCreateAccount = async (data, e) => {
        e.preventDefault();
        if (!isConfirmPolicy) {
            toastr.error("Vui lòng xác nhận điều khoản", "Cảnh báo");
            return;
        }
        setLoading(true); // Bắt đầu hiển thị loading khi bắt đầu xử lý
        const date = new Date("Wed Aug 29 1973 00:00:00 GMT+0800");
        data.dob = date.toISOString().split('T')[0];
        const form = new FormData();
        for (const key in data) {
            if (key === 'avatar') continue
            form.append(key, data[key])
        }
        form.append('avatar', selectedFile)


        try {
            const response = await fetchRegister(form);
            toastr.success("Đăng ký tài khoản thành công, xin vui lòng đăng nhập");
            navigate("/auth?mode=login")
            reset();
        } catch (error) {
            toastr.error("Lỗi: " + error.message); // Hiển thị thông báo lỗi từ máy chủ
            resetField("password")
            resetField("confirmPassword")
        } finally {
            setLoading(false); // Tắt trạng thái loading sau khi xử lý hoàn tất (bất kể thành công hay thất bại)
        }
    }

    const CheckValidateImg = () => {
        if (selectedFile === undefined) {
            setSelectedFile(null)
        }
    }


    return (
        <div className='col-lg-7 mb-4'>
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
                        <h3>Đăng ký</h3>
                        <p className="text-secondary">Đăng ký tài khoản để có thể sử dụng được thêm nhiều chức năng của
                            chúng tôi</p>
                        <hr className="text-secondary divider"/>
                    </div>

                    <form onSubmit={handleSubmit(handleCreateAccount)} className="needs-validation">
                        <div className="mb-3 row d-flex align-items-center">
                            <div className="col-lg-8 form-group has-validation">
                                <label className="ms-2 mb-2 title-input">Bạn đăng ký với tư cách</label>
                                <select
                                    defaultValue={typeUser}
                                    className={`form-select ${errors.typeUser ? 'is-invalid' : ''}`}
                                    {...register("typeUser")}
                                    onChange={(e) => setTypeUser(e.target.value)}>
                                    <option value="CUSTOMER" selected>Người thuê</option>
                                    <option value="EMPLOYEE">Người làm việc</option>
                                </select>
                                <span className="text-danger">{errors.typeUser?.message}</span>
                            </div>
                            <div className="col-lg-4 form-group has-validation">
                                <label className="ms-1 mb-2 title-input">Hình ảnh avatar</label>
                                <input
                                    type="file"
                                    className={`form-control ${selectedFile === null ? "is-invalid" : ""}`}
                                    accept="image/*" // Chỉ chấp nhận file ảnh
                                    onChange={handleFileChange}
                                />
                                <span
                                    className="invalid-feedback">{selectedFile === null && "Vui lòng chọn ảnh cho tài khoản"}</span>
                                {selectedFile != null && (
                                    <img className={"w-50"} style={{marginTop: 12, marginLeft: 40}}
                                         src={URL.createObjectURL(selectedFile)} alt={"avatar"}/>
                                )}
                            </div>
                        </div>

                        <div className="mb-2 row d-flex align-items-center">
                            <div className="col-lg-6 form-group has-validation">
                                <label className="ms-2 mb-2 title-input">Họ và Tên </label>
                                <input type="text"
                                       className={`form-control ${errors?.fullName?.message ? "is-invalid" : ""}`}
                                       {...register("fullName")}
                                       placeholder="Nhập họ và tên"/>
                                <span className="invalid-feedback">{errors?.fullName?.message}</span>
                            </div>

                            <div className="col-lg-6 form-group has-validation">
                                <label className="ms-2 mb-2 title-input">Giới tính </label>
                                <div className={`${errors?.gender?.message ? "is-invalid" : ""}`}>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            {...register("gender", {required: true})}
                                            id="maleGender"
                                            defaultValue="MALE"
                                        />
                                        <label className="form-check-label" htmlFor="maleGender">Nam</label>
                                    </div>

                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            {...register("gender", {required: true})}
                                            id="femaleGender"
                                            defaultValue="FEMALE"
                                        />
                                        <label className="form-check-label" htmlFor="femaleGender">Nữ</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            {...register("gender", {required: true})}
                                            id="otherGender"
                                            defaultValue="OTHER"
                                        />
                                        <label className="form-check-label" htmlFor="otherGender">Khác</label>
                                    </div>
                                </div>
                                <span className="invalid-feedback">{errors?.gender?.message}</span>
                            </div>
                        </div>

                        <div className="mb-2 row d-flex align-items-center">
                            <div className="col-lg-6 form-group has-validation">
                                <label className="ms-2 mb-2 title-input">Điện thoại</label>
                                <input type="text"
                                       className={`form-control ${errors?.phone ? "is-invalid" : ""}`}
                                       {...register("phone")}
                                       placeholder="Nhập số điện thoại"/>
                                <span className="invalid-feedback">{errors?.phone?.message}</span>
                            </div>
                            <div className="col-lg-6 form-group has-validation">
                                <label className="ms-2 mb-2 title-input">Ngày sinh</label>
                                <input type="date"
                                       {...register("dob")}
                                       className={`form-control ${errors?.dob?.message ? "is-invalid" : ""}`}
                                       max={date.now}
                                />
                                <span className="invalid-feedback">{errors?.dob?.message}</span>
                            </div>
                        </div>

                        <div className="mb-2 row d-flex align-items-center">
                            <div className="form-group has-validation">
                                <label className="ms-2 mb-2 title-input">Địa chỉ</label>
                                <input type="text"
                                       className={`form-control ${errors?.address?.message ? "is-invalid" : ""}`}
                                       {...register("address")}
                                       placeholder="Nhập địa chỉ"/>
                                <span className="invalid-feedback">{errors?.address?.message}</span>
                            </div>
                        </div>

                        <div className="mb-2 row d-flex align-items-center">
                            <div className="col-lg-6 form-group has-validation">
                                <label className="ms-2 mb-2 title-input">Tên tài khoản</label>
                                <input type="text"
                                       className={`form-control ${errors?.username?.message ? "is-invalid" : ""}`}
                                       {...register("username")}
                                       placeholder="Nhập tên tài khoản"/>
                                <span className="invalid-feedback">{errors?.username?.message}</span>
                            </div>

                            <div className="col-lg-6 form-group has-validation">
                                <label className="ms-2 mb-2 title-input">Email</label>
                                <input type="email"
                                       className={`form-control ${errors?.email?.message ? "is-invalid" : ""}`}
                                       {...register("email")}
                                       placeholder="Nhập email"/>
                                <span className="invalid-feedback">{errors?.email?.message}</span>
                            </div>
                        </div>

                        <div className="mb-2 row d-flex">

                            <div className="col-lg-6 form-group has-validation">
                                <label className="form-label" htmlFor="basic-icon-default-address">
                                    Mật khẩu</label>
                                <div className="input-group input-group-merge">
                                    <input type={`${isShowPassword ? "text" : "password"}`}
                                           className={`form-control ${errors?.password?.message ? "is-invalid" : ""}`}
                                           {...register("password")}
                                           placeholder="Nhập mật khẩu"/>
                                    <span
                                        id="hide-password"
                                        className="input-group-text"
                                        style={{
                                            cursor: 'pointer',
                                            color: '#000',
                                            background: '#FDF000'
                                        }}
                                        onClick={() => setIsShowPassword(prevState => !prevState)}
                                    >
                                        <i className={`fa ms-2 ${isShowPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
                                        </span>
                                    <span className="invalid-feedback">{errors?.password?.message}</span>
                                </div>
                            </div>

                            <div className="col-lg-6 form-group has-validation">
                                <label className="form-label" htmlFor="basic-icon-default-address">
                                    Xác nhận mật khẩu</label>
                                <div className="input-group input-group-merge">
                                    <input type={`${isShowConfirmPassword ? "text" : "password"}`}
                                           id="confirm-pw"
                                           className={`form-control ${errors?.confirmPassword?.message ? "is-invalid" : ""}`}
                                           {...register("confirmPassword")}
                                           placeholder="Nhập xác nhận mật khẩu"/>
                                    <span
                                        id="hide-password"
                                        className="input-group-text"
                                        style={{
                                            cursor: 'pointer',
                                            color: '#000',
                                            background: '#FDF000'
                                        }}
                                        onClick={() => setIsShowConfirmPassword(prevState => !prevState)}
                                    >
                                        <i className={`fa ms-2 ${isShowConfirmPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
                                        </span>
                                    <span className="invalid-feedback">{errors?.confirmPassword?.message}</span>
                                </div>
                            </div>
                        </div>


                        <div className="mb-4 mt-3 input-group d-flex justify-content-between">
                            <div className="form-check">
                                <input type="checkbox"
                                       className="form-check-input"
                                       id="formCheck"
                                       checked={isConfirmPolicy} //==> false
                                       onChange={() => setIsConfirmPolicy(prevState => !prevState)}
                                />

                                <label form="formCheck" className="form-check-label text-secondary">
                                    <small>Chấp nhận các điều khoản của công ty House Maid</small>
                                </label>
                            </div>
                        </div>


                        <div className="mb-2 row d-flex justify-content-center">
                            <button
                                className="button-32 btn-primary btn-lg w-50 mb-3 text-uppercase d-flex justify-content-center"
                                onClick={CheckValidateImg}
                                type="submit">
                                Đăng ký
                            </button>
                        </div>

                    </form>
                    <div className="text-center">
                        <small className="text-black-50">Bạn đã có tài khoản? <Link to="/auth?mode=login"
                                                                                    className="text-info fw-bold">Đăng
                            nhập</Link></small>
                    </div>
                </div>
            </div>
            {/* Xử lý hiển thị loading */}
            <LoadingModal loading={loading}/>
        </div>
    )
}

export default RegisterForm;