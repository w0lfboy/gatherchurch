import { ServiceItem, ServiceItemType } from '@/types/services';
import { formatDuration } from '@/data/mockServicesData';
import { cn } from '@/lib/utils';
import { 
  Music, Mic, BookOpen, Heart, Video, 
  MoreHorizontal, GripVertical, Clock
} from 'lucide-react';

interface ServiceItemCardProps {
  item: ServiceItem;
  onEdit?: () => void;
  isDragging?: boolean;
}

const typeIcons: Record<ServiceItemType, typeof Music> = {
  song: Music,
  announcement: Mic,
  prayer: BookOpen,
  message: BookOpen,
  offering: Heart,
  video: Video,
  other: Clock,
};

const typeColors: Record<ServiceItemType, string> = {
  song: 'bg-sage-light border-sage/20 text-sage-dark',
  announcement: 'bg-secondary border-gold/20 text-gold',
  prayer: 'bg-coral-light border-coral/20 text-coral',
  message: 'bg-primary/10 border-primary/20 text-primary',
  offering: 'bg-coral-light border-coral/20 text-coral',
  video: 'bg-secondary border-border text-muted-foreground',
  other: 'bg-muted border-border text-muted-foreground',
};

export const ServiceItemCard = ({ item, onEdit, isDragging }: ServiceItemCardProps) => {
  const Icon = typeIcons[item.type];

  return (
    <div 
      className={cn(
        "flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer hover:shadow-card group",
        typeColors[item.type],
        isDragging && "opacity-50 shadow-lg"
      )}
      onClick={onEdit}
    >
      <div className="cursor-grab opacity-0 group-hover:opacity-100 transition-opacity">
        <GripVertical className="w-4 h-4 text-muted-foreground" />
      </div>
      
      <div className={cn(
        "w-8 h-8 rounded-lg flex items-center justify-center",
        item.type === 'song' ? 'bg-sage/20' :
        item.type === 'message' ? 'bg-primary/20' :
        item.type === 'prayer' || item.type === 'offering' ? 'bg-coral/20' :
        item.type === 'announcement' ? 'bg-gold/20' : 'bg-muted'
      )}>
        <Icon className="w-4 h-4" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm text-foreground truncate">{item.title}</p>
        <div className="flex items-center gap-2 text-xs">
          {item.assignee && (
            <span className="text-muted-foreground">{item.assignee}</span>
          )}
          {item.selectedKey && (
            <span className="px-1.5 py-0.5 rounded bg-background/50 font-medium">
              Key: {item.selectedKey}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground font-medium">
          {formatDuration(item.duration)}
        </span>
        <button 
          className="p-1 rounded hover:bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => { e.stopPropagation(); }}
        >
          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
};
