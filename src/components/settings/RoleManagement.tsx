import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Edit2, Trash2, Shield, ShieldCheck, Eye, Edit3, Loader2 } from "lucide-react";

interface CustomRole {
  id: string;
  name: string;
  description: string | null;
  color: string;
  is_active: boolean;
  created_at: string;
}

const defaultRoles = [
  {
    name: "Super Admin",
    description: "Full access to every module. Can manage roles, billing, and system settings.",
    icon: ShieldCheck,
    color: "text-coral",
    permissions: "All permissions",
  },
  {
    name: "Admin",
    description: "Full access to assigned modules. Cannot modify roles or system settings.",
    icon: Shield,
    color: "text-primary",
    permissions: "Module-level access",
  },
  {
    name: "Editor",
    description: "Can create, update, and manage content within assigned modules.",
    icon: Edit3,
    color: "text-sage",
    permissions: "Create, Read, Update",
  },
  {
    name: "Viewer",
    description: "Read-only access to assigned modules. No editing or exporting.",
    icon: Eye,
    color: "text-muted-foreground",
    permissions: "Read only",
  },
];

export function RoleManagement() {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [customRoles, setCustomRoles] = useState<CustomRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<CustomRole | null>(null);
  const [saving, setSaving] = useState(false);
  
  // Form state
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [roleColor, setRoleColor] = useState("#6B7280");

  const fetchCustomRoles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('custom_roles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCustomRoles(data || []);
    } catch (error) {
      console.error('Error fetching custom roles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomRoles();
  }, []);

  const handleOpenDialog = (role?: CustomRole) => {
    if (role) {
      setEditingRole(role);
      setRoleName(role.name);
      setRoleDescription(role.description || "");
      setRoleColor(role.color);
    } else {
      setEditingRole(null);
      setRoleName("");
      setRoleDescription("");
      setRoleColor("#6B7280");
    }
    setDialogOpen(true);
  };

  const handleSaveRole = async () => {
    if (!roleName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a role name",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      if (editingRole) {
        const { error } = await supabase
          .from('custom_roles')
          .update({
            name: roleName,
            description: roleDescription,
            color: roleColor,
          })
          .eq('id', editingRole.id);

        if (error) throw error;

        toast({
          title: "Role updated",
          description: `${roleName} has been updated`,
        });
      } else {
        const { error } = await supabase
          .from('custom_roles')
          .insert({
            name: roleName,
            description: roleDescription,
            color: roleColor,
            created_by: user?.id,
          });

        if (error) throw error;

        toast({
          title: "Role created",
          description: `${roleName} has been created`,
        });
      }

      setDialogOpen(false);
      fetchCustomRoles();
    } catch (error: any) {
      console.error('Error saving role:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save role",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteRole = async (roleId: string) => {
    try {
      const { error } = await supabase
        .from('custom_roles')
        .delete()
        .eq('id', roleId);

      if (error) throw error;

      toast({
        title: "Role deleted",
        description: "Custom role has been deleted",
      });

      fetchCustomRoles();
    } catch (error: any) {
      console.error('Error deleting role:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete role",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Default Roles */}
      <Card>
        <CardHeader>
          <CardTitle>Default Roles</CardTitle>
          <CardDescription>
            These are the built-in roles with predefined permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {defaultRoles.map((role) => (
              <div
                key={role.name}
                className="p-4 rounded-xl border border-border bg-card"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${role.color}`}>
                    <role.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{role.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {role.description}
                    </p>
                    <Badge variant="outline" className="mt-2">
                      {role.permissions}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Custom Roles */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Custom Roles</CardTitle>
            <CardDescription>
              Create custom roles with specific permissions for your church
            </CardDescription>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="w-4 h-4 mr-2" />
                Create Role
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingRole ? 'Edit Role' : 'Create Custom Role'}
                </DialogTitle>
                <DialogDescription>
                  {editingRole 
                    ? 'Update the role details below'
                    : 'Create a new role with custom permissions'}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="role-name">Role Name</Label>
                  <Input
                    id="role-name"
                    placeholder="e.g., Worship Leader"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role-description">Description</Label>
                  <Textarea
                    id="role-description"
                    placeholder="Describe what this role can do..."
                    value={roleDescription}
                    onChange={(e) => setRoleDescription(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role-color">Color</Label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      id="role-color"
                      value={roleColor}
                      onChange={(e) => setRoleColor(e.target.value)}
                      className="w-10 h-10 rounded cursor-pointer"
                    />
                    <Input
                      value={roleColor}
                      onChange={(e) => setRoleColor(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveRole} disabled={saving}>
                  {saving && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                  {editingRole ? 'Save Changes' : 'Create Role'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : customRoles.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Shield className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No custom roles yet</p>
              <p className="text-sm">Create a custom role to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {customRoles.map((role) => (
                <div
                  key={role.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-border bg-card"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: role.color + '20' }}
                    >
                      <Shield className="w-5 h-5" style={{ color: role.color }} />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{role.name}</h3>
                      {role.description && (
                        <p className="text-sm text-muted-foreground">{role.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleOpenDialog(role)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDeleteRole(role.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
