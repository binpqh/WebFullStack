import { Outlet } from "react-router-dom";

import Header from "../Common/Header";
import Footer from "../Common/Footer";

const LayoutProduct = () => {
  return (
    <div>
      <Header content="Product Management" />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LayoutProduct;
