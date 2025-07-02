import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <NavBar />
      <main className={`flex-1 pt-14 pl-64 p-4 transition-colors`}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
