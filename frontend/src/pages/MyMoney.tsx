import { AccountsSummary } from "@/components/Dashboard/AccountsSummary";
import { Header } from "@/components/Layout/Header";

const MyMoney = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-left mb-8">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">My Money Overview 💰</h1>
            <p className="text-gray-600">
              Here's a snapshot of all your accounts and their current balances.
            </p>
          </div>
          <AccountsSummary />
        </div>
      </main>
    </div>
  );
};

export default MyMoney;