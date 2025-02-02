import { Header } from "@/components/Layout/Header";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const Invest = () => {
  const [invests, setInvest] = useState([]);

  
  useEffect(() => {
    fetch('http://localhost:5000/api/invests')
        .then(response => response.json())
        .then(data => setInvest(data))
        .catch(error => console.error('Error fetching invests:', error));
  }, []);

  const lastEntry = invests.length > 0 ? invests[invests.length - 1] : null;
  const lastStocksValue = lastEntry ? lastEntry.stocks : 'Loading...';
  const lastBondsValue = lastEntry ? lastEntry.bonds : 'Loading...';
  const lastCryptoValue = lastEntry ? lastEntry.crypto : 'Loading...';
  
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
              <p className="text-3xl font-bold text-gray-900">${lastStocksValue}</p>
              <span className="text-sm text-emerald-600">+5.2% this month</span>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-primary mb-2">Bonds</h3>
              <p className="text-3xl font-bold text-gray-900">${lastBondsValue}</p>
              <span className="text-sm text-emerald-600">+2.1% this month</span>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-primary mb-2">Crypto</h3>
              <p className="text-3xl font-bold text-gray-900">${lastCryptoValue}</p>
              <span className="text-sm text-emerald-600">+4.8% this month</span>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="text-xl font-semibold text-primary mb-6">Portfolio Performance</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={invests}>
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