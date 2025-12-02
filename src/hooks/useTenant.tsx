import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface Tenant {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  primary_color: string | null;
  subscription_tier: string | null;
  subscription_status: string | null;
  trial_ends_at: string | null;
}

interface TenantContextType {
  tenant: Tenant | null;
  loading: boolean;
  error: string | null;
  createTenant: (name: string, slug: string) => Promise<{ tenant: Tenant | null; error: Error | null }>;
  switchTenant: (tenantId: string) => Promise<void>;
  refreshTenant: () => Promise<void>;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTenant = async () => {
    if (!user) {
      setTenant(null);
      setLoading(false);
      return;
    }

    try {
      // Get user's profile to find their tenant_id
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('tenant_id')
        .eq('id', user.id)
        .maybeSingle();

      if (profileError) throw profileError;

      if (profile?.tenant_id) {
        const { data: tenantData, error: tenantError } = await supabase
          .from('tenants')
          .select('*')
          .eq('id', profile.tenant_id)
          .maybeSingle();

        if (tenantError) throw tenantError;
        setTenant(tenantData);
      } else {
        setTenant(null);
      }
    } catch (err: any) {
      console.error('Error fetching tenant:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenant();
  }, [user]);

  const createTenant = async (name: string, slug: string) => {
    if (!user) {
      return { tenant: null, error: new Error('Must be logged in to create a tenant') };
    }

    try {
      // Create the tenant
      const { data: newTenant, error: tenantError } = await supabase
        .from('tenants')
        .insert({ name, slug })
        .select()
        .single();

      if (tenantError) throw tenantError;

      // Add user as tenant owner
      const { error: memberError } = await supabase
        .from('tenant_members')
        .insert({
          tenant_id: newTenant.id,
          user_id: user.id,
          role: 'owner'
        });

      if (memberError) throw memberError;

      // Update user's profile with tenant_id
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ tenant_id: newTenant.id })
        .eq('id', user.id);

      if (profileError) throw profileError;

      setTenant(newTenant);
      return { tenant: newTenant, error: null };
    } catch (err: any) {
      console.error('Error creating tenant:', err);
      return { tenant: null, error: err };
    }
  };

  const switchTenant = async (tenantId: string) => {
    if (!user) return;

    try {
      // Verify user is a member of this tenant
      const { data: membership, error: memberError } = await supabase
        .from('tenant_members')
        .select('*')
        .eq('tenant_id', tenantId)
        .eq('user_id', user.id)
        .maybeSingle();

      if (memberError) throw memberError;
      if (!membership) throw new Error('You are not a member of this organization');

      // Update profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ tenant_id: tenantId })
        .eq('id', user.id);

      if (profileError) throw profileError;

      await fetchTenant();
    } catch (err: any) {
      console.error('Error switching tenant:', err);
      setError(err.message);
    }
  };

  const refreshTenant = async () => {
    await fetchTenant();
  };

  return (
    <TenantContext.Provider value={{ tenant, loading, error, createTenant, switchTenant, refreshTenant }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
}
