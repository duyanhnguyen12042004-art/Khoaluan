import "./ProductCard.scss";

import { Card, Button, Rate } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Card
      hoverable
      className="product-card"
      cover={
        <div className="product-card__image-box">
          <img
            src={product.variants?.[0]?.images?.[0]}
            alt={product.name}
            className="product-card__image"
          />
        </div>
      }
    >
      <h3 className="product-card__name">{product.name}</h3>

      <div className="product-card__price">
        {product.price.toLocaleString("vi-VN")}đ
      </div>

      <div className="product-card__rate">
        <Rate disabled value={product.rating} />

        <span>({product.sold})</span>
      </div>

      <div className="product-card__actions">
        <Button icon={<ShoppingCartOutlined />}>Thêm giỏ hàng</Button>

        <Link to={`/product/${product.id}`}>
          <Button type="primary">Xem chi tiết</Button>
        </Link>
      </div>
    </Card>
  );
}

export default ProductCard;
