import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import ProfilePopup from "./ProfilePopup";
import { DollarSign } from "lucide-react";
import { useAppDispatch } from "../hooks/useTypedDispatch";
import { useAppSelector } from "../hooks/useTypedSelector";
import { fetchUser } from "../redux/auth/authThunk";
import { type RootState } from "../redux/store";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const user = useAppSelector((state: RootState) => state.auth.user);
  const userFirstName = user?.first_name;
  const userFullName = `${user?.first_name} ${user?.last_name}`;

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsPopupOpen(false);
      }
    };
    if (isPopupOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isPopupOpen]);

  return (
    <div>
      {/* 🔵 Top Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="h-14 px-6 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              My Budget
            </span>
          </Link>

          <div className="relative" ref={popupRef}>
            <div
              onClick={() => setIsPopupOpen((prev) => !prev)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <img
                className="w-8 h-8 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt="User"
              />
              <span className="text-sm font-medium text-gray-800 dark:text-white hidden sm:inline">
                {userFirstName}
              </span>
            </div>

            {isPopupOpen && (
              <ProfilePopup
                user={{
                  name: userFullName,
                  email: user?.email,
                  profile:
                    "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
                }}
                onClose={() => setIsPopupOpen(false)}
                onLogout={handleLogout}
              />
            )}
          </div>
        </div>
      </nav>

      {/* 🔴 Sidebar */}
      <aside className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
        <div className="h-full px-4 py-6 space-y-2">
          {[
            { label: "Dashboard", path: "/dashboard", color: "gray" },
            { label: "Income", path: "/income", color: "blue" },
            { label: "Expense", path: "/expense", color: "red" },
          ].map(({ label, path, color }) => {
            const isRouteActive = isActive(path);

            const colorMap = {
              gray: {
                active:
                  "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white",
                hover: "hover:bg-gray-200 dark:hover:bg-gray-800",
              },
              blue: {
                active:
                  "bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-white",
                hover: "hover:bg-blue-50 dark:hover:bg-blue-800",
              },
              red: {
                active:
                  "bg-red-100 dark:bg-red-700 text-red-800 dark:text-white",
                hover: "hover:bg-red-50 dark:hover:bg-red-800",
              },
            };

            const baseColor = colorMap[color as keyof typeof colorMap];

            return (
              <Link
                key={label}
                to={path}
                className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isRouteActive
                    ? baseColor.active
                    : `text-gray-800 dark:text-gray-300 ${baseColor.hover}`
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </aside>
    </div>
  );
};

export default NavBar;
