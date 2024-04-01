import "./CartMaid.css"
import React, {useCallback, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { formatMinutesToDetail } from "../../until/FormatTime";
import { formatMoney } from "../../until/FormatMoney";
const CartMaid = () => {
    const [isCloseModal, setIsCloseModal] = useState(false);
    const [jobsCart, setJobsCart] = useState([]);
    const [categoryCart, setCategoryCart] = useState({})
    const [totalCalculateTimeAndPrice, setTotalCalculateTimeAndPrice] = useState({
        totalPrice: 0,
        totalTime: 0
    })
    const getLocalStorageJobs = () => {
        const localStorageJobs = JSON.parse(localStorage.getItem("cart-jobs"));
        const localStorageCategory = JSON.parse(localStorage.getItem("cart-category"))
        if(localStorageCategory) setCategoryCart(localStorageCategory)
        if (localStorageJobs) setJobsCart(localStorageJobs);
        else {
            setJobsCart([])
            setTotalCalculateTimeAndPrice({
                totalPrice: 0,
                totalTime: 0
            })
        }
    };
    // Calculate total time and price
    const calculateTotalTimeAndPrice = useCallback(() => {
        if (jobsCart.length > 0) {
            const selectedJobs = jobsCart.filter(job => job.isChecked === true);
            let totalTime = selectedJobs.reduce((total, job) => total + (job.timeApprox * job.quantity), 0);
            let totalPrice = selectedJobs.reduce((total, job) => total + (job.price * job.quantity), 0);
            setTotalCalculateTimeAndPrice({
                totalPrice: totalPrice,
                totalTime: totalTime
            });
        }
    }, [jobsCart]);

    const handleQuantityChange = (jobId, e) => {
        // Kiểm tra giá trị nhập vào có phải là số không
        let newQuantity = parseInt(e.target.value);

        // Kiểm tra nếu giá trị mới không phải là một số, hoặc bé hơn 1, hoặc lớn hơn 5000
        if (isNaN(newQuantity) || newQuantity < 1) {
            e.target.value = 1
            newQuantity = 1
        }
        if(newQuantity > 5000) {
            e.target.value = 4999
            newQuantity = 4999
        }

        // Tìm công việc có id tương ứng trong danh sách
        const updatedJobs = jobsCart.map(job => {
            if (job.id === jobId) {
                // Cập nhật số lượng của công việc
                return { ...job, quantity: newQuantity };
            }
            return job;
        });

        // Cập nhật danh sách công việc với số lượng mới
        setJobsCart(updatedJobs);
        localStorage.setItem("cart-jobs", JSON.stringify(updatedJobs))
    };

    useEffect(() => {
        calculateTotalTimeAndPrice()
    }, [jobsCart])

    useEffect(() => {
        getLocalStorageJobs();
    }, [isCloseModal]);

  return (
      <>
          <div className={"cart-maid"}>
              <div className=" modal fade" tabIndex="-1" role="dialog" id="maidModal">
                  <div className="modal-dialog" style={{minWidth: "520px"}} role="document">
                      <div className="modal-content borer-top border-warning">
                          <div className="modal-body">
                              <div className="cart-header mb-3">
                                  <Link to={"#"} className=" d-flex justify-content-center">
                                      <h5 className='text-primary mb-0 h4'>
                                          House
                                          <span className="text-dark">Maid</span>
                                          <i className="fa fa-broom text-primary ms-2"></i>
                                      </h5>
                                  </Link>
                                  <div className="cart-header-right">
                                      <button type="button" className="btn btn-primary close rounded-circle"
                                              data-dismiss="modal"
                                              aria-label="Close"
                                              data-bs-dismiss="modal"><span
                                          aria-hidden="true">×</span></button>
                                  </div>
                              </div>

                              {/*Cart Body*/}
                              <div className={"cart-body"}>
                                  <h5>Dịch vụ: {categoryCart ? categoryCart.name : "vui lòng chọn dịch vụ"}</h5>
                                  <table className="border table table-light text-center rounded">
                                      <thead>
                                          <tr>
                                              <th className={"col-8"}>Tên công việc</th>
                                              <th className={"col-4"}>Số lượng</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                      {jobsCart.length > 0 && jobsCart
                                          .filter(job => job.isChecked === true)
                                          .map((job) => (
                                              <tr key={job.id} className={"align-middle"}>
                                                  <td className={"text-start"}>{job.name}</td>
                                                  <td className={"input-group"}>
                                                      <input
                                                          className="text-end form-control"
                                                          type="text"
                                                          min={1}
                                                          defaultValue={job.quantity}
                                                          onChange={(e) => handleQuantityChange(job.id, e)}
                                                      />
                                                  </td>
                                              </tr>
                                          ))}
                                      </tbody>
                                  </table>
                              </div>

                              {/*Cart footer*/}
                              <div className="cart-footer">
                                  <div className="d-flex justify-content-between mb-3">
                                      <div className="cart-footer-left fw-bold d-flex align-items-center">
                                          <span className="text-dark">Thời gian:</span>
                                          <span
                                              className="text-info">&nbsp;~{formatMinutesToDetail(totalCalculateTimeAndPrice.totalTime)}</span>
                                      </div>
                                      <div className="cart-footer-right fw-bold d-flex align-items-center">
                                          <span className="text-dark">Tổng thanh toán:</span>
                                          <span
                                              className="text-danger">&nbsp;{formatMoney(totalCalculateTimeAndPrice.totalPrice)}</span>
                                      </div>
                                  </div>
                                  {totalCalculateTimeAndPrice.totalTime > 120 &&
                                      <div className="alert alert-warning" style={{fontSize: "12px"}}
                                           role="alert">
                                          <span className="alert-heading fw-bold text-warning">Gợi ý!</span>
                                          <p>Bạn nên thuê thêm nhân viên để có thể giúp cho công việc trở nên nhanh hơn.</p>
                                      </div>}
                                  <div className="d-flex justify-content-end">
                                      <button className="btn btn-primary ">ĐẶT DỊCH VỤ</button>
                                  </div>
                              </div>
                          </div>

                      </div>
                  </div>
              </div>
          </div>
          <button type="button"
                  onClick={() => {
                      setIsCloseModal(!isCloseModal)
                  }}
                  className="btn btn-primary rounded-circle border-3 cart-item"
                  data-bs-toggle="modal" data-bs-target="#maidModal">
              <img src={"../assets/img/maidA.png"} alt="cartMaid.png" className="w-100"/>
          </button>
      </>

  )
}

export default CartMaid;