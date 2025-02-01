import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for different account types
const mockDataByType: Record<string, any[]> = {
  "Checking": [
    { month: 'Jan', balance: 2000 },
    { month: 'Feb', balance: 2200 },
    { month: 'Mar', balance: 2100 },
    { month: 'Apr', balance: 2400 },
    { month: 'May', balance: 2300 },
    { month: 'Jun', balance: 2500 },
  ],
  "Savings": [
    { month: 'Jan', balance: 12000 },
    { month: 'Feb', balance: 13000 },
    { month: 'Mar', balance: 13500 },
    { month: 'Apr', balance: 14000 },
    { month: 'May', balance: 14500 },
    { month: 'Jun', balance: 15000 },
  ],
  "Investment": [
    { month: 'Jan', balance: 40000 },
    { month: 'Feb', balance: 41000 },
    { month: 'Mar', balance: 42000 },
    { month: 'Apr', balance: 43000 },
    { month: 'May', balance: 44000 },
    { month: 'Jun', balance: 45000 },
  ],
  "Credit Card": [
    { month: 'Jan', balance: -800 },
    { month: 'Feb', balance: -1000 },
    { month: 'Mar', balance: -900 },
    { month: 'Apr', balance: -1100 },
    { month: 'May', balance: -1300 },
    { month: 'Jun', balance: -1200 },
  ],
};

export const FinancialOverview = ({ accountType = "Checking" }: { accountType?: string }) => {
  const data = mockDataByType[accountType] || mockDataByType["Checking"];
  
  return (
    <Card className="p-6 w-full h-[400px] bg-white shadow-lg animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-primary">Balance History</h2>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip 
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Balance']}
            />
            <Line 
              type="monotone" 
              dataKey="balance" 
              stroke="#1E3A8A" 
              strokeWidth={2}
              dot={{ fill: '#1E3A8A' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};