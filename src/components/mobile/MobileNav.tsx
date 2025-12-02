import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Users, 
  Heart, 
  Calendar, 
  MessageCircle,
  CheckSquare,
  ClipboardList,
  Bell
} from 'lucide-react';
import { AppMode } from '@/types/mobile';

interface MobileNavProps {
  mode: AppMode;
}

const memberNavItems = [
  { id: 'home', label: 'Home', icon: Home, href: '/app' },
  { id: 'groups', label: 'Groups', icon: Users, href: '/app/groups' },
  { id: 'give', label: 'Give', icon: Heart, href: '/app/give' },
  { id: 'events', label: 'Events', icon: Calendar, href: '/app/events' },
  { id: 'messages', label: 'Messages', icon: MessageCircle, href: '/app/messages' },
];

const leaderNavItems = [
  { id: 'home', label: 'Home', icon: Home, href: '/app' },
  { id: 'sundays', label: 'My Sundays', icon: ClipboardList, href: '/app/sundays' },
  { id: 'checkins', label: 'Check-Ins', icon: CheckSquare, href: '/app/checkins' },
  { id: 'groups', label: 'Groups', icon: Users, href: '/app/groups' },
  { id: 'messages', label: 'Messages', icon: MessageCircle, href: '/app/messages' },
];

export function MobileNav({ mode }: MobileNavProps) {
  const location = useLocation();
  const navItems = mode === 'leader' ? leaderNavItems : memberNavItems;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border safe-area-bottom z-50">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href || 
            (item.href !== '/app' && location.pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.id}
              to={item.href}
              className={cn(
                'flex flex-col items-center justify-center flex-1 py-2 px-1 rounded-lg transition-colors',
                isActive 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <item.icon className={cn('w-5 h-5 mb-1', isActive && 'text-primary')} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
