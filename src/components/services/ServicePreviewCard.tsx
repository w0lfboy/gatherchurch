import { Card, CardContent } from "@/components/ui/card";
import { Service } from "@/types/services";
import { ServiceTypeChip } from "./ServiceTypeChip";
import { StatusBadge } from "./StatusBadge";
import { cn } from "@/lib/utils";

interface ServicePreviewCardProps {
  service: Service;
  onClick: (service: Service) => void;
  className?: string;
}

export const ServicePreviewCard = ({
  service, 
  onClick,
  className 
}: ServicePreviewCardProps) => {
  const volunteerCount = service.volunteers.length;
  const confirmedCount = service.volunteers.filter(a => a.status === 'confirmed').length;
  const hasItems = service.items.length > 0;

  return (
    <Card 
      className={cn(
        "group border-0 shadow-card hover:shadow-elevated transition-all duration-300 cursor-pointer hover:-translate-y-1",
        className
      )}
      onClick={() => onClick(service)}
    >
      <CardContent className="p-4">
        {/* Date */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-sm font-display font-semibold text-foreground">
              {new Date(service.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </p>
            <p className="text-xs text-muted-foreground">
              {service.time}
            </p>
          </div>
          {service.serviceType && (
            <ServiceTypeChip 
              name={service.serviceType.name} 
              color={service.serviceType.color} 
              size="sm"
            />
          )}
        </div>

        {/* Status */}
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            {!hasItems && 'Not started'}
            {hasItems && volunteerCount === 0 && 'No team assigned'}
            {volunteerCount > 0 && `${confirmedCount}/${volunteerCount} scheduled`}
          </div>
          <StatusBadge status={service.status as any} showIcon={false} size="sm" />
        </div>
      </CardContent>
    </Card>
  );
};
