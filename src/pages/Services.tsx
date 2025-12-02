import { useState } from "react";
import { Service } from "@/types/services";
import { mockServices } from "@/data/mockServicesData";
import { ServicesList } from "@/components/services/ServicesList";
import { ServiceBuilder } from "@/components/services/ServiceBuilder";
import { RehearsalMode } from "@/components/services/RehearsalMode";
import { 
  LayoutDashboard, Users, Calendar, Heart, 
  MessageSquare, CheckCircle, Settings, UserCheck
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Services", icon: Calendar, href: "/services", active: true },
  { name: "People", icon: Users, href: "/people" },
  { name: "Volunteers", icon: UserCheck, href: "/volunteers" },
  { name: "Groups", icon: Users, href: "/groups" },
  { name: "Giving", icon: Heart, href: "/giving" },
  { name: "Check-Ins", icon: CheckCircle, href: "/checkins" },
  { name: "Messages", icon: MessageSquare, href: "/messages" },
];

const Services = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showRehearsal, setShowRehearsal] = useState(false);

  const linkedService = selectedService?.linkedServiceId
    ? mockServices.find(s => s.id === selectedService.linkedServiceId)
    : mockServices.find(s => s.linkedServiceId === selectedService?.id);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col flex-shrink-0">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-lg">G</span>
            </div>
            <span className="font-display font-semibold text-xl text-foreground">Gather</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                item.active
                  ? "bg-sage-light text-sage-dark"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="p-4 border-t border-border space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-all duration-200">
            <Settings className="w-5 h-5" />
            Settings
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {selectedService ? (
          <ServiceBuilder 
            service={selectedService} 
            linkedService={linkedService}
            onBack={() => setSelectedService(null)}
          />
        ) : (
          <ServicesList onSelectService={setSelectedService} />
        )}
      </div>

      {/* Rehearsal mode overlay */}
      {showRehearsal && selectedService && (
        <RehearsalMode 
          service={selectedService} 
          onClose={() => setShowRehearsal(false)} 
        />
      )}
    </div>
  );
};

export default Services;
