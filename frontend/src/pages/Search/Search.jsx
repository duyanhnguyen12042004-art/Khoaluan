import "./Search.scss";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductCard from "../../component/ProductCard/ProductCard";
import { getAllProducts } from "../../services/productApi";

function Search() {
  const [products, setProducts] = useState([]);

  const [searchParams] = useSearchParams();

  const keyword = searchParams.get("keyword") || "";

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

  // Hàm bỏ dấu và chuyển về chữ thường
  const normalize = (str) =>
    str
      ?.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  // Lọc sản phẩm theo tên
  const result = products.filter((product) =>
    normalize(product.name).includes(normalize(keyword)),
  );

  return (
    <div className="search">
      <h1>Kết quả tìm kiếm: "{keyword}"</h1>

      <p>Tìm thấy {result.length} sản phẩm</p>

      <div className="search__list">
        {result.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Search;
