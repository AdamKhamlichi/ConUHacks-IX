import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MyMoney from "./pages/MyMoney";
import Budgeting from "./pages/Budgeting";
import Goals from "./pages/Goals";
import Learn from "./pages/Learn";
import Invest from "./pages/Invest";
import Future from "./pages/Future";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/my-money" element={<MyMoney />} />
          <Route path="/budgeting" element={<Budgeting />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/education" element={<Learn />} />
          <Route path="/investments" element={<Invest />} />
          <Route path="/retirement" element={<Future />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;