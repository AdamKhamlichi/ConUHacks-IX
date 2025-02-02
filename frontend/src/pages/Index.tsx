import { AIChat } from "@/components/Chat/AIChat";
import { FinancialOverview } from "@/components/Dashboard/FinancialOverview";
import { FinancialHealthScore } from "@/components/Dashboard/FinancialHealthScore";
import { BudgetOverview } from "@/components/Dashboard/BudgetOverview";
import { AccountsSummary } from "@/components/Dashboard/AccountsSummary";
import { EducationalResources } from "@/components/Resources/EducationalResources";
import { Header } from "@/components/Layout/Header";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Message */}
          <div className="text-left mb-8">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">Hey there Admin!👋</h1>
            <p className="text-sm font-medium text-gray-500">
              Last seen: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
            </p>
          </div>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Financial Overview */}
            <div className="lg:col-span-2 space-y-8">
              <AccountsSummary />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FinancialOverview />
                <FinancialHealthScore />
              </div>
              <BudgetOverview />
            </div>

            {/* Right Column - AI Chat and Resources */}
            <div className="space-y-8">
              <AIChat />
              <EducationalResources />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
