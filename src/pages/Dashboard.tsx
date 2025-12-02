import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, Users, Calendar, Music, Heart, 
  MessageSquare, CheckCircle, Settings, Bell, Search,
  ChevronRight, Plus, TrendingUp, UserCheck, Clock
} from "lucide-react";
import { Link } from "react-router-dom";

const navigation = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard", active: true },
  { name: "Services", icon: Calendar, href: "/services" },
  { name: "Congregation", icon: Users, href: "/congregation" },
  { name: "Volunteers", icon: UserCheck, href: "/volunteers" },
  { name: "Groups", icon: Users, href: "/groups" },
  { name: "Giving", icon: Heart, href: "/giving" },
  { name: "Check-Ins", icon: CheckCircle, href: "/checkins" },
  { name: "Events", icon: Calendar, href: "/events" },
  { name: "Messages", icon: MessageSquare, href: "/messages" },
];

const upcomingTasks = [
  { title: "Confirm worship team for Sunday", due: "Today", priority: "high" },
  { title: "Send volunteer reminder emails", due: "Tomorrow", priority: "medium" },
  { title: "Review giving report", due: "This week", priority: "low" },
];

const Dashboard = () => {

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-lg">G</span>
            </div>
            <span className="font-display font-semibold text-xl text-foreground">Gather</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                item.active
                  ? "bg-sage-light text-sage-dark"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="p-4 border-t border-border space-y-1">
          <Link 
            to="/settings"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-all duration-200"
          >
            <Settings className="w-5 h-5" />
            Settings
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="w-64 h-10 pl-10 pr-4 rounded-xl bg-secondary border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-xl hover:bg-secondary transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-coral" />
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sage-light to-coral-light flex items-center justify-center">
              <span className="text-sm font-semibold text-sage-dark">JD</span>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Welcome section */}
          <div className="mb-8">
            <h1 className="text-3xl font-display font-semibold text-foreground mb-2">
              Good morning, Pastor John
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening at Grace Community Church this week.
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="This Sunday"
              value="247"
              subtitle="Expected attendance"
              icon={Users}
              trend="+12% from last week"
              color="sage"
            />
            <StatCard
              title="Volunteers"
              value="18/20"
              subtitle="Positions filled"
              icon={UserCheck}
              trend="2 spots open"
              color="coral"
            />
            <StatCard
              title="Groups Active"
              value="12"
              subtitle="Meeting this week"
              icon={Users}
              trend="+2 new groups"
              color="gold"
            />
            <StatCard
              title="Weekly Giving"
              value="$4,280"
              subtitle="This week so far"
              icon={TrendingUp}
              trend="+8% from average"
              color="sage"
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Upcoming service */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-semibold text-foreground">
                  Upcoming Service
                </h2>
                <Button variant="soft" size="sm">
                  Edit service
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="px-4 py-2 rounded-xl bg-sage-light text-sage-dark text-sm font-medium">
                  Sunday, Dec 15
                </div>
                <div className="px-4 py-2 rounded-xl bg-secondary text-secondary-foreground text-sm">
                  9:00 AM & 11:00 AM
                </div>
              </div>

              <div className="space-y-4">
                <ServiceItem
                  time="9:00"
                  title="Pre-Service Prayer"
                  assignee="Worship Team"
                  duration="15 min"
                />
                <ServiceItem
                  time="9:15"
                  title="Worship Set"
                  assignee="4 songs • Band"
                  duration="25 min"
                />
                <ServiceItem
                  time="9:40"
                  title="Announcements"
                  assignee="Sarah M."
                  duration="5 min"
                />
                <ServiceItem
                  time="9:45"
                  title="Message: 'Hope for the Holidays'"
                  assignee="Pastor John"
                  duration="35 min"
                />
                <ServiceItem
                  time="10:20"
                  title="Closing & Prayer"
                  assignee="Pastor John"
                  duration="10 min"
                />
              </div>
            </div>

            {/* Tasks & Quick actions */}
            <div className="space-y-6">
              {/* Quick actions */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h2 className="text-lg font-display font-semibold text-foreground mb-4">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  <QuickAction icon={Plus} label="Add person" />
                  <QuickAction icon={Calendar} label="New service" />
                  <QuickAction icon={MessageSquare} label="Send message" />
                  <QuickAction icon={Music} label="Add song" />
                </div>
              </div>

              {/* Tasks */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h2 className="text-lg font-display font-semibold text-foreground mb-4">
                  Your Tasks
                </h2>
                <div className="space-y-3">
                  {upcomingTasks.map((task, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
                    >
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        task.priority === 'high' ? 'bg-coral' :
                        task.priority === 'medium' ? 'bg-gold' : 'bg-sage'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">
                          {task.title}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3" />
                          {task.due}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const StatCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  color 
}: { 
  title: string;
  value: string;
  subtitle: string;
  icon: any;
  trend: string;
  color: 'sage' | 'coral' | 'gold';
}) => {
  const colorMap = {
    sage: 'bg-sage-light border-sage/10 text-sage-dark',
    coral: 'bg-coral-light border-coral/10 text-coral',
    gold: 'bg-secondary border-gold/10 text-gold',
  };

  return (
    <div className={`p-5 rounded-2xl border ${colorMap[color]}`}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-muted-foreground">{title}</p>
        <Icon className="w-5 h-5 opacity-60" />
      </div>
      <p className="text-3xl font-display font-semibold text-foreground mb-1">{value}</p>
      <p className="text-xs opacity-80">{subtitle}</p>
      <p className="text-xs mt-2 text-muted-foreground">{trend}</p>
    </div>
  );
};

const ServiceItem = ({ 
  time, 
  title, 
  assignee, 
  duration 
}: { 
  time: string;
  title: string;
  assignee: string;
  duration: string;
}) => (
  <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 transition-colors">
    <span className="text-sm font-medium text-muted-foreground w-12">{time}</span>
    <div className="w-1.5 h-1.5 rounded-full bg-sage" />
    <div className="flex-1">
      <p className="text-sm font-medium text-foreground">{title}</p>
      <p className="text-xs text-muted-foreground">{assignee}</p>
    </div>
    <span className="text-xs text-muted-foreground">{duration}</span>
  </div>
);

const QuickAction = ({ icon: Icon, label }: { icon: any; label: string }) => (
  <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
    <Icon className="w-5 h-5 text-primary" />
    <span className="text-xs font-medium text-foreground">{label}</span>
  </button>
);

export default Dashboard;
