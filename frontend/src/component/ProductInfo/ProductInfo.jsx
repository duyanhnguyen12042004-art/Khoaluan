import "./ProductInfo.scss";
import { useState } from "react";
import { Button, Rate } from "antd";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

function ProductInfo({ product, selectedVariant, setSelectedVariant }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const handleAddCart = () => {
    addToCart({
      id: product.id,

      name: product.name,

      image: selectedVariant.images[0],

      price: product.price,

      color: selectedVariant.color,

      colorCode: selectedVariant.colorCode,

      size: selectedSize,

      quantity,
    });

    navigate("/cart");
  };
  const increase = () => {
    setQuantity(quantity + 1);
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="product-info">
      <h1 className="product-info__name">{product.name}</h1>

      <div className="product-info__rate">
        <Rate disabled value={product.rating} />

        <span>Đã bán {product.sold}</span>
      </div>

      <div className="product-info__price">
        {product.price.toLocaleString("vi-VN")}đ
      </div>

      {/* Màu */}

      <div className="product-info__group">
        <h4>Màu sắc</h4>

        <div className="colors">
          {product.variants.map((variant) => (
            <button
              key={variant.color}
              className={
                selectedVariant.color === variant.color
                  ? "color active"
                  : "color"
              }
              style={{
                backgroundColor: variant.colorCode,
                borderColor:
                  variant.colorCode.toLowerCase() === "#ffffff"
                    ? "#999"
                    : variant.colorCode,
              }}
              title={variant.color}
              onClick={() => setSelectedVariant(variant)}
            />
          ))}
        </div>
      </div>

      {/* Size */}

      <div className="product-info__group">
        <h4>Kích cỡ</h4>

        <div className="sizes">
          {product.sizes.map((size) => (
            <button
              key={size}
              className={selectedSize === size ? "size active" : "size"}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Số lượng */}

      <div className="product-info__group">
        <h4>Số lượng</h4>

        <div className="quantity">
          <button onClick={decrease}>-</button>

          <span>{quantity}</span>

          <button onClick={increase}>+</button>
        </div>
      </div>

      <Button
        type="primary"
        size="large"
        className="add-cart-btn"
        onClick={handleAddCart}
      >
        Thêm vào giỏ hàng
      </Button>

      <div className="product-info__description">
        <h3>Mô tả sản phẩm</h3>

        <p>{product.description}</p>
      </div>
    </div>
  );
}

export default ProductInfo;
