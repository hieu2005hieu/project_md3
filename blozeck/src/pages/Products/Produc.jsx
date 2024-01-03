import React from "react";
import Heatder from "../../components/Heatder/Heatder";
import FooterPage from "../../components/Foodter/FooterPage";
import { useState } from "react";
import { useEffect } from "react";
import "../Products/Produc.scss";
import { errorNoti, successNoti } from "../../utils/notifycation";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveCart } from "../../store/redux-toolkit/cartSlice";
import axios from "axios";
export default function Produc() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  // const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem("username"));
  // const [cart, setCart] = useState(currentUser?.cart);
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(6);
  const handleGetCategory = async () => {
    const response = await axios.get("http://localhost:8888/api/v1/Category");
  
    setData(response.data.category);
  };
  const handleGetProducts = async () => {
    const response = await axios.get("http://localhost:8888/api/v1/Producs");
    console.log("producs",response);
    setProducts(response.data.products);
  };
  useEffect(() => {
    handleGetCategory();
    handleGetProducts();
  }, []);

  const handleClick_category = (id) => {
    setSelectedCategory(id);
  };





  const handlCLickAddtoCart = async (product) => {
   
  if (!(currentUser && currentUser.idUser)) {
    errorNoti("Cần Đăng Nhập Để Mua Hàng");
    return;
  }
    const cart = {
      userId: currentUser.idUser,
      product,
    };
    const response = await axios.post("http://localhost:8888/api/v1/cart",cart);
    successNoti(response.data.message);
  };
  
  return (
    <>
      <Heatder></Heatder>
      <div className="category">
        {data.map((item, index) => {
          return (
            <div
              style={{
                borderColor: `${
                  selectedCategory == item.idCategory ? "#ff5b6a" : ""
                }`,
                borderWidth: `${
                  selectedCategory == item.idCategory ? "3px" : "1px"
                }`,
              }}
              key={index}
              className="categpry_css"
              onClick={() => handleClick_category(item.idCategory)}
            >
              <img src={item.img} alt="" className="img_category" />
              <p>{item.nameCategory}</p>
            </div>
          );
        })}
      </div>
      <div className="products_category_scss">
        {products
          .filter((products) => products.categoryId == selectedCategory)
          .map((item) => (
            <>
              <div className="producsts_title" key={item.idProducts}>
                <Link to={`/details/${item.idProducts}`}>
                  <img src={item.imgs} alt="" />
                  <hr />
                </Link>
                <div className="titele_products">
                  <p>{item.nameProducts}</p>
                  <p>Kho: {item.stock ? item.stock : "Hết Hàng"}</p>
                  <p className="producst_price">{VND.format(item.price)}</p>

                  <button
                    className={`btn_category_producsts ${
                      item.stock === 0 ? "disabled" : ""
                    }`}
                    onClick={() => handlCLickAddtoCart(item.idProducts)}
                    disabled={item.stock === 0 ? true : false}
                  >
                    Thêm Vào Giỏ Hàng
                  </button>
                </div>
              </div>
            </>
          ))}
      </div>
      <FooterPage></FooterPage>
    </>
  );
}
