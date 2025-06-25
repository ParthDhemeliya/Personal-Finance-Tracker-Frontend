import {
  ArrowDownIcon,
  ArrowUpIcon,
  CreditCard,
  DollarSign,
  PieChart,
  TrendingUp,
  Wallet,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const dummyChartData = [
  { name: "Jan", Income: 4000, Expense: 2400 },
  { name: "Feb", Income: 3000, Expense: 1398 },
  { name: "Mar", Income: 5000, Expense: 2000 },
  { name: "Apr", Income: 2780, Expense: 3908 },
  { name: "May", Income: 6000, Expense: 2800 },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-50 to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Welcome & Filter */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-1">Welcome back 👋</h1>
            <p className="text-gray-600 text-sm">Here’s your financial snapshot for this month.</p>
          </div>
          <select className="mt-4 md:mt-0 px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm text-sm focus:outline-none">
            <option>This Month</option>
            <option>Last Month</option>
            <option>Last 3 Months</option>
          </select>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard title="Total Balance" value="₹12,345" icon={<Wallet className="h-5 w-5 text-blue-600" />} />
          <StatCard
            title="Monthly Income"
            value="₹6,000"
            icon={<TrendingUp className="h-5 w-5 text-green-600" />}
            trend="up"
          />
          <StatCard
            title="Monthly Expense"
            value="₹3,800"
            icon={<CreditCard className="h-5 w-5 text-red-600" />}
            trend="down"
          />
          <StatCard title="Savings" value="₹2,200" icon={<PieChart className="h-5 w-5 text-purple-600" />} />
        </div>

        {/* Income vs Expense Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">📊 Monthly Income vs Expense</h2>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={dummyChartData} barSize={40}>
              <XAxis dataKey="name" stroke="#8884d8" />
              <YAxis stroke="#8884d8" />
              <Tooltip />
              <Legend />
              <Bar dataKey="Income" fill="#34d399" radius={[8, 8, 0, 0]} />
              <Bar dataKey="Expense" fill="#f87171" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Footer Message */}
        <p className="text-center text-gray-400 text-sm">More features & insights coming soon...</p>
      </div>
    </div>
  );
};

const StatCard = ({
  title,
  value,
  icon,
  trend,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: "up" | "down";
}) => {
  const trendIcon =
    trend === "up" ? (
      <span className="flex items-center text-green-600 text-xs mt-1">
        <ArrowUpIcon className="h-3 w-3 mr-1" /> +2.5%
      </span>
    ) : trend === "down" ? (
      <span className="flex items-center text-red-600 text-xs mt-1">
        <ArrowDownIcon className="h-3 w-3 mr-1" /> -1.2%
      </span>
    ) : null;

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
        {icon}
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      {trendIcon}
    </div>
  );
};

export default Dashboard;
