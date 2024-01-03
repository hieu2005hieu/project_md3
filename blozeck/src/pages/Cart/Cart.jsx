import { AiFillDelete } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import { AiOutlineArrowLeft } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import Heatder from "../../components/Heatder/Heatder";
import "../Cart/Cart.scss";
import FooterPage from "../../components/Foodter/FooterPage";
import { Link, useNavigate } from "react-router-dom";
import { errorNoti, successNoti } from "../../utils/notifycation";
import apiProduct from "../../service/api.product";
import axios from "axios";
import { useDispatch } from "react-redux";
import { saveCart } from "../../store/redux-toolkit/cartSlice";
import { message } from "antd";
import publicAxios from "../../components/Heatder/config/publicAxios";

export default function Cart() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem("username"));
  const [dataCity, setDataCity] = useState([]);
  const [dataDistrict, setDataDistrict] = useState([]);
  const [dataWard, setDataWard] = useState([]);
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [cart, setCart] = useState([]);
  const [phone, setPhone] = useState("");
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const hanldOderCart = async () => {
    let address = city + "," + district + "," + ward;
    if (cart.length == 0) {
      errorNoti("Chưa Có Sản Phẩm Để Thanh Toán");
      return;
    }
    if (city == "" || district == "" || ward == "") {
      errorNoti("Địa Chỉ Không Được Để Trống");
      return;
    }
    const regexPhone = /^(0|\+84)\d{9,10}$/;
    if (phone == "") {
      errorNoti("Số Điện Thoại Không Được Để Trống");
      return;
    }
    if (!regexPhone.test(phone)) {
      errorNoti("Số Điện Thoại Phải Có 10 Số,Đầu 09 ");
      return;
    }

    const orders = {
      userID: currentUser.idUser,
      user_name: currentUser.username,
      address,
      phone,
      // // orderDetails: cart,
      status: "Đang Chờ",
      total,
    };
    try {
      const response = await axios.post(
        "http://localhost:8888/api/v1/orders",
        orders
      );
      console.log(response.data);
      await Promise.all(
        cart.map(async (item) => {
          const datadetail = {
            order_id: response.data.orderId,
            productsId: item.ProductsID,
            quantity: item.quantity,
          };
          await axios.post(
            "http://localhost:8888/api/v1/order_details",
            datadetail
          );
        })
      );
      await axios.delete(
        `http://localhost:8888/api/v1/carts/${currentUser.idUser}`
      );
      setCart([]);
      successNoti("Đã Thanh Toán");
      navigate(`/titleoder/${currentUser.idUser}`);
    } catch (error) {
      console.log(error);
    }
  };

  // let newOrder = {
  //   user_id: currentUser.id,
  //   user_name: currentUser.name,
  //   address,
  //   phone,
  //   orderDetails: cart,
  //   status: "Wait",
  //   total,
  // };
  // apiProduct.updateStocks(cart);
  // await axios.post("http://localhost:8000/bills", newOrder);
  // setCart([]);
  // //dua cart tren local ve rong
  // let getCart = JSON.parse(localStorage.getItem("userLogin"));
  // getCart.cart = [];
  // localStorage.setItem("userLogin", JSON.stringify(getCart));
  // dispatch(saveCart([]));
  // successNoti("Thanh Toán Thành Công");
  // navigate(`/titleoder/${currentUser.id}`);
  // };
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const Btn_addtoCartspolist = () => {
    navigate("/Produc");
  };

  const renderCart = async () => {
    const response = await axios.get(
      `http://localhost:8888/api/v1/cart/${currentUser?.idUser}`
    );
    setCart(response.data);
  };
  const [flag,setFlag]=useState(false)
  
  useEffect(() => {
    renderCart();
  }, [flag]);
  const handleTotalCart = () => {
    let result = cart?.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
    setTotal(result);
  };
  const handleProvinces = async () => {
    let data = await axios.get(`https://provinces.open-api.vn/api/`);
    setDataCity(data.data);
  };
  const handleCity = async (e) => {
    let idCity = +e.target.value;
    const nameCity = dataCity.find((item) => item.code == idCity);
    let data = await axios.get(
      `https://provinces.open-api.vn/api/p/${idCity}?depth=2`
    );
    setCity(nameCity.name);
    setDataDistrict(data.data.districts);
  };
  const handleDistrict = async (e) => {
    let idDistrict = +e.target.value;
    const nameDistrict = dataDistrict.find((item) => item.code == idDistrict);
    let data = await axios.get(
      `https://provinces.open-api.vn/api/d/${idDistrict}?depth=2`
    );
    setDistrict(nameDistrict.name);
    setDataWard(data.data.wards);
  };

  //xoa

  const handlDelete = async (id) => {
    const confimr = confirm("bạn có muốn xóa không")
    if (confimr) {
      const result = await axios.delete(
      `http://localhost:8888/api/v1/cart/${id}`
    );
    if (result.data.data) {
      renderCart();
    } else {
      message.info("Loi");
    }
    }
    
  };

  // giam sl
  const handleDecre = async (item) => {
  
    const body = { cartId: item.idCart, type: "decre" };
    
   try {
    
     if (item.quantity <= 1) {
      
        handlDelete(item.idCart);
       
     } else {
       await publicAxios.patch(`/api/v1/cart`, body);
       setFlag(!flag);
     }
   } catch (error) {
     console.log(error);
   }
  };
  const handleIncre = async (item) => {
   const body = { cartId: item.idCart, type: "incre" };
    try { 
      if (item.quantity > item.stock) {
        errorNoti("Không Đủ Số Lượng Trong Kho");
        return;
      }
      await publicAxios.patch(`/api/v1/cart`, body);
      setFlag(!flag);
    } catch (error) {
      console.log(error);
    }
  };

  // const handlePlus = async (index) => {
  //   const response = await axios.put(
  //     `http://localhost:8888/api/v1/cartMinus/${index}}`
  //   );

  //   if (response.data[index].quantity > response.data[index].stock) {
  //     errorNoti("Không Đủ Số Lượng Trong Kho");
  //     return;
  //   }
  //   setCart([...response.data]);
  // };

  useEffect(() => {
    // localStorage.setItem("username", JSON.stringify({ ...currentUser, cart }));
    handleTotalCart();
  }, [cart]);
  useEffect(() => {
    handleProvinces();
    handleCity();
    handleDistrict();
  }, [dataDistrict, dataWard]);
  return (
    <>
      <Heatder></Heatder>
      <div className="Cart_producsts">
        <hr />
        <h2>GIỎ HÀNG</h2>
        <hr />
      </div>
      <main className="mani_Cart">
        <div id="Contact_Cart">
          <table className="table_Cart">
            <thead className="theat_Cart">
              <tr>
                <th>Hình Ảnh</th>
                <th>Tên</th>
                <th>Giá</th>
                <th>Số Lượng</th>
                <th>Tổng Cộng</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="table_body_addtoCart">
              {!cart.length == 0 ? (
                <>
                  {cart?.map((item, index) => (
                    <tr>
                      <td>
                        <img src={item.imgs} alt="" />
                      </td>
                      <td>
                        <p>{item.nameProducts}</p>
                      </td>
                      <td>
                        <p>{VND.format(item.price)}</p>
                      </td>
                      <td>
                        <div className="div_btn_toCart">
                          <button onClick={() => handleDecre(item)}>
                            -
                          </button>
                          <p>{item.quantity}</p>
                          <button onClick={() => handleIncre(item)}>
                            +
                          </button>
                        </div>
                      </td>
                      <td>
                        <p>{VND.format(item.quantity * item.price)}</p>
                      </td>
                      <td>
                        <button
                          className="btn_AddtoCartlitsto"
                          onClick={() => handlDelete(item.idCart)}
                        >
                          <AiFillDelete style={{ fontSize: 20 }} />
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <div className="divcarts">
                  <h2 className="h2Carts">
                    Chưa có sản phẩm nào trong giỏ hàng...!!!
                  </h2>
                </div>
              )}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3}>
                  <Link to="/Produc">
                    <button
                      className="Btn_addtoCartspolist"
                      onClick={Btn_addtoCartspolist}
                    >
                      <AiOutlineArrowLeft />
                      Tiếp Tục xem sản phẩm
                      <AiOutlineArrowRight />
                    </button>
                  </Link>
                </td>
              </tr>
            </tfoot>
          </table>
          <div className="the_payable_amount">
            <h2 className="h2Cart">Tổng Thanh Toán</h2>
            <div className="payable_amount">
              <div className="total_Address_Phone">
                <p>Tổng Cộng: {VND.format(total)}</p>
                <p id="total_price_1" />
              </div>
              <div className="total_Address_Phone">
                <p>Địa chỉ:</p>
                <div>
                  <div className="address_Cart">
                    <select onChange={handleCity} id="city_Cart">
                      <option>Chọn tỉnh thành</option>
                      {dataCity.map((item, index) => (
                        <option value={item.code} key={index}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    <select onChange={handleDistrict} id="district_Cart">
                      <option value="" defaultValue="">
                        Chọn quận huyện
                      </option>
                      {dataDistrict.map((item, index) => (
                        <option key={index} value={item.code}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    <select
                      onChange={(e) => setWard(e.target.value)}
                      id="ward_Cart"
                    >
                      <option>Chọn phường xã</option>
                      {dataWard.map((item, index) => (
                        <option key={index}>{item.name}</option>
                      ))}
                    </select>
                  </div>
                  <p id="Erorr_Cart" />
                </div>
              </div>
              <div className="total_Address_Phone">
                <p>SDT:</p>
                <div>
                  <p>
                    <input
                      id="phone_Cart"
                      type="number"
                      placeholder="Nhập Số Điện Thoại"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </p>
                  <p id="phoneError_Cart" />
                </div>
              </div>
              <div className="total_Address_Phone">
                <p>Tổng Số Tiền: {VND.format(total)}</p>
                <p id="total_price" />
              </div>
              <button type="button" onClick={hanldOderCart}>
                Tiến Hành Thanh Toán
              </button>
            </div>
          </div>
        </div>
      </main>

      <FooterPage></FooterPage>
    </>
  );
}
