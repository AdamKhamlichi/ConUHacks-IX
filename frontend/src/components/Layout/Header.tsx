import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-4">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
              <span className="text-3xl">🐬</span> Finn
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/my-money" className="text-gray-600 hover:text-primary transition-colors">
              My Money
            </Link>
            <Link to="/budgeting" className="text-gray-600 hover:text-primary transition-colors">
              Budget
            </Link>
            <Link to="/goals" className="text-gray-600 hover:text-primary transition-colors">
              Goals
            </Link>
            <Link to="/education" className="text-gray-600 hover:text-primary transition-colors">
              Learn
            </Link>
            <Link to="/investments" className="text-gray-600 hover:text-primary transition-colors">
              Invest
            </Link>
            <Link to="/retirement" className="text-gray-600 hover:text-primary transition-colors">
              Future
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};