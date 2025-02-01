import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const FinancialHealthScore = () => {
  // Mock score - in a real app, this would be calculated based on user's financial data
  const score = 75;

  return (
    <Card className="p-6 bg-white shadow-lg animate-fadeIn">
      <h2 className="text-2xl font-semibold text-primary mb-4">Financial Health Score</h2>
      <div className="space-y-4">
        <Progress value={score} className="h-4" />
        <p className="text-3xl font-bold text-primary">{score}/100</p>
        <p className="text-gray-600">
          Your financial health is good! Here are some tips to improve:
        </p>
        <ul className="text-sm text-gray-600 list-disc list-inside space-y-2">
          <li>Consider increasing your emergency fund</li>
          <li>Review your investment portfolio monthly</li>
          <li>Track your spending patterns</li>
        </ul>
      </div>
    </Card>
  );
};