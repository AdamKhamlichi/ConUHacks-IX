import { Header } from "@/components/Layout/Header";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { month: 'Jan', stocks: 4000, bonds: 2400, crypto: 1800 },
  { month: 'Feb', stocks: 4200, bonds: 2600, crypto: 1600 },
  { month: 'Mar', stocks: 4100, bonds: 2500, crypto: 2000 },
  { month: 'Apr', stocks: 4500, bonds: 2700, crypto: 2200 },
  { month: 'May', stocks: 4800, bonds: 2900, crypto: 1900 },
  { month: 'Jun', stocks: 5000, bonds: 3000, crypto: 2100 },
];

const Invest = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-left mb-8">
            <h1 className="text-3xl font-semibold text-gray-900">Investment Dashboard</h1>
            <p className="text-gray-500 mt-2">Track your investment portfolio</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-primary mb-2">Stocks</h3>
              <p className="text-3xl font-bold text-gray-900">$5,000</p>
              <span className="text-sm text-emerald-600">+5.2% this month</span>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-primary mb-2">Bonds</h3>
              <p className="text-3xl font-bold text-gray-900">$3,000</p>
              <span className="text-sm text-emerald-600">+2.1% this month</span>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-primary mb-2">Crypto</h3>
              <p className="text-3xl font-bold text-gray-900">$2,100</p>
              <span className="text-sm text-emerald-600">+4.8% this month</span>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="text-xl font-semibold text-primary mb-6">Portfolio Performance</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="stocks" stroke="#1E3A8A" strokeWidth={2} />
                  <Line type="monotone" dataKey="bonds" stroke="#059669" strokeWidth={2} />
                  <Line type="monotone" dataKey="crypto" stroke="#60A5FA" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Invest;