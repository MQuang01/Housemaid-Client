import React, {useState,useEffect} from "react";
import axios from "axios";
const TablePrice = () => {
    const [serviceData, setServiceData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://192.168.1.39:8080/api/jobs');
                setServiceData(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container-fluid py-5" id="table-price">
            <div className="container py-5">
                <div className="text-center mb-5 wow fadeInUp" data-wow-delay=".3s">
                    <h5 className="mb-2 px-3 py-1 text-dark rounded-pill d-inline-block border border-2 border-primary">Tham khảo giá</h5>
                    {/*<h1 className="display-5 w-50 mx-auto">Bảng giá dịch vụ vệ sinh</h1>*/}
                </div>
                <div className="row g-5">
                    <div className="col-lg-12 col-md-6 col-sm-12 wow fadeInUp" data-wow-delay=".3s">
                        <div className="rounded bg-light pricing-item">
                            <div className="bg-primary py-3 px-5 text-center rounded-top border-bottom border-dark">
                                <h2 className="m-0">Bảng giá dịch vụ vệ sinh</h2>
                            </div>
                            <table className="table table-light table-hover">
                                <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Image</th>
                                    <th>Tên dịch vụ</th>
                                    <th>Giá tiền</th>
                                    <th>Thời gian ước tính</th>
                                </tr>
                                </thead>
                                <tbody>
                                {serviceData.map((service, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td><img src={service.image} alt="domestichelp"/></td>
                                        <td>{service.name}</td>
                                        <td>{service.price}</td>
                                        <td>~{service.timeApprox} phút/đơn vị</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TablePrice;