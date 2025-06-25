import { Link, useNavigate } from "react-router-dom";

import {
  ArrowRight,
  BarChart3,
  DollarSign,
  PieChart,
  TrendingUp,
} from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">My Budget</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/login")}
              type="button"
              className="bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 rounded px-4 py-2"
            >
              Sign In
            </button>

            <button
              onClick={() => navigate("/signup")}
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2"
            >
              Sign Up
            </button>
          </div>
        </nav>
      </header>
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Personal Finance Tracker
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Take control of your financial future with our comprehensive
            tracking tools. Monitor expenses, set budgets, and achieve your
            financial goals with ease.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            {/* if login then redirect to dashboard if not then redirect to login
            page */}
            <Link to="/dashboard">
              <button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded text-lg flex items-center justify-center"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Expense Tracking
              </h3>
              <p className="text-gray-600">
                Monitor your daily expenses and categorize spending to
                understand where your money goes.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <PieChart className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Budget Planning
              </h3>
              <p className="text-gray-600">
                Set monthly budgets and get alerts when you're approaching your
                limits.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Financial Goals
              </h3>
              <p className="text-gray-600">
                Track your progress towards savings goals and financial
                milestones.
              </p>
            </div>
          </div>
        </div>
      </main>
      <footer className="container mx-auto px-4 py-8 mt-16">
        <div className="text-center text-gray-600">
          <p>&copy; 2024 FinanceTracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
