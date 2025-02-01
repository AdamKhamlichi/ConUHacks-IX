import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle } from "lucide-react";

const categories = [
  { name: "Housing", spent: 1200, budget: 1500, color: "bg-blue-500" },
  { name: "Food", spent: 400, budget: 500, color: "bg-green-500" },
  { name: "Transportation", spent: 300, budget: 400, color: "bg-yellow-500" },
  { name: "Entertainment", spent: 200, budget: 150, color: "bg-red-500" },
];

export const BudgetOverview = () => {
  return (
    <Card className="p-6 bg-white shadow-lg animate-fadeIn">
      <h2 className="text-2xl font-semibold text-primary mb-4">Monthly Budget Overview</h2>
      <div className="space-y-4">
        {categories.map((category) => {
          const percentage = (category.spent / category.budget) * 100;
          const isOverBudget = percentage > 100;

          return (
            <div key={category.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{category.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm">
                    ${category.spent} / ${category.budget}
                  </span>
                  {isOverBudget && (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </div>
              <Progress 
                value={Math.min(percentage, 100)} 
                className={`h-2 ${isOverBudget ? 'bg-red-200' : 'bg-gray-200'}`} 
              />
            </div>
          );
        })}
      </div>
    </Card>
  );
};