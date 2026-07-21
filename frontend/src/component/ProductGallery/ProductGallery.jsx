import "./ProductGallery.scss";

import { useEffect, useState } from "react";

import { LeftOutlined, RightOutlined } from "@ant-design/icons";

function ProductGallery({ images }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setCurrent(0);
  }, [images]);

  function prev() {
    if (current === 0) {
      setCurrent(images.length - 1);
    } else {
      setCurrent(current - 1);
    }
  }

  function next() {
    if (current === images.length - 1) {
      setCurrent(0);
    } else {
      setCurrent(current + 1);
    }
  }

  return (
    <div className="gallery">
      <div className="gallery__image">
        <button className="gallery__left" onClick={prev}>
          <LeftOutlined />
        </button>

        <img src={images[current]} alt="" />

        <button className="gallery__right" onClick={next}>
          <RightOutlined />
        </button>
      </div>

      <div className="gallery__dots">
        {images.map((item, index) => (
          <span
            key={index}
            className={current === index ? "active" : ""}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductGallery;
