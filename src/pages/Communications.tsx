import { CommunicationsDashboard } from '@/components/communications/CommunicationsDashboard';
import { NavLink } from '@/components/NavLink';
import {
  LayoutDashboard,
  Users,
  Music,
  HandHeart,
  DollarSign,
  UsersRound,
  CalendarCheck,
  CalendarDays,
  MessageSquare
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Congregation', href: '/congregation', icon: Users },
  { name: 'Services', href: '/services', icon: Music },
  { name: 'Volunteers', href: '/volunteers', icon: HandHeart },
  { name: 'Giving', href: '/giving', icon: DollarSign },
  { name: 'Groups', href: '/groups', icon: UsersRound },
  { name: 'Check-Ins', href: '/checkins', icon: CalendarCheck },
  { name: 'Events', href: '/events', icon: CalendarDays },
  { name: 'Communications', href: '/communications', icon: MessageSquare, active: true },
];

export default function Communications() {
  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card hidden lg:block">
        <div className="p-6 border-b border-border">
          <a href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-lg">G</span>
            </div>
            <span className="font-display font-semibold text-xl text-foreground">Gather</span>
          </a>
        </div>
        <nav className="px-3 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              activeClassName="bg-primary/10 text-primary font-medium"
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          <CommunicationsDashboard />
        </div>
      </main>
    </div>
  );
}
