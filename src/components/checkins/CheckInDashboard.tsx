import { useState } from 'react';
import { 
  mockSessions, mockCheckedIn, mockRooms, mockStations,
  mockAttendance, supportedDevices, supportedPrinters
} from '@/data/mockCheckInsData';
import { RoomStatus } from './RoomStatus';
import { CheckedInList } from './CheckedInList';
import { HardwareSetup } from './HardwareSetup';
import { Button } from '@/components/ui/button';
import { 
  Users, Monitor, Printer, AlertTriangle, CheckCircle,
  Clock, Search, Filter, Plus, Settings, QrCode,
  Baby, Shield, Bell, BarChart3, Tablet
} from 'lucide-react';
import { cn } from '@/lib/utils';

type TabType = 'live' | 'rooms' | 'people' | 'hardware' | 'reports';

export const CheckInDashboard = () => {
  const [activeTab, setActiveTab] = useState<TabType>('live');
  const [searchQuery, setSearchQuery] = useState('');

  const activeSession = mockSessions.find(s => s.status === 'active');
  const childrenCheckedIn = mockCheckedIn.filter(c => c.type === 'child');
  const volunteersCheckedIn = mockCheckedIn.filter(c => c.type === 'volunteer');
  const alertsCount = mockCheckedIn.filter(c => c.medicalAlerts.length > 0 || c.allergies.length > 0).length;
  const onlineStations = mockStations.filter(s => s.isOnline).length;

  const tabs: { id: TabType; label: string; icon: any }[] = [
    { id: 'live', label: 'Live Dashboard', icon: Monitor },
    { id: 'rooms', label: 'Rooms', icon: Users },
    { id: 'people', label: 'Checked In', icon: CheckCircle },
    { id: 'hardware', label: 'Hardware', icon: Tablet },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-display font-semibold text-foreground flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              Check-Ins
            </h1>
            <p className="text-sm text-muted-foreground">
              Secure check-in for kids, youth, and volunteers
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <QrCode className="w-4 h-4 mr-2" />
              Open Kiosk
            </Button>
            <Button variant="default" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Quick Check-In
            </Button>
          </div>
        </div>

        {/* Active Session Banner */}
        {activeSession && (
          <div className="mb-4 p-4 rounded-xl bg-sage-light border border-sage/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-sage animate-pulse" />
              <div>
                <p className="font-medium text-foreground">
                  {activeSession.serviceName} - Check-In Active
                </p>
                <p className="text-sm text-muted-foreground">
                  {activeSession.totalCheckedIn} checked in • {onlineStations} stations online
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-sage-dark">
              End Check-In
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
        {activeTab === 'live' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-4">
              <StatCard
                title="Children"
                value={childrenCheckedIn.length.toString()}
                subtitle="Checked in"
                icon={Baby}
                color="sage"
              />
              <StatCard
                title="Volunteers"
                value={volunteersCheckedIn.length.toString()}
                subtitle="Serving today"
                icon={Users}
                color="coral"
              />
              <StatCard
                title="Medical Alerts"
                value={alertsCount.toString()}
                subtitle="Active alerts"
                icon={AlertTriangle}
                color={alertsCount > 0 ? "gold" : "sage"}
              />
              <StatCard
                title="Stations"
                value={`${onlineStations}/${mockStations.length}`}
                subtitle="Online"
                icon={Monitor}
                color="primary"
              />
            </div>

            {/* Room Overview */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-display font-semibold text-foreground">Room Status</h2>
                <Button variant="ghost" size="sm" onClick={() => setActiveTab('rooms')}>
                  View All
                </Button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {mockRooms.slice(0, 6).map(room => (
                  <RoomStatus key={room.id} room={room} compact />
                ))}
              </div>
            </div>

            {/* Recent Activity & Alerts */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Check-Ins */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h2 className="text-lg font-display font-semibold text-foreground mb-4">Recent Check-Ins</h2>
                <div className="space-y-3">
                  {mockCheckedIn.slice(0, 5).map(person => (
                    <div key={person.id} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center",
                        person.type === 'child' ? "bg-sage-light" : "bg-primary/10"
                      )}>
                        <span className="text-sm font-semibold text-sage-dark">
                          {person.firstName[0]}{person.lastName[0]}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">
                          {person.firstName} {person.lastName}
                        </p>
                        <p className="text-xs text-muted-foreground">{person.roomName}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">
                          {new Date(person.checkedInAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        {person.medicalAlerts.length > 0 && (
                          <AlertTriangle className="w-4 h-4 text-gold inline ml-1" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Medical Alerts */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h2 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-gold" />
                  Active Medical Alerts
                </h2>
                {alertsCount === 0 ? (
                  <div className="flex flex-col items-center justify-center h-48 text-center">
                    <CheckCircle className="w-12 h-12 text-sage/50 mb-3" />
                    <p className="text-muted-foreground">No active alerts</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {mockCheckedIn
                      .filter(c => c.medicalAlerts.length > 0 || c.allergies.length > 0)
                      .map(person => (
                        <div key={person.id} className="p-4 rounded-xl bg-coral-light/50 border border-coral/30">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-semibold text-foreground">
                                {person.firstName} {person.lastName}
                              </p>
                              <p className="text-xs text-muted-foreground">{person.roomName}</p>
                            </div>
                            <Button variant="ghost" size="sm" className="text-coral">
                              <Bell className="w-4 h-4 mr-1" />
                              Alert Parent
                            </Button>
                          </div>
                          <div className="space-y-1">
                            {person.medicalAlerts.map(alert => (
                              <div key={alert.id} className="flex items-start gap-2">
                                <span className={cn(
                                  "text-xs px-2 py-0.5 rounded-full font-medium",
                                  alert.severity === 'critical' || alert.severity === 'high'
                                    ? "bg-coral text-white"
                                    : "bg-gold/20 text-gold"
                                )}>
                                  {alert.type}
                                </span>
                                <span className="text-sm text-foreground">{alert.description}</span>
                              </div>
                            ))}
                            {person.allergies.map(allergy => (
                              <div key={allergy} className="flex items-center gap-2">
                                <span className="text-xs px-2 py-0.5 rounded-full bg-coral/20 text-coral font-medium">
                                  Allergy
                                </span>
                                <span className="text-sm text-foreground">{allergy}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rooms' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">All Rooms</h2>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Manage Rooms
              </Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockRooms.map(room => (
                <RoomStatus key={room.id} room={room} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'people' && (
          <CheckedInList 
            checkedIn={mockCheckedIn} 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        )}

        {activeTab === 'hardware' && (
          <HardwareSetup 
            stations={mockStations}
            devices={supportedDevices}
            printers={supportedPrinters}
          />
        )}

        {activeTab === 'reports' && (
          <ReportsTab attendance={mockAttendance} />
        )}
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: any;
  color: 'sage' | 'coral' | 'gold' | 'primary';
}

const StatCard = ({ title, value, subtitle, icon: Icon, color }: StatCardProps) => {
  const colorMap = {
    sage: 'bg-sage-light border-sage/10',
    coral: 'bg-coral-light border-coral/10',
    gold: 'bg-secondary border-gold/10',
    primary: 'bg-primary/10 border-primary/10',
  };

  return (
    <div className={cn("p-5 rounded-2xl border", colorMap[color])}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-muted-foreground">{title}</p>
        <Icon className="w-5 h-5 text-muted-foreground" />
      </div>
      <p className="text-3xl font-display font-semibold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
    </div>
  );
};

const ReportsTab = ({ attendance }: { attendance: typeof mockAttendance }) => {
  // Group by date
  const todayAttendance = attendance.filter(a => a.date === '2024-12-08');
  const totalToday = todayAttendance.reduce((sum, a) => sum + a.totalCheckedIn, 0);
  const newVisitorsToday = todayAttendance.reduce((sum, a) => sum + a.newVisitors, 0);

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-card border border-border">
          <p className="text-sm text-muted-foreground mb-1">Today's Total</p>
          <p className="text-3xl font-display font-semibold text-foreground">{totalToday}</p>
        </div>
        <div className="p-5 rounded-2xl bg-card border border-border">
          <p className="text-sm text-muted-foreground mb-1">New Visitors</p>
          <p className="text-3xl font-display font-semibold text-foreground">{newVisitorsToday}</p>
        </div>
        <div className="p-5 rounded-2xl bg-card border border-border">
          <p className="text-sm text-muted-foreground mb-1">Avg Check-In Time</p>
          <p className="text-3xl font-display font-semibold text-foreground">8:52 AM</p>
        </div>
      </div>

      {/* By Room */}
      <div className="p-6 rounded-2xl bg-card border border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">Attendance by Room (Today)</h2>
        <div className="space-y-3">
          {todayAttendance.map((record, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <span className="w-32 text-sm text-muted-foreground">{record.roomName}</span>
              <div className="flex-1 h-6 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${(record.totalCheckedIn / 25) * 100}%` }}
                />
              </div>
              <span className="w-16 text-sm font-medium text-foreground text-right">
                {record.totalCheckedIn}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Export */}
      <div className="flex justify-end gap-2">
        <Button variant="outline">Export CSV</Button>
        <Button variant="outline">Print Report</Button>
      </div>
    </div>
  );
};
