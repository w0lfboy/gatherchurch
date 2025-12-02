import { useState, useMemo } from 'react';
import { Group, GroupFilter, GroupType } from '@/types/groups';
import { mockGroups, mockCategories } from '@/data/mockGroupsData';
import { GroupCard } from './GroupCard';
import { Button } from '@/components/ui/button';
import { 
  Search, Filter, X, MapPin, Baby, Video, 
  Users, Calendar, ChevronDown, Grid, List
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface GroupDirectoryProps {
  onSelectGroup: (group: Group) => void;
}

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const GroupDirectory = ({ onSelectGroup }: GroupDirectoryProps) => {
  const [filter, setFilter] = useState<GroupFilter>({ search: '' });
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredGroups = useMemo(() => {
    return mockGroups.filter(group => {
      if (group.status === 'archived') return false;
      
      // Search
      if (filter.search) {
        const searchLower = filter.search.toLowerCase();
        const matchesName = group.name.toLowerCase().includes(searchLower);
        const matchesDescription = group.description?.toLowerCase().includes(searchLower);
        const matchesCategory = group.category?.toLowerCase().includes(searchLower);
        const matchesTags = group.tags.some(tag => tag.toLowerCase().includes(searchLower));
        if (!matchesName && !matchesDescription && !matchesCategory && !matchesTags) return false;
      }

      // Type filter
      if (filter.type && filter.type.length > 0) {
        if (!filter.type.includes(group.type)) return false;
      }

      // Category filter
      if (filter.category && filter.category.length > 0) {
        if (!group.category || !filter.category.includes(group.category)) return false;
      }

      // Day filter
      if (filter.meetingDay && filter.meetingDay.length > 0) {
        if (!group.meetingDay || !filter.meetingDay.includes(group.meetingDay)) return false;
      }

      // Childcare filter
      if (filter.hasChildcare !== undefined && filter.hasChildcare) {
        if (!group.hasChildcare) return false;
      }

      // Online filter
      if (filter.isOnline !== undefined && filter.isOnline) {
        if (!group.isOnline) return false;
      }

      // Open enrollment filter
      if (filter.openEnrollment !== undefined && filter.openEnrollment) {
        if (!group.openEnrollment) return false;
      }

      return true;
    });
  }, [filter]);

  const clearFilters = () => {
    setFilter({ search: '' });
  };

  const hasActiveFilters = 
    (filter.type && filter.type.length > 0) ||
    (filter.category && filter.category.length > 0) ||
    (filter.meetingDay && filter.meetingDay.length > 0) ||
    filter.hasChildcare ||
    filter.isOnline ||
    filter.openEnrollment;

  const typeOptions: { value: GroupType; label: string }[] = [
    { value: 'small_group', label: 'Small Groups' },
    { value: 'class', label: 'Classes' },
    { value: 'ministry_team', label: 'Ministry Teams' },
    { value: 'volunteer_team', label: 'Volunteer Teams' },
  ];

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search groups by name, category, or interest..."
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
                !
              </span>
            )}
          </Button>
          <div className="flex items-center bg-secondary rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                "p-2 rounded-md transition-colors",
                viewMode === 'grid' ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                "p-2 rounded-md transition-colors",
                viewMode === 'list' ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="p-4 rounded-xl bg-secondary/50 border border-border animate-fade-in">
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

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Type */}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">Type</label>
                <div className="flex flex-wrap gap-2">
                  {typeOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => {
                        const current = filter.type || [];
                        const updated = current.includes(option.value)
                          ? current.filter(t => t !== option.value)
                          : [...current, option.value];
                        setFilter({ ...filter, type: updated });
                      }}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                        filter.type?.includes(option.value)
                          ? "bg-primary text-primary-foreground"
                          : "bg-background border border-border hover:bg-secondary"
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">Category</label>
                <div className="flex flex-wrap gap-2">
                  {mockCategories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        const current = filter.category || [];
                        const updated = current.includes(cat.name)
                          ? current.filter(c => c !== cat.name)
                          : [...current, cat.name];
                        setFilter({ ...filter, category: updated });
                      }}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                        filter.category?.includes(cat.name)
                          ? "bg-primary text-primary-foreground"
                          : "bg-background border border-border hover:bg-secondary"
                      )}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Meeting Day */}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">Meeting Day</label>
                <div className="flex flex-wrap gap-2">
                  {daysOfWeek.map(day => (
                    <button
                      key={day}
                      onClick={() => {
                        const current = filter.meetingDay || [];
                        const updated = current.includes(day)
                          ? current.filter(d => d !== day)
                          : [...current, day];
                        setFilter({ ...filter, meetingDay: updated });
                      }}
                      className={cn(
                        "px-2 py-1 rounded-lg text-xs font-medium transition-colors",
                        filter.meetingDay?.includes(day)
                          ? "bg-primary text-primary-foreground"
                          : "bg-background border border-border hover:bg-secondary"
                      )}
                    >
                      {day.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">Features</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setFilter({ ...filter, hasChildcare: !filter.hasChildcare })}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5",
                      filter.hasChildcare
                        ? "bg-primary text-primary-foreground"
                        : "bg-background border border-border hover:bg-secondary"
                    )}
                  >
                    <Baby className="w-3 h-3" />
                    Childcare
                  </button>
                  <button
                    onClick={() => setFilter({ ...filter, isOnline: !filter.isOnline })}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5",
                      filter.isOnline
                        ? "bg-primary text-primary-foreground"
                        : "bg-background border border-border hover:bg-secondary"
                    )}
                  >
                    <Video className="w-3 h-3" />
                    Online
                  </button>
                  <button
                    onClick={() => setFilter({ ...filter, openEnrollment: !filter.openEnrollment })}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5",
                      filter.openEnrollment
                        ? "bg-primary text-primary-foreground"
                        : "bg-background border border-border hover:bg-secondary"
                    )}
                  >
                    <Users className="w-3 h-3" />
                    Open
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredGroups.length} group{filteredGroups.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Groups Grid/List */}
      {filteredGroups.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <Users className="w-12 h-12 text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground">No groups match your filters</p>
          <p className="text-sm text-muted-foreground/70">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className={cn(
          viewMode === 'grid' 
            ? "grid md:grid-cols-2 lg:grid-cols-3 gap-4"
            : "space-y-3"
        )}>
          {filteredGroups.map(group => (
            <GroupCard 
              key={group.id} 
              group={group} 
              onClick={() => onSelectGroup(group)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
