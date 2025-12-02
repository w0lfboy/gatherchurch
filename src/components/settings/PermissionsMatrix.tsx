import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, Music, UsersRound, CalendarDays, MessageSquare, 
  Heart, CheckCircle, HandHelping, Settings, Loader2 
} from "lucide-react";

type AppRole = 'admin' | 'editor' | 'viewer';
type AppModule = 'people' | 'services' | 'groups' | 'events' | 'messaging' | 'giving' | 'checkins' | 'volunteers' | 'settings';
type PermissionAction = 'view' | 'create' | 'update' | 'delete' | 'export' | 'view_notes' | 'edit_notes' | 'view_confidential' | 'send_message' | 'approve' | 'schedule' | 'manage';

interface RolePermission {
  id: string;
  role: AppRole;
  module: AppModule;
  action: PermissionAction;
  is_granted: boolean;
}

const modules: { id: AppModule; name: string; icon: any }[] = [
  { id: 'people', name: 'People', icon: Users },
  { id: 'services', name: 'Services', icon: Music },
  { id: 'groups', name: 'Groups', icon: UsersRound },
  { id: 'events', name: 'Events', icon: CalendarDays },
  { id: 'messaging', name: 'Messaging', icon: MessageSquare },
  { id: 'giving', name: 'Giving', icon: Heart },
  { id: 'checkins', name: 'Check-Ins', icon: CheckCircle },
  { id: 'volunteers', name: 'Volunteers', icon: HandHelping },
  { id: 'settings', name: 'Settings', icon: Settings },
];

const actionLabels: Record<PermissionAction, string> = {
  view: 'View',
  create: 'Create',
  update: 'Edit',
  delete: 'Delete',
  export: 'Export',
  view_notes: 'View Notes',
  edit_notes: 'Edit Notes',
  view_confidential: 'Confidential',
  send_message: 'Send Message',
  approve: 'Approve',
  schedule: 'Schedule',
  manage: 'Manage',
};

const moduleActions: Record<AppModule, PermissionAction[]> = {
  people: ['view', 'create', 'update', 'delete', 'export', 'view_notes', 'edit_notes', 'view_confidential'],
  services: ['view', 'create', 'update', 'delete', 'schedule', 'approve', 'manage'],
  groups: ['view', 'create', 'update', 'delete', 'send_message', 'manage'],
  events: ['view', 'create', 'update', 'delete', 'approve', 'manage'],
  messaging: ['view', 'create', 'send_message', 'manage'],
  giving: ['view', 'export', 'manage', 'view_confidential'],
  checkins: ['view', 'create', 'update', 'approve', 'manage'],
  volunteers: ['view', 'create', 'update', 'schedule', 'approve', 'manage'],
  settings: ['view', 'manage'],
};

const roles: { id: AppRole; name: string; color: string }[] = [
  { id: 'admin', name: 'Admin', color: 'bg-primary text-primary-foreground' },
  { id: 'editor', name: 'Editor', color: 'bg-sage text-white' },
  { id: 'viewer', name: 'Viewer', color: 'bg-muted text-muted-foreground' },
];

export function PermissionsMatrix() {
  const { toast } = useToast();
  const [permissions, setPermissions] = useState<RolePermission[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [selectedModule, setSelectedModule] = useState<AppModule>('people');

  const fetchPermissions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('role_permissions')
        .select('*')
        .in('role', ['admin', 'editor', 'viewer']);

      if (error) throw error;

      const typedData = (data || []).map(p => ({
        ...p,
        role: p.role as AppRole,
        module: p.module as AppModule,
        action: p.action as PermissionAction,
      }));
      setPermissions(typedData);
    } catch (error) {
      console.error('Error fetching permissions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  const hasPermission = (role: AppRole, module: AppModule, action: PermissionAction) => {
    return permissions.some(p => 
      p.role === role && p.module === module && p.action === action && p.is_granted
    );
  };

  const togglePermission = async (role: AppRole, module: AppModule, action: PermissionAction) => {
    const key = `${role}-${module}-${action}`;
    setSaving(key);

    try {
      const existing = permissions.find(p => 
        p.role === role && p.module === module && p.action === action
      );

      if (existing) {
        // Update existing permission
        const { error } = await supabase
          .from('role_permissions')
          .update({ is_granted: !existing.is_granted })
          .eq('id', existing.id);

        if (error) throw error;

        setPermissions(prev => prev.map(p => 
          p.id === existing.id ? { ...p, is_granted: !p.is_granted } : p
        ));
      } else {
        // Create new permission
        const { data, error } = await supabase
          .from('role_permissions')
          .insert({
            role,
            module,
            action,
            is_granted: true,
          })
          .select()
          .single();

        if (error) throw error;

        const newPerm: RolePermission = {
          ...data,
          role: data.role as AppRole,
          module: data.module as AppModule,
          action: data.action as PermissionAction,
        };
        setPermissions(prev => [...prev, newPerm]);
      }

      toast({
        title: "Permission updated",
        description: `${actionLabels[action]} permission for ${role} updated`,
      });
    } catch (error: any) {
      console.error('Error updating permission:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update permission",
        variant: "destructive",
      });
    } finally {
      setSaving(null);
    }
  };

  const currentModule = modules.find(m => m.id === selectedModule);
  const currentActions = moduleActions[selectedModule];

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
        <CardTitle>Permissions Matrix</CardTitle>
        <CardDescription>
          Configure what each role can do in each module. Super Admins always have full access.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedModule} onValueChange={(v) => setSelectedModule(v as AppModule)}>
          <TabsList className="flex-wrap h-auto gap-1 bg-muted/50 p-1">
            {modules.map((module) => (
              <TabsTrigger 
                key={module.id} 
                value={module.id}
                className="gap-2 data-[state=active]:bg-background"
              >
                <module.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{module.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {modules.map((module) => (
            <TabsContent key={module.id} value={module.id} className="mt-6">
              <div className="rounded-lg border border-border overflow-hidden">
                <div className="bg-muted/50 p-4 flex items-center gap-3">
                  <module.icon className="w-5 h-5 text-primary" />
                  <div>
                    <h3 className="font-medium text-foreground">{module.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage permissions for the {module.name.toLowerCase()} module
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-4 font-medium text-muted-foreground">
                          Permission
                        </th>
                        {roles.map((role) => (
                          <th key={role.id} className="p-4 text-center">
                            <Badge className={role.color}>{role.name}</Badge>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {moduleActions[module.id].map((action) => (
                        <tr key={action} className="border-b border-border last:border-0">
                          <td className="p-4 font-medium text-foreground">
                            {actionLabels[action]}
                          </td>
                          {roles.map((role) => {
                            const key = `${role.id}-${module.id}-${action}`;
                            const isChecked = hasPermission(role.id, module.id, action);
                            const isLoading = saving === key;

                            return (
                              <td key={role.id} className="p-4 text-center">
                                <div className="flex justify-center">
                                  {isLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <Checkbox
                                      checked={isChecked}
                                      onCheckedChange={() => togglePermission(role.id, module.id, action)}
                                      className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                    />
                                  )}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Super Admins always have full access to all modules and cannot be restricted. 
            Changes take effect immediately for all users with the affected role.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
