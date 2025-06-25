import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./api/ProtectedRoute";
const Login = lazy(() => import("./pages/Auth/Login"));
const SignUp = lazy(() => import("./pages/Auth/SignUp"));
const Income = lazy(() => import("./pages/Dashboard/Income"));
const Expense = lazy(() => import("./pages/Dashboard/Expense"));
const PageNotFound = lazy(() => import("./pages/Dashboard/PageNotFound"));
const DashboardLayout = lazy(() => import("./common/DashboardLayout"));
const LandingPage = lazy(() => import("./pages/Dashboard/LandingPage"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const App = () => {
  return (
    <Router>
      <Suspense
        fallback={<div className="p-4 text-center">Page Loading...</div>}
      >
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

           <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />{" "}
            <Route path="/income" element={<Income />} />
            <Route path="/expense" element={<Expense />} />
          </Route>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
