import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Info, AlertCircle, ArrowUp, Wallet, PiggyBank, TrendingUp, CreditCard } from "lucide-react";

type MetricScore = {
  name: string;
  value: number;
  maxValue: number;
  status: 'low' | 'ok' | 'great';
  description: string;
};

export const FinancialHealthScore = () => {
  // Calculate metrics based on mock data
  const metrics: MetricScore[] = [
    {
      name: "Credit Score",
      value: 620,
      maxValue: 850,
      status: "low",
      description: "Based on your credit report and payment history"
    },
    {
      name: "Emergency Fund",
      value: 2900,
      maxValue: 10000,
      status: "ok",
      description: "Recommended: 3-6 months of expenses"
    },
    {
      name: "Retirement Savings",
      value: 45000,
      maxValue: 50000,
      status: "great",
      description: "On track for retirement goals"
    },
    {
      name: "Debt-to-Income Ratio",
      value: 45,
      maxValue: 100,
      status: "ok",
      description: "Percentage of monthly income going to debt payments"
    },
    {
      name: "Savings Rate",
      value: 15,
      maxValue: 20,
      status: "ok",
      description: "Percentage of income being saved"
    }
  ];

  // Calculate overall score based on individual metrics
  const score = Math.round(
    metrics.reduce((acc, metric) => {
      const metricScore = (metric.value / metric.maxValue) * 100;
      return acc + metricScore;
    }, 0) / metrics.length
  );

  const getStatusColor = (status: MetricScore['status']) => {
    switch (status) {
      case 'low':
        return 'text-[#ea384c]';
      case 'ok':
        return 'text-[#0EA5E9]';
      case 'great':
        return 'text-emerald-500';
      default:
        return 'text-gray-600';
    }
  };

  const getProgressColor = (status: MetricScore['status']) => {
    switch (status) {
      case 'low':
        return 'bg-[#ea384c]';
      case 'ok':
        return 'bg-[#0EA5E9]';
      case 'great':
        return 'bg-emerald-500';
      default:
        return 'bg-gray-600';
    }
  };

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
              Your financial health is {score >= 80 ? 'great!' : score >= 60 ? 'good!' : 'needs attention.'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {metrics.slice(0, 4).map((metric) => (
                <div key={metric.name} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getProgressColor(metric.status)}`} />
                  <span className="text-sm text-gray-600">{metric.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4">Financial Health Analysis</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Progress value={score} className="h-4 flex-1" />
            <span className="font-bold text-xl">{score}/100</span>
          </div>
          
          <div className="space-y-6">
            {metrics.map((metric) => (
              <div key={metric.name} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-start gap-2 flex-1">
                    <h3 className="font-semibold text-lg">{metric.name}</h3>
                    <Progress 
                      value={(metric.value / metric.maxValue) * 100} 
                      className={`h-2 w-full ${getProgressColor(metric.status)}`}
                    />
                    <div className="flex justify-between w-full">
                      <span className={`text-sm font-medium ${getStatusColor(metric.status)}`}>
                        {metric.value} / {metric.maxValue}
                      </span>
                      <span className={`text-sm font-medium ${getStatusColor(metric.status)}`}>
                        {metric.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{metric.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Recommendations</h3>
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