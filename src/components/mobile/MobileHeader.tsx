import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Settings, ChevronDown, Check } from 'lucide-react';
import { AppMode } from '@/types/mobile';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useHaptics } from '@/hooks/useHaptics';

interface MobileHeaderProps {
  mode: AppMode;
  onModeChange: (mode: AppMode) => void;
  title?: string;
  showBack?: boolean;
}

export function MobileHeader({ mode, onModeChange, title = 'Gather' }: MobileHeaderProps) {
  const [notificationCount] = useState(3);
  const haptics = useHaptics();

  const handleModeChange = (newMode: AppMode) => {
    haptics.medium();
    onModeChange(newMode);
  };

  const handleActionClick = () => {
    haptics.light();
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border safe-area-top z-50">
      <div className="flex items-center justify-between h-14 px-4">
        {/* Logo & Mode Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none" onClick={handleActionClick}>
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">G</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-foreground">{title}</span>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuItem 
              onClick={() => handleModeChange('member')}
              className="flex items-center justify-between"
            >
              <span>Member View</span>
              {mode === 'member' && <Check className="w-4 h-4 text-primary" />}
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleModeChange('leader')}
              className="flex items-center justify-between"
            >
              <span>Leader View</span>
              {mode === 'leader' && <Check className="w-4 h-4 text-primary" />}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link 
            to="/app/notifications" 
            onClick={handleActionClick}
            className="relative p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <Bell className="w-5 h-5 text-muted-foreground" />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-coral text-[10px] font-bold text-white rounded-full flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </Link>
          <Link 
            to="/app/settings" 
            onClick={handleActionClick}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <Settings className="w-5 h-5 text-muted-foreground" />
          </Link>
        </div>
      </div>
    </header>
  );
}
