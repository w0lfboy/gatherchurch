import { useState, useMemo } from "react";
import { Person, PeopleFilter, PersonStatus } from "@/types/people";
import { mockPeople, mockTags, getTagById } from "@/data/mockPeopleData";
import { PersonAvatar } from "./PersonAvatar";
import { PersonStatusBadge } from "./PersonStatusBadge";
import { TagBadge } from "./TagBadge";
import { Button } from "@/components/ui/button";
import { 
  Search, Filter, Plus, MoreHorizontal, Mail, Phone,
  ChevronDown, X, Users, UserPlus, Download, Upload
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PeopleListProps {
  onSelectPerson: (person: Person) => void;
  selectedPersonId?: string;
}

const statusOptions: { value: PersonStatus; label: string }[] = [
  { value: 'visitor', label: 'Visitor' },
  { value: 'regular', label: 'Regular' },
  { value: 'member', label: 'Member' },
  { value: 'volunteer', label: 'Volunteer' },
  { value: 'leader', label: 'Leader' },
  { value: 'inactive', label: 'Inactive' },
];

export const PeopleList = ({ onSelectPerson, selectedPersonId }: PeopleListProps) => {
  const [filter, setFilter] = useState<PeopleFilter>({ search: '' });
  const [showFilters, setShowFilters] = useState(false);

  const filteredPeople = useMemo(() => {
    return mockPeople.filter(person => {
      // Search filter
      if (filter.search) {
        const searchLower = filter.search.toLowerCase();
        const fullName = `${person.firstName} ${person.lastName}`.toLowerCase();
        const matchesName = fullName.includes(searchLower);
        const matchesEmail = person.email?.toLowerCase().includes(searchLower);
        const matchesPhone = person.phone?.includes(filter.search);
        if (!matchesName && !matchesEmail && !matchesPhone) return false;
      }

      // Status filter
      if (filter.status && filter.status.length > 0) {
        if (!filter.status.includes(person.status)) return false;
      }

      // Tags filter
      if (filter.tags && filter.tags.length > 0) {
        const hasMatchingTag = filter.tags.some(tagId => person.tags.includes(tagId));
        if (!hasMatchingTag) return false;
      }

      return true;
    });
  }, [filter]);

  const clearFilters = () => {
    setFilter({ search: '' });
  };

  const hasActiveFilters = (filter.status && filter.status.length > 0) || (filter.tags && filter.tags.length > 0);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-display font-semibold text-foreground">Congregation</h1>
            <p className="text-sm text-muted-foreground">
              {filteredPeople.length} {filteredPeople.length === 1 ? 'person' : 'people'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="default" size="sm">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Person
            </Button>
          </div>
        </div>

        {/* Search and filter bar */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={filter.search || ''}
              onChange={(e) => setFilter({ ...filter, search: e.target.value })}
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-secondary border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <Button
            variant={showFilters || hasActiveFilters ? "soft" : "outline"}
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
            {hasActiveFilters && (
              <span className="ml-1.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                {(filter.status?.length || 0) + (filter.tags?.length || 0)}
              </span>
            )}
          </Button>
        </div>

        {/* Expanded filters */}
        {showFilters && (
          <div className="mt-4 p-4 rounded-xl bg-secondary/50 border border-border animate-fade-in">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-foreground">Filter by</span>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                >
                  <X className="w-3 h-3" />
                  Clear all
                </button>
              )}
            </div>

            <div className="space-y-4">
              {/* Status filter */}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">Status</label>
                <div className="flex flex-wrap gap-2">
                  {statusOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => {
                        const current = filter.status || [];
                        const updated = current.includes(option.value)
                          ? current.filter(s => s !== option.value)
                          : [...current, option.value];
                        setFilter({ ...filter, status: updated });
                      }}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                        filter.status?.includes(option.value)
                          ? "bg-primary text-primary-foreground"
                          : "bg-background border border-border hover:bg-secondary"
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags filter */}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {mockTags.map(tag => (
                    <button
                      key={tag.id}
                      onClick={() => {
                        const current = filter.tags || [];
                        const updated = current.includes(tag.id)
                          ? current.filter(t => t !== tag.id)
                          : [...current, tag.id];
                        setFilter({ ...filter, tags: updated });
                      }}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                        filter.tags?.includes(tag.id)
                          ? "bg-primary text-primary-foreground"
                          : "bg-background border border-border hover:bg-secondary"
                      )}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* People list */}
      <div className="flex-1 overflow-auto">
        {filteredPeople.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Users className="w-12 h-12 text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground">No people found</p>
            <p className="text-sm text-muted-foreground/70">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredPeople.map(person => (
              <PersonRow
                key={person.id}
                person={person}
                isSelected={person.id === selectedPersonId}
                onClick={() => onSelectPerson(person)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

interface PersonRowProps {
  person: Person;
  isSelected: boolean;
  onClick: () => void;
}

const PersonRow = ({ person, isSelected, onClick }: PersonRowProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-4 px-6 py-4 cursor-pointer transition-colors",
        isSelected ? "bg-sage-light/50" : "hover:bg-secondary/50"
      )}
    >
      <PersonAvatar person={person} showStatus />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-foreground truncate">
            {person.firstName} {person.lastName}
          </span>
          <PersonStatusBadge status={person.status} size="sm" />
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {person.email && (
            <span className="flex items-center gap-1 truncate">
              <Mail className="w-3 h-3" />
              {person.email}
            </span>
          )}
          {person.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              {person.phone}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {person.tags.slice(0, 2).map(tagId => {
          const tag = getTagById(tagId);
          return tag ? (
            <TagBadge key={tagId} name={tag.name} color={tag.color} size="sm" />
          ) : null;
        })}
        {person.tags.length > 2 && (
          <span className="text-xs text-muted-foreground">+{person.tags.length - 2}</span>
        )}
      </div>

      <button 
        className="p-2 rounded-lg hover:bg-secondary transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
      </button>
    </div>
  );
};
