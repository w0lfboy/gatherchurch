import { useState } from 'react';
import { Announcement } from '@/types/communications';
import { mockAnnouncements } from '@/data/mockCommunicationsData';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus, 
  Pin,
  Heart,
  MessageCircle,
  Eye,
  ExternalLink,
  MoreHorizontal,
  AlertTriangle
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const priorityStyles = {
  low: 'bg-muted text-muted-foreground',
  normal: 'bg-blue-500/10 text-blue-600',
  high: 'bg-orange-500/10 text-orange-600',
  urgent: 'bg-red-500/10 text-red-600'
};

export function AnnouncementFeed() {
  const [createOpen, setCreateOpen] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    priority: 'normal' as const,
    ctaText: '',
    ctaUrl: ''
  });

  const sortedAnnouncements = [...mockAnnouncements].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime();
  });

  const handleCreate = () => {
    if (!newAnnouncement.title || !newAnnouncement.content) {
      toast.error('Please fill in title and content');
      return;
    }
    toast.success('Announcement published!');
    setCreateOpen(false);
    setNewAnnouncement({ title: '', content: '', priority: 'normal', ctaText: '', ctaUrl: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Church Announcements</h2>
          <p className="text-sm text-muted-foreground">Latest updates for the congregation</p>
        </div>
        
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Announcement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create Announcement</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Title *</Label>
                <Input
                  placeholder="Announcement title..."
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Content *</Label>
                <Textarea
                  placeholder="Write your announcement..."
                  value={newAnnouncement.content}
                  onChange={(e) => setNewAnnouncement(prev => ({ ...prev, content: e.target.value }))}
                  className="min-h-[120px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Priority</Label>
                <Select
                  value={newAnnouncement.priority}
                  onValueChange={(v: any) => setNewAnnouncement(prev => ({ ...prev, priority: v }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Button Text (optional)</Label>
                  <Input
                    placeholder="Learn More"
                    value={newAnnouncement.ctaText}
                    onChange={(e) => setNewAnnouncement(prev => ({ ...prev, ctaText: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Button URL</Label>
                  <Input
                    placeholder="https://..."
                    value={newAnnouncement.ctaUrl}
                    onChange={(e) => setNewAnnouncement(prev => ({ ...prev, ctaUrl: e.target.value }))}
                  />
                </div>
              </div>
              
              <Button onClick={handleCreate} className="w-full">Publish Announcement</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Feed */}
      <div className="space-y-4">
        {sortedAnnouncements.map(announcement => (
          <Card 
            key={announcement.id} 
            className={cn(
              "overflow-hidden",
              announcement.priority === 'urgent' && "border-red-500/50"
            )}
          >
            {announcement.imageUrl && (
              <div className="h-48 overflow-hidden">
                <img 
                  src={announcement.imageUrl} 
                  alt={announcement.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarFallback>{announcement.authorName.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{announcement.authorName}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(announcement.publishedAt || announcement.createdAt), { addSuffix: true })}
                    </span>
                    {announcement.isPinned && (
                      <Pin className="h-3 w-3 text-primary" />
                    )}
                    <Badge className={priorityStyles[announcement.priority]}>
                      {announcement.priority === 'urgent' && <AlertTriangle className="h-3 w-3 mr-1" />}
                      {announcement.priority}
                    </Badge>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2">{announcement.title}</h3>
                  <p className="text-muted-foreground">{announcement.content}</p>
                  
                  {announcement.ctaText && announcement.ctaUrl && (
                    <Button variant="outline" size="sm" className="mt-3" asChild>
                      <a href={announcement.ctaUrl}>
                        {announcement.ctaText}
                        <ExternalLink className="h-3 w-3 ml-2" />
                      </a>
                    </Button>
                  )}
                  
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t">
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <Eye className="h-4 w-4 mr-1" />
                      {announcement.viewCount}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <Heart className="h-4 w-4 mr-1" />
                      {announcement.likeCount}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {announcement.commentCount}
                    </Button>
                    <div className="flex-1" />
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
