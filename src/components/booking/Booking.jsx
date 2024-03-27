import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {fetchJobById} from "../../service/JobService";
import {formatMoney} from "../../until/FormatMoney";
import toastr from "toastr";

const Booking = () => {
    const location = useLocation();
    const {state} = location;
    const [selectedJobs, setSelectedJob] = useState([]);
    const [listJob, setListJob] = useState([]);
    const [currentForm, setCurrentForm] = useState(1);
    const categoryId = state && state.idCate;
    const [totalPriceRaw, setTotalPriceRaw] = useState(0); // Lưu trữ giá trị chưa được định dạng
    const [totalPriceFormatted, setTotalPriceFormatted] = useState("0");

    useEffect(() => {
        if (categoryId == null) {
            window.location.href = '/';
        }
        fetchJobById(categoryId).then((data) => {
            const formattedData = data.map(item => ({
                ...item,
                price: formatMoney(item.price)
            }))
            setListJob(formattedData);
        })

    }, [])

    useEffect(() => {
        calculateTotalPrice();
    }, [selectedJobs, listJob]);

    useEffect(() => {
        setTotalPriceFormatted(formatMoney(totalPriceRaw).toLocaleString()); // Định dạng giá trị khi giá trị thay đổi
    }, [totalPriceRaw]);

    const calculateTotalPrice = () => {
        // Sử dụng phương thức reduce để tính tổng giá trị của các dịch vụ đã chọn
        const totalPrice = selectedJobs.reduce((total, service) => {
            const selectedService = listJob.find(item => item.name === service);
            return total + parseInt(selectedService.price) * 1000;
        }, 0);
        setTotalPriceRaw(totalPrice);
    }

    const [selectedServices, setSelectedServices] = useState([]);
    const [servicesData, setServicesData] = useState([]);
    const [currentForm, setCurrentForm] = useState(1);
    const [employeeCount, setEmployeeCount] = useState(0);
    const [selectedTime, setSelectedTime] = useState({start: '00:00', end: '00:00'});


    useEffect(() => {
        // Gọi API để lấy thông tin dịch vụ
        // Giả sử API trả về một mảng dữ liệu
        const fetchedServicesData = [
            {id: 1, name: "Pest Control-1", price: "100.000 VNĐ", time: "30 phút/đơn vị"},
            {id: 2, name: "Pest Control-2", price: "150.000 VNĐ", time: "45 phút/đơn vị"},
        ];


    const handleNextForm = () => {
        if (selectedJobs.length > 0) {
            setCurrentForm(2);
        }else {
            toastr.error("Chọn ít nhất 1 dịch vụ")
        }
    };

    const handleBackForm = () => {
        setCurrentForm(1);
    };


    const handleCheckboxChange = (event) => {
        const {value, checked} = event.target;
        if (checked) {
            setSelectedJob(prevSelectedJobs => [...prevSelectedJobs, value]);
        } else {
            setSelectedJob(prevSelectedJobs => prevSelectedJobs.filter(job => job !== value));
        }
    };
    function selectAllJobs() {
        console.log("aaaa")
        const allJobNames = listJob.map(job => job.name);

        setSelectedJob(allJobNames);
    }

    function cancelSelectAll() {
        setSelectedJob([]);
    }
    const handleNextForm = () => {
        setCurrentForm(currentForm + 1);
    };

    const handleBackForm = () => {
        setCurrentForm(currentForm - 1);
    };

    const calculateEndTime = (startTime, totalTime) => {
        const startHour = parseInt(startTime.split(':')[0]);
        const startMinute = parseInt(startTime.split(':')[1]);
        const totalHour = Math.floor(totalTime / 60);
        const totalMinute = totalTime % 60;

        let endHour = startHour + totalHour;
        let endMinute = startMinute + totalMinute;

        // Kiểm tra và điều chỉnh giờ và phút nếu cần
        if (endMinute >= 60) {
            endHour += Math.floor(endMinute / 60);
            endMinute %= 60;
        }

        let formattedEndHour = endHour.toString().padStart(2, '0');
        let formattedEndMinute = endMinute.toString().padStart(2, '0');

        // Kiểm tra và chuyển đổi khi vượt qua 24:00
        if (endHour >= 24) {
            formattedEndHour = (endHour - 24).toString().padStart(2, '0');
        }

        return `${formattedEndHour}:${formattedEndMinute}`;
    };


    const handleTimeChange = (event) => {
        const selectedValue = event.target.value;
        const selectedHour = Math.floor(selectedValue / 2);
        const selectedMinutes = selectedValue % 2 === 0 ? '00' : '30';
        const formattedTime = `${selectedHour}:${selectedMinutes}`;

        const totalTime = selectedServices.reduce((total, service) => {
            const selectedService = servicesData.find(item => item.name === service);
            return total + parseInt(selectedService.time.replace(/\D/g, ''));
        }, 0);

        const endTime = calculateEndTime(formattedTime, totalTime);

        setSelectedTime({start: formattedTime, end: endTime});
    };

    return (
        <>
            <Navbar/>

            {/*<div className="container-fluid page-header py-5">*/}
            {/*    <div className="container text-center py-5">*/}
            {/*        /!*<h1 className="display-2 text-white mb-4 animated slideInDown">About</h1>*!/*/}
            {/*        <nav aria-label="breadcrumb">*/}
            {/*            <ol className="breadcrumb justify-content-center mb-0 animated slideInDown">*/}
            {/*                <li className="breadcrumb-item"><a href="/">Trang chủ</a></li>*/}
            {/*                <li className="breadcrumb-item text-white" aria-current="page">Đặt lịch</li>*/}
            {/*            </ol>*/}
            {/*        </nav>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div>
                <nav >
                    <ol className="breadcrumb mb-0 animated slideInDown" style={{fontSize:'20px',marginLeft:'112px',marginTop:'50px'}}>
                        <li className="breadcrumb-item" ><a href="/">Trang chủ</a></li>
                        <li className="breadcrumb-item " aria-current="page" style={{color:'#e6e600'}}>Đặt lịch</li>
                        <li className="breadcrumb-item " aria-current="page">Bước {currentForm}</li>

                    </ol>
                </nav>
            </div>

            <div className="container-fluid py-3 wow fadeInUp" data-wow-delay=".3s">
                <div className="container py-3">
                    <div className="bg-light px-4 py-3 rounded">
                        <div className="text-center">
                            <h1 className="display-5 mb-5">Chọn công việc bạn muốn thực hiện</h1>
                        </div>

                        {/*form-1*/}

                        {currentForm === 1 && (
                            <form className="text-center mb-4" action="#" style={{borderRadius:'10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', padding:'20px'}}>
                                <div className="table-responsive">
                                    <table className="table table-light table-hover">
                                        <thead>
                                        <tr>
                                            <th>Tên dich vụ</th>
                                            <th>Khoảng giá</th>
                                            <th>Thời gian ước tính</th>
                                            <th>
                                                Lựa chọn
                                                <button
                                                    type="button"
                                                    className="ms-2 btn btn-primary"
                                                    onClick={() => {
                                                        if (selectedJobs.length > 0 && selectedJobs.length === listJob.length) {
                                                            cancelSelectAll();
                                                        } else {
                                                            selectAllJobs();
                                                        }
                                                    }}
                                                >
                                                    {selectedJobs.length > 0 && selectedJobs.length === listJob.length ? 'Hủy chọn' : 'Chọn tất cả'}
                                                </button>
                                            </th>

                                        </tr>
                                        </thead>
                                        <tbody>

                                        {listJob.map(job => (
                                            <tr key={job.id}>
                                                <td>{job.name}</td>
                                                <td>{job.price}</td>
                                                <td>~{job.timeApprox} phút/đơn vị</td>
                                                <td className="d-flex align-items-center justify-content-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id={job.id}
                                                        value={job.name}
                                                        checked={selectedJobs.includes(job.name)}
                                                        onChange={handleCheckboxChange}
                                                    />
                                                    <input className="form-control ms-2 form-control form-control-sm w-25" type="number"/>
                                                </td>

                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                                {selectedJobs.length > 0 && (

                                {selectedServices.length > 0 && (
                                    <div className="d-flex justify-content-end gap-5" style={{marginRight: '24rem'}}>
                                        <div>
                                            <p>Tổng giá ước tính: ~{totalPriceFormatted}</p>
                                        </div>
                                    </div>
                                )}
                                <div className="row g-4">
                                    <div className="col-md-12">
                                        <button type="button"
                                                className="btn btn-primary border-0 rounded-pill px-4 py-3"
                                                onClick={handleNextForm}>Tiếp tục

                                <div className="row g-4 ">
                                    <div className="col-md-12 ">
                                        <button type="button"
                                                className="btn btn-primary border-0 rounded-pill px-4 py-3"
                                                onClick={handleNextForm}>Next Step
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}

                        {/*form-2*/}
                        {currentForm === 2 && (

                            <form className="text-center mb-4" action="#">
                                <div className="row g-2">
                                    <div className="col-md-3">
                                        <label htmlFor="employee">Số lượng nhân viên:</label>
                                        <select id="employee" className="form-select form-select-sm">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row g-2 mt-3">
                                    <div className="col-md-6">
                                        <label htmlFor="time">Thời gian làm việc:</label>
                                        <input type="time" id="time" className="form-control"/>

                            <form action="#" className=" mb-4" style={{borderRadius:'10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', padding:'20px'}}>
                                <div className="text-left row g-4 ">
                                    <div className="col-md-12">
                                        <button type="button"
                                                className="btn btn-primary border-0 rounded-pill px-4 py-3"
                                                onClick={handleBackForm}>BACK STEP
                                        </button>
                                    </div>
                                </div>
                                <div className="row g-2 mt-3">
                                    <div className="col-md-5">
                                        <label htmlFor="employee" style={{marginRight: '20px'}}>Số lượng nhân
                                            viên:</label>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="employee"
                                                   id="employee1" value="1"/>
                                            <label className="form-check-label" htmlFor="employee1">1</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="employee"
                                                   id="employee2" value="2"/>
                                            <label className="form-check-label" htmlFor="employee2">2</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="employee"
                                                   id="employee3" value="3"/>
                                            <label className="form-check-label" htmlFor="employee3">3</label>
                                        </div>

                                    </div>
                                </div>
                                <div className="row g-2 mt-3">
                                    <div className="col-md-6">

                                        <label htmlFor="date">Ngày làm việc:</label>
                                        <input type="date" id="date" className="form-control"/>

                                        <label htmlFor="time">Thời gian bắt đầu làm việc:</label>
                                        <div
                                            className="text-center mt-2">{selectedTime.start} - {selectedTime.end}</div>
                                        <input
                                            type="range"
                                            id="time"
                                            className="form-range"
                                            min={0}
                                            max={48}
                                            step={1}
                                            onChange={handleTimeChange}
                                        />
                                    </div>
                                    <div className="col-md-6 ">
                                        <div className="mx-auto" style={{width: '60%'}}>
                                            <label htmlFor="date" style={{marginBottom: '15px'}}>Ngày bắt đầu:</label>
                                            <input type="date" id="date" className="form-control "/>
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
                                                   style={{marginTop: '10px'}} id="terms"/>
                                            <label htmlFor="terms" className="form-check-label" style={{fontSize: 'smaller'}}>
                                                Tôi đồng ý thanh toán (i) [Tiền lương hàng tháng của người lao động] &
                                                (ii) [Phí thành viên Broomees] chỉ thông qua (các) nền tảng trực tuyến
                                                của Broomees.
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center row g-4 mt-3">
                                    <div className="col-md-12">
                                        <button type="button"
                                                className="btn btn-primary border-0 rounded-pill px-4 py-3"

                                                onClick={handleBackForm}>Trở lại

                                                onClick={handleNextForm}>NEXT STEP

                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                        {currentForm === 3 && (
                            <div className="d-flex justify-content-center align-items-center" >
                                <form action="#" className="mb-4" style={{maxWidth: '700px', width: '100%', borderRadius:'10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', padding:'20px'}}>
                                    <div className="text-left row g-4">
                                        <div className="col-md-12">
                                            <button
                                                type="button"
                                                className="btn btn-primary border-0 rounded-pill px-4 py-3"
                                                onClick={handleBackForm}
                                            >
                                                BACK STEP
                                            </button>
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
                                                    id="basic-icon-default-fullname"
                                                    placeholder="John Doe"
                                                    aria-label="John Doe"
                                                    aria-describedby="basic-icon-default-fullname2"
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
                                                    type="text"
                                                    id="basic-icon-default-email"
                                                    className="form-control"
                                                    placeholder="john.doe"
                                                    aria-label="john.doe"
                                                    aria-describedby="basic-icon-default-email2"
                                                />
                                                <span id="basic-icon-default-email2" className="input-group-text">@gmail.com</span>
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
                                        <div className="col-md-3">
                                            <label className="form-label">Tổng thời gian</label>
                                        </div>
                                        <div className="col-md-9">
                                            <div className="input-group input-group-merge">
                                                <input type="text" className="form-control" placeholder="2 hours" readOnly />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <div className="col-md-3">
                                            <label className="form-label">Tổng giá tiền</label>
                                        </div>
                                        <div className="col-md-9">
                                            <div className="input-group input-group-merge">
                                                <input type="text" className="form-control" placeholder="$50" readOnly />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <div className="col-md-3">
                                            <label className="form-label">Số lượng nhân viên</label>
                                        </div>
                                        <div className="col-md-9">
                                            <div className="input-group input-group-merge">
                                                <input type="text" className="form-control" placeholder="5" readOnly />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <div className="col-md-3">
                                            <label className="form-label">Thời gian làm việc</label>
                                        </div>
                                        <div className="col-md-9">
                                            <div className="input-group input-group-merge">
                                                <input type="text" className="form-control" placeholder="8 hours" readOnly />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3 form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="termsCheckbox"
                                        />
                                        <label className="form-check-label" htmlFor="termsCheckbox"  style={{fontSize: 'smaller'}}>
                                            Tôi đồng ý với các điều khoản và điều kiện.
                                        </label>
                                    </div>
                                    <div className="text-center row g-4 ">
                                        <div className="col-md-12">
                                            <button
                                                type="button"
                                                className="btn btn-primary border-0 rounded-pill px-4 py-3"
                                            >
                                                Book Now
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
        </>
    );
};

export default Booking;