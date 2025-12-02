import { useState } from 'react';
import { Group } from '@/types/groups';
import { mockGroups, mockCategories, mockJoinRequests, mockEvents } from '@/data/mockGroupsData';
import { GroupDirectory } from './GroupDirectory';
import { GroupDetail } from './GroupDetail';
import { GroupCard } from './GroupCard';
import { Button } from '@/components/ui/button';
import { 
  Users, Plus, Calendar, UserPlus, TrendingUp,
  MessageSquare, FileText, Search, ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

type TabType = 'directory' | 'my-groups' | 'events' | 'resources';

interface GroupsDashboardProps {
  onSelectGroup?: (group: Group) => void;
}

export const GroupsDashboard = ({ onSelectGroup }: GroupsDashboardProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('directory');
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  // Mock "my groups" - groups where current user is a leader or member
  const myGroups = mockGroups.filter(g => ['g1', 'g2', 'g3'].includes(g.id));
  const pendingRequests = mockJoinRequests.filter(r => r.status === 'pending');
  const upcomingEvents = mockEvents.slice(0, 3);

  const tabs: { id: TabType; label: string; icon: any }[] = [
    { id: 'directory', label: 'Group Directory', icon: Users },
    { id: 'my-groups', label: 'My Groups', icon: Users },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'resources', label: 'Resources', icon: FileText },
  ];

  if (selectedGroup) {
    return (
      <GroupDetail 
        group={selectedGroup} 
        onBack={() => setSelectedGroup(null)} 
      />
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-display font-semibold text-foreground flex items-center gap-2">
              <Users className="w-6 h-6 text-primary" />
              Groups
            </h1>
            <p className="text-sm text-muted-foreground">
              Small groups, classes, and ministry teams
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <MessageSquare className="w-4 h-4 mr-2" />
              Message All
            </Button>
            <Button variant="default" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Create Group
            </Button>
          </div>
        </div>

        {/* Pending Requests Alert */}
        {pendingRequests.length > 0 && (
          <div className="mb-4 p-3 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-gold" />
              <span className="text-sm font-medium text-foreground">
                {pendingRequests.length} pending join request{pendingRequests.length !== 1 ? 's' : ''} across your groups
              </span>
            </div>
            <Button variant="ghost" size="sm" className="text-gold">
              Review All
            </Button>
          </div>
        )}

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-secondary rounded-xl p-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {activeTab === 'directory' && (
          <GroupDirectory onSelectGroup={setSelectedGroup} />
        )}

        {activeTab === 'my-groups' && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-sage-light border border-sage/20">
                <p className="text-sm text-muted-foreground mb-1">Groups I Lead</p>
                <p className="text-2xl font-display font-semibold text-foreground">
                  {myGroups.filter(g => g.primaryLeaderId === '1' || g.primaryLeaderId === '5').length}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-coral-light border border-coral/20">
                <p className="text-sm text-muted-foreground mb-1">Total Members</p>
                <p className="text-2xl font-display font-semibold text-foreground">
                  {myGroups.reduce((sum, g) => sum + g.currentMembers, 0)}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-secondary border border-gold/20">
                <p className="text-sm text-muted-foreground mb-1">Pending Requests</p>
                <p className="text-2xl font-display font-semibold text-foreground">
                  {pendingRequests.length}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                <p className="text-sm text-muted-foreground mb-1">This Week's Meetings</p>
                <p className="text-2xl font-display font-semibold text-foreground">
                  {myGroups.filter(g => g.nextMeeting).length}
                </p>
              </div>
            </div>

            {/* My Groups List */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">My Groups</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {myGroups.map(group => (
                  <GroupCard 
                    key={group.id} 
                    group={group} 
                    onClick={() => setSelectedGroup(group)}
                  />
                ))}
              </div>
            </div>

            {/* Upcoming Meetings */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Upcoming Meetings</h2>
              <div className="space-y-3">
                {myGroups
                  .filter(g => g.nextMeeting)
                  .sort((a, b) => new Date(a.nextMeeting!).getTime() - new Date(b.nextMeeting!).getTime())
                  .slice(0, 5)
                  .map(group => (
                    <div 
                      key={group.id}
                      className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50 hover:bg-secondary cursor-pointer transition-colors"
                      onClick={() => setSelectedGroup(group)}
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex flex-col items-center justify-center">
                        <span className="text-xs text-primary font-medium">
                          {new Date(group.nextMeeting!).toLocaleDateString('en-US', { weekday: 'short' })}
                        </span>
                        <span className="text-lg font-semibold text-primary">
                          {new Date(group.nextMeeting!).getDate()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{group.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {group.meetingTime} • {group.location?.name || group.location?.roomName || 'Online'}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Upcoming Group Events</h2>
              <Button variant="default" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            </div>

            {upcomingEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <Calendar className="w-12 h-12 text-muted-foreground/50 mb-3" />
                <p className="text-muted-foreground">No upcoming events</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {mockEvents.map(event => (
                  <div key={event.id} className="p-5 rounded-xl bg-card border border-border hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex flex-col items-center justify-center flex-shrink-0">
                        <span className="text-xs text-primary font-medium">
                          {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                        </span>
                        <span className="text-xl font-semibold text-primary">
                          {new Date(event.date).getDate()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground mb-1">{event.groupName}</p>
                        <h3 className="font-semibold text-foreground">{event.title}</h3>
                        {event.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{event.description}</p>
                        )}
                        <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                          <span>{event.startTime}</span>
                          {event.location && <span>• {event.location}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Leader Resources</h2>
              <Button variant="default" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Upload Resource
              </Button>
            </div>

            {/* Categories */}
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
              {mockCategories.map(cat => (
                <div 
                  key={cat.id}
                  className={cn(
                    "p-4 rounded-xl border cursor-pointer hover:shadow-md transition-all",
                    cat.color === 'sage' ? 'bg-sage-light border-sage/20' :
                    cat.color === 'coral' ? 'bg-coral-light border-coral/20' :
                    cat.color === 'gold' ? 'bg-secondary border-gold/20' :
                    'bg-primary/10 border-primary/20'
                  )}
                >
                  <p className="font-medium text-foreground">{cat.name}</p>
                  <p className="text-sm text-muted-foreground">{cat.groupCount} groups</p>
                </div>
              ))}
            </div>

            {/* Resource Library Placeholder */}
            <div className="p-8 rounded-2xl bg-secondary/50 border border-border text-center">
              <FileText className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Resource Library</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Upload and organize curriculum, discussion guides, videos, and other materials for your group leaders.
              </p>
              <Button variant="outline" className="mt-4">
                Browse All Resources
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
