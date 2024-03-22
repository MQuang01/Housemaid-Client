import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import {useEffect, useState} from "react";

const Booking = () => {
    const [selectedServices, setSelectedServices] = useState([]);
    const [servicesData, setServicesData] = useState([]);
    const [currentForm, setCurrentForm] = useState(1);

    useEffect(() => {
        // Gọi API để lấy thông tin dịch vụ
        // Giả sử API trả về một mảng dữ liệu
        const fetchedServicesData = [
            { id: 1, name: "Pest Control-1", price: "100.000 VNĐ", time: "30 phút/đơn vị" },
            { id: 2, name: "Pest Control-2", price: "150.000 VNĐ", time: "45 phút/đơn vị" },
        ];

        setServicesData(fetchedServicesData);
    }, []);

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedServices(prevSelectedServices => [...prevSelectedServices, value]);
        } else {
            setSelectedServices(prevSelectedServices => prevSelectedServices.filter(service => service !== value));
        }
    };

    const handleNextForm = () => {
        setCurrentForm(2);
    };

    const handleBackForm = () => {
        setCurrentForm(1);
    };

    return (
        <>
            <Navbar />
            <div className="container-fluid py-3 wow fadeInUp" data-wow-delay=".3s">
                <div className="container py-3">
                    <div className="bg-light px-4 py-3 rounded">
                        <div className="text-center">
                            <h1 className="display-5 mb-5">Find Your Pest Control Services</h1>
                        </div>
                        {currentForm === 1 && (
                            <form className="text-center mb-4" action="#">
                                <div className="table-responsive">
                                    <table className="table table-light table-hover">
                                        <thead>
                                        <tr>
                                            <th>Tên dich vụ</th>
                                            <th>Giá tiền</th>
                                            <th>Thời gian ước tính</th>
                                            <th>Lựa chọn</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {servicesData.map(service => (
                                            <tr key={service.id}>
                                                <td>{service.name}</td>
                                                <td>{service.price}</td>
                                                <td>{service.time}</td>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        id={service.id}
                                                        value={service.name}
                                                        onChange={handleCheckboxChange}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                                {selectedServices.length > 0 && (
                                    <div className="d-flex justify-content-end gap-5" style={{ marginRight: '24rem' }}>
                                        <div>
                                            <p>Total Price: {selectedServices.reduce((total, service) => {
                                                const selectedService = servicesData.find(item => item.name === service);
                                                return total + parseInt(selectedService.price.replace(/\D/g, ''));
                                            }, 0)} VNĐ</p>
                                        </div>
                                        <div>
                                            <p>Total Time: ~{selectedServices.reduce((total, service) => {
                                                const selectedService = servicesData.find(item => item.name === service);
                                                return total + parseInt(selectedService.time.replace(/\D/g, ''));
                                            }, 0)} phút/đơn vị</p>
                                        </div>
                                    </div>
                                )}
                                <div className="row g-4">
                                    <div className="col-md-12">
                                        <button type="button" className="btn btn-primary border-0 rounded-pill px-4 py-3" onClick={handleNextForm}>Next Step</button>
                                    </div>
                                </div>
                            </form>
                        )}
                        {currentForm === 2 && (
                            <form className="text-center mb-4" action="#">
                                <div className="row g-2">
                                    <div className="col-md-3">
                                        <label htmlFor="employee">Số lượng nhân viên:</label>
                                        <select id="employee" className="form-select form-select-sm">
                                            <option value="NV001">1</option>
                                            <option value="NV002">2</option>
                                            <option value="NV003">3</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row g-2 mt-3">
                                    <div className="col-md-6">
                                        <label htmlFor="time">Thời gian:</label>
                                        <input type="time" id="time" className="form-control" />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="date">Ngày:</label>
                                        <input type="date" id="date" className="form-control" />
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
                                        <button type="button" className="btn btn-primary border-0 rounded-pill px-4 py-3" onClick={handleBackForm}>Back</button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Booking;