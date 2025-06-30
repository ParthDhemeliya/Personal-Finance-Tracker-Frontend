import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const DashboardLayout = () => {
  return (
    <div>
      <NavBar />
      <div className="pt-14 pl-64 min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
