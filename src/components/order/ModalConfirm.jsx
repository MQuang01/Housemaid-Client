import React from "react";
import {Button, Modal} from "react-bootstrap";

const ModalConfirm = ({show, setShow, handleConfirmOrder}) => {
    const handleClose = () => setShow(false);

    const handleConfirm = () => {
        handleConfirmOrder()
        setShow(false)
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận thông tin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-text">
                        Bạn có chắc chắn xác nhận thông tin?
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleConfirm}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalConfirm
