import "./Products.scss";

import { useEffect, useState } from "react";
import { Select, Row, Col, Button } from "antd";

import ProductCard from "../../component/ProductCard/ProductCard";
import { getAllProducts } from "../../services/productApi";

const { Option } = Select;

function Products() {
  const [products, setProducts] = useState([]);

  const [filters, setFilters] = useState({
    category: "",
    size: "",
    color: "",
    price: "",
  });

  const [sort, setSort] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearFilters = () => {
    setFilters({
      category: "",
      size: "",
      color: "",
      price: "",
    });

    setSort("");
  };

  // Lấy dữ liệu filter
  const categories = [...new Set(products.map((p) => p.category))];

  const sizes = [...new Set(products.flatMap((p) => p.sizes || []))];

  const colors = [
    ...new Set(products.flatMap((p) => p.variants?.map((v) => v.color) || [])),
  ];

  // Lọc
  let filteredProducts = products.filter((product) => {
    if (filters.category && product.category !== filters.category) {
      return false;
    }

    if (filters.size && !product.sizes.includes(filters.size)) {
      return false;
    }

    if (
      filters.color &&
      !product.variants.some((v) => v.color === filters.color)
    ) {
      return false;
    }

    switch (filters.price) {
      case "1":
        return product.price < 500000;

      case "2":
        return product.price >= 500000 && product.price <= 700000;

      case "3":
        return product.price > 700000;

      default:
        return true;
    }
  });

  // Sắp xếp
  filteredProducts = [...filteredProducts];

  switch (sort) {
    case "priceAsc":
      filteredProducts.sort((a, b) => a.price - b.price);
      break;

    case "priceDesc":
      filteredProducts.sort((a, b) => b.price - a.price);
      break;

    case "sold":
      filteredProducts.sort((a, b) => b.sold - a.sold);
      break;

    case "rating":
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;

    case "newest":
      filteredProducts.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      );
      break;

    case "name":
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name, "vi"));
      break;

    default:
      break;
  }

  return (
    <div className="products">
      <div className="products__header">
        <h1>TẤT CẢ SẢN PHẨM</h1>
        <p>Khám phá toàn bộ sản phẩm</p>
      </div>

      <Row gutter={16} className="products__filter">
        {/* Kiểu dáng */}
        <Col>
          <Select
            value={filters.category || undefined}
            placeholder="Kiểu dáng"
            style={{ width: 180 }}
            allowClear
            onChange={(value) =>
              setFilters({
                ...filters,
                category: value || "",
              })
            }
          >
            {categories.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Col>

        {/* Size */}
        <Col>
          <Select
            value={filters.size || undefined}
            placeholder="Kích cỡ"
            style={{ width: 180 }}
            allowClear
            onChange={(value) =>
              setFilters({
                ...filters,
                size: value || "",
              })
            }
          >
            {sizes.map((size) => (
              <Option key={size} value={size}>
                {size}
              </Option>
            ))}
          </Select>
        </Col>

        {/* Màu */}
        <Col>
          <Select
            value={filters.color || undefined}
            placeholder="Màu sắc"
            style={{ width: 180 }}
            allowClear
            onChange={(value) =>
              setFilters({
                ...filters,
                color: value || "",
              })
            }
          >
            {colors.map((color) => (
              <Option key={color} value={color}>
                {color}
              </Option>
            ))}
          </Select>
        </Col>

        {/* Giá */}
        <Col>
          <Select
            value={filters.price || undefined}
            placeholder="Khoảng giá"
            style={{ width: 220 }}
            allowClear
            onChange={(value) =>
              setFilters({
                ...filters,
                price: value || "",
              })
            }
          >
            <Option value="1">Dưới 500.000đ</Option>
            <Option value="2">500.000đ - 700.000đ</Option>
            <Option value="3">Trên 700.000đ</Option>
          </Select>
        </Col>

        {/* Sắp xếp */}
        <Col>
          <Select
            placeholder="Sắp xếp"
            style={{ width: 200 }}
            allowClear
            value={sort || undefined}
            onChange={(value) => setSort(value)}
          >
            <Option value="newest">Mới nhất</Option>
            <Option value="priceAsc">Giá tăng dần</Option>
            <Option value="priceDesc">Giá giảm dần</Option>
            <Option value="sold">Bán chạy nhất</Option>
            <Option value="rating">Đánh giá cao nhất</Option>
            <Option value="name">Tên A → Z</Option>
          </Select>
        </Col>

        {/* Xóa bộ lọc */}
        <Col>
          <Button onClick={handleClearFilters}>Xóa bộ lọc</Button>
        </Col>
      </Row>

      <div className="products__list">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={{
              ...product,
              image: product.variants?.[0]?.images?.[0],
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;
