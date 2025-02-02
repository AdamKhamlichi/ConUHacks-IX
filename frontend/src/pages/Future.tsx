import { Header } from "@/components/Layout/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle, TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const Future = () => {
  const { toast } = useToast();
  const retirementGoal = 1200000;
  const currentSavings = 250000;
  const monthlyContribution = 1490;
  const yearsToRetirement = 25;

  // Mock data for AI predictions
  const monthlyIncome = 5000;
  const monthlyExpenses = 3500;
  const savingsRate = ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100;
  const predictedRetirementAge = 65;
  const predictedSavings = 1200000;
  
  const projectionData = [
    { year: 2024, conservative: 250000, optimistic: 250000 },
    { year: 2029, conservative: 400000, optimistic: 450000 },
    { year: 2034, conservative: 600000, optimistic: 700000 },
    { year: 2039, conservative: 800000, optimistic: 950000 },
    { year: 2044, conservative: 1000000, optimistic: 1200000 },
  ];

  const handleRefreshPrediction = () => {
    toast({
      title: "Predictions Updated",
      description: "AI has analyzed your latest financial data to update the retirement forecast.",
    });
  };

  const milestones = [
    { age: 35, goal: 100000, achieved: true },
    { age: 45, goal: 300000, achieved: false },
    { age: 55, goal: 600000, achieved: false },
    { age: 65, goal: 1000000, achieved: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-left mb-8">
            <h1 className="text-3xl font-semibold text-gray-900">Retirement Planning</h1>
            <p className="text-gray-500 mt-2">Plan and track your retirement goals</p>
          </div>

          {/* AI Prediction Section */}
          <Card className="p-6 mb-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-primary mb-2">AI Retirement Forecast</h2>
                <p className="text-gray-600">Based on your current financial patterns</p>
              </div>
              <Button onClick={handleRefreshPrediction} variant="outline" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                Refresh Prediction
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-emerald-500" />
                  <span className="font-medium">Monthly Savings Rate</span>
                </div>
                <p className="text-2xl font-bold text-primary">{savingsRate.toFixed(1)}%</p>
                <p className="text-sm text-gray-600">of monthly income</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-5 w-5 text-blue-500" />
                  <span className="font-medium">Predicted Retirement Age</span>
                </div>
                <p className="text-2xl font-bold text-primary">{predictedRetirementAge}</p>
                <p className="text-sm text-gray-600">based on current savings</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-emerald-500" />
                  <span className="font-medium">Predicted Savings</span>
                </div>
                <p className="text-2xl font-bold text-primary">${predictedSavings.toLocaleString()}</p>
                <p className="text-sm text-gray-600">at retirement age</p>
              </div>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={projectionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(value) => `$${(value / 1000)}k`} />
                  <Tooltip 
                    formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="conservative" 
                    stroke="#1E3A8A" 
                    name="Conservative Estimate"
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="optimistic" 
                    stroke="#059669" 
                    name="Optimistic Estimate"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-primary mb-4">Retirement Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Current Savings</span>
                    <span className="text-sm font-medium">${currentSavings.toLocaleString()}</span>
                  </div>
                  <Progress value={(currentSavings / retirementGoal) * 100} className="h-2" />
                </div>
                <p className="text-sm text-gray-600">
                  You're {((currentSavings / retirementGoal) * 100).toFixed(1)}% of the way to your retirement goal
                </p>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold text-primary mb-4">Monthly Contributions</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Current Monthly Savings</span>
                  <span className="text-xl font-bold text-primary">${monthlyContribution}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Years to Retirement</span>
                  <span className="text-xl font-bold text-primary">{yearsToRetirement}</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 lg:col-span-2">
              <h3 className="text-xl font-semibold text-primary mb-4">Retirement Milestones</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {milestones.map((milestone, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Age {milestone.age}</span>
                      <span className={`text-sm font-medium ${
                        milestone.achieved ? 'text-emerald-600' : 'text-gray-500'
                      }`}>
                        {milestone.achieved ? '✓ Achieved' : 'Upcoming'}
                      </span>
                    </div>
                    <p className="text-xl font-bold text-primary">
                      ${milestone.goal.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Future;