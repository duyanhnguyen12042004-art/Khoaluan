import "./Cart.scss";

import { useState, useContext } from "react";
import { Button, Modal, Input, Select, Radio, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { CartContext } from "../../context/CartContext";
import { createOrder } from "../../services/orderApi";
import { AuthContext } from "../../context/AuthContext";

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } =
    useContext(CartContext);

  const { user } = useContext(AuthContext);

  const [openCheckout, setOpenCheckout] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    note: "",
    payment: "cod",
  });

  const handleChange = (field, value) => {
    setShippingInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckout = async () => {
    if (!user) {
      message.error("Bạn cần đăng nhập để đặt hàng");
      return;
    }

    try {
      const orderData = {
        userId: user.id,

        fullname: shippingInfo.fullname,

        phone: shippingInfo.phone,

        address:
          shippingInfo.address +
          ", " +
          shippingInfo.ward +
          ", " +
          shippingInfo.district +
          ", " +
          shippingInfo.city,

        payment: shippingInfo.payment,

        items: cart.map((item) => ({
          productId: item.id,

          name: item.name,

          image: item.image,

          price: item.price,

          quantity: item.quantity,

          color: item.color,

          size: item.size,
        })),
      };

      const result = await createOrder(orderData);

      message.success(result.message);

      clearCart();

      setOpenCheckout(false);
    } catch (error) {
      message.error(error.response?.data?.message || "Đặt hàng thất bại");
    }
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Giỏ hàng đang trống</h2>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart__left">
        {cart.map((item) => (
          <div
            className="cart-item"
            key={`${item.id}-${item.color}-${item.size}`}
          >
            <img src={item.image} alt={item.name} />

            <div className="cart-item__info">
              <h3>{item.name}</h3>

              <p>Màu: {item.color}</p>

              <p>Size: {item.size}</p>

              <p className="price">{item.price.toLocaleString("vi-VN")}đ</p>
            </div>

            <div className="cart-item__quantity">
              <button
                onClick={() =>
                  updateQuantity(
                    item.id,
                    item.color,
                    item.size,
                    Math.max(item.quantity - 1, 1),
                  )
                }
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() =>
                  updateQuantity(
                    item.id,
                    item.color,
                    item.size,
                    item.quantity + 1,
                  )
                }
              >
                +
              </button>
            </div>

            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => removeFromCart(item.id, item.color, item.size)}
            />
          </div>
        ))}
      </div>

      <div className="cart__right">
        <h2>Tóm tắt đơn hàng</h2>

        <div className="summary">
          <span>Tổng tiền</span>

          <strong>{totalPrice.toLocaleString("vi-VN")}đ</strong>
        </div>

        <Button type="primary" block onClick={() => setOpenCheckout(true)}>
          Thanh toán
        </Button>
      </div>

      <Modal
        open={openCheckout}
        onCancel={() => setOpenCheckout(false)}
        footer={null}
        centered
        width={900}
        title="Thông tin giao hàng"
      >
        <Input
          placeholder="Họ và tên"
          value={shippingInfo.fullname}
          onChange={(e) => handleChange("fullname", e.target.value)}
        />

        <div className="checkout-row">
          <Input
            placeholder="Email"
            value={shippingInfo.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />

          <Input
            placeholder="Số điện thoại"
            value={shippingInfo.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>

        <Input
          placeholder="Địa chỉ"
          value={shippingInfo.address}
          onChange={(e) => handleChange("address", e.target.value)}
        />

        <div className="checkout-row">
          <Select
            placeholder="Tỉnh / Thành phố"
            style={{ width: "100%" }}
            options={[
              { value: "hn", label: "Hà Nội" },
              { value: "hcm", label: "Hồ Chí Minh" },
            ]}
            onChange={(value) => handleChange("city", value)}
          />

          <Select
            placeholder="Quận / Huyện"
            style={{ width: "100%" }}
            options={[
              { value: "q1", label: "Quận 1" },
              { value: "q2", label: "Quận 2" },
            ]}
            onChange={(value) => handleChange("district", value)}
          />
        </div>

        <Select
          placeholder="Phường / Xã"
          style={{ width: "100%" }}
          options={[
            { value: "p1", label: "Phường 1" },
            { value: "p2", label: "Phường 2" },
          ]}
          onChange={(value) => handleChange("ward", value)}
        />

        <Input.TextArea
          rows={4}
          placeholder="Ghi chú"
          value={shippingInfo.note}
          onChange={(e) => handleChange("note", e.target.value)}
        />

        <h3 style={{ marginTop: 24 }}>Phương thức thanh toán</h3>

        <Radio.Group
          value={shippingInfo.payment}
          onChange={(e) => handleChange("payment", e.target.value)}
          style={{ width: "100%" }}
        >
          <div className="payment-item">
            <Radio value="cod">Thanh toán khi nhận hàng (COD)</Radio>
          </div>

          <div className="payment-item">
            <Radio value="bank">Chuyển khoản ngân hàng</Radio>
          </div>

          <div className="payment-item">
            <Radio value="momo">Ví MoMo</Radio>
          </div>
        </Radio.Group>

        <Button
          type="primary"
          block
          size="large"
          style={{ marginTop: 24 }}
          onClick={handleCheckout}
        >
          Đặt hàng
        </Button>
      </Modal>
    </div>
  );
}

export default Cart;
