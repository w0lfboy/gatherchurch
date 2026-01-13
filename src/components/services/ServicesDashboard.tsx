import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Service, ServiceType } from "@/types/services";
import { mockServices, mockServiceTypes, mockServicesStats } from "@/data/mockServicesData";
import { QuickStatsPanel } from "./QuickStatsPanel";
import { UpcomingServiceCard } from "./UpcomingServiceCard";
import { ServicePreviewCard } from "./ServicePreviewCard";
import { Plus, Calendar, ListFilter, ChevronRight } from "lucide-react";

interface ServicesDashboardProps {
  onSelectService: (service: Service) => void;
  onNavigate?: (view: string) => void;
}

export const ServicesDashboard = ({ onSelectService, onNavigate }: ServicesDashboardProps) => {
  
  // Sort services by date
  const sortedServices = [...mockServices].sort(
    (a, b) => new Date(a.serviceDate).getTime() - new Date(b.serviceDate).getTime()
  );
  
  // Get next service (this week or upcoming)
  const nextService = sortedServices.find(
    s => new Date(s.serviceDate) >= new Date()
  );
  
  // Get upcoming services (excluding the featured one)
  const upcomingServices = sortedServices
    .filter(s => s.id !== nextService?.id && new Date(s.serviceDate) >= new Date())
    .slice(0, 4);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-semibold text-foreground">
            Services
          </h1>
          <p className="text-muted-foreground mt-1">
            Plan worship, schedule teams, and prepare for Sunday
          </p>
        </div>
        <Button className="gap-2 shadow-card hover:shadow-elevated transition-all">
          <Plus className="h-4 w-4" />
          New Service
        </Button>
      </div>

      {/* Quick Stats */}
      <QuickStatsPanel stats={mockServicesStats} />

      {/* Featured Service */}
      {nextService && (
        <div>
          <UpcomingServiceCard 
            service={nextService} 
            onEdit={onSelectService}
            featured
          />
        </div>
      )}

      {/* Upcoming Services Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-display font-semibold text-foreground">
            Upcoming
          </h2>
          <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-foreground">
            View All
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {upcomingServices.map((service) => (
            <ServicePreviewCard
              key={service.id}
              service={service}
              onClick={onSelectService}
            />
          ))}
        </div>
      </div>

      {/* Bottom Section: Service Types & Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Types */}
        <Card className="border-0 shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-display">Service Types</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {mockServiceTypes.map((type) => (
              <div 
                key={type.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: type.color }}
                  />
                  <span className="font-medium text-foreground">{type.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {type.defaultStartTime && `${type.defaultStartTime}`}
                </span>
              </div>
            ))}
            <Button variant="ghost" size="sm" className="w-full mt-2 gap-2">
              <Plus className="h-4 w-4" />
              Add Type
            </Button>
          </CardContent>
        </Card>

        {/* Quick Navigation */}
        <Card className="border-0 shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-display">Quick Access</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-3 h-auto py-3"
              onClick={() => onNavigate?.('songs')}
            >
              <div className="p-2 rounded-lg bg-gold/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-medium">Song Library</p>
                <p className="text-sm text-muted-foreground">234 songs</p>
              </div>
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-3 h-auto py-3"
              onClick={() => onNavigate?.('matrix')}
            >
              <div className="p-2 rounded-lg bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-medium">Schedule Matrix</p>
                <p className="text-sm text-muted-foreground">View all assignments</p>
              </div>
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-3 h-auto py-3"
              onClick={() => onNavigate?.('my-schedule')}
            >
              <div className="p-2 rounded-lg bg-accent/10">
                <ListFilter className="h-5 w-5 text-accent" />
              </div>
              <div className="text-left">
                <p className="font-medium">My Schedule</p>
                <p className="text-sm text-muted-foreground">Your upcoming assignments</p>
              </div>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
