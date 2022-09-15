import { Outlet } from "react-router-dom";

import Header from "../Common/Header";
import Footer from "../Common/Footer";

const LayoutCategory = () => {
  return (
    <div>
      <Header content="Category Management" />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LayoutCategory;