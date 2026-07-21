import "./Home.scss";

import { useEffect, useState } from "react";
import Banner from "../../component/Banner/Banner";
import ProductCard from "../../component/ProductCard/ProductCard";
import { getAllProducts } from "../../services/productApi";

function Home() {
  const [products, setProducts] = useState([]);

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

  return (
    <div className="home">
      <Banner />

      <section className="home-section">
        <h2>Sản phẩm bán chạy</h2>

        <div className="product-list">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="home-section">
        <h2>Sản phẩm mới</h2>

        <div className="product-list">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={`new-${product.id}`} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
