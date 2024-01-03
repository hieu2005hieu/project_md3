import { AiFillCarryOut } from "react-icons/ai";
import React, { useEffect } from "react";
import Heatder from "../../components/Heatder/Heatder";
import FooterPage from "../../components/Foodter/FooterPage";
import "../titleoder/Title_Oder.scss";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Pagination } from "antd";
import publicAxios from "../../components/Heatder/config/publicAxios";

export default function Title_Oder() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const { user_id } = useParams();

  const currentUser = JSON.parse(localStorage.getItem("username"));
  const [bills, setBills] = useState([]);
  const handleGetbills = async () => {
    const response = await axios.get(
      `http://localhost:8888/api/v1/orders/${currentUser.idUser}`
    );
   
    setBills(response.data.bill);
  };
  useEffect(() => {
    handleGetbills();
  }, []);
  const [flag, setFlag] = useState(true);
  const [show, setShow] = useState(false);
  const [infoDetail, setInfoDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const handleClose = () => setShow(false);
  const handleShow = async (idBill) => {
   
    setShow(true);
    try {
      const response = await publicAxios.get(`/api/v1/order_details/${idBill}`);
      setInfoDetails(response.data.result);
      
    } catch (error) {
      console.log(error);
    }
  };

  const changStatus = async (id, status) => {
    let accept = window.confirm("Bạn muốn thực hiện hành đông không");
    if (accept) {
      await publicAxios.put(`/api/v1/update/${id}`, {
        status: status,
      });
    }
    handleGetbills();
    setFlag(!flag);
  };
  const itemsPerPage = 3;
  const endIndex = currentPage * itemsPerPage;
  const startIndex = endIndex - itemsPerPage;
  const displayedProducts = bills.slice(startIndex, endIndex);
  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    handleGetbills();
  }, [flag]);
  return (
    <>
      <Heatder></Heatder>
      <div>
        <div className="OderTitle">
          <hr />
          <h2>Thông Tin Đơn Hàng</h2>
          <hr />
        </div>
        <div>
          <table className="table_titleoder">
            <thead className="table_titleoder_thtbd">
              <th class="td19">ID Đơn Hàng</th>
              <th class="td19">Địa Chỉ</th>
              <th class="td19">SĐT</th>
              <th class="td19">Thông Tin Sản Phẩm</th>
              <th class="td19">Tổng Tiền</th>
              <th class="td19">Tình Trạng</th>
              <th class="td19">Hành Động</th>
            </thead>
            <tbody className="table_titleoder_thtbd">
              {displayedProducts.map((item) => {
                return (
                  <tr class="tr19">
                    <td class="td19">{item.idBill}</td>
                    <td class="td19">{item.address}</td>
                    <td class="td19">{item.phone_number}</td>
                    <td class="td19">
                      <Button
                        variant="primary"
                        onClick={() => handleShow(item.idBill)}
                        className="btn_bootraps"
                      >
                        Xem Chi Tiết
                      </Button>
                    </td>
                    <td class="td19">{VND.format(item.total)}</td>
                    <td className="td19">
                      {item.status === "Đang Chờ" ? (
                        <span style={{ color: "green" }}>Đang Chờ</span>
                      ) : item.status === "Xác Nhận" ? (
                        <span style={{ color: "blue" }}>Xác nhận</span>
                      ) : (
                        <span style={{ color: "red" }}>Từ chối</span>
                      )}
                    </td>
                    <td className="td19">
                      {item.status === "Đang Chờ" ? (
                        <button
                          onClick={() => changStatus(item.idBill, "Đá Hủy")}
                        >
                          Hủy
                        </button>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            current={currentPage}
            onChange={onPageChange}
            pageSize={itemsPerPage}
            total={bills.length}
            className="phantrangs"
          />
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Sản Phẩm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {infoDetail.map((item) => (
                <div className="titles_produsctsx">
                  <hr />
                  <p>Tên:{item.nameProducts}</p>
                  <p>
                    <img src={item.imgs} alt="" />
                  </p>
                  <p>Số Lượng:{item.quantity}</p>
                  <p>Giá Sản Phẩm:{VND.format(item.price)}</p>
                </div>
              ))}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <FooterPage></FooterPage>
    </>
  );
}
