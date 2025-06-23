// import NavBar from "../components/NavBar";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div>
      <NavBar />
      <div className="pt-16 pl-64 min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
