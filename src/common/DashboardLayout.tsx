import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./NavBar";

const DashboardLayout = () => {
  const location = useLocation();

  // Optional: use route-specific background color if needed
  const route = location.pathname;
  const isIncomePage = route.startsWith("/income");
  const isExpensePage = route.startsWith("/expense");

  const contentBg = isIncomePage
    ? "bg-blue-50 dark:bg-blue-900"
    : isExpensePage
      ? "bg-red-50 dark:bg-red-900"
      : "bg-gray-100 dark:bg-gray-900";

  return (
    <div className="flex min-h-screen">
      <NavBar />
      <main className={`flex-1 pt-14 pl-64 p-4 transition-colors ${contentBg}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
