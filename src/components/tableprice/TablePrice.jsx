import React, {useState, useEffect} from "react";
import {formatMoney} from "../../until/FormatMoney";
import {fetchCategory} from "../../service/CategoryService";
import toastr from "toastr";
import LoadingModal from "../loading/LoadingModal";
import {fetchJobsByCategoryId} from "../../service/JobService";

const TablePrice = () => {
    const [loading,setLoading] = useState(false);
    const [selectCategory, setSelectCategory] = useState("")
    const [jobs, setJobs] = useState([]);
    const [categories, setCategories] = useState([])
    const [checkboxStates, setCheckboxStates] = useState(Array(jobs.length).fill(false));

    // Xử lý validation trong input
    const [validValueInput, setValidValueInput] = useState(Array(jobs.length).fill(1));

    const handleChangeValueInput = (index, max, min, event) => {
        const newValueInput = [...validValueInput];
        const inputValue = parseInt(event.target.value); // Chuyển đổi giá trị nhập vào thành số nguyên
        if (inputValue < min) {
            newValueInput[index] = min;
        } else if (inputValue > max) {
            newValueInput[index] = max;
        } else {
            newValueInput[index] = inputValue;
        }
        setValidValueInput(newValueInput);
    };

    // Check box từng dòng trong bảng
    const handleCheckboxClick = (index) => {
        const newCheckboxStates = [...checkboxStates];
        newCheckboxStates[index] = !newCheckboxStates[index];
        setCheckboxStates(newCheckboxStates);
    };

    //Fetch all data Category
    useEffect(() => {
        setLoading(true)
        try {
            fetchCategory().then(data => {
                setCategories(data);
            });
        } catch (error) {
            toastr.error(error.message);
        } finally {
            setLoading(false);
        }
    }, []);


    //Fetch data job by category ID
    useEffect(() => {
        setLoading(true)
        try {
            fetchJobsByCategoryId(2).then(data => {
                setJobs(data);
            });
        } catch (error) {
            toastr.error(error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <div className="container-fluid py-5" id="table-price">
            <div className="container py-5">
                <div className="text-center mb-5 wow fadeInUp" data-wow-delay=".3s">
                    <h5 className="mb-2 px-3 py-1 text-dark rounded-pill d-inline-block border border-2 border-primary">Tham
                        khảo giá</h5>
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
                                        <th colSpan={6} className="text-start">
                                            <select className="w-25 ms-xl-4 form-select form-select-lg">
                                                <option defaultValue="">Tất cả công việc</option>
                                                {categories.map((category, index) => {
                                                    return <option key={category.name}>{category.name}</option>
                                                })}
                                            </select>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>Lựa chọn:</th>
                                        <th>Image</th>
                                        <th>Tên dịch vụ</th>
                                        <th>Giá tiền</th>
                                        <th>Thời gian ước tính</th>
                                        <th>Số lượng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {jobs.map((job, index) => (
                                    <tr key={index} className="align-middle" style={{cursor: "pointer"}}
                                            onClick={(e) => {
                                                // Kiểm tra xem sự kiện click có phát sinh từ Input không
                                                if (e.target.tagName.toLowerCase() !== "input") {
                                                    handleCheckboxClick(index)
                                                }
                                                }
                                            }>
                                        <td>
                                            <div className="form-check d-flex justify-content-center align-items-center">
                                                <input className="form-check-input" type="checkbox" checked={checkboxStates[index]} readOnly/>
                                            </div>
                                        </td>
                                        <td><img src={job.urlImage} height='40px' width='40px' alt="domestichelp"/></td>
                                        <td className="text-start">{job.name}</td>
                                        <td className="text-end">{formatMoney(job.price)}</td>
                                        <td className="text-end">~{job.timeApprox} phút/{job.typeJob === 'Quantity' ? "sản phẩm" : "m2"}</td>
                                        <td>
                                            <input className="w-50 text-end" type={"number"}
                                                   defaultValue={validValueInput[index]}
                                                   onChange={() => {
                                                       const max = job.typeJob === 'Quantity' ? 20 : 10000 ;
                                                       handleChangeValueInput(index, max, 1)
                                                   }} />
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
            {/* Xử lý hiển thị loading */}
            <LoadingModal loading={loading} />
        </div>
    )
}
export default TablePrice;