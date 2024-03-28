import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {fetchJobByCategoryId} from "../../service/JobService";
import {formatMoney} from "../../until/FormatMoney";
import toastr from "toastr";
import {
    formatHHMMSinceMidnightToMinutes,
    formatMinutesToDetail,
    formatMinutesToHHMM,
    formatYYYYMMDDToDDMMYYYY, getTimeNow,
    parseTimeString
} from "../../until/FormatTime";
import {AMOUNT_TYPE, compareTime} from "../../until/app-constant";
import {fetchListEmployee} from "../../service/EmployeeService";
// import deepMerge from "react-hook-form/dist/utils/deepMerge";


// listjob khi list job thay đổi thì mình cập nhật state listjob thứ 2 là cập nhật ở localstorage
// listJob không call api lấy ở localstorage
// localstorage ko có thì call api xong cập nhật localstorage và state
// listJob.filter(e=> e.checked).map(e => {
// return {
//                  "jobId": e.id,
//                  "timeApprox": e.timeApprox,
//                  "quantity": e.quantity,
//                  "houseSize": e.houseSize
//              }
// }


const Booking = () => {
    const location = useLocation();
    const {state} = location;
    const categoryId = state?.idCate;


    const initialOrder = {
        userId: null,
        categoryId: categoryId,
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

    // 3 step
    //  1. 'dataOfStep1' => localStorage
    //  2. {quantityEmployee, workDay, timeStart} => localStorage
    //  3. .... => localStorage
    // submit => localStorage merge DTO

    const [listJob, setListJob] = useState(JSON.parse(localStorage.getItem('listJob')) || []);

    // state for form 2
    const [listEmployee, setListEmployee] = useState([]);
    const [infoForm2, setInfoForm2] = useState(JSON.parse(localStorage.getItem('infoForm2')) || {
        limitEmployee: 1,
        workDay: new Date().toISOString().slice(0, 10),
        timeStart: selectedTime.start
    });
    const [isConfirmPolicy, setIsConfirmPolicy] = useState(JSON.parse(localStorage.getItem('confirmPolicy') || 'false'));
    const [messageWarning, setMessageWarning] = useState('');

    // state for calculate
    const [totalPriceRaw, setTotalPriceRaw] = useState(0);
    const [timeApprox, setTimeApprox] = useState(JSON.parse(localStorage.getItem('timeApprox')) || 0);


    useEffect(() => {
        if (categoryId == null) {
            window.location.href = '/';
        }

        if (listJob.length === 0) {
            fetchJobByCategoryId(categoryId).then(data => {
                const formattedData = data.map(item => ({
                    ...item,
                    price: formatMoney(item.price),
                    quantity: null,
                    houseSize: null,
                    checked: false
                }));
                setListJob(formattedData);
            });
        }

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
        calculateTotalTimeApprox();
    }, [listJob]);
    const handleChangeJobChecked = () => {
        if (listJob.map(e => e.checked).includes(false)) {
            return;
        }
        if (hasJobChecked) {
            calculateTotalPrice();
            calculateTotalTimeApprox()
        }

    }
    useEffect(() => {
        handleChangeJobChecked()
    }, [listJob]);

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
                if (job.type === "Quantity") {
                    return total + (parseInt(job.price) * job.quantity * 1000);
                }
                if (job.type === "Size") {
                    return total + (parseInt(job.price) * job.houseSize * 1000);
                }
            }
            return total;
        }, 0);
        setTotalPriceRaw(totalPrice);
    };
    const calculateEndTime = (startTime, totalTime) => {
        const timeStart = formatHHMMSinceMidnightToMinutes(startTime);
        const timeEnd = timeStart + formatHHMMSinceMidnightToMinutes(totalTime);


        // Kiểm tra và điều chỉnh giờ và phút nếu cần
        let endHour = Math.floor(timeEnd / 60);
        let endMinute = timeEnd % 60;

        // Kiểm tra và điều chỉnh giờ và phút nếu cần
        if (endMinute >= 60) {
            endHour += Math.floor(endMinute / 60);
            endMinute %= 60;
        }

        let formattedEndHour = endHour.toString().padStart(2, '0');
        let formattedEndMinute = endMinute.toString().padStart(2, '0');

        if (endHour >= 24) {
            formattedEndHour = (endHour - 24).toString().padStart(2, '0');
        }

        // console.log(`${formattedEndHour}:${formattedEndMinute}`)
        return `${formattedEndHour}:${formattedEndMinute}`;
    };
    const calculateTotalTimeApprox = () => {
        const totalTime = listJob.reduce((total, job) => {
            if (job.checked) {
                if (job.type === "Quantity") {
                    return total + (parseInt(job.quantity) * parseInt(job.timeApprox));
                }
                if (job.type === "Size") {
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
    }, [isConfirmPolicy]);


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
            if (!isConfirmPolicy) {
                toastr.error("Vui lòng xác nhận điều khoản", "Cảnh báo");
            } else if (compareTime(parseTimeString(infoForm2.timeStart), getTimeNow()) < 0) {
                toastr.error("Vui lòng chọn thời gian phù hợp", "Cảnh báo");
            } else {
                setCurrentForm(currentForm + 1);
            }
        }
    };

    const handleBackForm = () => {
        setCurrentForm(currentForm - 1);
    };

    const handleInput = (event, job) => {
        let {value} = event.target;
        if (value === "0") {
            return;
        }

        // Kiểm tra loại công việc và giá trị nhập có hợp lệ không
        if (job.type === "Quantity" || job.type === "Size") {
            if (!/^\d+$/.test(value)) {
                return;
            }

            // Chuyển đổi giá trị nhập thành số nguyên
            const intValue = parseInt(value);

            const amountType = AMOUNT_TYPE[job.type];
            if (value > amountType) {
                return;
            }
            //cập nhật job ở trong list
            const updatedListJob = listJob.map(item => {
                if (item.id === job.id) {
                    if (item.type === "Quantity") {
                        return {...item, quantity: intValue};
                    }
                    if (item.type === "Size") {
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


    function handleCreateOrder() {
        // Set UserId vào rồi mở cái này lên
        // if (userId === null){
        //     if (window.alert("Vui lòng đăng nhập trước khi đặt dịch vụ. Thông tin sẽ được chúng tôi lưu lại")) {
        //         window.location.href = "/login";
        //     }
        //     return;
        // }
        initialOrder.listOrderDetail = listJob.filter(e => e.checked);
        initialOrder.totalPrice = totalPriceRaw;
        initialOrder.totalTimeApprox = timeApprox;
        initialOrder.timeStart = infoForm2.timeStart;
        initialOrder.quantityEmployee = infoForm2.limitEmployee;
        initialOrder.workDay = infoForm2.workDay;

        console.log(initialOrder)
    }

    return (
        <>
            <Navbar/>
            <div className="container-fluid py-3 wow fadeInUp" data-wow-delay=".3s">
                <div className="container py-3">
                    <div className="bg-light px-4 py-3 rounded">
                        <div className="text-center">
                            <h1 className="display-5 mb-5">Chọn công việc bạn muốn thực hiện</h1>
                        </div>

                        {/*form-1*/}

                        {currentForm === 1 && (<form className="text-center mb-4" style={{
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
                                        <td className="text-end px-5">{job.price}</td>
                                        <td className="text-end px-5">~{job.timeApprox} phút
                                            /{job.type === "Quantity" ? "1 cái" : "m2"}</td>
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

                                                value={job.type === "Quantity" ? job.quantity || 1 : job.houseSize || 1}
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
                        </form>)}

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
                                        {messageWarning !== "" && <div className="alert alert-danger">
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
                                                   checked={isConfirmPolicy !== false}
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
                            <div className="d-flex justify-content-center align-items-center">
                                <form action="#" className="mb-4" style={{
                                    maxWidth: '700px',
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
                                                Địa chỉ</label>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="input-group input-group-merge">
                                            <span className="input-group-text"><i
                                                className="fa fa-map-marker"></i></span>
                                                <input
                                                    type="text"
                                                    id="basic-icon-default-address"
                                                    className="form-control"
                                                    placeholder="john.doe"
                                                    aria-label="john.doe"
                                                    aria-describedby="basic-icon-default-address"
                                                />
                                                <span
                                                    id="basic-icon-default-address"
                                                    className="input-group-text"
                                                    style={{cursor: 'pointer', color: '#000', background: '#FDF000'}}
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
                                                    placeholder="John Doe"
                                                    aria-label="John Doe"
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
                                                    placeholder="john.doe"
                                                    aria-label="john.doe"
                                                    aria-describedby="basic-icon-default-email2"
                                                />
                                                <span id="basic-icon-default-email2"
                                                      className="input-group-text">@gmail.com</span>
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
                                                    placeholder="658 799 8941"
                                                    aria-label="658 799 8941"
                                                    aria-describedby="basic-icon-default-phone2"
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
                                                onClick={handleCreateOrder}
                                            >
                                                Đặt ngay
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer/>
        </>);
}
export default Booking;


