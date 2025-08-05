import Products from "../product/product";
import Sidebar from "../Sidebar/sidebar";

const Deals = () => {
  return (
    <section className="listingPage ">
      <div className="container-fluid ">
        <div className="listingData ">
          <div className="row ">
          <div className="productRow col-md-9">
                {/* Render products dynamically */}
                {[...Array(20)].map((_, index) => (
                  <div key={index} className="item">
                    <Products />
                  </div>
                ))}
              </div>
            <div className="col-md-3 sidebarWrapper">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Deals;
