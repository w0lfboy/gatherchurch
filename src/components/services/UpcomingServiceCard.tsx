import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Service } from "@/types/services";
import { formatServiceDate } from "@/data/mockServicesData";
import { ServiceTypeChip } from "./ServiceTypeChip";
import { StatusBadge } from "./StatusBadge";
import { Music, Users, ListChecks, Edit3, Eye, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface UpcomingServiceCardProps {
  service: Service;
  onEdit: (service: Service) => void;
  featured?: boolean;
  className?: string;
}

export const UpcomingServiceCard = ({ 
  service, 
  onEdit,
  featured = false,
  className 
}: UpcomingServiceCardProps) => {
  const songCount = service.items.filter(item => item.type === 'song').length;
  const volunteerCount = service.volunteers.length;
  const confirmedCount = service.volunteers.filter(a => a.status === 'confirmed').length;
  const isReady = volunteerCount > 0 && confirmedCount >= volunteerCount * 0.7;

  return (
    <Card 
      className={cn(
        "group border-0 shadow-card hover:shadow-elevated transition-all duration-300 cursor-pointer overflow-hidden",
        featured && "bg-gradient-to-br from-sage-light/50 via-card to-cream",
        className
      )}
      onClick={() => onEdit(service)}
    >
      {featured && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-gold" />
      )}
      
      <CardContent className={cn("p-6", featured && "pt-7")}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            {featured && (
              <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                This Sunday
              </p>
            )}
            <p className="text-lg font-display font-semibold text-foreground">
              {formatServiceDate(service.date)}
            </p>
            <p className="text-sm text-muted-foreground">
              {service.time}
              {service.endTime && ` – ${service.endTime}`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {service.serviceType && (
              <ServiceTypeChip 
                name={service.serviceType.name} 
                color={service.serviceType.color} 
              />
            )}
            <StatusBadge status={service.status as any} />
          </div>
        </div>

        {/* Series Info */}
        {service.seriesName && (
          <div className="mb-4 p-3 rounded-lg bg-muted/50">
            <p className="text-sm font-medium text-foreground">
              "{service.seriesName}" Series
              {service.seriesWeek && ` • Week ${service.seriesWeek}`}
            </p>
          </div>
        )}

        {/* Quick Stats */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/50">
            <Music className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{songCount} songs</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/50">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{confirmedCount}/{volunteerCount} team</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/50">
            <ListChecks className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{service.items.filter(i => i.type !== 'header').length} items</span>
          </div>
          {isReady && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sage-light text-sage-dark">
              <span className="text-sm font-medium">Ready ✓</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-border/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-1.5"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(service);
            }}
          >
            <Edit3 className="h-4 w-4" />
            Edit Plan
          </Button>
          <Button variant="ghost" size="sm" className="gap-1.5">
            <Eye className="h-4 w-4" />
            View Team
          </Button>
          <Button variant="ghost" size="sm" className="gap-1.5">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
