import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";
import Navbar from "./Navbar";

const Layout = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const location = useLocation();
  return user ? (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className="w-1/5 h-screen bg-white sticky top-0 hidden md:block">
        {/* Side bar component */}

        <Sidebar />
      </div>
      {/* Mobile side bar component */}

      <MobileSidebar />
      <div className="flex-1 overflow-y-auto">
        {/* Nav bar component */}

        <Navbar />
        <div className="p-4 2xl:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/log-in" state={{ from: location }} replace />
  );
};

export default Layout;
