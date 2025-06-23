// components/IconBlock.tsx
import React from "react";

const IconBlock = ({ height = "h-28" }: { height?: string }) => {
  return (
    <div
      className={`flex items-center justify-center rounded-sm bg-gray-50 dark:bg-gray-800 ${height} mb-4`}
    >
      <p className="text-2xl text-gray-400 dark:text-gray-500">
        <svg
          className="w-3.5 h-3.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 1v16M1 9h16"
          />
        </svg>
      </p>
    </div>
  );
};

export default IconBlock;
