import { useState } from 'react';
import { Service, ServiceItem } from '@/types/services';
import { mockSongs, formatDurationLong } from '@/data/mockServicesData';
import { ServiceItemCard } from './ServiceItemCard';
import { cn } from '@/lib/utils';
import { 
  Plus, Clock, Link2, Link2Off, Users, Music, 
  ChevronDown, Play, FileText, Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ServiceBuilderProps {
  service: Service;
  linkedService?: Service;
  onBack: () => void;
}

export const ServiceBuilder = ({ service, linkedService, onBack }: ServiceBuilderProps) => {
  const [items, setItems] = useState<ServiceItem[]>(service.items);
  const [isLinked, setIsLinked] = useState(service.isLinked);
  const [activeTab, setActiveTab] = useState<'order' | 'team' | 'songs'>('order');

  const totalDuration = items.reduce((acc, item) => acc + item.duration, 0);

  const getStatusColor = (status: Service['status']) => {
    switch (status) {
      case 'draft': return 'bg-muted text-muted-foreground';
      case 'planning': return 'bg-gold/20 text-gold';
      case 'confirmed': return 'bg-sage-light text-sage-dark';
      case 'completed': return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border bg-card">
        <div className="flex items-start justify-between mb-4">
          <div>
            <button 
              onClick={onBack}
              className="text-sm text-muted-foreground hover:text-foreground mb-2 flex items-center gap-1"
            >
              ← Back to Services
            </button>
            <h1 className="text-2xl font-display font-semibold text-foreground">
              {service.name}
            </h1>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-muted-foreground">
                {new Date(service.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })} • {service.time}
              </span>
              <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", getStatusColor(service.status))}>
                {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="soft" size="sm">
              <Play className="w-4 h-4 mr-2" />
              Rehearsal Mode
            </Button>
          </div>
        </div>

        {/* Linked service indicator */}
        {linkedService && (
          <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 mb-4">
            <Link2 className="w-4 h-4 text-primary" />
            <span className="text-sm">
              Linked with <strong>{linkedService.time}</strong> service
            </span>
            <button 
              onClick={() => setIsLinked(!isLinked)}
              className="ml-auto text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              {isLinked ? <Link2Off className="w-3 h-3" /> : <Link2 className="w-3 h-3" />}
              {isLinked ? 'Unlink' : 'Link'}
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-secondary rounded-xl p-1">
          <button
            onClick={() => setActiveTab('order')}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              activeTab === 'order'
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <FileText className="w-4 h-4" />
            Service Order
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              activeTab === 'team'
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Users className="w-4 h-4" />
            Team ({service.volunteers.length})
          </button>
          <button
            onClick={() => setActiveTab('songs')}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              activeTab === 'songs'
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Music className="w-4 h-4" />
            Song Library
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {activeTab === 'order' && (
          <div className="max-w-3xl">
            {/* Timing summary */}
            <div className="flex items-center justify-between mb-6 p-4 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sage-light flex items-center justify-center">
                  <Clock className="w-5 h-5 text-sage-dark" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Duration</p>
                  <p className="text-xl font-display font-semibold text-foreground">
                    {formatDurationLong(totalDuration)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Service ends at</p>
                <p className="text-lg font-medium text-foreground">
                  {calculateEndTime(service.time, totalDuration)}
                </p>
              </div>
            </div>

            {/* Service items */}
            <div className="space-y-2">
              {items.map((item, index) => (
                <div key={item.id} className="flex items-center gap-3">
                  <span className="w-12 text-right text-sm text-muted-foreground font-medium">
                    {calculateItemTime(service.time, items, index)}
                  </span>
                  <ServiceItemCard item={item} />
                </div>
              ))}

              {/* Add item button */}
              <div className="flex items-center gap-3">
                <span className="w-12" />
                <button className="w-full p-3 rounded-xl border border-dashed border-border text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add item
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="max-w-3xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-display font-semibold text-foreground">
                Service Team
              </h2>
              <Button variant="soft" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add volunteer
              </Button>
            </div>

            <div className="space-y-3">
              {service.volunteers.map((volunteer) => (
                <div 
                  key={volunteer.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sage-light to-coral-light flex items-center justify-center">
                    <span className="text-sm font-semibold text-sage-dark">
                      {volunteer.personName.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{volunteer.personName}</p>
                    <p className="text-sm text-muted-foreground">{volunteer.role}</p>
                  </div>
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    volunteer.status === 'confirmed' ? 'bg-sage-light text-sage-dark' :
                    volunteer.status === 'pending' ? 'bg-gold/20 text-gold' :
                    'bg-coral-light text-coral'
                  )}>
                    {volunteer.status.charAt(0).toUpperCase() + volunteer.status.slice(1)}
                  </span>
                </div>
              ))}

              {service.volunteers.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No volunteers scheduled yet</p>
                  <p className="text-sm">Add team members to this service</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'songs' && (
          <div className="max-w-4xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-display font-semibold text-foreground">
                Song Library
              </h2>
              <Button variant="soft" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add song
              </Button>
            </div>

            <div className="grid gap-3">
              {mockSongs.map((song) => (
                <div 
                  key={song.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:shadow-card transition-shadow cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-sage-light flex items-center justify-center">
                    <Music className="w-6 h-6 text-sage-dark" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground">{song.title}</p>
                    <p className="text-sm text-muted-foreground">{song.artist}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">Key: {song.defaultKey}</p>
                    <p className="text-xs text-muted-foreground">{song.defaultTempo} BPM</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      Used {song.timesUsed}x
                    </p>
                    {song.lastUsed && (
                      <p className="text-xs text-muted-foreground">
                        Last: {new Date(song.lastUsed).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <button className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors">
                    Add to service
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function calculateEndTime(startTime: string, totalSeconds: number): string {
  const [time, period] = startTime.split(' ');
  const [hours, minutes] = time.split(':').map(Number);
  let hour24 = hours;
  if (period === 'PM' && hours !== 12) hour24 += 12;
  if (period === 'AM' && hours === 12) hour24 = 0;
  
  const totalMinutes = hour24 * 60 + minutes + Math.floor(totalSeconds / 60);
  const endHour = Math.floor(totalMinutes / 60) % 24;
  const endMinute = totalMinutes % 60;
  
  const endPeriod = endHour >= 12 ? 'PM' : 'AM';
  const displayHour = endHour % 12 || 12;
  
  return `${displayHour}:${endMinute.toString().padStart(2, '0')} ${endPeriod}`;
}

function calculateItemTime(startTime: string, items: ServiceItem[], index: number): string {
  const [time, period] = startTime.split(' ');
  const [hours, minutes] = time.split(':').map(Number);
  let hour24 = hours;
  if (period === 'PM' && hours !== 12) hour24 += 12;
  if (period === 'AM' && hours === 12) hour24 = 0;
  
  const elapsedSeconds = items.slice(0, index).reduce((acc, item) => acc + item.duration, 0);
  const totalMinutes = hour24 * 60 + minutes + Math.floor(elapsedSeconds / 60);
  const itemHour = Math.floor(totalMinutes / 60) % 24;
  const itemMinute = totalMinutes % 60;
  
  const displayHour = itemHour % 12 || 12;
  
  return `${displayHour}:${itemMinute.toString().padStart(2, '0')}`;
}
