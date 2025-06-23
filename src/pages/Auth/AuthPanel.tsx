// components/AuthDrawer.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthDrawerProps {
  mode: "login" | "signup";
  onClose: () => void;
}

export default function AuthDrawer({ mode, onClose }: AuthDrawerProps) {
  const [isVisible] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate login/signup success
    setTimeout(() => {
      localStorage.setItem("authToken", "dummy_token");
      navigate("/dashboard");
    }, 500);
  };

  useEffect(() => {
    // Close drawer when Escape is pressed
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`relative w-full max-w-md bg-white shadow-lg p-8 dark:bg-gray-900 ${
          isVisible ? "animate-slide-in" : "animate-slide-out"
        }`}
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          {mode === "login" ? "Login to Your Account" : "Create an Account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            {mode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
