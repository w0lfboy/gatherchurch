import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Users, Settings as SettingsIcon, Shield, UserPlus, 
  LayoutDashboard, Calendar, Heart, UserCheck, 
  MessageSquare, CheckCircle, CalendarDays, LogOut, Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { usePermissions } from "@/hooks/usePermissions";
import { RoleManagement } from "@/components/settings/RoleManagement";
import { UserManagement } from "@/components/settings/UserManagement";
import { InviteUsers } from "@/components/settings/InviteUsers";
import { PermissionsMatrix } from "@/components/settings/PermissionsMatrix";
import { FirstAdminSetup } from "@/components/settings/FirstAdminSetup";

const navigation = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Services", icon: Calendar, href: "/services" },
  { name: "Congregation", icon: Users, href: "/congregation" },
  { name: "Volunteers", icon: UserCheck, href: "/volunteers" },
  { name: "Groups", icon: Users, href: "/groups" },
  { name: "Giving", icon: Heart, href: "/giving" },
  { name: "Check-Ins", icon: CheckCircle, href: "/checkins" },
  { name: "Events", icon: CalendarDays, href: "/events" },
  { name: "Messages", icon: MessageSquare, href: "/messages" },
];

export default function Settings() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { isSuperAdmin, isAdmin } = usePermissions();
  const [activeTab, setActiveTab] = useState("users");

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col flex-shrink-0">
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
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-muted-foreground hover:bg-secondary hover:text-foreground"
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
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium bg-sage-light text-sage-dark transition-all duration-200"
          >
            <SettingsIcon className="w-5 h-5" />
            Settings
          </Link>
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-display font-semibold text-foreground">Settings</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-xl hover:bg-secondary transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-coral" />
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sage-light to-coral-light flex items-center justify-center">
              <span className="text-sm font-semibold text-sage-dark">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <p className="text-muted-foreground">
                Manage users, roles, and permissions for your church
              </p>
            </div>

            <FirstAdminSetup />

            {(isSuperAdmin || isAdmin) ? (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 mt-6">
                <TabsList className="bg-muted/50">
                  <TabsTrigger value="users" className="gap-2">
                    <Users className="w-4 h-4" />
                    Users
                  </TabsTrigger>
                  <TabsTrigger value="invite" className="gap-2">
                    <UserPlus className="w-4 h-4" />
                    Invite
                  </TabsTrigger>
                  {isSuperAdmin && (
                    <>
                      <TabsTrigger value="roles" className="gap-2">
                        <Shield className="w-4 h-4" />
                        Roles
                      </TabsTrigger>
                      <TabsTrigger value="permissions" className="gap-2">
                        <SettingsIcon className="w-4 h-4" />
                        Permissions
                      </TabsTrigger>
                    </>
                  )}
                </TabsList>

                <TabsContent value="users">
                  <UserManagement />
                </TabsContent>

                <TabsContent value="invite">
                  <InviteUsers />
                </TabsContent>

                {isSuperAdmin && (
                  <>
                    <TabsContent value="roles">
                      <RoleManagement />
                    </TabsContent>

                    <TabsContent value="permissions">
                      <PermissionsMatrix />
                    </TabsContent>
                  </>
                )}
              </Tabs>
            ) : (
              <div className="text-center py-16 mt-6">
                <Shield className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                <h2 className="text-xl font-display font-semibold text-foreground mb-2">
                  Access Restricted
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  You don't have permission to access settings. Contact your church administrator 
                  if you need access to this area.
                </p>
                <Button variant="outline" className="mt-6" onClick={() => navigate('/dashboard')}>
                  Back to Dashboard
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}