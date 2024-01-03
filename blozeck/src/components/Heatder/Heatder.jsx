import { MdOutlineLogout } from "react-icons/md";
import { RiBillFill } from "react-icons/ri";
import { BiImage } from "react-icons/bi";
import { GiShoppingCart } from "react-icons/gi";
import { CgArrowsExchange } from "react-icons/cg";
import { CgArrowsExchangeAlt } from "react-icons/cg";
import React, { useEffect, useRef, useState } from "react";
import "../Heatder/Header.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import img from "../../../public/img/Logo.jpg";
import { successNoti } from "../../utils/notifycation";
import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../pages/config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { saveCart } from "../../store/redux-toolkit/cartSlice";
import publicAxios from "./config/publicAxios";
// import { useSelector, useDispatch } from "react-redux";

export default function Heatder() {
  const [userLogin, setUserLogin] = useState(
    JSON.parse(localStorage.getItem("username")) || {}
  );
  const [open, setOpen] = useState("0");
  const [hiddenInfo, setHiddenInfo] = useState(true);
  const [imgUpload, setImgUpload] = useState(null);
  const [urlImage, setUrlImage] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState("");
  const [cart, setCart] = useState([]);
  const numberCart = async () => {
    const response = await axios.get(
      `http://localhost:8888/api/v1/cart/${userLogin?.idUser}`
    );
    setCart(response.data.length);
  };

  useEffect(() => {
    numberCart();
  }, [cart]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlCLick = () => {
    navigate("/Login");
  };
  const handleScroll = () => {
    window.scrollTo(0, 0);
    navigate("/");
  };
  const handlCLickCArt = () => {
    navigate("/Cart");
  };

  const handleLogout = async () => {
    try {
      setUserLogin({});
      setOpen("0");
      setHiddenInfo(true);
      dispatch(saveCart([]));
      localStorage.removeItem("username");
      successNoti("Đã Đăng Xuất");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const changeAvatar = async (e) => {
    // xem trước media
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      setUrlImage(e.target.result);
    };
    reader.readAsDataURL(file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "upload_img");
    const [uploadMedia] = await Promise.all([
      axios.post(
        "https://api.cloudinary.com/v1_1/dbmomoyqd/image/upload",
        formData
      ),
    ]);
    const media = uploadMedia.data.secure_url;
    console.log(media);
    try {
      const response = await publicAxios.patch(
        `/api/v1/user/${userLogin?.idUser}`,
        { url: media }
      );
      localStorage.setItem("username", JSON.stringify(response.data.user));
      setUserLogin(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const status = useRef(true);
  const openInfo = () => {
    if (status.current) {
      setOpen("200px");
      status.current = false;
    } else {
      setOpen("0px");
      status.current = true;
    }
  };

  return (
    <>
      <div id="container1">
        <header>
          <div className="innerheader conten">
            <div onClick={handleScroll}>
              <span className="logo">
                <img src={img} alt="" className="imgs" />
              </span>
            </div>
            <nav>
              <ul id="menu">
                <li>
                  <NavLink to="/" className="menu-title">
                    Trang Chủ
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Bestsellner" className="menu-title">
                    BESTSELLER
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Produc" className="menu-title">
                    Đặt Hàng
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Promotion" className="menu-title">
                    Khuyến Mãi
                  </NavLink>
                </li>
              </ul>
            </nav>
            <nav style={{ position: "relative" }}>
              {userLogin && userLogin.username ? (
                <div id="card_login">
                  <div>
                    <span onClick={openInfo}>
                      <span>{userLogin.username}</span>
                      <span
                        style={{
                          display: "inline-block",
                          borderRadius: "50%",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          width={40}
                          height={40}
                          src={userLogin.img}
                          alt="img"
                        />
                      </span>
                      <CgArrowsExchangeAlt />
                    </span>
                    <span className="Stock_toCart">{cart}</span>
                    <GiShoppingCart
                      className="cart_LOgins hoverss"
                      onClick={handlCLickCArt}
                    />
                  </div>
                </div>
              ) : (
                <div id="card_login">
                  <div onClick={handlCLick} className="hoverbbbb">
                    Đăng Nhập
                    <CgArrowsExchangeAlt />
                  </div>
                </div>
              )}

              <div
                id="btn_info"
                // className={`${hiddenInfo ? "hidden" : ""}`}
                style={{
                  overflow: "hidden",
                  width: 150,
                  textAlign: "center",
                  padding: "10px 0",
                  height: open,
                  transition: "0.5s",
                }}
              >
                <div>
                  <Link to={`/titleoder/${userLogin.idUser}`}>
                    <button>
                      <RiBillFill style={{ fontSize: 17, marginRight: 20 }} />
                      Đơn Hàng
                    </button>
                  </Link>
                </div>
                <button type="button">
                  <label style={{ cursor: "pointer" }} htmlFor="input_avatar">
                    <BiImage style={{ fontSize: 17, marginRight: 15 }} />
                    Đổi Avatar
                  </label>
                </button>
                <input
                  hidden
                  id="input_avatar"
                  type="file"
                  onChange={changeAvatar}
                  accept="image/jpeg, image/png"
                />
                <button className="logins" onClick={handleLogout}>
                  <MdOutlineLogout style={{ fontSize: 17, marginRight: 12 }} />{" "}
                  Đăng Xuất
                </button>
              </div>
            </nav>
          </div>
        </header>
      </div>
    </>
  );
}
