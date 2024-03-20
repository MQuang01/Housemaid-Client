import React from "react";
const TablePrice = () => {
    return (
        <div className="container-fluid py-5">
            <div className="container py-5">
                <div className="text-center mb-5 wow fadeInUp" data-wow-delay=".3s">
                    <h5 className="mb-2 px-3 py-1 text-dark rounded-pill d-inline-block border border-2 border-primary">Our
                        Pricing</h5>
                    <h1 className="display-5 w-50 mx-auto">Affordable Pricing Plan For Pest Control Services</h1>
                </div>
                <div className="row g-5">
                    <div className="col-lg-12 col-md-6 col-sm-12 wow fadeInUp" data-wow-delay=".3s">
                        <div className="rounded bg-light pricing-item">
                            <div className="bg-primary py-3 px-5 text-center rounded-top border-bottom border-dark">
                                <h2 className="m-0">Bảng giá dịch vụ</h2>
                            </div>
                            <table className="table table-light table-hover">
                                <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên dịch vụ</th>
                                    <th>Giá tiền</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Basic Pest Control</td>
                                    <td>500.000</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Household pests Control</td>
                                    <td>500.000</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Rodent Control</td>
                                    <td>500.000</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>Re-Service at No-Charge</td>
                                    <td>500.000</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>Termite Control</td>
                                    <td>500.000</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>Mosquito Reduction</td>
                                    <td>500.000</td>
                                </tr>

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