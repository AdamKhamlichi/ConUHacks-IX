import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FinancialOverview } from "./FinancialOverview";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data for accounts
const accounts = [
  { type: "Checking", balance: 2500, accountNumber: "**** 1234", trend: "+2.3%" },
  { type: "Savings", balance: 15000, accountNumber: "**** 5678", trend: "+1.8%" },
  { type: "Investment", balance: 45000, accountNumber: "**** 9012", trend: "+5.4%" },
  { type: "Credit Card", balance: -1200, accountNumber: "**** 3456", trend: "N/A" }
];

// Mock data for transactions
const transactions = [
  { id: 1, type: "income", description: "Salary Deposit", amount: 3000, date: "2024-02-01" },
  { id: 2, type: "expense", description: "Rent Payment", amount: -1500, date: "2024-02-01" },
  { id: 3, type: "expense", description: "Grocery Shopping", amount: -200, date: "2024-01-31" },
  { id: 4, type: "income", description: "Freelance Work", amount: 500, date: "2024-01-30" },
  { id: 5, type: "expense", description: "Utilities", amount: -150, date: "2024-01-29" },
  { id: 6, type: "expense", description: "Internet Bill", amount: -80, date: "2024-01-28" },
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const AnimatedNumber = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    const duration = 1000; // Animation duration in milliseconds
    const steps = 30; // Number of steps in the animation
    const stepDuration = duration / steps;
    const increment = value / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep === steps) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue((prev) => Math.min(prev + increment, value));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value]);

  return <>${Math.floor(displayValue).toLocaleString()}</>;
};

export const AccountsSummary = () => {
  const [selectedAccount, setSelectedAccount] = useState<(typeof accounts)[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAccountClick = (account: (typeof accounts)[0]) => {
    setSelectedAccount(account);
    setIsDialogOpen(true);
  };

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  return (
    <div className="space-y-6">
      {/* Total Balance Card */}
      <Card className="p-6 bg-white shadow-lg">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-600 mb-2">Total Balance</h3>
          <p className="text-4xl font-bold text-primary">
            <AnimatedNumber value={totalBalance} />
          </p>
        </div>
      </Card>

      {/* Accounts Summary Card */}
      <Card className="p-6 bg-white shadow-lg animate-fadeIn">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-primary">Accounts Summary</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {accounts.map((account) => (
            <div 
              key={account.accountNumber}
              className="p-4 rounded-lg border border-gray-200 hover:border-primary transition-colors cursor-pointer hover:shadow-md"
              onClick={() => handleAccountClick(account)}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium text-gray-600">{account.type}</span>
                <span className={`text-xs font-medium ${
                  account.trend === 'N/A' 
                    ? 'text-gray-500' 
                    : 'text-emerald-600'
                }`}>
                  {account.trend}
                </span>
              </div>
              <div className="flex justify-between items-end">
                <span className={`text-xl font-bold ${
                  account.balance < 0 ? 'text-red-600' : 'text-gray-900'
                }`}>
                  <AnimatedNumber value={Math.abs(account.balance)} />
                </span>
                <span className="text-xs text-gray-500">{account.accountNumber}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Transaction Log Card */}
      <Card className="p-6 bg-white shadow-lg">
        <h2 className="text-2xl font-semibold text-primary mb-4">Recent Transactions</h2>
        <ScrollArea className="h-[300px] w-full rounded-md">
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex flex-col">
                  <span className="font-medium">{transaction.description}</span>
                  <span className="text-sm text-gray-500">{transaction.date}</span>
                </div>
                <span className={`font-mono font-medium ${
                  transaction.amount > 0 ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {transaction.amount > 0 ? '+' : ''}<AnimatedNumber value={Math.abs(transaction.amount)} />
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {selectedAccount?.type} Account History - {selectedAccount?.accountNumber}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <FinancialOverview accountType={selectedAccount?.type} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};