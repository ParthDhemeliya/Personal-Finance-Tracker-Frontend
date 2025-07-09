// NavBar.tsx
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import ProfilePopup from "./ProfilePopup";
import { DollarSign, ChevronDown, ChevronRight } from "lucide-react";
import { useAppDispatch } from "../hooks/useTypedDispatch";
import { useAppSelector } from "../hooks/useTypedSelector";
import { fetchUser } from "../redux/auth/authThunk";
import { type RootState } from "../redux/store";
import SidebarLinks from "./SidebarLinks";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const popupRef = useRef<HTMLDivElement>(null);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const user = useAppSelector((state: RootState) => state.auth.user);
  const userFirstName = user?.first_name;
  const userFullName = `${user?.first_name} ${user?.last_name}`;

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
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
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-blue-50 border-b border-blue-100/80">
        <div className="h-14 px-6 flex items-center justify-between">
          <button
            className="sm:hidden text-blue-800"
            onClick={() => setIsSidebarOpen(true)}
          >
            ☰
          </button>

          <Link href="/dashboard" className="flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-blue-700" />
            <span className="text-xl font-bold text-blue-900">My Budget</span>
          </Link>

          <div className="relative" ref={popupRef}>
            <div
              onClick={() => setIsPopupOpen((prev) => !prev)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <img
                className="w-8 h-8 rounded-full border border-blue-200"
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt="User"
              />
              <span className="text-sm font-medium text-blue-900 hidden sm:inline">
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

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-30 z-30 sm:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 bg-blue-50 border-r border-blue-100/80 shadow-sm sm:hidden"
            >
              <div className="relative h-full px-4 py-6 space-y-2">
                <button
                  className="absolute top-4 right-4 text-blue-900"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  ✕
                </button>
                <SidebarLinks
                  currentPath={pathname}
                  onNavigate={() => setIsSidebarOpen(false)}
                />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden sm:block fixed top-0 left-0 z-40 w-64 h-screen pt-14 bg-blue-50 border-r border-blue-100/80 shadow-sm">
        <div className="h-full px-4 py-6 space-y-2">
          <button
            onClick={() => setIsSidebarVisible((prev) => !prev)}
            className="w-full flex items-center justify-start gap-2 px-4 py-2 mb-2 rounded-lg text-sm font-semibold text-blue-800 bg-blue-100 hover:bg-blue-200 transition"
          >
            {isSidebarVisible ? (
              <>
                <ChevronDown className="w-4 h-4" />
                Hide Menu
              </>
            ) : (
              <>
                <ChevronRight className="w-4 h-4" />
                Show Menu
              </>
            )}
          </button>
          {isSidebarVisible && <SidebarLinks currentPath={pathname} />}
        </div>
      </aside>
    </div>
  );
};

export default NavBar;
