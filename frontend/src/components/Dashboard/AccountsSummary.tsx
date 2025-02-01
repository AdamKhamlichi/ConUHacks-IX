import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FinancialOverview } from "./FinancialOverview";

// Mock data for accounts
const accounts = [
  { type: "Checking", balance: 2500, accountNumber: "**** 1234", trend: "+2.3%" },
  { type: "Savings", balance: 15000, accountNumber: "**** 5678", trend: "+1.8%" },
  { type: "Investment", balance: 45000, accountNumber: "**** 9012", trend: "+5.4%" },
  { type: "Credit Card", balance: -1200, accountNumber: "**** 3456", trend: "N/A" }
];

export const AccountsSummary = () => {
  const [selectedAccount, setSelectedAccount] = useState<(typeof accounts)[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAccountClick = (account: (typeof accounts)[0]) => {
    setSelectedAccount(account);
    setIsDialogOpen(true);
  };

  return (
    <>
      <Card className="p-6 w-full bg-white shadow-lg animate-fadeIn">
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
                  ${Math.abs(account.balance).toLocaleString()}
                </span>
                <span className="text-xs text-gray-500">{account.accountNumber}</span>
              </div>
            </div>
          ))}
        </div>
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
    </>
  );
};