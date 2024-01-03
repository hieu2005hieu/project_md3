import React, { useEffect, useState } from "react";
import "../Adminuser/ADMIN.scss";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import imgsa from "../../../../public/img/Logo2.jpg";
import axios from "axios";
import { Pagination } from "antd";
import publicAxios from "../../../components/Heatder/config/publicAxios";
export default function Admin_Management() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const [bills, setBills] = useState([]);
  const handleGetbills = async () => {
    const response = await axios.get(`http://localhost:8888/api/v1/billsALL`);
    setBills(response.data.billAll);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const endIndex = currentPage * itemsPerPage;
  const startIndex = endIndex - itemsPerPage;
  const displayedProducts = bills.slice(startIndex, endIndex);
  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const [flag, setFlag] = useState(true);
  const [show, setShow] = useState(false);
  const [infoDetail, setInfoDetails] = useState([]);
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
  const changStatusv = async (id, status) => {
    let accept = window.confirm("Bạn muốn thực hiện hành đông không");
    if (accept) {
      await publicAxios.put(`/api/v1/update/${id}`, {
        status: status,
      });
    }
    handleGetbills();
    setFlag(!flag);
  };

  const handleLogoutAdmin = () => {
    localStorage.removeItem("username");
    // successNoti("Đã Đăng Xuất");
    navigate("/");
  };

  useEffect(() => {
    handleGetbills();
  }, [flag]);
  return (
    <>
      <header className="headeradmin">
        <div className="logo_admin">
          <div className="logoADMIN">
            <img src={imgsa} alt="" />
          </div>
        </div>
        <div className="title1-header">
          <h2>Quản lí đơn hàng</h2>
        </div>
      </header>
      <main className="main--">
        <div id="title9">
          <div id="banner1">
            <h3>
              <Button onClick={handleLogoutAdmin}>Đăng xuất</Button>
            </h3>
            <div className="menu1">
              <div className="menu-one1">
                <Link to="/AdminProduct">
                  <i className="fa-brands fa-codepen" />
                </Link>
                <Link to="/AdminProduct">
                  <h2>Quản lí sản phẩm</h2>
                </Link>
              </div>
              <div className="menu-one1">
                <Link to="/AdminUser">
                  <i className="fa-solid fa-user" />
                </Link>
                <Link to="/AdminUser">
                  <h2>Quản lí người dùng</h2>
                </Link>
              </div>
              <div
                className="menu-one1"
                style={{ backgroundColor: "whitesmoke", borderRadius: 20 }}
              >
                <Link to="/AdminManagement">
                  <i className="fa-solid fa-cart-shopping" />
                </Link>
                <Link to="/AdminManagement">
                  <h2>Quản lí đơn hàng</h2>
                </Link>
              </div>
              <div className="menu-one1">
                <Link to="/AdminCategory">
                  <i className="fa-brands fa-stack-overflow" />
                </Link>
                <Link to="/AdminCategory">
                  <h2>Phân loại sản phẩm</h2>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="main-content98">
          <h3>Giao diện</h3>
          <div className="table-title-tables">
            <table className="table_titleoder">
              <thead className="table_titleoder_thtbd">
                <th class="td19">Tên Người Dùng</th>
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
                      <td class="td19">{item.nameUserbill}</td>
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
                          <>
                            <button
                              onClick={() =>
                                changStatusv(item.idBill, "Xác Nhận")
                              }
                            >
                              Chấp nhận
                            </button>
                            <hr />
                            <button
                              onClick={() => changStatus(item.idBill, "Đá Hủy")}
                            >
                              Hủy
                            </button>
                          </>
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
              className="pagi"
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
      </main>
    </>
  );
}
