import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Users, Music, TrendingUp } from "lucide-react";
import { ServicesStats } from "@/types/services";
import { cn } from "@/lib/utils";

interface QuickStatsPanelProps {
  stats: ServicesStats;
  className?: string;
}

export const QuickStatsPanel = ({ stats, className }: QuickStatsPanelProps) => {
  const items = [
    {
      label: 'Services Planned',
      value: stats.totalServicesPlanned,
      icon: CalendarDays,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'Active Volunteers',
      value: stats.activeVolunteers,
      icon: Users,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      label: 'Songs in Library',
      value: stats.songsInLibrary,
      icon: Music,
      color: 'text-gold',
      bgColor: 'bg-gold/10',
    },
    {
      label: 'Accept Rate',
      value: `${stats.acceptRate}%`,
      icon: TrendingUp,
      color: 'text-sage',
      bgColor: 'bg-sage-light',
    },
  ];

  return (
    <div className={cn("grid grid-cols-2 lg:grid-cols-4 gap-4", className)}>
      {items.map((item) => (
        <Card 
          key={item.label} 
          className="border-0 shadow-card hover:shadow-elevated transition-all duration-300"
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={cn("p-2.5 rounded-xl", item.bgColor)}>
                <item.icon className={cn("h-5 w-5", item.color)} />
              </div>
              <div>
                <p className="text-2xl font-display font-semibold text-foreground">
                  {item.value}
                </p>
                <p className="text-xs text-muted-foreground">
                  {item.label}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
