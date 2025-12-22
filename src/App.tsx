import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { TenantProvider } from "@/hooks/useTenant";
import { PermissionsProvider } from "@/hooks/usePermissions";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Demo from "./pages/Demo";
import Dashboard from "./pages/Dashboard";
import Congregation from "./pages/Congregation";
import Services from "./pages/Services";
import Volunteers from "./pages/Volunteers";
import Giving from "./pages/Giving";
import Groups from "./pages/Groups";
import CheckIns from "./pages/CheckIns";
import Events from "./pages/Events";
import Communications from "./pages/Communications";
import MobileApp from "./pages/MobileApp";
import Install from "./pages/Install";
import Settings from "./pages/Settings";
import PitchDeck from "./pages/PitchDeck";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TenantProvider>
        <PermissionsProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/demo" element={<Demo />} />
                <Route path="/trial" element={<Demo />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/congregation" element={<ProtectedRoute><Congregation /></ProtectedRoute>} />
              <Route path="/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
              <Route path="/volunteers" element={<ProtectedRoute><Volunteers /></ProtectedRoute>} />
              <Route path="/giving" element={<ProtectedRoute><Giving /></ProtectedRoute>} />
              <Route path="/groups" element={<ProtectedRoute><Groups /></ProtectedRoute>} />
              <Route path="/checkins" element={<ProtectedRoute><CheckIns /></ProtectedRoute>} />
              <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
              <Route path="/communications" element={<ProtectedRoute><Communications /></ProtectedRoute>} />
              <Route path="/messages" element={<ProtectedRoute><Communications /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="/app/*" element={<MobileApp />} />
              <Route path="/install" element={<Install />} />
              <Route path="/pitch" element={<PitchDeck />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
        </PermissionsProvider>
      </TenantProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
