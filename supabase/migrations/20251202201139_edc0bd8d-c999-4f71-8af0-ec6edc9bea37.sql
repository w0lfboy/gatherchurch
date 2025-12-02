-- Create tenants table for multi-tenancy
CREATE TABLE public.tenants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  primary_color TEXT DEFAULT '#6366f1',
  subscription_tier TEXT DEFAULT 'trial',
  subscription_status TEXT DEFAULT 'active',
  trial_ends_at TIMESTAMP WITH TIME ZONE DEFAULT (now() + interval '14 days'),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add tenant_id to profiles
ALTER TABLE public.profiles ADD COLUMN tenant_id UUID REFERENCES public.tenants(id) ON DELETE SET NULL;

-- Create tenant_members junction table for user-tenant relationships
CREATE TABLE public.tenant_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member',
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(tenant_id, user_id)
);

-- Enable RLS
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_members ENABLE ROW LEVEL SECURITY;

-- Function to check if user is a member of a tenant
CREATE OR REPLACE FUNCTION public.is_tenant_member(_user_id UUID, _tenant_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.tenant_members
    WHERE user_id = _user_id AND tenant_id = _tenant_id
  )
$$;

-- Function to check if user is a tenant admin
CREATE OR REPLACE FUNCTION public.is_tenant_admin(_user_id UUID, _tenant_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.tenant_members
    WHERE user_id = _user_id AND tenant_id = _tenant_id AND role IN ('admin', 'owner')
  )
$$;

-- Function to get user's current tenant
CREATE OR REPLACE FUNCTION public.get_user_tenant_id(_user_id UUID)
RETURNS UUID
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT tenant_id FROM public.profiles WHERE id = _user_id
$$;

-- RLS for tenants
CREATE POLICY "Users can view their own tenants"
ON public.tenants FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.tenant_members
    WHERE tenant_members.tenant_id = tenants.id
    AND tenant_members.user_id = auth.uid()
  )
);

CREATE POLICY "Anyone can create a tenant (for self-service signup)"
ON public.tenants FOR INSERT
WITH CHECK (true);

CREATE POLICY "Tenant admins can update their tenant"
ON public.tenants FOR UPDATE
USING (is_tenant_admin(auth.uid(), id));

-- RLS for tenant_members
CREATE POLICY "Members can view their tenant's members"
ON public.tenant_members FOR SELECT
USING (is_tenant_member(auth.uid(), tenant_id));

CREATE POLICY "Tenant admins can manage members"
ON public.tenant_members FOR ALL
USING (is_tenant_admin(auth.uid(), tenant_id));

CREATE POLICY "Users can join a tenant they created"
ON public.tenant_members FOR INSERT
WITH CHECK (user_id = auth.uid());

-- Update profiles RLS to include tenant isolation
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;
CREATE POLICY "Users can view profiles in their tenant"
ON public.profiles FOR SELECT
USING (
  tenant_id IS NULL OR 
  tenant_id = get_user_tenant_id(auth.uid()) OR
  is_super_admin(auth.uid())
);

-- Trigger for updated_at on tenants
CREATE TRIGGER update_tenants_updated_at
BEFORE UPDATE ON public.tenants
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();