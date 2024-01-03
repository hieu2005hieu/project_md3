import React, { useEffect, useState } from "react";
import Heatder from "../../components/Heatder/Heatder";
import FooterPage from "../../components/Foodter/FooterPage";
import { errorNoti, successNoti } from "../../utils/notifycation";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveCart } from "../../store/redux-toolkit/cartSlice";
import axios from "axios";

export default function Bestsellner() {
  const dispatch = useDispatch();
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const currentUser = JSON.parse(localStorage.getItem("username"));
  // const [cart, setCart] = useState(currentUser?.cart);
  const [products, setProducts] = useState([]);
  const handleGetProducts = async () => {
    const response = await axios.get("http://localhost:8888/api/v1/Producs");
    setProducts(response.data.products);
  };
  console.log(products);
  useEffect(() => {
    handleGetProducts();
  }, []);
  const handlCLickAddtoCart = async (product) => {
    if (!(currentUser && currentUser.idUser)) {
      errorNoti("Cần Đăng Nhập Để Mua Hàng");
      return;
    }
    const cart = {
      userId: currentUser.idUser,
      product,
    };
    const response = await axios.post(
      "http://localhost:8888/api/v1/cart",
      cart
    );
    successNoti(response.data.message);
  };
  // const handlCLickAddtoCart = (product) => {
  //    const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  //    if (!(userLogin && userLogin.id)) {
  //     errorNoti("Cần Đăng Nhập Để Mua Hàng");
  //      return;
  //    }
  //   let index = cart.findIndex((item) => item.id === product.id);
  //   if (index > -1) {
  //     successNoti("Sản Phẩm Đã Có Trong Giỏ Hàng,Tăng Số Lượng");
  //     cart[index].quantity += 1;
  //     setCart([...cart]);
  //   } else {
  //     successNoti("Thêm Vào Giỏ Hàng Thành Công");
  //     cart.push({ ...product, quantity: 1 });
  //     dispatch(saveCart(cart));
  //     setCart([...cart]);
  //   }
  // };
  // useEffect(() => {
  //   localStorage.setItem("userLogin", JSON.stringify({ ...currentUser, cart }));
  // }, [cart]);
  return (
    <>
      <Heatder></Heatder>
      <div className="container_bestseller">
        <hr />
        <h2>BESTSELLER</h2>
        <hr />
      </div>
      <div className="products_category_scss">
        {products.sort((a,b)=>a.stock-b.stock).slice(0,12).map((item) => {
          return (
            <div className="producsts_title">
              <Link to={`/details/${item.idProducts}`}>
                <img src={item.imgs} alt="" />
                <hr />
              </Link>

              <div className="titele_products">
                <p>{item.nameProducts}</p>
                <p>Kho:{item.stock ? item.stock : "Hết Hàng"}</p>
                <p className="producst_price">{VND.format(item.price)}</p>
                <button
                  className={`btn_category_producsts ${
                    item.stock === 0 ? "disabled" : ""
                  }`}
                  onClick={() => handlCLickAddtoCart(item)}
                  disabled={item.stock === 0 ? true : false}
                >
                  Thêm Vào Giỏ Hàng
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <FooterPage></FooterPage>
    </>
  );
}
