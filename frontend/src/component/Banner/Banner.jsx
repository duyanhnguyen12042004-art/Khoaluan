import "./Banner.scss";

import { Carousel } from "antd";

import banner1 from "../../assets/images/banner/banner1.jpg";
import banner2 from "../../assets/images/banner/banner2.jpg";
import banner3 from "../../assets/images/banner/banner3.jpg";

function Banner() {
  return (
    <div className="banner">
      <Carousel autoplay autoplaySpeed={3000}>
        <div>
          <img src={banner1} alt="Banner 1" className="banner__image" />
        </div>

        <div>
          <img src={banner2} alt="Banner 2" className="banner__image" />
        </div>

        <div>
          <img src={banner3} alt="Banner 3" className="banner__image" />
        </div>
      </Carousel>
    </div>
  );
}

export default Banner;