-- Migration: Create People and Households tables
-- This should be placed in supabase/migrations/ with a timestamp prefix
-- e.g., 20251222000001_create_people_tables.sql

-- ============================================================================
-- PEOPLE TABLE
-- ============================================================================
CREATE TABLE public.people (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  
  -- Basic info
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  
  -- Status and lifecycle
  status TEXT NOT NULL DEFAULT 'visitor' CHECK (status IN ('visitor', 'regular', 'member', 'volunteer', 'leader', 'inactive')),
  member_since DATE,
  first_visit DATE,
  
  -- Demographics
  birth_date DATE,
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  
  -- Household link
  household_id UUID,
  household_role TEXT CHECK (household_role IN ('head', 'spouse', 'child', 'other')),
  
  -- Background check
  background_check_status TEXT DEFAULT 'none' CHECK (background_check_status IN ('none', 'pending', 'approved', 'expired')),
  background_check_date DATE,
  
  -- Directory visibility (stored as JSONB for flexibility)
  directory_visibility JSONB DEFAULT '{"showInDirectory": true, "showEmail": true, "showPhone": false, "showAddress": false}'::jsonb,
  
  -- Pipeline tracking
  pipeline_stage_id UUID,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index for common queries
CREATE INDEX idx_people_tenant_id ON public.people(tenant_id);
CREATE INDEX idx_people_status ON public.people(tenant_id, status);
CREATE INDEX idx_people_household_id ON public.people(household_id);
CREATE INDEX idx_people_email ON public.people(tenant_id, email) WHERE email IS NOT NULL;

-- ============================================================================
-- HOUSEHOLDS TABLE
-- ============================================================================
CREATE TABLE public.households (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  
  name TEXT NOT NULL,
  primary_contact_id UUID, -- Will be linked to people after both tables exist
  
  -- Address
  street TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  country TEXT DEFAULT 'US',
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Add foreign key from people to households
ALTER TABLE public.people 
  ADD CONSTRAINT fk_people_household 
  FOREIGN KEY (household_id) REFERENCES public.households(id) ON DELETE SET NULL;

-- Add foreign key from households to people for primary contact
ALTER TABLE public.households
  ADD CONSTRAINT fk_households_primary_contact
  FOREIGN KEY (primary_contact_id) REFERENCES public.people(id) ON DELETE SET NULL;

-- Index for households
CREATE INDEX idx_households_tenant_id ON public.households(tenant_id);

-- ============================================================================
-- TAGS TABLE
-- ============================================================================
CREATE TABLE public.tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  
  name TEXT NOT NULL,
  color TEXT DEFAULT 'sage',
  category TEXT,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  
  UNIQUE(tenant_id, name)
);

CREATE INDEX idx_tags_tenant_id ON public.tags(tenant_id);

-- ============================================================================
-- PERSON_TAGS JUNCTION TABLE
-- ============================================================================
CREATE TABLE public.person_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  person_id UUID NOT NULL REFERENCES public.people(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  
  UNIQUE(person_id, tag_id)
);

CREATE INDEX idx_person_tags_person_id ON public.person_tags(person_id);
CREATE INDEX idx_person_tags_tag_id ON public.person_tags(tag_id);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

-- Enable RLS
ALTER TABLE public.people ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.households ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.person_tags ENABLE ROW LEVEL SECURITY;

-- PEOPLE RLS Policies
CREATE POLICY "Users can view people in their tenant"
ON public.people FOR SELECT
TO authenticated
USING (tenant_id = public.get_user_tenant_id(auth.uid()));

CREATE POLICY "Users with people:create can add people"
ON public.people FOR INSERT
TO authenticated
WITH CHECK (
  tenant_id = public.get_user_tenant_id(auth.uid())
  AND public.has_permission(auth.uid(), 'people', 'create')
);

CREATE POLICY "Users with people:update can edit people"
ON public.people FOR UPDATE
TO authenticated
USING (
  tenant_id = public.get_user_tenant_id(auth.uid())
  AND public.has_permission(auth.uid(), 'people', 'update')
);

CREATE POLICY "Users with people:delete can delete people"
ON public.people FOR DELETE
TO authenticated
USING (
  tenant_id = public.get_user_tenant_id(auth.uid())
  AND public.has_permission(auth.uid(), 'people', 'delete')
);

-- HOUSEHOLDS RLS Policies
CREATE POLICY "Users can view households in their tenant"
ON public.households FOR SELECT
TO authenticated
USING (tenant_id = public.get_user_tenant_id(auth.uid()));

CREATE POLICY "Users with people:create can add households"
ON public.households FOR INSERT
TO authenticated
WITH CHECK (
  tenant_id = public.get_user_tenant_id(auth.uid())
  AND public.has_permission(auth.uid(), 'people', 'create')
);

CREATE POLICY "Users with people:update can edit households"
ON public.households FOR UPDATE
TO authenticated
USING (
  tenant_id = public.get_user_tenant_id(auth.uid())
  AND public.has_permission(auth.uid(), 'people', 'update')
);

CREATE POLICY "Users with people:delete can delete households"
ON public.households FOR DELETE
TO authenticated
USING (
  tenant_id = public.get_user_tenant_id(auth.uid())
  AND public.has_permission(auth.uid(), 'people', 'delete')
);

-- TAGS RLS Policies
CREATE POLICY "Users can view tags in their tenant"
ON public.tags FOR SELECT
TO authenticated
USING (tenant_id = public.get_user_tenant_id(auth.uid()));

CREATE POLICY "Admins can manage tags"
ON public.tags FOR ALL
TO authenticated
USING (
  tenant_id = public.get_user_tenant_id(auth.uid())
  AND (public.is_super_admin(auth.uid()) OR public.has_role(auth.uid(), 'admin'))
);

-- PERSON_TAGS RLS Policies (join through people)
CREATE POLICY "Users can view person tags"
ON public.person_tags FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.people p 
    WHERE p.id = person_id 
    AND p.tenant_id = public.get_user_tenant_id(auth.uid())
  )
);

CREATE POLICY "Users with people:update can manage person tags"
ON public.person_tags FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.people p 
    WHERE p.id = person_id 
    AND p.tenant_id = public.get_user_tenant_id(auth.uid())
  )
  AND public.has_permission(auth.uid(), 'people', 'update')
);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Update updated_at trigger for people
CREATE TRIGGER update_people_updated_at
  BEFORE UPDATE ON public.people
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Update updated_at trigger for households
CREATE TRIGGER update_households_updated_at
  BEFORE UPDATE ON public.households
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
