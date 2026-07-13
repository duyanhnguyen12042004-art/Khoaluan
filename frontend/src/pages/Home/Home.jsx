import "./Home.scss";

function Home() {
  return (
    <div className="home">
      <section className="home__banner">Banner</section>

      <section className="home__breadcrumb">Breadcrumb</section>

      <section className="home__category">Danh mục sản phẩm</section>

      <section className="home__filter">Bộ lọc</section>

      <section className="home__products">Danh sách sản phẩm</section>

      <section className="home__pagination">Phân trang</section>
    </div>
  );
}

export default Home;
