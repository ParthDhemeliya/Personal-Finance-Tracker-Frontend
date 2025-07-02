import React from "react";

interface AlertBannerProps {
  type?: "warning" | "info" | "success" | "error";
  message: React.ReactNode;
  onClose?: () => void;
}

const typeStyles: Record<string, string> = {
  warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
  info: "bg-blue-100 text-blue-800 border-blue-300",
  success: "bg-green-100 text-green-800 border-green-300",
  error: "bg-red-100 text-red-800 border-red-300",
};

const AlertBanner: React.FC<AlertBannerProps> = ({
  type = "info",
  message,
  onClose,
}) => (
  <div
    className={`border-l-4 p-4 mb-4 flex items-center justify-between ${typeStyles[type]}`}
  >
    <div>{message}</div>
    {onClose && (
      <button
        className="ml-4 text-lg font-bold focus:outline-none"
        onClick={onClose}
        aria-label="Close alert"
      >
        ×
      </button>
    )}
  </div>
);

export default AlertBanner;
