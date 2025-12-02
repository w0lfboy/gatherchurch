// Core data types for the People module

export type PersonStatus = 'visitor' | 'regular' | 'member' | 'volunteer' | 'leader' | 'inactive';

export interface DirectoryVisibility {
  showInDirectory: boolean;
  showEmail: boolean;
  showPhone: boolean;
  showAddress: boolean;
}

export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  avatar?: string;
  status: PersonStatus;
  householdId?: string;
  householdRole?: 'head' | 'spouse' | 'child' | 'other';
  birthDate?: string;
  gender?: 'male' | 'female' | 'other';
  address?: Address;
  memberSince?: string;
  firstVisit?: string;
  tags: string[];
  pipelineStageId?: string;
  backgroundCheckStatus?: 'none' | 'pending' | 'approved' | 'expired';
  backgroundCheckDate?: string;
  directoryVisibility?: DirectoryVisibility;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

export interface Household {
  id: string;
  name: string;
  primaryContactId: string;
  address?: Address;
  members: HouseholdMember[];
  createdAt: string;
}

export interface HouseholdMember {
  personId: string;
  person?: Person;
  role: 'head' | 'spouse' | 'child' | 'other';
}

export interface Tag {
  id: string;
  name: string;
  color: string;
  category?: string;
  count?: number;
}

export interface Pipeline {
  id: string;
  name: string;
  description?: string;
  stages: PipelineStage[];
}

export interface PipelineStage {
  id: string;
  name: string;
  order: number;
  color: string;
  automations?: StageAutomation[];
}

export interface StageAutomation {
  type: 'email' | 'task' | 'tag' | 'notification';
  config: Record<string, any>;
}

export interface PersonPipelineProgress {
  id: string;
  personId: string;
  pipelineId: string;
  stageId: string;
  enteredAt: string;
  notes?: string;
}

export interface Note {
  id: string;
  personId: string;
  authorId: string;
  authorName: string;
  content: string;
  isPrivate: boolean;
  category?: 'general' | 'pastoral' | 'prayer' | 'followup';
  createdAt: string;
}

export interface FollowUp {
  id: string;
  personId: string;
  assignedToId: string;
  assignedToName: string;
  title: string;
  description?: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  completedAt?: string;
}

export interface CustomField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'select' | 'multiselect' | 'checkbox';
  options?: string[];
  required: boolean;
  category?: string;
}

export interface CustomFieldValue {
  fieldId: string;
  personId: string;
  value: string | number | boolean | string[];
}

// Filter types for the smart search
export interface PeopleFilter {
  search?: string;
  status?: PersonStatus[];
  tags?: string[];
  pipelineStageId?: string;
  householdId?: string;
  hasEmail?: boolean;
  hasPhone?: boolean;
  memberSinceAfter?: string;
  memberSinceBefore?: string;
  ageMin?: number;
  ageMax?: number;
}
