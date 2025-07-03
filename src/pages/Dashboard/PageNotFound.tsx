import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Oops! Page Not Found</h2>
      <p className="mb-6 text-gray-500 max-w-md">
        The page you are looking for doesn't exist or has been moved.
        <br />
        Please check the URL or return to the dashboard.
      </p>
      <button
        className="cursor-pointer px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={() => navigate("/dashboard")}
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default PageNotFound;
