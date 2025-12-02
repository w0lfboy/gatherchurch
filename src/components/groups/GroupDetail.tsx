import { useState } from 'react';
import { Group, GroupMember } from '@/types/groups';
import { 
  getMembersByGroupId, getSessionsByGroupId, 
  getResourcesByGroupId, mockJoinRequests, mockEvents 
} from '@/data/mockGroupsData';
import { GroupAttendance } from './GroupAttendance';
import { GroupResources } from './GroupResources';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, Users, MapPin, Clock, Calendar, Baby, 
  Video, Mail, Phone, MessageSquare, Settings, Plus,
  CheckCircle, XCircle, UserPlus, FileText, CalendarDays
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface GroupDetailProps {
  group: Group;
  onBack: () => void;
}

type TabType = 'overview' | 'members' | 'attendance' | 'resources' | 'events';

export const GroupDetail = ({ group, onBack }: GroupDetailProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  
  const members = getMembersByGroupId(group.id);
  const sessions = getSessionsByGroupId(group.id);
  const resources = getResourcesByGroupId(group.id);
  const joinRequests = mockJoinRequests.filter(r => r.groupId === group.id && r.status === 'pending');
  const events = mockEvents.filter(e => e.groupId === group.id);

  const leaders = members.filter(m => m.role === 'leader' || m.role === 'co_leader');

  const tabs: { id: TabType; label: string; icon: any; count?: number }[] = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'members', label: 'Members', icon: Users, count: members.length },
    { id: 'attendance', label: 'Attendance', icon: CheckCircle, count: sessions.length },
    { id: 'resources', label: 'Resources', icon: FileText, count: resources.length },
    { id: 'events', label: 'Events', icon: CalendarDays, count: events.length },
  ];

  const getTypeLabel = (type: Group['type']) => {
    const labels: Record<string, string> = {
      small_group: 'Small Group',
      class: 'Class',
      ministry_team: 'Ministry Team',
      volunteer_team: 'Volunteer Team',
    };
    return labels[type] || type;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-border bg-card">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                {getTypeLabel(group.type)}
              </span>
              {group.category && (
                <span className="text-xs text-muted-foreground">{group.category}</span>
              )}
            </div>
            <h1 className="text-2xl font-display font-semibold text-foreground">{group.name}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <MessageSquare className="w-4 h-4 mr-2" />
              Message
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Join Requests Alert */}
        {joinRequests.length > 0 && (
          <div className="mb-4 p-3 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-gold" />
              <span className="text-sm font-medium text-foreground">
                {joinRequests.length} pending join request{joinRequests.length !== 1 ? 's' : ''}
              </span>
            </div>
            <Button variant="ghost" size="sm" className="text-gold">
              Review
            </Button>
          </div>
        )}

        {/* Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {tab.count !== undefined && (
                <span className={cn(
                  "px-1.5 py-0.5 rounded-full text-xs",
                  activeTab === tab.id ? "bg-primary-foreground/20" : "bg-secondary"
                )}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {group.description && (
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <h2 className="text-lg font-semibold text-foreground mb-3">About</h2>
                  <p className="text-muted-foreground">{group.description}</p>
                </div>
              )}

              {/* Meeting Details */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h2 className="text-lg font-semibold text-foreground mb-4">Meeting Details</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {group.meetingDay && group.meetingTime && (
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{group.meetingDay}s</p>
                        <p className="text-sm text-muted-foreground">{group.meetingTime}</p>
                      </div>
                    </div>
                  )}

                  {group.location && (
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {group.location.isChurchCampus 
                            ? group.location.roomName || 'Church Campus'
                            : group.location.name
                          }
                        </p>
                        {group.location.address && (
                          <p className="text-sm text-muted-foreground">{group.location.address}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {group.isOnline && (
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Video className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Online Option Available</p>
                        {group.meetingLink && (
                          <a href={group.meetingLink} className="text-sm text-primary hover:underline">
                            Join Link
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {group.hasChildcare && (
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-sage-light flex items-center justify-center flex-shrink-0">
                        <Baby className="w-5 h-5 text-sage-dark" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Childcare Available</p>
                        {group.childcareAges && (
                          <p className="text-sm text-muted-foreground">{group.childcareAges}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Upcoming Events */}
              {events.length > 0 && (
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <h2 className="text-lg font-semibold text-foreground mb-4">Upcoming Events</h2>
                  <div className="space-y-3">
                    {events.slice(0, 3).map(event => (
                      <div key={event.id} className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex flex-col items-center justify-center">
                          <span className="text-xs text-primary font-medium">
                            {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                          </span>
                          <span className="text-lg font-semibold text-primary">
                            {new Date(event.date).getDate()}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{event.title}</p>
                          <p className="text-sm text-muted-foreground">{event.startTime}</p>
                        </div>
                        {event.rsvpEnabled && (
                          <span className="text-xs text-muted-foreground">
                            {event.rsvpCount} RSVPs
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Leaders */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h2 className="text-lg font-semibold text-foreground mb-4">Leaders</h2>
                <div className="space-y-3">
                  {leaders.map(leader => (
                    <div key={leader.id} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sage-light to-coral-light flex items-center justify-center">
                        <span className="text-sm font-semibold text-sage-dark">
                          {leader.personName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{leader.personName}</p>
                        <p className="text-xs text-muted-foreground capitalize">{leader.role.replace('_', ' ')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h2 className="text-lg font-semibold text-foreground mb-4">Group Stats</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Members</span>
                    <span className="font-medium text-foreground">
                      {group.currentMembers}{group.maxMembers && ` / ${group.maxMembers}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sessions</span>
                    <span className="font-medium text-foreground">{sessions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg Attendance</span>
                    <span className="font-medium text-foreground">
                      {sessions.length > 0 
                        ? Math.round(sessions.reduce((sum, s) => sum + s.totalPresent, 0) / sessions.length)
                        : '-'
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Resources</span>
                    <span className="font-medium text-foreground">{resources.length}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Button className="w-full" variant="default">
                  <Plus className="w-4 h-4 mr-2" />
                  Take Attendance
                </Button>
                <Button className="w-full" variant="outline">
                  <CalendarDays className="w-4 h-4 mr-2" />
                  Schedule Event
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <MembersTab members={members} groupId={group.id} />
        )}

        {activeTab === 'attendance' && (
          <GroupAttendance 
            groupId={group.id} 
            sessions={sessions} 
            members={members}
          />
        )}

        {activeTab === 'resources' && (
          <GroupResources resources={resources} />
        )}

        {activeTab === 'events' && (
          <EventsTab events={events} />
        )}
      </div>
    </div>
  );
};

// Members Tab Component
const MembersTab = ({ members, groupId }: { members: GroupMember[]; groupId: string }) => {
  const getRoleColor = (role: GroupMember['role']) => {
    switch (role) {
      case 'leader': return 'text-primary bg-primary/10';
      case 'co_leader': return 'text-sage-dark bg-sage-light';
      case 'host': return 'text-gold bg-secondary';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Members ({members.length})</h2>
        <Button variant="default" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Member
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {members.map(member => (
          <div key={member.id} className="p-4 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sage-light to-coral-light flex items-center justify-center">
                <span className="font-semibold text-sage-dark">
                  {member.personName.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-foreground">{member.personName}</p>
                  <span className={cn(
                    "text-xs px-2 py-0.5 rounded-full capitalize",
                    getRoleColor(member.role)
                  )}>
                    {member.role.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{member.email}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{member.attendanceRate}%</p>
                <p className="text-xs text-muted-foreground">attendance</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Events Tab Component
const EventsTab = ({ events }: { events: typeof mockEvents }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Events ({events.length})</h2>
        <Button variant="default" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Create Event
        </Button>
      </div>

      {events.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 text-center">
          <CalendarDays className="w-12 h-12 text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground">No upcoming events</p>
        </div>
      ) : (
        <div className="space-y-4">
          {events.map(event => (
            <div key={event.id} className="p-5 rounded-xl bg-card border border-border">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-sm text-primary font-medium">
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                  </span>
                  <span className="text-2xl font-semibold text-primary">
                    {new Date(event.date).getDate()}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{event.title}</h3>
                  {event.description && (
                    <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                  )}
                  <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {event.startTime}{event.endTime && ` - ${event.endTime}`}
                    </span>
                    {event.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </span>
                    )}
                  </div>
                </div>
                {event.rsvpEnabled && (
                  <div className="text-right">
                    <p className="text-lg font-semibold text-foreground">{event.rsvpCount}</p>
                    <p className="text-xs text-muted-foreground">RSVPs</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
