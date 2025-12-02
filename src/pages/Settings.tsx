import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users, Settings as SettingsIcon, Shield, UserPlus, 
  Home, Music, Heart, UsersRound, CalendarDays, 
  MessageSquare, CheckCircle, HandHelping, LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/hooks/useAuth";
import { usePermissions } from "@/hooks/usePermissions";
import { RoleManagement } from "@/components/settings/RoleManagement";
import { UserManagement } from "@/components/settings/UserManagement";
import { InviteUsers } from "@/components/settings/InviteUsers";
import { PermissionsMatrix } from "@/components/settings/PermissionsMatrix";
import { FirstAdminSetup } from "@/components/settings/FirstAdminSetup";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "People", href: "/congregation", icon: Users },
  { name: "Services", href: "/services", icon: Music },
  { name: "Giving", href: "/giving", icon: Heart },
  { name: "Groups", href: "/groups", icon: UsersRound },
  { name: "Events", href: "/events", icon: CalendarDays },
  { name: "Check-Ins", href: "/checkins", icon: CheckCircle },
  { name: "Volunteers", href: "/volunteers", icon: HandHelping },
  { name: "Messages", href: "/communications", icon: MessageSquare },
  { name: "Settings", href: "/settings", icon: SettingsIcon },
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
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar className="border-r border-border">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">G</span>
                  </div>
                  <span className="font-display font-semibold">Gather</span>
                </div>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigation.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton asChild>
                        <NavLink 
                          to={item.href} 
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                          activeClassName="bg-primary/10 text-primary font-medium"
                        >
                          <item.icon className="w-5 h-5" />
                          <span>{item.name}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-auto pb-4">
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <button 
                        onClick={handleSignOut}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors w-full"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-display font-bold text-foreground">Settings</h1>
              <p className="text-muted-foreground mt-1">
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
              <div className="text-center py-16">
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
    </SidebarProvider>
  );
}
