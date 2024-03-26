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
        const { value, checked } = event.target;
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

                        {currentForm === 1 && (
                            <form className="text-center mb-4" action="#">
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
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="date">Ngày làm việc:</label>
                                        <input type="date" id="date" className="form-control"/>
                                    </div>
                                </div>
                                <div className="row g-2 mt-3">
                                    <div className="col-md-6">
                                        <label htmlFor="note">Ghi chú:</label>
                                        <textarea id="note" className="form-control" rows="3"></textarea>
                                    </div>
                                </div>
                                <div className="row g-4 mt-3">
                                    <div className="col-md-12">
                                        <button type="button"
                                                className="btn btn-primary border-0 rounded-pill px-4 py-3"
                                                onClick={handleBackForm}>Trở lại
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default Booking;