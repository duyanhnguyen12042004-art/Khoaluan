import "./ProductDetail.scss";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProductGallery from "../../component/ProductGallery/ProductGallery";
import ProductInfo from "../../component/ProductInfo/ProductInfo";

import { getProductById } from "../../services/productApi";

function ProductDetail() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [product, setProduct] = useState(null);

  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    loadProduct();
  }, [id]);

  async function loadProduct() {
    try {
      const data = await getProductById(id);

      setProduct(data);

      setSelectedVariant(data.variants[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <h2>Đang tải...</h2>;
  }

  if (!product) {
    return <h2>Không tìm thấy sản phẩm.</h2>;
  }

  return (
    <div className="product-detail">

      <div className="product-detail__left">

        <ProductGallery
          images={selectedVariant.images}
        />

      </div>

      <div className="product-detail__right">

        <ProductInfo
          product={product}
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
        />

      </div>

    </div>
  );
}

export default ProductDetail;