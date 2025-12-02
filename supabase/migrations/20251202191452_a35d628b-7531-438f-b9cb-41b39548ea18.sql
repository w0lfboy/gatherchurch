-- Function to safely make the first super admin (only works if no super admins exist)
CREATE OR REPLACE FUNCTION public.make_first_super_admin(_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  super_admin_exists BOOLEAN;
BEGIN
  -- Check if any super admin already exists
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE role = 'super_admin'
  ) INTO super_admin_exists;
  
  -- Only proceed if no super admin exists
  IF super_admin_exists THEN
    RETURN false;
  END IF;
  
  -- Insert the super_admin role for the user
  INSERT INTO public.user_roles (user_id, role, assigned_by)
  VALUES (_user_id, 'super_admin', _user_id)
  ON CONFLICT (user_id, role) DO NOTHING;
  
  RETURN true;
END;
$$;

-- Function to check if any super admin exists (for UI display)
CREATE OR REPLACE FUNCTION public.has_any_super_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE role = 'super_admin'
  )
$$;