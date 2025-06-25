<<<<<<< HEAD
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
=======
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back!
          </h1>
          <p className="text-gray-600">
            Here's your financial overview for this month.
          </p>
        </div>

        {/* Stats Cards */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Balance
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,345.67</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <ArrowUpIcon className="h-3 w-3 mr-1" />
                  +2.5%
                </span>
                from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Monthly Income
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$5,200.00</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <ArrowUpIcon className="h-3 w-3 mr-1" />
                  +8.2%
                </span>
                from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Monthly Expenses
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$3,456.78</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-600 flex items-center">
                  <ArrowDownIcon className="h-3 w-3 mr-1" />
                  -1.2%
                </span>
                from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Savings Goal
              </CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <p className="text-xs text-muted-foreground">
                $6,800 of $10,000 goal
              </p>
            </CardContent>
          </Card>
        </div> */}

        {/* Recent Transactions */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest financial activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <CreditCard className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium">Grocery Store</p>
                      <p className="text-sm text-gray-500">Today, 2:30 PM</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-red-600">-$87.32</p>
                    <Badge variant="secondary">Food</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <ArrowUpIcon className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Salary Deposit</p>
                      <p className="text-sm text-gray-500">
                        Yesterday, 9:00 AM
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">+$2,600.00</p>
                    <Badge variant="secondary">Income</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Home className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Rent Payment</p>
                      <p className="text-sm text-gray-500">Dec 1, 2024</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-red-600">-$1,200.00</p>
                    <Badge variant="secondary">Housing</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Budget Overview</CardTitle>
              <CardDescription>
                Your spending by category this month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Food & Dining</span>
                    <span className="text-sm text-gray-500">$456 / $600</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: "76%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Transportation</span>
                    <span className="text-sm text-gray-500">$234 / $400</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: "58%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Entertainment</span>
                    <span className="text-sm text-gray-500">$189 / $300</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-600 h-2 rounded-full"
                      style={{ width: "63%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Shopping</span>
                    <span className="text-sm text-gray-500">$345 / $250</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-600 h-2 rounded-full"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                  <p className="text-xs text-red-600 mt-1">
                    Over budget by $95
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div> */}
>>>>>>> 8607ba398343d89c29d3774d8c53a840e0140895
      </div>
    </div>
  );
};

<<<<<<< HEAD
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

=======
>>>>>>> 8607ba398343d89c29d3774d8c53a840e0140895
export default Dashboard;
