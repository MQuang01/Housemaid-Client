import React, {useState, useEffect} from "react";
import {formatMoney} from "../../until/FormatMoney";
import {fetchCategory} from "../../service/CategoryService";
import toastr from "toastr";
import LoadingModal from "../loading/LoadingModal";
import {fetchJobs, fetchJobsByCategoryId} from "../../service/JobService";
import {formatMinutesToDetail} from "../../until/FormatTime";
import "./TablePrice.css"

const TablePrice = () => {
    const [loading,setLoading] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectCategory, setSelectCategory] = useState();
    const [checkboxStates, setCheckboxStates] = useState(Array(jobs.length).fill(false));
    const [, setJobsStatus] = useState({});
    const [searchKey, setSearchKey] = useState('');
    const [filteredJobs, setFilteredJobs] = useState([]);

    // Check box từng dòng trong bảng
    const handleCheckboxJobsClick = (index) => {
        const newCheckboxStates = [...checkboxStates];
        newCheckboxStates[index] = !newCheckboxStates[index];
        setCheckboxStates(newCheckboxStates);

        // Cập nhật localStorage
        const updatedJobs = [...jobs];
        updatedJobs[index].isChecked = newCheckboxStates[index];
        updatedJobs[index].quantity = 1;
        localStorage.setItem("cart-jobs", JSON.stringify(updatedJobs)); // Lưu mảng công việc đã cập nhật vào localStorage

        // Cập nhật trạng thái của JSON vào state
        setJobsStatus(prevStatus => ({
            ...prevStatus,
            [index]: newCheckboxStates[index]
        }));
    };
    //Set handle Click Category
    const handleCategoryClick =  (id) => {
        if(id === undefined) {
            setSelectCategory(undefined);
            localStorage.removeItem("cart-category")
            localStorage.removeItem("cart-jobs")
            setCheckboxStates(Array(jobs.length).fill(false))
        }
        categories.forEach(category => {
            if(category.id === id) {
                setSelectCategory(id);
                localStorage.setItem("cart-category", JSON.stringify(category))
                localStorage.removeItem("cart-jobs")
                setCheckboxStates(Array(jobs.length).fill(false))
            }
        })
    }
    //Set handle search key
    const handleSearchChange = (e) => {
        setSearchKey(e.target.value)
    }
    // Effect hook để đọc dữ liệu từ localStorage khi component được mount
    useEffect(() => {
        const storedJobs = JSON.parse(localStorage.getItem("cart-jobs"));
        if (storedJobs) {
            setJobs(storedJobs);
            // Khởi tạo mảng checkboxStates dựa trên trạng thái lưu trong storedJobs
            const initialCheckboxStates = storedJobs.map(job => job.isChecked || false);
            setCheckboxStates(initialCheckboxStates);
            // Khởi tạo trạng thái của JSON từ localStorage
            const initialJobsStatus = {};
            initialCheckboxStates.forEach((isChecked, index) => {
                initialJobsStatus[index] = isChecked;
            });
            setJobsStatus(initialJobsStatus);
        }
    }, []);
    //Fetch all data Category
    useEffect(() => {
        setLoading(true);
        try {
            const selectedCategory = JSON.parse(localStorage.getItem("cart-category"));
            fetchCategory().then(data => {
                setCategories(data);
                if (data.length > 0 && selectCategory === undefined) {
                    //Nếu chưa có localStorage cart-category
                    if(selectedCategory != null) {
                        setSelectCategory(selectedCategory.id);
                    } else {
                        setSelectCategory(undefined);
                    }
                }
            });
        } catch (error) {
            toastr.error(error.message);
        } finally {
            setLoading(false);
        }
    }, [selectCategory]);
    //Fetch data job by category ID
    useEffect(() => {
        setLoading(true);
        try {
            // Kiểm tra xem có dữ liệu trong localStorage không
            const storedJobs = JSON.parse(localStorage.getItem("cart-jobs"));
            if (storedJobs && storedJobs.length > 0) {
                // Nếu có dữ liệu trong localStorage, sử dụng dữ liệu đó cho jobs
                setJobs(storedJobs);
            } else {
                // Nếu không có dữ liệu trong localStorage, fetch dữ liệu mới
                // Kiểm tra xem selectCategory có giá trị không
                if (selectCategory !== undefined) {
                    fetchJobsByCategoryId(selectCategory).then(data => {
                        // Thêm thuộc tính isChecked và quantity cho mỗi công việc trong data
                        const newData = data.map(job => ({
                            ...job,
                            isChecked: false,
                            quantity: 1
                        }));
                        setJobs(newData);
                    });
                } else {
                    fetchJobs().then(data => {
                        setJobs(data.content);
                    })
                }
            }
        } catch (error) {
            toastr.error(error.message);
        } finally {
            setLoading(false);
        }
    }, [selectCategory]);
    //Fetch data jobs by search key
    useEffect(() => {
        if (searchKey.trim() === '') {
            setFilteredJobs(jobs);
        } else {
            const filtered = jobs.filter(job =>
                    job.name.toLowerCase().includes(searchKey.toLowerCase()) ||
                    job.category.name.toLowerCase().includes(searchKey.toLowerCase())
            );
            setFilteredJobs(filtered);
        }
    }, [jobs, searchKey]);


    return (
        <div className={"table-price"}>
            <div className="container-fluid py-5" id="table-price">
                <div className="container py-5">
                    <div className="text-center mb-5 wow fadeInUp" data-wow-delay=".3s">
                        <h5 className="mb-2 px-3 py-1 text-dark rounded-pill d-inline-block border border-2 border-primary">Tham khảo giá</h5>
                    </div>
                    <div className="row g-5">
                        <div className="col-lg-12 col-md-6 col-sm-12 wow fadeInUp" data-wow-delay=".3s">
                            <div className="rounded bg-light pricing-item p-3">
                                <div className="bg-primary py-3 px-5 text-center rounded-top border-bottom border-dark">
                                    <h2 className="m-0">BẢNG GIÁ DỊCH VỤ VỆ SINH</h2>
                                </div>
                                <table className="border table table-light table-hover text-center">
                                    <thead>
                                    <tr>
                                        <th colSpan={6} className="text-start">
                                            <div className={"d-flex justify-content-lg-evenly"}>
                                                <button
                                                    className={
                                                            `btn btn-primary btn-custom px-lg-4
                                                            ${undefined === selectCategory ? 'active' : ""}
                                                        `}
                                                        onClick={() => handleCategoryClick(undefined)
                                                    }
                                                >Tất cả công việc</button>
                                                {categories.map((category) =>
                                                    (<button
                                                        key={category.id}
                                                        className={
                                                            `btn btn-primary btn-custom px-lg-4
                                                        ${category.id === selectCategory ? 'active' : ""}
                                                        `}
                                                        onClick={() => handleCategoryClick(category.id)}
                                                    >{category.name}</button>)
                                                )}
                                            </div>
                                        </th>
                                    </tr>
                                    {selectCategory !== undefined ? (
                                        <tr>
                                            <th scope="col">Image</th>
                                            <th scope="col">Tên dịch vụ</th>
                                            <th scope="col">Giá tiền</th>
                                            <th scope="col">Thời gian ước tính</th>
                                            <th scope="col">Thêm vào giỏ hàng</th>
                                        </tr>
                                    ) : (
                                        <>
                                            <tr>
                                                <th colSpan={5} className={"form-group"}>
                                                    <div className={"position-relative"}>
                                                        <input className={"w-50 form-control-lg rounded-pill "}
                                                               name={"search"}
                                                               type={"text"}
                                                               style={{fontSize: "18px"}}
                                                               placeholder={"Tìm kiếm..."}
                                                               onChange={handleSearchChange}
                                                               defaultValue={searchKey}
                                                        />
                                                        <p className={"position-absolute  btn fa-solid fa-magnifying-glass"}
                                                                style={{
                                                                    right: "26%", height: "100%", top: "0", padding: "10px", fontSize: "18px"
                                                                }}
                                                        >
                                                        </p>
                                                    </div>
                                                </th>
                                            </tr>
                                            <tr>
                                                <th className="col-2">Image</th>
                                                <th className="col-2">Tên công việc</th>
                                                <th className="col-2">Giá tiền</th>
                                                <th className="col-3">Thời gian ước tính</th>
                                                <th className="col-2">Dịch vụ</th>
                                            </tr>
                                        </>
                                    )
                                    }
                                    </thead>
                                    <tbody>
                                    {selectCategory !== undefined ? (
                                        jobs.map((job, index) => (
                                                <tr key={index} className="align-middle" style={{cursor: "pointer"}}
                                                    onClick={(e) => {
                                                    handleCheckboxJobsClick(index)
                                                    }
                                                }>
                                                    <td><img src={job.urlImage} height={"50px"} width='50px' alt="domestichelp"/>
                                                    </td>
                                                    <td className="text-start">{job.name}</td>
                                                    <td className="text-end">{formatMoney(job.price)}</td>
                                                    <td className="text-end">~ {formatMinutesToDetail(job.timeApprox)}/{job.typeJob === 'Quantity' ? "sản phẩm" : "m2"}</td>
                                                    <td>
                                                        {checkboxStates[index] ?
                                                            < button className={"fa-solid fa-minus text-white btn btn-danger"}></button> :
                                                            < button className={"fa-solid fa-plus text-white btn btn-success"}></button>
                                                        }
                                                    </td>
                                                </tr>
                                            ))
                                    ) : (
                                        filteredJobs.map((job, index) => (
                                            <tr key={index} className="align-middle">
                                                <td><img src={job.urlImage} height={"50px"} width='50px' alt="domestichelp" /></td>
                                                <td className="text-start">{job.name}</td>
                                                <td className="text-end">{formatMoney(job.price)}</td>
                                                <td className="text-end">~ {formatMinutesToDetail(job.timeApprox)}/{job.typeJob === 'Quantity' ? "sản phẩm" : "m2"}</td>
                                                <td className={"text-start"}>{job.category.name}</td>
                                            </tr>
                                        )))
                                    }
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
                {/* Xử lý hiển thị loading */}
                <LoadingModal loading={loading}/>
            </div>
        </div>
    )
}
export default TablePrice;