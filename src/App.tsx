import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Congregation from "./pages/Congregation";
import Services from "./pages/Services";
import Volunteers from "./pages/Volunteers";
import Giving from "./pages/Giving";
import Groups from "./pages/Groups";
import CheckIns from "./pages/CheckIns";
import Events from "./pages/Events";
import Communications from "./pages/Communications";
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/congregation" element={<Congregation />} />
          <Route path="/services" element={<Services />} />
          <Route path="/volunteers" element={<Volunteers />} />
          <Route path="/giving" element={<Giving />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/checkins" element={<CheckIns />} />
          <Route path="/events" element={<Events />} />
          <Route path="/communications" element={<Communications />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
