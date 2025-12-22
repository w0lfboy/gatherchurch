import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useTenant } from '@/hooks/useTenant';
import { toast } from 'sonner';
import type { Person, PeopleFilter } from '@/types/people';

// Database row type (matches Supabase schema)
interface PersonRow {
  id: string;
  tenant_id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
  status: string;
  member_since: string | null;
  first_visit: string | null;
  birth_date: string | null;
  gender: string | null;
  household_id: string | null;
  household_role: string | null;
  background_check_status: string | null;
  background_check_date: string | null;
  directory_visibility: Record<string, boolean> | null;
  pipeline_stage_id: string | null;
  created_at: string;
  updated_at: string;
}

// Transform database row to frontend Person type
function transformPerson(row: PersonRow): Person {
  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email || undefined,
    phone: row.phone || undefined,
    avatar: row.avatar_url || undefined,
    status: row.status as Person['status'],
    householdId: row.household_id || undefined,
    householdRole: row.household_role as Person['householdRole'],
    birthDate: row.birth_date || undefined,
    gender: row.gender as Person['gender'],
    memberSince: row.member_since || undefined,
    firstVisit: row.first_visit || undefined,
    tags: [], // Will be populated separately
    pipelineStageId: row.pipeline_stage_id || undefined,
    backgroundCheckStatus: row.background_check_status as Person['backgroundCheckStatus'],
    backgroundCheckDate: row.background_check_date || undefined,
    directoryVisibility: row.directory_visibility as Person['directoryVisibility'],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// Input type for creating/updating people
interface PersonInput {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  status?: Person['status'];
  birthDate?: string;
  gender?: Person['gender'];
  householdId?: string;
  householdRole?: Person['householdRole'];
  memberSince?: string;
  firstVisit?: string;
}

// ============================================================================
// QUERIES
// ============================================================================

/**
 * Fetch all people for the current tenant
 */
export function usePeople(filter?: PeopleFilter) {
  const { currentTenant } = useTenant();
  
  return useQuery({
    queryKey: ['people', currentTenant?.id, filter],
    queryFn: async () => {
      if (!currentTenant?.id) {
        return [];
      }

      let query = supabase
        .from('people')
        .select('*')
        .order('last_name', { ascending: true })
        .order('first_name', { ascending: true });

      // Apply filters
      if (filter?.search) {
        query = query.or(`first_name.ilike.%${filter.search}%,last_name.ilike.%${filter.search}%,email.ilike.%${filter.search}%`);
      }

      if (filter?.status && filter.status.length > 0) {
        query = query.in('status', filter.status);
      }

      if (filter?.householdId) {
        query = query.eq('household_id', filter.householdId);
      }

      if (filter?.hasEmail !== undefined) {
        if (filter.hasEmail) {
          query = query.not('email', 'is', null);
        } else {
          query = query.is('email', null);
        }
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching people:', error);
        throw error;
      }

      return (data || []).map(transformPerson);
    },
    enabled: !!currentTenant?.id,
  });
}

/**
 * Fetch a single person by ID
 */
export function usePerson(personId: string | undefined) {
  const { currentTenant } = useTenant();
  
  return useQuery({
    queryKey: ['person', personId],
    queryFn: async () => {
      if (!personId) {
        return null;
      }

      const { data, error } = await supabase
        .from('people')
        .select('*')
        .eq('id', personId)
        .single();

      if (error) {
        console.error('Error fetching person:', error);
        throw error;
      }

      return transformPerson(data);
    },
    enabled: !!personId && !!currentTenant?.id,
  });
}

/**
 * Fetch people with their tags
 */
export function usePeopleWithTags(filter?: PeopleFilter) {
  const { currentTenant } = useTenant();
  
  return useQuery({
    queryKey: ['people-with-tags', currentTenant?.id, filter],
    queryFn: async () => {
      if (!currentTenant?.id) {
        return [];
      }

      // Fetch people
      let query = supabase
        .from('people')
        .select(`
          *,
          person_tags (
            tag_id,
            tags (
              id,
              name,
              color,
              category
            )
          )
        `)
        .order('last_name', { ascending: true });

      if (filter?.search) {
        query = query.or(`first_name.ilike.%${filter.search}%,last_name.ilike.%${filter.search}%`);
      }

      if (filter?.status && filter.status.length > 0) {
        query = query.in('status', filter.status);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching people with tags:', error);
        throw error;
      }

      return (data || []).map((row: any) => {
        const person = transformPerson(row);
        person.tags = (row.person_tags || []).map((pt: any) => pt.tag_id);
        return person;
      });
    },
    enabled: !!currentTenant?.id,
  });
}

// ============================================================================
// MUTATIONS
// ============================================================================

/**
 * Create a new person
 */
export function useCreatePerson() {
  const queryClient = useQueryClient();
  const { currentTenant } = useTenant();

  return useMutation({
    mutationFn: async (input: PersonInput) => {
      if (!currentTenant?.id) {
        throw new Error('No tenant selected');
      }

      const { data, error } = await supabase
        .from('people')
        .insert({
          tenant_id: currentTenant.id,
          first_name: input.firstName,
          last_name: input.lastName,
          email: input.email || null,
          phone: input.phone || null,
          status: input.status || 'visitor',
          birth_date: input.birthDate || null,
          gender: input.gender || null,
          household_id: input.householdId || null,
          household_role: input.householdRole || null,
          member_since: input.memberSince || null,
          first_visit: input.firstVisit || new Date().toISOString().split('T')[0],
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating person:', error);
        throw error;
      }

      return transformPerson(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['people'] });
      toast.success('Person added successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to add person: ${error.message}`);
    },
  });
}

/**
 * Update an existing person
 */
export function useUpdatePerson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...input }: PersonInput & { id: string }) => {
      const updates: Record<string, any> = {};
      
      if (input.firstName !== undefined) updates.first_name = input.firstName;
      if (input.lastName !== undefined) updates.last_name = input.lastName;
      if (input.email !== undefined) updates.email = input.email || null;
      if (input.phone !== undefined) updates.phone = input.phone || null;
      if (input.status !== undefined) updates.status = input.status;
      if (input.birthDate !== undefined) updates.birth_date = input.birthDate || null;
      if (input.gender !== undefined) updates.gender = input.gender || null;
      if (input.householdId !== undefined) updates.household_id = input.householdId || null;
      if (input.householdRole !== undefined) updates.household_role = input.householdRole || null;
      if (input.memberSince !== undefined) updates.member_since = input.memberSince || null;

      const { data, error } = await supabase
        .from('people')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating person:', error);
        throw error;
      }

      return transformPerson(data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['people'] });
      queryClient.invalidateQueries({ queryKey: ['person', data.id] });
      toast.success('Person updated successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update person: ${error.message}`);
    },
  });
}

/**
 * Delete a person
 */
export function useDeletePerson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (personId: string) => {
      const { error } = await supabase
        .from('people')
        .delete()
        .eq('id', personId);

      if (error) {
        console.error('Error deleting person:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['people'] });
      toast.success('Person deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete person: ${error.message}`);
    },
  });
}

// ============================================================================
// TAGS
// ============================================================================

/**
 * Add a tag to a person
 */
export function useAddPersonTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ personId, tagId }: { personId: string; tagId: string }) => {
      const { error } = await supabase
        .from('person_tags')
        .insert({ person_id: personId, tag_id: tagId });

      if (error) {
        console.error('Error adding tag:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['people'] });
      queryClient.invalidateQueries({ queryKey: ['people-with-tags'] });
    },
  });
}

/**
 * Remove a tag from a person
 */
export function useRemovePersonTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ personId, tagId }: { personId: string; tagId: string }) => {
      const { error } = await supabase
        .from('person_tags')
        .delete()
        .eq('person_id', personId)
        .eq('tag_id', tagId);

      if (error) {
        console.error('Error removing tag:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['people'] });
      queryClient.invalidateQueries({ queryKey: ['people-with-tags'] });
    },
  });
}

// ============================================================================
// STATISTICS
// ============================================================================

/**
 * Get people statistics for the dashboard
 */
export function usePeopleStats() {
  const { currentTenant } = useTenant();
  
  return useQuery({
    queryKey: ['people-stats', currentTenant?.id],
    queryFn: async () => {
      if (!currentTenant?.id) {
        return null;
      }

      const { data, error } = await supabase
        .from('people')
        .select('status');

      if (error) {
        console.error('Error fetching people stats:', error);
        throw error;
      }

      const stats = {
        total: data?.length || 0,
        members: data?.filter(p => p.status === 'member').length || 0,
        visitors: data?.filter(p => p.status === 'visitor').length || 0,
        volunteers: data?.filter(p => p.status === 'volunteer').length || 0,
        leaders: data?.filter(p => p.status === 'leader').length || 0,
        inactive: data?.filter(p => p.status === 'inactive').length || 0,
      };

      return stats;
    },
    enabled: !!currentTenant?.id,
  });
}
