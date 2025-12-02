import { GroupResource } from '@/types/groups';
import { Button } from '@/components/ui/button';
import { 
  FileText, Video, Link2, Music, Download, 
  Plus, Search, Filter, Clock, Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface GroupResourcesProps {
  resources: GroupResource[];
}

export const GroupResources = ({ resources }: GroupResourcesProps) => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<GroupResource['type'] | 'all'>('all');

  const filteredResources = resources.filter(r => {
    if (search) {
      const searchLower = search.toLowerCase();
      if (!r.title.toLowerCase().includes(searchLower) && 
          !r.description?.toLowerCase().includes(searchLower)) {
        return false;
      }
    }
    if (typeFilter !== 'all' && r.type !== typeFilter) {
      return false;
    }
    return true;
  });

  const getTypeIcon = (type: GroupResource['type']) => {
    switch (type) {
      case 'pdf': return FileText;
      case 'video': return Video;
      case 'link': return Link2;
      case 'audio': return Music;
      case 'curriculum': return FileText;
    }
  };

  const getTypeColor = (type: GroupResource['type']) => {
    switch (type) {
      case 'pdf': return 'text-coral bg-coral-light';
      case 'video': return 'text-primary bg-primary/10';
      case 'link': return 'text-sage-dark bg-sage-light';
      case 'audio': return 'text-gold bg-secondary';
      case 'curriculum': return 'text-primary bg-primary/10';
    }
  };

  const typeOptions: { value: GroupResource['type'] | 'all'; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'pdf', label: 'PDF' },
    { value: 'video', label: 'Video' },
    { value: 'curriculum', label: 'Curriculum' },
    { value: 'link', label: 'Links' },
    { value: 'audio', label: 'Audio' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Resources & Curriculum</h2>
        <Button variant="default" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Resource
        </Button>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search resources..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-secondary border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
          {typeOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setTypeFilter(option.value)}
              className={cn(
                "px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                typeFilter === option.value
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Resources List */}
      {filteredResources.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 text-center rounded-xl bg-secondary/50">
          <FileText className="w-12 h-12 text-muted-foreground/50 mb-3" />
          <p className="text-muted-foreground">No resources found</p>
          <p className="text-sm text-muted-foreground/70">
            {resources.length === 0 ? 'Add resources for your group' : 'Try a different search'}
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filteredResources.map(resource => {
            const TypeIcon = getTypeIcon(resource.type);
            return (
              <div 
                key={resource.id} 
                className="p-5 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                    getTypeColor(resource.type)
                  )}>
                    <TypeIcon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{resource.title}</h3>
                    {resource.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {resource.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                      {resource.fileSize && (
                        <span>{resource.fileSize}</span>
                      )}
                      {resource.duration && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {resource.duration}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        {resource.downloads}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                {resource.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-border">
                    {resource.tags.map(tag => (
                      <span 
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Curriculum Highlight */}
      {resources.some(r => r.type === 'curriculum') && (
        <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
          <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Current Curriculum
          </h3>
          <p className="text-sm text-muted-foreground">
            Your group is currently using curriculum materials. Make sure all leaders have access to the latest resources.
          </p>
          <Button variant="outline" size="sm" className="mt-4">
            <Eye className="w-4 h-4 mr-2" />
            View Curriculum Schedule
          </Button>
        </div>
      )}
    </div>
  );
};
