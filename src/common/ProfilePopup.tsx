import React, { useRef } from "react";

interface ProfilePopupProps {
  onLogout: () => void;
  onClose: () => void;
  user?: {
    profile?: string;
    name?: string;
    email?: string;
  };
}

const ProfilePopup: React.FC<ProfilePopupProps> = ({
  onLogout,
  onClose,
  user,
}) => {
  const popupRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={popupRef}
      className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-lg z-50 p-4"
    >
      <div className="flex items-center space-x-3 mb-4">
        <img
          className="w-12 h-12 rounded-full"
          src={
            user?.profile ||
            "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          }
          alt="User"
        />
        <div>
          <p className="text-sm font-semibold text-gray-800 dark:text-white">
            {user?.name || "Neil Sims"}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-300">
            {user?.email || "neil@example.com"}
          </p>
        </div>
      </div>
      <div className="flex justify-between space-x-2">
        <button
          onClick={onLogout}
          className="flex-1 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md"
        >
          Logout
        </button>
        <button
          onClick={onClose}
          className="flex-1 py-1 text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ProfilePopup;
