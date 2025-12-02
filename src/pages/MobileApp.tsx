import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { MobileHeader } from '@/components/mobile/MobileHeader';
import { MobileNav } from '@/components/mobile/MobileNav';
import { MemberHome } from '@/components/mobile/MemberHome';
import { LeaderHome } from '@/components/mobile/LeaderHome';
import { MySundaysDashboard } from '@/components/mobile/MySundaysDashboard';
import { SermonArchive } from '@/components/mobile/SermonArchive';
import { GivingInterface } from '@/components/mobile/GivingInterface';
import { DigitalConnectCard } from '@/components/mobile/DigitalConnectCard';
import { AppMode } from '@/types/mobile';
import { cn } from '@/lib/utils';

// Placeholder components for routes
const GroupsView = () => (
  <div className="px-4 py-6">
    <h1 className="text-2xl font-display font-semibold">Groups</h1>
    <p className="text-muted-foreground mt-1">Find and join community groups</p>
  </div>
);

const EventsView = () => (
  <div className="px-4 py-6">
    <h1 className="text-2xl font-display font-semibold">Events</h1>
    <p className="text-muted-foreground mt-1">See what's happening at church</p>
  </div>
);

const MessagesView = () => (
  <div className="px-4 py-6">
    <h1 className="text-2xl font-display font-semibold">Messages</h1>
    <p className="text-muted-foreground mt-1">Your conversations</p>
  </div>
);

const CheckInsView = () => (
  <div className="px-4 py-6">
    <h1 className="text-2xl font-display font-semibold">Check-Ins</h1>
    <p className="text-muted-foreground mt-1">Manage check-ins for your areas</p>
  </div>
);

const NotificationsView = () => (
  <div className="px-4 py-6">
    <h1 className="text-2xl font-display font-semibold">Notifications</h1>
    <p className="text-muted-foreground mt-1">Your recent notifications</p>
  </div>
);

const SettingsView = () => (
  <div className="px-4 py-6">
    <h1 className="text-2xl font-display font-semibold">Settings</h1>
    <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
  </div>
);

export default function MobileApp() {
  const [mode, setMode] = useState<AppMode>(() => {
    const saved = localStorage.getItem('gather-app-mode');
    return (saved as AppMode) || 'member';
  });
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('gather-app-mode', mode);
  }, [mode]);

  // Prevent overscroll/bounce on iOS
  useEffect(() => {
    document.body.style.overscrollBehavior = 'none';
    return () => {
      document.body.style.overscrollBehavior = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Fixed Header */}
      <MobileHeader 
        mode={mode} 
        onModeChange={setMode} 
      />
      
      {/* Main Content - scrollable area */}
      <main className={cn(
        "flex-1 overflow-auto",
        "pt-14 pb-20", // Account for fixed header and nav
        "safe-area-top safe-area-bottom"
      )}>
        <div className="pt-4">
          <Routes>
            {/* Home - shows different content based on mode */}
            <Route 
              path="/" 
              element={mode === 'leader' ? <LeaderHome /> : <MemberHome />} 
            />
            
            {/* Shared Routes */}
            <Route path="/groups" element={<GroupsView />} />
            <Route path="/groups/:id" element={<GroupsView />} />
            <Route path="/messages" element={<MessagesView />} />
            <Route path="/notifications" element={<NotificationsView />} />
            <Route path="/settings" element={<SettingsView />} />
            
            {/* Member Routes */}
            <Route path="/give" element={<GivingInterface />} />
            <Route path="/sermons" element={<SermonArchive />} />
            <Route path="/events" element={<EventsView />} />
            <Route path="/connect" element={<DigitalConnectCard />} />
            
            {/* Leader Routes */}
            <Route path="/sundays" element={<MySundaysDashboard />} />
            <Route path="/checkins" element={<CheckInsView />} />
            <Route path="/connect-cards" element={<DigitalConnectCard />} />
          </Routes>
        </div>
      </main>
      
      {/* Fixed Bottom Navigation */}
      <MobileNav mode={mode} />
    </div>
  );
}
