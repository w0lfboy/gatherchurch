import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { TeamCard } from './TeamCard';
import { VolunteerCard } from './VolunteerCard';
import { ShiftCard } from './ShiftCard';
import { SwapRequestCard } from './SwapRequestCard';
import { ScheduleCalendar } from './ScheduleCalendar';
import { AutoScheduler } from './AutoScheduler';
import { 
  mockTeams, mockVolunteers, mockScheduledShifts, 
  mockSwapRequests, mockNotifications 
} from '@/data/mockVolunteersData';
import { 
  Search, Plus, Bell, Calendar, Users, 
  RefreshCw, Sparkles, Filter, LayoutGrid, List
} from 'lucide-react';

interface VolunteerDashboardProps {
  onSelectVolunteer?: (id: string) => void;
  onSelectTeam?: (id: string) => void;
}

export const VolunteerDashboard = ({ onSelectVolunteer, onSelectTeam }: VolunteerDashboardProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Stats
  const pendingConfirmations = mockScheduledShifts.filter(s => s.status === 'pending').length;
  const openSwapRequests = mockSwapRequests.filter(s => s.status === 'open').length;
  const unreadNotifications = mockNotifications.filter(n => !n.read).length;
  const upcomingShifts = mockScheduledShifts.filter(s => 
    new Date(s.serviceDate) >= new Date() && s.status !== 'declined'
  );

  const filteredVolunteers = mockVolunteers.filter(v =>
    v.personName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Volunteers</h1>
            <p className="text-muted-foreground">Manage teams, schedules, and assignments</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="relative">
              <Bell className="w-4 h-4" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-coral text-coral-foreground text-xs rounded-full flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Volunteer
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-secondary/30 rounded-xl p-4">
            <p className="text-sm text-muted-foreground mb-1">Total Volunteers</p>
            <p className="text-2xl font-bold text-foreground">{mockVolunteers.length}</p>
          </div>
          <div className="bg-gold-light/30 rounded-xl p-4">
            <p className="text-sm text-muted-foreground mb-1">Pending Confirmations</p>
            <p className="text-2xl font-bold text-gold-dark">{pendingConfirmations}</p>
          </div>
          <div className="bg-coral-light/30 rounded-xl p-4">
            <p className="text-sm text-muted-foreground mb-1">Open Swap Requests</p>
            <p className="text-2xl font-bold text-coral-dark">{openSwapRequests}</p>
          </div>
          <div className="bg-sage-light/30 rounded-xl p-4">
            <p className="text-sm text-muted-foreground mb-1">Upcoming Shifts</p>
            <p className="text-2xl font-bold text-sage-dark">{upcomingShifts.length}</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="bg-secondary/50">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <LayoutGrid className="w-4 h-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="schedule" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Schedule
              </TabsTrigger>
              <TabsTrigger value="teams" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Teams
              </TabsTrigger>
              <TabsTrigger value="swaps" className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Swaps
                {openSwapRequests > 0 && (
                  <Badge className="bg-coral text-coral-foreground ml-1">{openSwapRequests}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="auto-schedule" className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Auto-Schedule
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search volunteers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Teams */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Teams</h3>
                <div className="space-y-3">
                  {mockTeams.map(team => (
                    <TeamCard 
                      key={team.id} 
                      team={team} 
                      onClick={() => onSelectTeam?.(team.id)}
                    />
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Pending Confirmations</h3>
                <div className="space-y-3">
                  {mockScheduledShifts
                    .filter(s => s.status === 'pending')
                    .slice(0, 3)
                    .map(shift => (
                      <ShiftCard key={shift.id} shift={shift} showActions />
                    ))}
                  {pendingConfirmations === 0 && (
                    <p className="text-muted-foreground text-sm p-4 bg-secondary/30 rounded-xl text-center">
                      All shifts confirmed!
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Volunteers List */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">All Volunteers</h3>
                <div className="flex items-center gap-1 bg-secondary/50 rounded-lg p-1">
                  <Button 
                    variant={viewMode === 'grid' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant={viewMode === 'list' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                : "space-y-2"
              }>
                {filteredVolunteers.map(volunteer => (
                  <VolunteerCard
                    key={volunteer.id}
                    volunteer={volunteer}
                    compact={viewMode === 'list'}
                    onClick={() => onSelectVolunteer?.(volunteer.id)}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule">
            <ScheduleCalendar />
          </TabsContent>

          {/* Teams Tab */}
          <TabsContent value="teams">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockTeams.map(team => (
                <TeamCard 
                  key={team.id} 
                  team={team}
                  onClick={() => onSelectTeam?.(team.id)}
                />
              ))}
            </div>
          </TabsContent>

          {/* Swaps Tab */}
          <TabsContent value="swaps">
            <div className="space-y-4">
              {mockSwapRequests.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No swap requests</p>
              ) : (
                mockSwapRequests.map(request => (
                  <SwapRequestCard key={request.id} request={request} isAdmin />
                ))
              )}
            </div>
          </TabsContent>

          {/* Auto-Schedule Tab */}
          <TabsContent value="auto-schedule">
            <AutoScheduler 
              serviceDate="2024-12-15"
              serviceTime="9:00 AM"
              teamId="t1"
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
