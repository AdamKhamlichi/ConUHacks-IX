import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Info, AlertCircle, ArrowUp } from "lucide-react";

export const FinancialHealthScore = () => {
  // Mock score - in a real app, this would be calculated based on user's financial data
  const score = 79;

  const detailedTips = [
    {
      tip: "Consider increasing your emergency fund",
      explanation: "An emergency fund should cover 3-6 months of expenses. This provides a financial buffer for unexpected costs like medical emergencies, car repairs, or job loss. Having this safety net prevents you from going into debt when emergencies arise.",
      icon: AlertCircle,
    },
    {
      tip: "Review your investment portfolio monthly",
      explanation: "Regular portfolio reviews help ensure your investments align with your goals and risk tolerance. This practice allows you to rebalance when needed and stay informed about your investment performance.",
      icon: ArrowUp,
    },
    {
      tip: "Track your spending patterns",
      explanation: "Understanding where your money goes is crucial for financial health. By tracking expenses, you can identify areas where you might be overspending and find opportunities to save more effectively.",
      icon: Info,
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="p-6 bg-white shadow-lg animate-fadeIn hover:shadow-xl transition-shadow cursor-pointer">
          <h2 className="text-2xl font-semibold text-primary mb-4">Financial Health Score</h2>
          <div className="space-y-4">
            <Progress value={score} className="h-4" />
            <p className="text-3xl font-bold text-primary">{score}/100</p>
            <p className="text-gray-600">
              Your financial health is good! Here are some tips to improve:
            </p>
            <ul className="text-sm text-gray-600 list-disc list-inside space-y-2">
              {detailedTips.map((tip) => (
                <li key={tip.tip}>{tip.tip}</li>
              ))}
            </ul>
          </div>
        </Card>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4">Detailed Financial Health Tips</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Progress value={score} className="h-4 flex-1" />
            <span className="font-bold text-xl">{score}/100</span>
          </div>
          
          <div className="space-y-6">
            {detailedTips.map((tip) => (
              <div key={tip.tip} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <tip.icon className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{tip.tip}</h3>
                    <p className="text-gray-600">{tip.explanation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};