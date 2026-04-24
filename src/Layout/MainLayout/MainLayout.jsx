import { Outlet } from "react-router-dom";
import Navber from "../../pages/Navber/Navber.jsx";
import Footer from "../../pages/Footer/Footer.jsx";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navber />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
