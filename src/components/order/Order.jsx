import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {fetchJobByCategoryId} from "../../service/JobService";
import {formatMoney} from "../../until/FormatMoney";
import toastr from "toastr";
import {
    compareTimeString,
    formatMinutesToDetail,
    formatMinutesToHHMM,
    formatYYYYMMDDToDDMMYYYY,
    getTimeNow,
    parseTimeString
} from "../../until/FormatTime";
import {
    AMOUNT_TYPE,
    calculateEndTime,
    compareTime,
} from "../../until/app-constant";
import {fetchListEmployee} from "../../service/EmployeeService";
import {useAuth} from "../../context/AuthContext";
import {fetchCreateOrder} from "../../service/OrderService";
import ModalConfirm from "./ModalConfirm";
import LoadingModal from "../loading/LoadingModal";


const Order = () => {
    const nav = useNavigate();
    const location = useLocation();
    const {state} = location;
    const categoryId = state?.idCate;
    const {isLoggedIn, logout} = useAuth();
    const [dataUser, setDataUser] = useState(JSON.parse(localStorage.getItem("infoUser")) || {});
    const [loading, setLoading] = useState(false);
    const initialOrder = {
        userId: null,
        categoryId: null,
        address: null,
        totalTimeApprox: null,
        totalPrice: null,
        quantityEmployee: null,
        workDay: null,
        timeStart: null,
        listOrderDetail: [{
            jobId: null,
            timeApprox: null,
            quantity: null,
            houseSize: null
        }]
    }

    const [currentForm, setCurrentForm] = useState(1);
    const [selectedTime, setSelectedTime] = useState({start: getTimeNow(), end: '24:00'});


    const [listJob, setListJob] = useState(JSON.parse(localStorage.getItem('listJob')) || []);

    // state for form 2
    const [listEmployee, setListEmployee] = useState([]);
    const [infoForm2, setInfoForm2] = useState(JSON.parse(localStorage.getItem('infoForm2')) || {
        limitEmployee: 1,
        workDay: new Date().toISOString().split('T')[0],
        timeStart: selectedTime.start,
        note: ''
    });
    const [isConfirmPolicy, setIsConfirmPolicy] = useState(JSON.parse(localStorage.getItem('confirmPolicy') || 'false'));
    const [messageWarning, setMessageWarning] = useState('');

    // state for form 3
    const [infoForm3, setInfoForm3] = useState({
        address: '',
        phone: '',
        name: '',
        email: '',
        note: infoForm2.note
    });
    const [show, setShowModalConfirm] = useState(false);
    // state for calculate
    const [totalPriceRaw, setTotalPriceRaw] = useState(0);
    const [timeApprox, setTimeApprox] = useState(JSON.parse(localStorage.getItem('timeApprox')) || 0);


    useEffect(() => {
        console.log(categoryId)
        if (categoryId == null) {
            window.location.href = '/';
        }

        fetchJobByCategoryId(categoryId).then(data => {
            const formattedData = data.map(item => ({
                ...item,
                quantity: 1,
                houseSize: 1,
                checked: false
            }));
            setListJob(formattedData);
        });

        fetchListEmployee().then(data => {
            setListEmployee(data.content);
        });
    }, []);
    const options = Array.from({length: listEmployee.length}, (_, index) => index + 1);

    // handle event checkbox
    const hasJobChecked = listJob.find(e => e.checked) !== undefined;
    useEffect(() => {
        if (listJob.length === 0) return;
        calculateTotalPrice();
        handleTimeApprox();
    }, [listJob]);

    useEffect(() => {
        if (dataUser) {
            setInfoForm3(prevState => ({
                ...prevState,
                address: dataUser.address,
                phone: dataUser.phone,
                email: dataUser.email,
                name: dataUser.fullName
            }));
        }
    }, [dataUser]);


    function clearChecked() {
        setListJob(listJob.map(item => ({...item, checked: false})));
    }

    function setAllChecked() {
        setListJob(listJob.map(item => ({...item, checked: true})));
    }

    //function Calculate
    const calculateTotalPrice = () => {
        const totalPrice = listJob.reduce((total, job) => {
            if (job.checked) {
                if (job.typeJob === "Quantity") {
                    return total + (parseInt(job.price) * job.quantity);
                }
                if (job.typeJob === "Size") {
                    return total + (parseInt(job.price) * job.houseSize);
                }
            }
            return total;
        }, 0);
        setTotalPriceRaw(totalPrice);
    };

    const handleTimeApprox = () => {
        const totalTime = listJob.reduce((total, job) => {
            if (job.checked) {
                if (job.typeJob === "Quantity") {
                    return total + (parseInt(job.quantity) * parseInt(job.timeApprox));
                }
                if (job.typeJob === "Size") {
                    return total + (parseInt(job.houseSize) * parseInt(job.timeApprox));
                }
            }
            return total;
        }, 0);
        setTimeApprox(totalTime);
    };
    const handleCheckboxChange = (event, jobId) => {
        const updatedJobChecked = listJob.map(e => {
            if (e.id === jobId) {
                e.checked = !e.checked;
            }
            return e;
        })
        setListJob(updatedJobChecked);
    };
    const handleTimeChange = (event) => {
        const selectedValue = event.target.value;
        const selectedHour = Math.floor(selectedValue / 2);
        const selectedMinutes = selectedValue % 2 === 0 ? '00' : '30';
        const formattedTimeStart = `${selectedHour}:${selectedMinutes}`;

        const endTime = calculateEndTime(formattedTimeStart, formatMinutesToHHMM(timeApprox));


        setSelectedTime({start: formattedTimeStart, end: endTime});

        setInfoForm2({...infoForm2, timeStart: formattedTimeStart})
    };

    // update localstorage
    useEffect(() => {
        localStorage.setItem("timeApprox", JSON.stringify(timeApprox));
        const storageInfoForm2 = JSON.parse(localStorage.getItem('infoForm2'));
        if (storageInfoForm2 !== null) {
            if (storageInfoForm2.timeStart !== 0) {
                setSelectedTime({
                    start: storageInfoForm2.timeStart,
                    // ...selectedTime
                    end: calculateEndTime(parseTimeString(storageInfoForm2.timeStart), formatMinutesToHHMM(timeApprox))
                });
            }
        }

        if (timeApprox <= 180) {
            setMessageWarning("");
        } else {
            let minEmployeeCount = 2;
            if (timeApprox >= 360) {
                minEmployeeCount = 3;
            }

            if (infoForm2.limitEmployee < minEmployeeCount) {
                setMessageWarning(`Khuyến khích: Chọn ${minEmployeeCount} nhân viên trở lên`);
            } else {
                setMessageWarning("");
            }
        }
    }, [timeApprox, infoForm2.limitEmployee]);
    useEffect(() => {
        localStorage.setItem('listJob', JSON.stringify(listJob));
    }, [listJob])
    useEffect(() => {
        localStorage.setItem('infoForm2', JSON.stringify(infoForm2));
    }, [infoForm2])
    useEffect(() => {
        localStorage.setItem("totalOrderPrice", JSON.stringify(totalPriceRaw));
    }, [totalPriceRaw]);
    useEffect(() => {
        localStorage.setItem("confirmPolicy", JSON.stringify(isConfirmPolicy));
    }, [timeApprox, isConfirmPolicy]);


    const handleNextForm = () => {
        if (currentForm === 1) {
            if (!hasJobChecked) {
                toastr.error("Vui lòng chọn ít nhất 1 dịch vụ", "Cảnh báo");
                return;
            } else {
                setCurrentForm(currentForm + 1);
            }
        }
        if (currentForm === 2) {
            // console.log(new Date().toISOString().split('T')[0], infoForm2.workDay)
            if (compareTimeString(new Date().toISOString().split('T')[0], infoForm2.workDay) > 0) {
                // toastr.error("Thời gian phải hợp hơn thống")
                toastr.error("Chọn thời gian phù hợp")
                return;
            }
            if (compareTimeString(new Date().toISOString().split('T')[0], infoForm2.workDay) === 0) {
                if (compareTime(infoForm2.timeStart, getTimeNow()) < 0) {
                    toastr.error("Chọn thời gian phù hợp")
                    return;
                }
            }
            if (!isConfirmPolicy) {
                toastr.error("Vui lòng xác nhận điều khoản", "Cảnh báo");
            } else {
                setCurrentForm(currentForm + 1);
            }
        }
        window.scrollTo(0, 0);
    };

    const handleBackForm = () => {
        setCurrentForm(currentForm - 1);
    };

    const handleInput = (event, job) => {
        let {value} = event.target;
        if (value === "0") {
            return;
        }
        if (job.typeJob === "Quantity" || job.typeJob === "Size") {
            if (!/^\d+$/.test(value)) {
                return;
            }
            // Chuyển đổi giá trị nhập thành số nguyên
            const intValue = parseInt(value);

            const amountType = AMOUNT_TYPE[job.typeJob];
            if (value > amountType) {
                return;
            }
            //cập nhật job ở trong list
            const updatedListJob = listJob.map(item => {
                if (item.id === job.id) {
                    if (item.typeJob === "Quantity") {
                        return {...item, quantity: intValue};
                    }
                    if (item.typeJob === "Size") {
                        return {...item, houseSize: intValue};
                    }
                }
                return item;
            })
            setListJob([...updatedListJob]);
        }
    };

    const setSelectedEmployee = (event) => {
        const selectedValue = event.target.value;
        setInfoForm2({...infoForm2, limitEmployee: selectedValue})
    }

    function handleDateChange(e) {
        const selectedValue = e.target.value;
        setInfoForm2({...infoForm2, workDay: selectedValue})
    }

    function showConfirmOrder() {
        setShowModalConfirm(true)
    }

    async function handleConfirmOrder() {

        if (!isLoggedIn) {
            if (window.confirm("Vui lòng đăng nhập trước khi đặt dịch vụ. Thông tin sẽ được chúng tôi lưu lại")) {
                window.location.href = "/auth?mode=login";
            }
            return;
        }
        if (listJob.filter(e => e.checked).length === 0) {
            toastr.error("Không thể tạo hóa đơn nếu không có dịch vụ. Chúng tôi sẽ chuyển đến đặt dịch vụ", "Cảnh báo");
            setTimeout(() => {
                window.location.href = "/booking";
            }, 1500);
            return;
        }
        setLoading(true);

        initialOrder.userId = dataUser?.id;
        initialOrder.categoryId = categoryId;
        initialOrder.address = infoForm3.address
        initialOrder.totalPrice = totalPriceRaw;
        initialOrder.totalTimeApprox = timeApprox;
        initialOrder.timeStart = infoForm2.timeStart;
        initialOrder.quantityEmployee = infoForm2.limitEmployee;
        initialOrder.workDay = infoForm2.workDay;
        initialOrder.listOrderDetail = listJob.filter(e => e.checked)
            .map(e => {
                if (e.typeJob === "Quantity") {
                    return {
                        id: e.id,
                        timeApprox: e.timeApprox,
                        quantity: e.quantity,
                        houseSize: null
                    }
                }
                if (e.typeJob === "Size") {
                    return {
                        id: e.id,
                        timeApprox: e.timeApprox,
                        houseSize: e.houseSize,
                        quantity: null
                    }
                }
            });

        try {
            await fetchCreateOrder(initialOrder);
            nav("/");
            toastr.success("Tạo hóa đơn thành công");
            setTimeout(() => {
                toastr.success("Hãy kiểm tra mail của bạn", {autoClose: 5000});
            }, 1500)
            localStorage.removeItem("listJob");
            localStorage.removeItem("confirmPolicy");
            localStorage.removeItem("timeApprox");
            localStorage.removeItem("infoForm2");
            localStorage.removeItem("totalOrderPrice");
            localStorage.setItem("quantityEmployee", infoForm2.limitEmployee);
        } catch (error) {
            if (error.response.data === "") {
                toastr.error("Lỗi không xác định")
                nav("/booking");
            }
            if (error.response.status === 403) {
                console.log(error)
            }
            toastr.error(error.response.data); // Hiển thị thông báo lỗi từ máy chủ
        } finally {
            setLoading(false); // Tắt trạng thái loading sau khi xử lý hoàn tất (bất kể thành công hay thất bại)
        }
    }

    function getAmount(job) {
        if (job.typeJob === "Quantity") {
            return parseInt(job.quantity);
        }
        if (job.typeJob === "Size") {
            return parseInt(job.houseSize);
        }
    }

    function handleEditAddress(e) {
        setInfoForm3({...infoForm3, address: e.target.value})
    }


    return (
        <>
            <Navbar/>
            <div>
                <nav>
                    <ol className="breadcrumb mb-0 animated slideInDown"
                        style={{fontSize: '20px', marginLeft: '112px', marginTop: '50px'}}>
                        <li className="breadcrumb-item"><a href="/">Trang chủ</a></li>
                        <li className="breadcrumb-item "><a href="/src/components/order/Order">Đặt lịch</a></li>
                        <li className="breadcrumb-item " aria-current="page">Bước {currentForm}</li>

                    </ol>
                </nav>
            </div>
            <div className="container-fluid py-3 wow fadeInUp" data-wow-delay=".3s">
                <div className="container py-3">
                    <div className="bg-light px-4 py-3 rounded">
                        {/*form-1*/}

                        {currentForm === 1 && (
                            <div className="container">
                                <div className="text-center">
                                    <h1 className="display-5 mb-5">Chọn dịch vụ</h1>
                                </div>
                                <form className="text-center mb-4" style={{
                                    borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', padding: '20px'
                                }}>
                                    <div className="table-responsive">
                                        <table className="table table-light table-hover">
                                            <thead>
                                            <tr>
                                                <th>Tên dich vụ</th>
                                                <th className="text-end px-5">Khoảng giá</th>
                                                <th className="text-end px-5">Thời gian ước tính</th>
                                                <th>
                                                    Lựa chọn
                                                    <button
                                                        type="button"
                                                        className="ms-2 btn btn-primary"
                                                        onClick={listJob.filter(e => e.checked).length > 0 ? clearChecked : setAllChecked}
                                                    >
                                                        {listJob.filter(e => e.checked).length > 0 ? "Bỏ chọn tất cả" : "Chọn tất cả"}
                                                    </button>
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {listJob.map(job => (<tr key={job.id}>
                                                <td>{job.name}</td>
                                                <td className="text-end px-5">{formatMoney(job.price)}</td>
                                                <td className="text-end px-5">~{job.timeApprox} phút
                                                    /{job.typeJob === "Quantity" ? "1 cái" : "m2"}</td>
                                                <td className="d-flex align-items-center justify-content-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        checked={job.checked}
                                                        onChange={(event) => handleCheckboxChange(event, job.id)}
                                                    />
                                                    <input
                                                        className="form-control ms-2 form-control form-control-sm w-25"
                                                        type="number"

                                                        value={getAmount(job) || 1}
                                                        onInput={(event) => handleInput(event, job)}
                                                        disabled={!job.checked}
                                                    />
                                                </td>

                                            </tr>))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="d-flex gap-5 justify-content-center">
                                        <div className="d-flex gap-3 w-auto">
                                            <label className="form-label text-success">
                                                Tổng giá ước tính:
                                            </label>
                                            <p> ~{formatMoney(totalPriceRaw || 0)}</p>
                                        </div>
                                        <div className="d-flex gap-3 w-auto">
                                            <label className="form-label text-success">Thời gian ước tính:</label>
                                            <p> ~{formatMinutesToHHMM(timeApprox)}</p>
                                        </div>
                                    </div>
                                    <div className="row g-4">
                                        <div className="col-md-12">
                                            <button type="button"
                                                    className="btn btn-primary border-0 rounded-pill px-4 py-3"
                                                    onClick={handleNextForm}>Tiếp tục
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/*form-2*/}
                        {currentForm === 2 && (
                            <form className=" mb-4"
                                  style={{
                                      borderRadius: '10px',
                                      boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                                      padding: '20px'
                                  }}>
                                <div className="text-left row g-4 ">
                                    <div className="col-md-6">
                                        <button type="button"
                                                className="btn btn-primary border-0 rounded-pill px-4 py-3"
                                                onClick={handleBackForm}>Quay lại
                                        </button>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="d-flex gap-3">
                                            <div className="d-flex gap-2 w-auto">
                                                <label className="form-label text-success">
                                                    Tổng giá ước tính:</label>
                                                <p> ~{formatMoney(totalPriceRaw || 0)}</p>
                                            </div>

                                            <div className="d-flex gap-2 w-auto">
                                                <label className="form-label text-success">Thời gian ước tính:</label>
                                                <p> ~{formatMinutesToHHMM(timeApprox)}</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="row g-2 mt-3">
                                    <div className="d-flex col-md-6 align-items-center">
                                        <label htmlFor="employee" style={{marginRight: '20px', width: '150px'}}>
                                            Số lượng nhân viên:
                                        </label>
                                        <select id="employee" className="form-select" style={{width: '200px'}}
                                                onChange={(event) => setSelectedEmployee(event)}>
                                            <option
                                                value={infoForm2.limitEmployee}
                                                defaultChecked={infoForm2.limitEmployee !== 1}
                                            >
                                                {infoForm2.limitEmployee}
                                            </option>
                                            {options.filter((option) => option !== parseInt(infoForm2.limitEmployee)).map((option) => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        {messageWarning !== "" && <div className="alert alert-warning">
                                            {messageWarning}
                                            <label className="form-text text-danger">
                                                * Lưu ý: Ý kiến tham khảo mang tính chất hỗ trợ vệ sinh nhà hoặc căn hộ
                                            </label>
                                        </div>}

                                    </div>
                                </div>
                                <div className="row g-2 mt-3">
                                    <div className="col-md-6">
                                        <label htmlFor="time">Thời gian bắt đầu làm việc:</label>
                                        <div
                                            className="text-center mt-2 fw-bold text-success fs-4">{selectedTime.start} - {selectedTime.end}</div>
                                        <input
                                            type="range"
                                            id="time"
                                            className="form-range"
                                            defaultValue={selectedTime.start}
                                            min={getTimeNow()}
                                            max={48}
                                            step={1}
                                            onChange={(e) => handleTimeChange(e)}
                                        />
                                    </div>
                                    <div className="col-md-6 ">
                                        <div className="mx-auto" style={{width: '60%'}}>
                                            <label htmlFor="date" style={{marginBottom: '15px'}}>Ngày bắt đầu:</label>
                                            <input type="date" id="date" className="form-control"
                                                   min={new Date().toISOString().split('T')[0]}
                                                   value={infoForm2.workDay || new Date().toISOString().split('T')[0]}
                                                   onChange={(e) => handleDateChange(e)}/>
                                        </div>

                                    </div>
                                </div>
                                <div className="row g-2 mt-3">
                                    <div className="col-md-6 text-left">
                                        <label htmlFor="note" style={{marginBottom: '15px'}}>Ghi chú:</label>
                                        <textarea id="note" className="form-control" rows="3"></textarea>
                                    </div>
                                    <div className="col-md-6 mt-5">
                                        <div className="form-check" style={{marginLeft: '50px'}}>
                                            <input type="checkbox" className="form-check-input"
                                                   style={{marginTop: '10px'}} id="terms"
                                                   checked={isConfirmPolicy} //==> false
                                                   onChange={() => setIsConfirmPolicy(prevState => !prevState)}/>
                                            <label htmlFor="terms" className="form-check-label"
                                                   style={{fontSize: 'smaller'}}>
                                                Tôi đồng ý các điều khoản.
                                                <div className="form-text">
                                                    (*)
                                                    Chúng tôi cam kết hỗ trợ trang thiết bị vệ sinh và cơ sở vật
                                                    chất liên quan.
                                                </div>
                                                <div className="form-text text-danger mb-3">
                                                    Ngoại trừ...
                                                </div>
                                                <div className="form-text">
                                                    <label>
                                                        (*) Điều khoản về thanh toán:
                                                    </label>
                                                    <div className="form-text ms-3 ">
                                                        <label>
                                                            (i) Tiền lương hàng tháng của người lao động
                                                        </label>
                                                        <label>
                                                            (ii) [Phí thành viên Housemaid] chỉ thông qua (các) nền tảng
                                                            trực tuyến
                                                            của Housemaid.
                                                        </label>
                                                    </div>

                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center row g-4 mt-3">
                                    <div className="col-md-12">
                                        <button type="button"
                                                className="btn btn-primary border-0 rounded-pill px-4 py-3"
                                                onClick={handleNextForm}>Tiếp theo

                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}

                        {currentForm === 3 && (
                            <div className="container">
                                <div className="text-center">
                                    <h1 className="display-5 mb-5">Xác nhận hóa đơn</h1>
                                </div>
                                <div className="row g-2">
                                    <div className="col-md-9">
                                        <form action="#" className="mb-4" style={{
                                            maxWidth: '900px',
                                            width: '100%',
                                            borderRadius: '10px',
                                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                                            padding: '20px'
                                        }}>
                                            <div className="text-left row g-4">
                                                <div className="col-md-12">
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary border-0 rounded-pill px-4 py-3"
                                                        onClick={handleBackForm}
                                                    >
                                                        Quay lại
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mb-3 mt-4 row">
                                                <div className="col-md-4">
                                                    <label className="form-label" htmlFor="basic-icon-default-address">
                                                        Địa chỉ
                                                    </label>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="input-group input-group-merge">
                                                        <span className="input-group-text"><i
                                                            className="fa fa-map-marker"></i></span>
                                                        <input
                                                            type="text"
                                                            id="basic-icon-default-address"
                                                            className="form-control"
                                                            placeholder={infoForm3.address}
                                                            value={infoForm3.address}
                                                            // aria-label="john.doe"
                                                            aria-describedby="basic-icon-default-address"
                                                        />
                                                        <span
                                                            id="basic-icon-default-address"
                                                            className="input-group-text"
                                                            style={{
                                                                cursor: 'pointer',
                                                                color: '#000',
                                                                background: '#FDF000'
                                                            }}
                                                            onClick={(e) => handleEditAddress(e)}
                                                        >
                                                            Change
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-3 row">
                                                <div className="col-md-4">
                                                    <label className="form-label" htmlFor="basic-icon-default-fullname">
                                                        Họ và Tên</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="input-group input-group-merge">
                                            <span id="basic-icon-default-fullname2" className="input-group-text">
                                                <i className="fa fa-user"></i>
                                            </span>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="basic-icon-default-fullname"
                                                            placeholder={infoForm3.name}
                                                            value={infoForm3.name}
                                                            // aria-label="John Doe"
                                                            aria-describedby="basic-icon-default-fullname2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-3 row">
                                                <div className="col-md-4">
                                                    <label className="form-label"
                                                           htmlFor="basic-icon-default-email">Email</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="input-group input-group-merge">
                                                <span className="input-group-text"><i
                                                    className="fa fa-envelope"></i></span>
                                                        <input
                                                            type="text"
                                                            id="basic-icon-default-email"
                                                            className="form-control"
                                                            placeholder={infoForm3.email}
                                                            value={infoForm3.email}
                                                            // aria-label="john.doe"
                                                            aria-describedby="basic-icon-default-email2"
                                                        />
                                                        {/*<span id="basic-icon-default-email2"*/}
                                                        {/*      className="input-group-text">@gmail.com</span>*/}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-3 row">
                                                <div className="col-md-4">
                                                    <label className="form-label" htmlFor="basic-icon-default-phone">
                                                        Số điện thoại</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="input-group input-group-merge">
                                            <span id="basic-icon-default-phone2" className="input-group-text">
                                                <i className="fa fa-phone"></i>
                                            </span>
                                                        <input
                                                            type="text"
                                                            id="basic-icon-default-phone"
                                                            className="form-control phone-mask"
                                                            placeholder={infoForm3.phone}
                                                            value={infoForm3.phone}
                                                            // aria-label="658 799 8941"
                                                            aria-describedby="basic-icon-default-phone2"
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-3 row">
                                                <div className="col-md-4">
                                                    <label className="form-label">Tổng giá tiền</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="input-group input-group-merge">
                                                        <input type="text" className="form-control text-success fw-bold"
                                                               value={formatMoney(totalPriceRaw)} readOnly/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-3 row">
                                                <div className="col-md-4">
                                                    <label className="form-label">Số lượng nhân viên</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="input-group input-group-merge">
                                                        <input type="text" className="form-control text-success fw-bold"
                                                               value={infoForm2.limitEmployee} readOnly/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-3 row">
                                                <div className="col-md-4">
                                                    <label className="form-label">Tổng thời gian làm việc</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="input-group input-group-merge">
                                                        <input type="text" className="form-control text-success fw-bold"
                                                               value={formatMinutesToDetail(timeApprox)}
                                                               readOnly/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-3 row">
                                                <div className="col-md-4">
                                                    <label className="form-label">Ngày giờ làm việc</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="input-group input-group-merge">
                                                        <input type="text" className="form-control text-success fw-bold"
                                                               value={`${infoForm2.timeStart}, ${formatYYYYMMDDToDDMMYYYY(infoForm2.workDay)}`}
                                                               readOnly/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-center row g-4 ">
                                                <div className="col-md-12">
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary border-0 rounded-pill px-4 py-3"
                                                        onClick={(e) => showConfirmOrder(e)}
                                                    >
                                                        Đặt ngay
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-md-3 form-group">
                                        <form className=" mb-4"
                                              style={{
                                                  borderRadius: '10px',
                                                  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                                                  padding: '20px'
                                              }}>
                                            <div className="text-center">
                                                <h3 className="mb-5 ">Dịch vụ đã chọn</h3>
                                            </div>
                                            <ul className="list-group">
                                                {listJob.filter(e => e.checked).map((job, index) => (
                                                    <li key={index}
                                                        className="list-group-item d-flex justify-content-between">
                                                        <label className="form-label ">
                                                            {job.name}
                                                        </label>
                                                        <input
                                                            type="checkbox"
                                                            name="job"
                                                            checked={job.checked}
                                                            onChange={(event) => handleCheckboxChange(event, job.id)}
                                                        />
                                                    </li>
                                                ))}
                                            </ul>
                                        </form>
                                    </div>

                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ModalConfirm show={show} setShow={setShowModalConfirm}
                          handleConfirmOrder={handleConfirmOrder}></ModalConfirm>
            <Footer/>
            <LoadingModal loading={loading}/>
        </>);
}
export default Order;


