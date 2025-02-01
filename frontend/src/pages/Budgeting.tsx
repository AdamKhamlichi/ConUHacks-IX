import { BudgetOverview } from "@/components/Dashboard/BudgetOverview";
import { Header } from "@/components/Layout/Header";

const Budgeting = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <div className="text-left mb-8">
            <h1 className="text-3xl font-semibold text-gray-900">Budget Management</h1>
            <p className="text-gray-500 mt-2">Track and manage your monthly expenses</p>
          </div>

          {/* Budget Content */}
          <div className="grid grid-cols-1 gap-8">
            <BudgetOverview />
            
            {/* Monthly Spending Limit Section */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-primary mb-4">Monthly Spending Limits</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <p className="text-sm text-gray-600">Essential Expenses</p>
                  <p className="text-2xl font-bold text-primary mt-2">$2,500</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <p className="text-sm text-gray-600">Discretionary Spending</p>
                  <p className="text-2xl font-bold text-secondary mt-2">$800</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <p className="text-sm text-gray-600">Savings Goal</p>
                  <p className="text-2xl font-bold text-accent mt-2">$1,000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Budgeting;