import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { lazy, Suspense } from "react";

const Login = lazy(() => import("./pages/Auth/Login"));
const SignUp = lazy(() => import("./pages/Auth/SignUp"));
const Home = lazy(() => import("./pages/Dashboard/Home"));
const Imcome = lazy(() => import("./pages/Dashboard/Income"));
const Expense = lazy(() => import("./pages/Dashboard/Expense"));
const PageNotFound = lazy(() => import("./pages/Dashboard/PageNotFound"));

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? (
    <Navigate to={"/dashboard"} />
  ) : (
    <Navigate to={"/login"} />
  );
};
const App = () => {
  return (
    <div>
      <div>
        <Router>
          <Suspense
            fallback={<div className="p-4 text-center">Loading...</div>}
          />
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/income" element={<Imcome />} />
            <Route path="/expense" element={<Expense />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Suspense />
        </Router>
      </div>
    </div>
  );
};

export default App;
