import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

type AppRole = 'super_admin' | 'admin' | 'editor' | 'viewer' | 'custom';
type AppModule = 'people' | 'services' | 'groups' | 'events' | 'messaging' | 'giving' | 'checkins' | 'volunteers' | 'settings';
type PermissionAction = 'view' | 'create' | 'update' | 'delete' | 'export' | 'view_notes' | 'edit_notes' | 'view_confidential' | 'send_message' | 'approve' | 'schedule' | 'manage';

interface UserRole {
  id: string;
  role: AppRole;
  assigned_at: string;
}

interface RolePermission {
  module: AppModule;
  action: PermissionAction;
  is_granted: boolean;
}

interface PermissionsContextType {
  roles: UserRole[];
  permissions: RolePermission[];
  loading: boolean;
  isSuperAdmin: boolean;
  isAdmin: boolean;
  hasRole: (role: AppRole) => boolean;
  hasPermission: (module: AppModule, action: PermissionAction) => boolean;
  canView: (module: AppModule) => boolean;
  canEdit: (module: AppModule) => boolean;
  canDelete: (module: AppModule) => boolean;
  canExport: (module: AppModule) => boolean;
  refetch: () => Promise<void>;
}

const PermissionsContext = createContext<PermissionsContextType | undefined>(undefined);

export function PermissionsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [permissions, setPermissions] = useState<RolePermission[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPermissions = async () => {
    if (!user) {
      setRoles([]);
      setPermissions([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      // Fetch user roles
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('id, role, assigned_at')
        .eq('user_id', user.id);

      if (rolesError) throw rolesError;

      const typedRoles = (userRoles || []).map(r => ({
        ...r,
        role: r.role as AppRole
      }));
      setRoles(typedRoles);

      // Fetch permissions for user's roles
      if (typedRoles.length > 0) {
        const roleNames = typedRoles.map(r => r.role);
        const { data: rolePerms, error: permsError } = await supabase
          .from('role_permissions')
          .select('module, action, is_granted')
          .in('role', roleNames)
          .eq('is_granted', true);

        if (permsError) throw permsError;

        const typedPerms = (rolePerms || []).map(p => ({
          module: p.module as AppModule,
          action: p.action as PermissionAction,
          is_granted: p.is_granted
        }));
        setPermissions(typedPerms);
      } else {
        setPermissions([]);
      }
    } catch (error) {
      console.error('Error fetching permissions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, [user]);

  const isSuperAdmin = roles.some(r => r.role === 'super_admin');
  const isAdmin = roles.some(r => r.role === 'admin') || isSuperAdmin;

  const hasRole = (role: AppRole) => {
    if (isSuperAdmin) return true;
    return roles.some(r => r.role === role);
  };

  const hasPermission = (module: AppModule, action: PermissionAction) => {
    if (isSuperAdmin) return true;
    return permissions.some(p => p.module === module && p.action === action && p.is_granted);
  };

  const canView = (module: AppModule) => hasPermission(module, 'view');
  const canEdit = (module: AppModule) => hasPermission(module, 'update');
  const canDelete = (module: AppModule) => hasPermission(module, 'delete');
  const canExport = (module: AppModule) => hasPermission(module, 'export');

  return (
    <PermissionsContext.Provider value={{
      roles,
      permissions,
      loading,
      isSuperAdmin,
      isAdmin,
      hasRole,
      hasPermission,
      canView,
      canEdit,
      canDelete,
      canExport,
      refetch: fetchPermissions,
    }}>
      {children}
    </PermissionsContext.Provider>
  );
}

export function usePermissions() {
  const context = useContext(PermissionsContext);
  if (context === undefined) {
    throw new Error('usePermissions must be used within a PermissionsProvider');
  }
  return context;
}
