import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
<<<<<<< HEAD
=======
// import logo from "../assets/logo.png";
>>>>>>> 8607ba398343d89c29d3774d8c53a840e0140895
import ProfilePopup from "../common/ProfilePopup";
import { DollarSign } from "lucide-react";

const NavBar = () => {
  const Neviagate = useNavigate();
  const location = useLocation();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) =>
    location.pathname === path ? "bg-gray-100 dark:bg-gray-700" : "";

  const togglePopup = () => {
    setIsPopupOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setIsPopupOpen(false);
    }
  };

  useEffect(() => {
    if (isPopupOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopupOpen]);
  const handleLogout = () => {
    // Clear auth tokens, user state, etc.
    localStorage.removeItem("token");
    // Redirect to login page
    Neviagate("/");
    setIsPopupOpen(false);
  };
  return (
    <div>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3 flex items-center justify-between relative">
          <Link to="/dashboard" className="flex items-center">
<<<<<<< HEAD
=======
            {/* <img src={logo} alt="Logo" className="h-8 me-2" /> */}
>>>>>>> 8607ba398343d89c29d3774d8c53a840e0140895
            <DollarSign className="h-8 w-8 me-2 text-blue-600" />
            <span className="text-xl font-semibold text-gray-900 dark:text-white">
              My Budget
            </span>
          </Link>
          <div className="relative" ref={popupRef}>
            <div
              className="flex items-center space-x-4 cursor-pointer"
              onClick={togglePopup}
            >
              <img
                className="w-8 h-8 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt="User"
              />
              <span className="hidden sm:inline text-sm font-medium dark:text-white">
                Neil Sims
              </span>
            </div>
            {isPopupOpen && (
              <ProfilePopup
                user={{
                  name: "Neil Sims",
                  email: "neil@example.com",
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

      <aside className="fixed top-0 left-0 z-40 w-64 h-screen pt-16 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/dashboard"
                className={`flex items-center p-2 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive(
                  "/dashboard",
                )}`}
              >
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/income"
                className={`flex items-center p-2 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive(
                  "/income",
                )}`}
              >
                <span className="ms-3">Income</span>
              </Link>
            </li>
            <li>
              <Link
                to="/expense"
                className={`flex items-center p-2 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive(
                  "/expense",
                )}`}
              >
                <span className="ms-3">Expense</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default NavBar;
