import React, {useState} from "react";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {fetchRegister} from "../../service/Register.";

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
        .matches(/^[0-9]+$/, "SĐT chỉ được chứa các chữ số")
        .min(10, "SĐT phải có ít nhất 10 số")
        .max(11, "SĐT không được vượt quá 11 số"),
    dob: yup.date()
        .required("Yêu cầu nhập ngày sinh")
        .max(new Date(), "Ngày phải nhỏ hơn ngày hiện tại"),
    username: yup.string().required("Yêu cầu nhập tài khoản")
        .min(6, "Tài khoản ít nhất 4 ký tự")
        .max(20, "Tài khoản không được vượt quá 16 ký tự")
        .matches(/^\w+$/, "Tài khoản chỉ được chứa chữ cái, số và dấu gạch dưới"),
    password: yup.string().required("Yêu cầu nhập mật khẩu")
        .min(6, "Mật khẩu ít nhất 6 kí tự"),
    confirmPassword: yup.string().required("Yêu cầu xác nhận mật khẩu")
        .oneOf([yup.ref("password")], "Mật khẩu không khớp")
})

const ModalRegister = ({show, setShow}) => {
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [typeUser, setTypeUser] = useState('CUSTOMER');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm({
        resolver: yupResolver(schema)
    })

    function handleClose() {
        setShow({show: -1})
        reset();
    }
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };


    async function handleCreateAccount(data, e) {
        e.preventDefault();
        const date = new Date("Wed Aug 29 1973 00:00:00 GMT+0800");
        data.dob = date.toISOString().split('T')[0];
        const form = new FormData();
        for (const key in data) {
            if (key === 'avatar') continue
            form.append(key, data[key])
        }
        form.append('avatar', selectedFile)

        const response = await fetchRegister(form)
        if (response) {
            reset();
            setShow({show: -1})
            setIsShowConfirmPassword(false);
            setIsShowPassword(false);
        }
    }


    return (
        <div>
            <div className="modal fade show" style={{display: show !== -1 ? 'block' : 'none'}}>
                <div className="modal-dialog modal-xl">
                    <div className="modal-content ">
                        <div className="modal-body">
                            <div className="modal-header">
                                <h5 className="modal-title">Đăng ký tài khoản</h5>
                                <button type="button" className="btn-close"
                                        onClick={handleClose}></button>
                            </div>
                            <div className="form-group has-validation">
                                <label className="ms-1 title-input">Avatar</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    accept="image/*" // Chỉ chấp nhận file ảnh
                                    onChange={handleFileChange}
                                />
                            </div>
                            <form onSubmit={handleSubmit(handleCreateAccount)} className="needs-validation">

                                <div className="row align-items-center">
                                    <div className="col-lg-6">
                                        <div className="form-group has-validation">
                                            <label className="ms-1 title-input">Bạn đăng ký với tư cách</label>
                                            <select
                                                className={`form-select ${errors.typeUser ? 'is-invalid' : ''}`} {...register("typeUser")}
                                                onChange={(e) => setTypeUser(e.target.value)}>
                                                <option value="CUSTOMER" selected>Người thuê</option>
                                                <option value="EMPLOYEE">Người làm việc</option>
                                            </select>
                                            <span className="text-danger">{errors.typeUser?.message}</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-6"
                                         style={{display: typeUser === 'EMPLOYEE' ? 'block' : 'none'}}>
                                        <div className="d-flex form-group has-validation">
                                            <label className="ms-1 title-input me-2">Ca làm việc</label>
                                            <div>
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        {...register("shift")}
                                                        name="optionsShift"
                                                        value="SHIFT_1"
                                                    />
                                                    <label className="form-check-label">CA 1</label>
                                                </div>
                                                <div>
                                                    <small>(0h - 8h)</small>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        {...register("gender")}
                                                        name="optionsGender" value="FEMALE"/>
                                                    <label className="form-check-label">CA 2</label>
                                                </div>
                                                <div>
                                                    <small>(8h - 16h)</small>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        {...register("gender")}
                                                        name="optionsGender" value="FEMALE"/>
                                                    <label className="form-check-label">CA 3</label>
                                                </div>
                                                <div>
                                                    <small>(16h - 24h)</small>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        {...register("gender")}
                                                        name="optionsGender" value="FEMALE"/>
                                                    <label className="form-check-label">TOÀN THỜI GIAN</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row align-items-center">
                                    <div className="col-lg-12">
                                        <div className="form-group has-validation">
                                            <label className="ms-1 title-input">Full Name</label>
                                            <input type="text"
                                                   className={`form-control ${errors?.fullName?.message ? "is-invalid" : ""}`}
                                                   {...register("fullName")}
                                                   placeholder="Enter full name"/>
                                            <span className="invalid-feedback">{errors?.fullName?.message}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row align-items-center">
                                    <div className="col-lg-6">
                                        <div className="d-flex form-group has-validation">
                                            <div className={`d-flex ${errors?.gender ? "is-invalid" : ""}`}>
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        {...register("gender")}
                                                        name="optionsGender"
                                                        value="MALE"

                                                    />
                                                    <label className="form-check-label">MALE</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        {...register("gender")}
                                                        name="optionsGender" value="FEMALE"/>
                                                    <label className="form-check-label">FEMALE</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        {...register("gender")}
                                                        name="optionsGender" value="OTHER"
                                                        defaultChecked={true}
                                                    />
                                                    <label className="form-check-label">OTHER</label>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row align-items-center">
                                    <div className="col-lg-12">
                                        <div className="form-group has-validation">
                                            <label className="ms-1 title-input">Email</label>
                                            <input type="email"
                                                   className={`form-control ${errors?.email?.message ? "is-invalid" : ""}`}
                                                   {...register("email")}
                                                   placeholder="Enter email"/>
                                            <span className="invalid-feedback">{errors?.email?.message}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row align-items-center">
                                    <div className="col-lg-12">
                                        <div className="form-group has-validation">
                                            <label className="ms-1 title-input">Address</label>
                                            <input type="text"
                                                   className={`form-control ${errors?.address?.message ? "is-invalid" : ""}`}
                                                   {...register("address")}
                                                   placeholder="Enter address"/>
                                            <span className="invalid-feedback">{errors?.address?.message}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row align-items-center">
                                    <div className="col-lg-6">
                                        <div className="form-group has-validation">
                                            <label className="ms-1 title-input">Phone</label>
                                            <input type="text"
                                                   className={`form-control ${errors?.phone ? "is-invalid" : ""}`}
                                                   {...register("phone")}
                                                   placeholder="Enter phone"/>
                                            <span className="invalid-feedback">{errors?.phone?.message}</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group has-validation">
                                            <label className="ms-1 title-input">Date of birth</label>
                                            <input type="date"
                                                   {...register("dob")}
                                                   className={`form-control ${errors?.dob?.message ? "is-invalid" : ""}`}
                                                   min="1950-01-01"
                                                   max="2010-01-01"
                                                   defaultValue="2006-01-01"
                                            />

                                            <span className="invalid-feedback">{errors?.dob?.message}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row align-items-center mb-2">
                                    <div className="form-group has-validation">
                                        <label className="ms-1 title-input">Username</label>
                                        <input type="text"
                                               className={`form-control ${errors?.username?.message ? "is-invalid" : ""}`}
                                               {...register("username")}
                                               placeholder="Enter username"/>
                                        <span className="invalid-feedback">{errors?.username?.message}</span>
                                    </div>
                                </div>

                                <div className="row align-items-center mb-4">
                                    <div className="col-lg-6">
                                        <div className="form-group has-validation">
                                            <label className="ms-1 title-input">Password</label>
                                            <div className="form-group" id="form-password">
                                                <input type={`${isShowPassword ? "text" : "password"}`}
                                                       id="password"
                                                       className={`form-control ${errors?.password?.message ? "is-invalid" : ""}`}
                                                       {...register("password")}
                                                       placeholder="Enter password"/>
                                                <i id="eye-pw" className={`fa ms-2 ${isShowPassword ? "fa-eye-slash" : "fa-eye"}`}
                                                   onClick={() => setIsShowPassword(prevState => !prevState)}></i>
                                            </div>
                                            <span className="invalid-feedback">{errors?.password?.message}</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group has-validation">
                                            <div className="form-group" id="form-confirm-password">
                                                <label className="ms-1 title-input">Confirm Password</label>
                                                <input type={`${isShowConfirmPassword ? "text" : "password"}`}
                                                       id="confirm-pw"
                                                       className={`form-control ${errors?.confirmPassword?.message ? "is-invalid" : ""}`}
                                                       {...register("confirmPassword")}
                                                       placeholder="Enter confirm password"/>
                                                <i id="eye-confirm-pw" className={`fa ms-2 ${isShowConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}
                                                   onClick={() => setIsShowConfirmPassword(prevState => !prevState) }></i>
                                            </div>
                                            <span className="invalid-feedback">{errors?.confirmPassword?.message}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-center align-content-center row align-items-center mb-2">
                                    <div className="col-lg-3 me-4">
                                        <button className="button-32 button-submit btn-primary btn-lg w-100" type="submit">
                                            Register
                                        </button>
                                    </div>
                                    <div className="col-lg-3 me-4">
                                        <button className="button-32 button-close btn-secondary btn-lg w-100" type="button" onClick={handleClose}>
                                            Close
                                        </button>
                                    </div>

                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ModalRegister