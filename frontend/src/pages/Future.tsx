import { Header } from "@/components/Layout/Header";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Future = () => {
  const retirementGoal = 1000000;
  const currentSavings = 250000;
  const monthlyContribution = 1500;
  const yearsToRetirement = 25;

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