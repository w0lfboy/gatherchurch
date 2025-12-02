import { useState } from 'react';
import { Service } from '@/types/services';
import { mockServices, formatDurationLong } from '@/data/mockServicesData';
import { cn } from '@/lib/utils';
import { 
  Calendar, Clock, Users, ChevronRight, Plus, 
  Link2, Search, Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ServicesListProps {
  onSelectService: (service: Service) => void;
}

export const ServicesList = ({ onSelectService }: ServicesListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'list' | 'calendar'>('list');

  // Group services by date
  const servicesByDate = mockServices.reduce((acc, service) => {
    if (!acc[service.date]) {
      acc[service.date] = [];
    }
    acc[service.date].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  const getStatusColor = (status: Service['status']) => {
    switch (status) {
      case 'draft': return 'bg-muted text-muted-foreground';
      case 'planning': return 'bg-gold/20 text-gold';
      case 'confirmed': return 'bg-sage-light text-sage-dark';
      case 'completed': return 'bg-secondary text-secondary-foreground';
    }
  };

  const getTotalDuration = (service: Service) => {
    return service.items.reduce((acc, item) => acc + item.duration, 0);
  };

  const getConfirmedCount = (service: Service) => {
    return service.volunteers.filter(v => v.status === 'confirmed').length;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-display font-semibold text-foreground">
              Services
            </h1>
            <p className="text-muted-foreground">Plan and manage your worship services</p>
          </div>
          <Button variant="default">
            <Plus className="w-4 h-4 mr-2" />
            New Service
          </Button>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-secondary border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* View toggle */}
          <div className="flex items-center bg-secondary rounded-xl p-1">
            <button
              onClick={() => setView('list')}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                view === 'list'
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              List
            </button>
            <button
              onClick={() => setView('calendar')}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                view === 'calendar'
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Calendar
            </button>
          </div>
        </div>
      </div>

      {/* Services list */}
      <div className="flex-1 overflow-auto p-6">
        {Object.entries(servicesByDate)
          .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
          .map(([date, services]) => (
            <div key={date} className="mb-8">
              {/* Date header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-sage-light flex flex-col items-center justify-center">
                  <span className="text-xs text-sage-dark font-medium">
                    {new Date(date).toLocaleDateString('en-US', { month: 'short' })}
                  </span>
                  <span className="text-lg font-display font-semibold text-sage-dark">
                    {new Date(date).getDate()}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {new Date(date).toLocaleDateString('en-US', { weekday: 'long' })}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {services.length} service{services.length > 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              {/* Service cards */}
              <div className="space-y-3 ml-15">
                {services.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => onSelectService(service)}
                    className="p-4 rounded-2xl bg-card border border-border hover:shadow-card transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-medium text-foreground">{service.time}</span>
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-xs font-medium",
                          getStatusColor(service.status)
                        )}>
                          {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                        </span>
                        {service.linkedServiceId && (
                          <span className="flex items-center gap-1 text-xs text-primary">
                            <Link2 className="w-3 h-3" />
                            Linked
                          </span>
                        )}
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <p className="font-display font-semibold text-foreground mb-1">
                      {service.name}
                    </p>
                    {service.notes && (
                      <p className="text-sm text-muted-foreground mb-3">{service.notes}</p>
                    )}

                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {formatDurationLong(getTotalDuration(service))}
                      </span>
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        {getConfirmedCount(service)}/{service.volunteers.length} confirmed
                      </span>
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {service.items.filter(i => i.type === 'song').length} songs
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
