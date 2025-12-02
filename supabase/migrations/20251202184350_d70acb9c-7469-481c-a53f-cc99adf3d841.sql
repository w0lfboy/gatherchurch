-- Create app role enum
CREATE TYPE public.app_role AS ENUM ('super_admin', 'admin', 'editor', 'viewer', 'custom');

-- Create modules enum for the app
CREATE TYPE public.app_module AS ENUM (
  'people', 'services', 'groups', 'events', 
  'messaging', 'giving', 'checkins', 'volunteers', 'settings'
);

-- Create permission action enum
CREATE TYPE public.permission_action AS ENUM (
  'view', 'create', 'update', 'delete', 'export',
  'view_notes', 'edit_notes', 'view_confidential',
  'send_message', 'approve', 'schedule', 'manage'
);

-- Profiles table for user metadata
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  is_active BOOLEAN DEFAULT true,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- User roles table (users can have multiple roles)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'viewer',
  assigned_by UUID REFERENCES auth.users(id),
  assigned_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Custom roles table for user-defined roles
CREATE TABLE public.custom_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  color TEXT DEFAULT '#6B7280',
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Role permissions - maps roles to module permissions
CREATE TABLE public.role_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role app_role,
  custom_role_id UUID REFERENCES public.custom_roles(id) ON DELETE CASCADE,
  module app_module NOT NULL,
  action permission_action NOT NULL,
  is_granted BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(role, module, action),
  UNIQUE(custom_role_id, module, action),
  CHECK (role IS NOT NULL OR custom_role_id IS NOT NULL)
);

-- User custom role assignments
CREATE TABLE public.user_custom_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  custom_role_id UUID NOT NULL REFERENCES public.custom_roles(id) ON DELETE CASCADE,
  assigned_by UUID REFERENCES auth.users(id),
  assigned_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, custom_role_id)
);

-- Audit logs for tracking permission changes
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- User invitations
CREATE TABLE public.user_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  role app_role DEFAULT 'viewer',
  custom_role_id UUID REFERENCES public.custom_roles(id),
  invited_by UUID REFERENCES auth.users(id),
  token TEXT NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
  expires_at TIMESTAMPTZ DEFAULT (now() + interval '7 days'),
  accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_custom_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_invitations ENABLE ROW LEVEL SECURITY;

-- Security definer function to check if user has a role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Function to check if user is super admin
CREATE OR REPLACE FUNCTION public.is_super_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(_user_id, 'super_admin')
$$;

-- Function to check if user has permission on a module
CREATE OR REPLACE FUNCTION public.has_permission(_user_id UUID, _module app_module, _action permission_action)
RETURNS BOOLEAN
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  has_perm BOOLEAN := false;
BEGIN
  -- Super admins have all permissions
  IF public.is_super_admin(_user_id) THEN
    RETURN true;
  END IF;
  
  -- Check standard role permissions
  SELECT EXISTS (
    SELECT 1 
    FROM public.user_roles ur
    JOIN public.role_permissions rp ON rp.role = ur.role
    WHERE ur.user_id = _user_id 
      AND rp.module = _module 
      AND rp.action = _action
      AND rp.is_granted = true
  ) INTO has_perm;
  
  IF has_perm THEN
    RETURN true;
  END IF;
  
  -- Check custom role permissions
  SELECT EXISTS (
    SELECT 1 
    FROM public.user_custom_roles ucr
    JOIN public.role_permissions rp ON rp.custom_role_id = ucr.custom_role_id
    WHERE ucr.user_id = _user_id 
      AND rp.module = _module 
      AND rp.action = _action
      AND rp.is_granted = true
  ) INTO has_perm;
  
  RETURN has_perm;
END;
$$;

-- RLS Policies

-- Profiles: Users can view all profiles, but only update their own
CREATE POLICY "Users can view all profiles" ON public.profiles
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- User roles: Super admins can manage, others can view
CREATE POLICY "Super admins can manage user roles" ON public.user_roles
  FOR ALL TO authenticated USING (public.is_super_admin(auth.uid()));

CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (user_id = auth.uid());

-- Custom roles: Super admins can manage, others can view active ones
CREATE POLICY "Super admins can manage custom roles" ON public.custom_roles
  FOR ALL TO authenticated USING (public.is_super_admin(auth.uid()));

CREATE POLICY "Users can view active custom roles" ON public.custom_roles
  FOR SELECT TO authenticated USING (is_active = true);

-- Role permissions: Super admins can manage, authenticated can view
CREATE POLICY "Super admins can manage role permissions" ON public.role_permissions
  FOR ALL TO authenticated USING (public.is_super_admin(auth.uid()));

CREATE POLICY "Users can view role permissions" ON public.role_permissions
  FOR SELECT TO authenticated USING (true);

-- User custom roles: Super admins can manage
CREATE POLICY "Super admins can manage user custom roles" ON public.user_custom_roles
  FOR ALL TO authenticated USING (public.is_super_admin(auth.uid()));

CREATE POLICY "Users can view their custom roles" ON public.user_custom_roles
  FOR SELECT TO authenticated USING (user_id = auth.uid());

-- Audit logs: Super admins can view all, admins can view non-sensitive
CREATE POLICY "Super admins can view all audit logs" ON public.audit_logs
  FOR SELECT TO authenticated USING (public.is_super_admin(auth.uid()));

CREATE POLICY "Super admins can insert audit logs" ON public.audit_logs
  FOR INSERT TO authenticated WITH CHECK (true);

-- Invitations: Super admins and admins can manage
CREATE POLICY "Admins can manage invitations" ON public.user_invitations
  FOR ALL TO authenticated 
  USING (public.is_super_admin(auth.uid()) OR public.has_role(auth.uid(), 'admin'));

-- Trigger to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_custom_roles_updated_at
  BEFORE UPDATE ON public.custom_roles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default role permissions for standard roles
INSERT INTO public.role_permissions (role, module, action, is_granted) VALUES
-- Admin permissions (full access to assigned modules)
('admin', 'people', 'view', true), ('admin', 'people', 'create', true), ('admin', 'people', 'update', true), 
('admin', 'people', 'delete', true), ('admin', 'people', 'export', true), ('admin', 'people', 'view_notes', true),
('admin', 'people', 'edit_notes', true),
('admin', 'services', 'view', true), ('admin', 'services', 'create', true), ('admin', 'services', 'update', true),
('admin', 'services', 'delete', true), ('admin', 'services', 'schedule', true), ('admin', 'services', 'approve', true),
('admin', 'groups', 'view', true), ('admin', 'groups', 'create', true), ('admin', 'groups', 'update', true),
('admin', 'groups', 'delete', true), ('admin', 'groups', 'send_message', true), ('admin', 'groups', 'manage', true),
('admin', 'events', 'view', true), ('admin', 'events', 'create', true), ('admin', 'events', 'update', true),
('admin', 'events', 'delete', true), ('admin', 'events', 'approve', true), ('admin', 'events', 'manage', true),
('admin', 'messaging', 'view', true), ('admin', 'messaging', 'create', true), ('admin', 'messaging', 'send_message', true),
('admin', 'messaging', 'manage', true),
('admin', 'giving', 'view', true), ('admin', 'giving', 'export', true), ('admin', 'giving', 'manage', true),
('admin', 'checkins', 'view', true), ('admin', 'checkins', 'create', true), ('admin', 'checkins', 'update', true),
('admin', 'checkins', 'approve', true), ('admin', 'checkins', 'manage', true),
('admin', 'volunteers', 'view', true), ('admin', 'volunteers', 'create', true), ('admin', 'volunteers', 'update', true),
('admin', 'volunteers', 'schedule', true), ('admin', 'volunteers', 'approve', true), ('admin', 'volunteers', 'manage', true),
-- Editor permissions (can create/update, limited delete)
('editor', 'people', 'view', true), ('editor', 'people', 'create', true), ('editor', 'people', 'update', true),
('editor', 'people', 'view_notes', true), ('editor', 'people', 'edit_notes', true),
('editor', 'services', 'view', true), ('editor', 'services', 'create', true), ('editor', 'services', 'update', true),
('editor', 'services', 'schedule', true),
('editor', 'groups', 'view', true), ('editor', 'groups', 'create', true), ('editor', 'groups', 'update', true),
('editor', 'groups', 'send_message', true),
('editor', 'events', 'view', true), ('editor', 'events', 'create', true), ('editor', 'events', 'update', true),
('editor', 'messaging', 'view', true), ('editor', 'messaging', 'create', true), ('editor', 'messaging', 'send_message', true),
('editor', 'checkins', 'view', true), ('editor', 'checkins', 'create', true), ('editor', 'checkins', 'update', true),
('editor', 'volunteers', 'view', true), ('editor', 'volunteers', 'create', true), ('editor', 'volunteers', 'update', true),
('editor', 'volunteers', 'schedule', true),
-- Viewer permissions (read-only)
('viewer', 'people', 'view', true),
('viewer', 'services', 'view', true),
('viewer', 'groups', 'view', true),
('viewer', 'events', 'view', true),
('viewer', 'messaging', 'view', true),
('viewer', 'checkins', 'view', true),
('viewer', 'volunteers', 'view', true);