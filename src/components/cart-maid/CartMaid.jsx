import "./CartMaid.css"
const CartMaid = () => {
  return (
      <div className="cart-maid">
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Launch demo modal
          </button>

          <div className="modal-maid fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                  <div className="modal-content cart-container">
                      <div className="cart-header">
                          <div className="cart-header-left">
                              <img alt="icons.png" className="cart-item-logo" src={"../assets/img/maid.png"}/>
                          </div>
                          <div className="cart-header-right">
                              <button type="button" className="btn btn-primary close rounded-circle"
                                      data-dismiss="modal"
                                      aria-label="Close"
                                      data-bs-dismiss="modal"><span
                                  aria-hidden="true">×</span></button>
                          </div>
                      </div>
                      <hr/>

                      {/*Cart Body*/}
                      <table className="text-center border">
                          <tbody>
                          <tr>
                              <th>#</th>
                              <th>Tên công việc</th>
                              <th>Giá</th>
                              <th>Số lượng</th>
                          </tr>
                          </tbody>
                      </table>
                      <hr/>
                      {/*Cart footer*/}
                      <div className="cart-footer">
                          <div>
                              Nhân viên: <input type={"number"} value="1" min="1" max="10"/>
                          </div>
                          <div className="d-flex justify-content-between">
                              <div className="cart-footer-left">
                                  Thời gian: ~30 phút
                              </div>
                              <div className="cart-footer-right">
                                  Tổng tiền: 1,000,000 VNĐ
                              </div>
                          </div>
                          <div className="d-flex justify-content-end">
                              <button className="btn btn-primary ">ĐẶT DỊCH VỤ</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default CartMaid;