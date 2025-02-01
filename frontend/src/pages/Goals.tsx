import { Header } from "@/components/Layout/Header";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Goals = () => {
  const goals = [
    { name: "Emergency Fund", target: 10000, current: 6000, category: "Savings" },
    { name: "New Car", target: 25000, current: 5000, category: "Purchase" },
    { name: "House Down Payment", target: 50000, current: 15000, category: "Property" },
    { name: "Vacation", target: 5000, current: 2500, category: "Travel" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-left mb-8">
            <h1 className="text-3xl font-semibold text-gray-900">Financial Goals</h1>
            <p className="text-gray-500 mt-2">Track and manage your financial goals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {goals.map((goal, index) => (
              <Card key={index} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-primary">{goal.name}</h3>
                    <span className="text-sm text-gray-500">{goal.category}</span>
                  </div>
                  <span className="text-sm font-medium text-primary">
                    ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                  </span>
                </div>
                <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                <p className="text-sm text-gray-600 mt-2">
                  {((goal.current / goal.target) * 100).toFixed(1)}% complete
                </p>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Goals;