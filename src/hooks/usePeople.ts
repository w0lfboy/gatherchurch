import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTenant } from '@/hooks/useTenant';
import { toast } from 'sonner';
import type { Person, PeopleFilter } from '@/types/people';
import { mockPeople } from '@/data/mockPeopleData';

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
// QUERIES (Using mock data until people table is created)
// ============================================================================

/**
 * Fetch all people for the current tenant
 */
export function usePeople(filter?: PeopleFilter) {
  const { tenant } = useTenant();
  
  return useQuery({
    queryKey: ['people', tenant?.id, filter],
    queryFn: async () => {
      // Using mock data since people table doesn't exist yet
      let filtered = [...mockPeople];

      // Apply filters
      if (filter?.search) {
        const search = filter.search.toLowerCase();
        filtered = filtered.filter(p => 
          p.firstName.toLowerCase().includes(search) ||
          p.lastName.toLowerCase().includes(search) ||
          p.email?.toLowerCase().includes(search)
        );
      }

      if (filter?.status && filter.status.length > 0) {
        filtered = filtered.filter(p => filter.status!.includes(p.status));
      }

      if (filter?.householdId) {
        filtered = filtered.filter(p => p.householdId === filter.householdId);
      }

      if (filter?.hasEmail !== undefined) {
        filtered = filtered.filter(p => filter.hasEmail ? !!p.email : !p.email);
      }

      return filtered;
    },
  });
}

/**
 * Fetch a single person by ID
 */
export function usePerson(personId: string | undefined) {
  return useQuery({
    queryKey: ['person', personId],
    queryFn: async () => {
      if (!personId) return null;
      return mockPeople.find(p => p.id === personId) || null;
    },
    enabled: !!personId,
  });
}

/**
 * Fetch people with their tags
 */
export function usePeopleWithTags(filter?: PeopleFilter) {
  const { tenant } = useTenant();
  
  return useQuery({
    queryKey: ['people-with-tags', tenant?.id, filter],
    queryFn: async () => {
      let filtered = [...mockPeople];

      if (filter?.search) {
        const search = filter.search.toLowerCase();
        filtered = filtered.filter(p => 
          p.firstName.toLowerCase().includes(search) ||
          p.lastName.toLowerCase().includes(search)
        );
      }

      if (filter?.status && filter.status.length > 0) {
        filtered = filtered.filter(p => filter.status!.includes(p.status));
      }

      return filtered;
    },
  });
}

// ============================================================================
// MUTATIONS (Placeholder - will work with real database later)
// ============================================================================

/**
 * Create a new person
 */
export function useCreatePerson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: PersonInput) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newPerson: Person = {
        id: crypto.randomUUID(),
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        phone: input.phone,
        status: input.status || 'visitor',
        birthDate: input.birthDate,
        gender: input.gender,
        householdId: input.householdId,
        householdRole: input.householdRole,
        memberSince: input.memberSince,
        firstVisit: input.firstVisit || new Date().toISOString().split('T')[0],
        tags: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      return newPerson;
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const existing = mockPeople.find(p => p.id === id);
      if (!existing) throw new Error('Person not found');
      
      return { ...existing, ...input, updatedAt: new Date().toISOString() };
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
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
  const { tenant } = useTenant();
  
  return useQuery({
    queryKey: ['people-stats', tenant?.id],
    queryFn: async () => {
      const stats = {
        total: mockPeople.length,
        members: mockPeople.filter(p => p.status === 'member').length,
        visitors: mockPeople.filter(p => p.status === 'visitor').length,
        volunteers: mockPeople.filter(p => p.status === 'volunteer').length,
        leaders: mockPeople.filter(p => p.status === 'leader').length,
        inactive: mockPeople.filter(p => p.status === 'inactive').length,
      };

      return stats;
    },
  });
}
