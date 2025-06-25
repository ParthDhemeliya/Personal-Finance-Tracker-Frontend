import {
  DollarSign,
  TrendingUp,
  CreditCard,
  PieChart,
  ArrowUpIcon,
  ArrowDownIcon,
  Home,
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
          <p className="text-gray-600">Here's your financial overview for this month.</p>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          <div className="bg-white p-6 rounded-xl shadow border">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-semibold text-gray-500">Total Balance</h3>
              <DollarSign className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900">₹12,345</div>
            <p className="text-sm text-green-600 flex items-center mt-1">
              <ArrowUpIcon className="w-4 h-4 mr-1" />
              +2.5% from last month
            </p>
          </div>


          <div className="bg-white p-6 rounded-xl shadow border">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-semibold text-gray-500">Monthly Income</h3>
              <TrendingUp className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900">₹8,200</div>
            <p className="text-sm text-green-600 flex items-center mt-1">
              <ArrowUpIcon className="w-4 h-4 mr-1" />
              +5.1% from last month
            </p>
          </div>


          <div className="bg-white p-6 rounded-xl shadow border">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-semibold text-gray-500">Monthly Expenses</h3>
              <CreditCard className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900">₹5,650</div>
            <p className="text-sm text-red-600 flex items-center mt-1">
              <ArrowDownIcon className="w-4 h-4 mr-1" />
              -1.7% from last month
            </p>
          </div>


          <div className="bg-white p-6 rounded-xl shadow border">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-semibold text-gray-500">Savings Goal</h3>
              <PieChart className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900">68%</div>
            <p className="text-sm text-gray-500">₹6,800 of ₹10,000 goal</p>
          </div>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <div className="bg-white rounded-xl shadow border p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
            <div className="space-y-4">

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <CreditCard className="text-red-500 w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">Grocery Store</p>
                    <p className="text-sm text-gray-500">Today, 2:30 PM</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-red-600">-₹870</p>
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                    Food
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <TrendingUp className="text-green-600 w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">Salary</p>
                    <p className="text-sm text-gray-500">Yesterday, 9:00 AM</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-600">+₹2,600</p>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    Income
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow border p-6">
            <h3 className="text-lg font-semibold mb-4">Budget Overview</h3>
            <div className="space-y-5">
              {[
                { category: "Food & Dining", current: 456, max: 600, color: "bg-blue-600" },
                { category: "Transportation", current: 234, max: 400, color: "bg-green-600" },
                { category: "Entertainment", current: 189, max: 300, color: "bg-yellow-500" },
                { category: "Shopping", current: 345, max: 250, color: "bg-red-600" },
              ].map((item, index) => {
                const percent = Math.min((item.current / item.max) * 100, 100);
                return (
                  <div key={index}>
                    <div className="flex justify-between mb-1 text-sm font-medium">
                      <span>{item.category}</span>
                      <span className="text-gray-500">
                        ₹{item.current} / ₹{item.max}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div className={`${item.color} h-2 rounded-full`} style={{ width: `${percent}%` }} />
                    </div>
                    {item.current > item.max && (
                      <p className="text-xs text-red-600 mt-1">
                        Over budget by ₹{item.current - item.max}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
