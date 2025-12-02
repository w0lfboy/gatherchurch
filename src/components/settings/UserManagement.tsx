import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { usePermissions } from "@/hooks/usePermissions";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search, MoreVertical, Shield, ShieldCheck, Eye, Edit3, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type AppRole = 'super_admin' | 'admin' | 'editor' | 'viewer' | 'custom';

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  is_active: boolean;
  created_at: string;
}

interface UserRole {
  id: string;
  role: AppRole;
}

interface UserWithRoles extends Profile {
  roles: UserRole[];
}

const roleColors: Record<AppRole, string> = {
  super_admin: "bg-coral text-white",
  admin: "bg-primary text-primary-foreground",
  editor: "bg-sage text-white",
  viewer: "bg-muted text-muted-foreground",
  custom: "bg-gold text-foreground",
};

const roleLabels: Record<AppRole, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  editor: "Editor",
  viewer: "Viewer",
  custom: "Custom",
};

export function UserManagement() {
  const { user } = useAuth();
  const { isSuperAdmin } = usePermissions();
  const { toast } = useToast();
  
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserWithRoles | null>(null);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [updatingRole, setUpdatingRole] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      const { data: allRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');

      if (rolesError) throw rolesError;

      const usersWithRoles: UserWithRoles[] = (profiles || []).map(profile => ({
        ...profile,
        roles: (allRoles || [])
          .filter(r => r.user_id === profile.id)
          .map(r => ({ id: r.id, role: r.role as AppRole }))
      }));

      setUsers(usersWithRoles);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(u => 
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (u.full_name && u.full_name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAssignRole = async (userId: string, role: AppRole) => {
    setUpdatingRole(true);
    try {
      // Check if user already has this role
      const existingRole = users.find(u => u.id === userId)?.roles.find(r => r.role === role);
      
      if (existingRole) {
        toast({
          title: "Role exists",
          description: "User already has this role",
        });
        return;
      }

      const { error } = await supabase
        .from('user_roles')
        .insert({
          user_id: userId,
          role: role,
          assigned_by: user?.id
        });

      if (error) throw error;

      toast({
        title: "Role assigned",
        description: `Successfully assigned ${roleLabels[role]} role`,
      });

      fetchUsers();
      setRoleDialogOpen(false);
    } catch (error: any) {
      console.error('Error assigning role:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to assign role",
        variant: "destructive",
      });
    } finally {
      setUpdatingRole(false);
    }
  };

  const handleRemoveRole = async (userId: string, roleId: string) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('id', roleId);

      if (error) throw error;

      toast({
        title: "Role removed",
        description: "Successfully removed role from user",
      });

      fetchUsers();
    } catch (error: any) {
      console.error('Error removing role:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to remove role",
        variant: "destructive",
      });
    }
  };

  const getInitials = (name: string | null, email: string) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return email.slice(0, 2).toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
        <CardDescription>
          Manage your church staff and volunteers. Assign roles to control access.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-3">
          {filteredUsers.map((userItem) => (
            <div
              key={userItem.id}
              className="flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={userItem.avatar_url || undefined} />
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">
                    {getInitials(userItem.full_name, userItem.email)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">
                    {userItem.full_name || 'No name'}
                  </p>
                  <p className="text-sm text-muted-foreground">{userItem.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  {userItem.roles.length === 0 ? (
                    <Badge variant="outline" className="text-muted-foreground">
                      No role
                    </Badge>
                  ) : (
                    userItem.roles.map((role) => (
                      <Badge 
                        key={role.id} 
                        className={`${roleColors[role.role]} cursor-pointer`}
                        onClick={() => isSuperAdmin && handleRemoveRole(userItem.id, role.id)}
                      >
                        {roleLabels[role.role]}
                      </Badge>
                    ))
                  )}
                </div>

                {isSuperAdmin && userItem.id !== user?.id && (
                  <Dialog open={roleDialogOpen && selectedUser?.id === userItem.id} onOpenChange={(open) => {
                    setRoleDialogOpen(open);
                    if (!open) setSelectedUser(null);
                  }}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DialogTrigger asChild>
                          <DropdownMenuItem onClick={() => setSelectedUser(userItem)}>
                            <Shield className="w-4 h-4 mr-2" />
                            Assign Role
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <DropdownMenuSeparator />
                        {userItem.roles.map((role) => (
                          <DropdownMenuItem 
                            key={role.id}
                            onClick={() => handleRemoveRole(userItem.id, role.id)}
                            className="text-destructive"
                          >
                            Remove {roleLabels[role.role]}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Assign Role</DialogTitle>
                        <DialogDescription>
                          Choose a role for {selectedUser?.full_name || selectedUser?.email}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-3 py-4">
                        {(['super_admin', 'admin', 'editor', 'viewer'] as AppRole[]).map((role) => (
                          <Button
                            key={role}
                            variant="outline"
                            className="justify-start h-auto py-3"
                            onClick={() => selectedUser && handleAssignRole(selectedUser.id, role)}
                            disabled={updatingRole}
                          >
                            <div className="flex items-center gap-3">
                              {role === 'super_admin' && <ShieldCheck className="w-5 h-5 text-coral" />}
                              {role === 'admin' && <Shield className="w-5 h-5 text-primary" />}
                              {role === 'editor' && <Edit3 className="w-5 h-5 text-sage" />}
                              {role === 'viewer' && <Eye className="w-5 h-5 text-muted-foreground" />}
                              <div className="text-left">
                                <p className="font-medium">{roleLabels[role]}</p>
                                <p className="text-xs text-muted-foreground">
                                  {role === 'super_admin' && 'Full access to everything'}
                                  {role === 'admin' && 'Manage most features'}
                                  {role === 'editor' && 'Create and edit content'}
                                  {role === 'viewer' && 'View-only access'}
                                </p>
                              </div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          ))}

          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              {searchQuery ? 'No users found matching your search' : 'No users yet'}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
