import React, {useState, useEffect} from "react";
import {InforUrl} from "../../until/InforUrl";
import axios from "axios";
import {fetchJobsPaging} from "../../service/JobService";
import Pagination from "../pagination/Pagination";
import {formatMoney} from "../../until/FormatMoney";

const TablePrice = () => {
    const [loading,setLoading] = useState(false);
    const [job, setJob] = useState([]);
    const [dataPage, setDataPage] = useState(
        {
            page: 0,
            totalPage: 0
        }
    );

    function fetchDataPage(newDataPage) {
        setDataPage(newDataPage);
    }


    useEffect(() => {
        fetchJobsPaging(dataPage.page).then((data) => {
            const formattedData = data.content.map(item => ({
                ...item,
                price: formatMoney(item.price)
            }))
            setJob(formattedData);
            setDataPage(
                {
                    ...dataPage,
                    totalPage: data.totalPages
                }
            );
        })
    }, [dataPage.page]);

    return (
        <div className="container-fluid py-5" id="table-price">
            <div className="container py-5">
                <div className="text-center mb-5 wow fadeInUp" data-wow-delay=".3s">
                    <h5 className="mb-2 px-3 py-1 text-dark rounded-pill d-inline-block border border-2 border-primary">Tham
                        khảo giá</h5>
                    {/*<h1 className="display-5 w-50 mx-auto">Bảng giá dịch vụ vệ sinh</h1>*/}
                </div>
                <div className="row g-5">
                    <div className="col-lg-12 col-md-6 col-sm-12 wow fadeInUp" data-wow-delay=".3s">
                        <div className="rounded bg-light pricing-item p-3">
                            <div className="bg-primary py-3 px-5 text-center rounded-top border-bottom border-dark">
                                <h2 className="m-0">Bảng giá dịch vụ vệ sinh</h2>
                            </div>
                            <table className="border table table-light table-hover text-center">
                                <thead>
                                    <tr>
                                        <th colSpan={5} className="text-start">
                                            <select className="w-25 ms-xl-4 form-select form-select-lg">
                                                <option>Tất cả công việc</option>
                                                <option>Vệ sinh nha cửa</option>
                                            </select>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>Lựa chọn</th>
                                        <th>Image</th>
                                        <th>Tên dịch vụ</th>
                                        <th>Giá tiền</th>
                                        <th>Thời gian ước tính</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {job.map((job, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td><img src={job.urlImage} height='40px' width='40px' alt="domestichelp"/></td>
                                        <td className="text-start">{job.name}</td>
                                        <td className="text-end">{job.price}</td>
                                        <td>~{job.timeApprox} phút/đơn vị</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <Pagination dataPage={dataPage} setDataPage={fetchDataPage} loading={loading} setLoading={setLoading}/>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TablePrice;