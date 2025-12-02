import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Heart, 
  Users, 
  Calendar, 
  ChevronRight,
  BookOpen,
  Clock
} from 'lucide-react';
import { mockSermons } from '@/data/mockMobileData';
import { mockGroups } from '@/data/mockGroupsData';
import { mockEvents } from '@/data/mockEventsData';
import { format, parseISO, isThisWeek } from 'date-fns';

export function MemberHome() {
  const latestSermon = mockSermons[0];
  const myGroups = mockGroups.slice(0, 2);
  const upcomingEvents = mockEvents
    .filter(e => isThisWeek(parseISO(e.startDate)))
    .slice(0, 3);

  return (
    <div className="space-y-6 pb-4">
      {/* Welcome Section */}
      <div className="px-4">
        <h1 className="text-2xl font-display font-semibold text-foreground">
          Welcome back, Sarah
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Grace Community Church
        </p>
      </div>

      {/* Quick Actions */}
      <div className="px-4">
        <div className="grid grid-cols-4 gap-3">
          <QuickAction href="/app/give" icon={Heart} label="Give" color="bg-coral-light text-coral" />
          <QuickAction href="/app/sermons" icon={BookOpen} label="Sermons" color="bg-sage-light text-sage-dark" />
          <QuickAction href="/app/groups" icon={Users} label="Groups" color="bg-blue-100 text-blue-600" />
          <QuickAction href="/app/events" icon={Calendar} label="Events" color="bg-purple-100 text-purple-600" />
        </div>
      </div>

      {/* Latest Sermon */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-foreground">Latest Message</h2>
          <Link to="/app/sermons" className="text-sm text-primary font-medium flex items-center">
            See all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <Card className="overflow-hidden">
          <div className="relative aspect-video bg-muted">
            {latestSermon.thumbnail && (
              <img 
                src={latestSermon.thumbnail} 
                alt={latestSermon.title}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <Button size="lg" className="rounded-full w-14 h-14">
                <Play className="w-6 h-6 ml-1" />
              </Button>
            </div>
            <Badge className="absolute bottom-2 right-2 bg-black/70">
              <Clock className="w-3 h-3 mr-1" />
              {latestSermon.duration}
            </Badge>
          </div>
          <CardContent className="p-4">
            <div className="text-xs text-primary font-medium mb-1">
              {latestSermon.seriesName}
            </div>
            <h3 className="font-semibold text-foreground">{latestSermon.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {latestSermon.speaker} • {format(parseISO(latestSermon.date), 'MMM d, yyyy')}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* My Groups */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-foreground">My Groups</h2>
          <Link to="/app/groups" className="text-sm text-primary font-medium flex items-center">
            See all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="space-y-3">
          {myGroups.map(group => (
            <Link key={group.id} to={`/app/groups/${group.id}`}>
              <Card className="hover:bg-secondary/50 transition-colors">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-sage-light flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-sage-dark" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground truncate">{group.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {group.currentMembers} members • {group.meetingDay}s
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-foreground">This Week</h2>
          <Link to="/app/events" className="text-sm text-primary font-medium flex items-center">
            See all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="space-y-3">
          {upcomingEvents.map(event => (
            <Card key={event.id} className="hover:bg-secondary/50 transition-colors">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-primary/10 flex-shrink-0">
                  <span className="text-[10px] font-medium text-primary uppercase">
                    {format(parseISO(event.startDate), 'MMM')}
                  </span>
                  <span className="text-lg font-bold text-primary leading-none">
                    {format(parseISO(event.startDate), 'd')}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground truncate">{event.title}</h3>
                <p className="text-sm text-muted-foreground">
                    {format(parseISO(event.startDate), 'h:mm a')} • {event.roomName || 'TBD'}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function QuickAction({ href, icon: Icon, label, color }: { 
  href: string; 
  icon: any; 
  label: string;
  color: string;
}) {
  return (
    <Link to={href} className="flex flex-col items-center gap-2">
      <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center`}>
        <Icon className="w-6 h-6" />
      </div>
      <span className="text-xs font-medium text-foreground">{label}</span>
    </Link>
  );
}
