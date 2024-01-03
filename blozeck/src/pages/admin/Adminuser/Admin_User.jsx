import React, { useEffect, useState } from "react";
import "../Adminuser/ADMIN.scss";
import { Link, useNavigate } from "react-router-dom";
import imgsa from "../../../../public/img/Logo2.jpg";
import Button from "react-bootstrap/Button";
import axios from "axios";
import publicAxios from "../../../components/Heatder/config/publicAxios";

export default function Admin_User() {
  const navigate = useNavigate();

  const handleLogoutAdmin = () => {
    localStorage.removeItem("username");
    // successNoti("Đã Đăng Xuất");
    navigate("/");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  let [user, setUser] = useState([]);

  const handleGetUser = async () => {
    const response = await axios.get("http://localhost:8888/api/v1/users");
    setUser(response.data.users);
  };
  const hanldBan = async (id) => {
    try {
      const response = await publicAxios.patch(`/api/user/${id}`);
      setUser(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetUser();
  }, []);
  return (
    <>
      <>
        <header className="headeradmin">
          <div className="logo_admin">
            <div className="logoADMIN">
              <img src={imgsa} alt="" />
            </div>
          </div>
          <div className="title1-header">
            <h2>Quản lí người dùng</h2>
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
                <div
                  className="menu-one1"
                  style={{ backgroundColor: "whitesmoke", borderRadius: 20 }}
                >
                  <Link to="/AdminUser">
                    <i className="fa-solid fa-user" />
                  </Link>
                  <Link to="/AdminUser">
                    <h2>Quản lí người dùng</h2>
                  </Link>
                </div>
                <div className="menu-one1">
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
          <div className="main-content98_user">
            <h3>Giao diện</h3>
            <div className="table-title_user">
              <table
                id="tableAdded_user "
                style={{ textAlign: "center", fontSize: 20 }}
              >
                <thead>
                  <tr className="tr1">
                    <th className="td1">id</th>
                    <th className="td1">Tên</th>
                    <th className="td1">Email</th>
                    <th className="td1">Tinh trạng</th>
                    <th className="td1">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {user.map((item) => {
                    return (
                      <tr className="tr1">
                        <td className="td1">{item.idUser}</td>
                        <td className="td1">{item.username}</td>
                        <td className="td1">{item.email}</td>
                        <td className="td1">
                          {item.status ? "active" : "ban"}
                        </td>
                        <td className="td1_btn_user">
                          <button onClick={() => hanldBan(item.idUser)}>
                            {item.role == "1" ? (
                              <></>
                            ) : item.status ? (
                              "Ban"
                            ) : (
                              "Active"
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </>
    </>
  );
}
