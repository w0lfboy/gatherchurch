import { useState } from 'react';
import { MessageTemplate, TemplateCategory } from '@/types/communications';
import { mockTemplates } from '@/data/mockCommunicationsData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Search, 
  Plus, 
  FileText,
  Mail,
  MessageSquare,
  Bell,
  Copy,
  Edit,
  Trash2,
  Clock
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const categoryColors: Record<TemplateCategory, string> = {
  welcome: 'bg-green-500/10 text-green-600',
  event: 'bg-blue-500/10 text-blue-600',
  reminder: 'bg-orange-500/10 text-orange-600',
  newsletter: 'bg-purple-500/10 text-purple-600',
  follow_up: 'bg-cyan-500/10 text-cyan-600',
  custom: 'bg-muted text-muted-foreground'
};

const channelIcons = {
  email: Mail,
  sms: MessageSquare,
  push: Bell,
  in_app: Bell
};

export function TemplateLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<MessageTemplate | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    description: '',
    category: 'custom' as TemplateCategory,
    subject: '',
    content: ''
  });

  const categories = ['all', 'welcome', 'event', 'reminder', 'newsletter', 'follow_up', 'custom'];

  const filteredTemplates = mockTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || template.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDuplicate = (template: MessageTemplate) => {
    toast.success(`Template "${template.name}" duplicated`);
  };

  const handleDelete = (template: MessageTemplate) => {
    if (template.isSystem) {
      toast.error('System templates cannot be deleted');
      return;
    }
    toast.success(`Template "${template.name}" deleted`);
  };

  const handleCreate = () => {
    if (!newTemplate.name || !newTemplate.content) {
      toast.error('Please fill in name and content');
      return;
    }
    toast.success('Template created successfully');
    setCreateOpen(false);
    setNewTemplate({ name: '', description: '', category: 'custom', subject: '', content: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat.replace('_', ' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Template
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Create Template</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Name *</Label>
                    <Input
                      placeholder="Template name"
                      value={newTemplate.name}
                      onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select
                      value={newTemplate.category}
                      onValueChange={(v: TemplateCategory) => setNewTemplate(prev => ({ ...prev, category: v }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.filter(c => c !== 'all').map(cat => (
                          <SelectItem key={cat} value={cat}>{cat.replace('_', ' ')}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input
                    placeholder="Brief description of this template"
                    value={newTemplate.description}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Subject (for email)</Label>
                  <Input
                    placeholder="Email subject line"
                    value={newTemplate.subject}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, subject: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Content *</Label>
                  <Textarea
                    placeholder="Template content... Use {{variable_name}} for dynamic content"
                    value={newTemplate.content}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, content: e.target.value }))}
                    className="min-h-[150px]"
                  />
                </div>
                
                <Button onClick={handleCreate} className="w-full">Create Template</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map(template => (
          <Card 
            key={template.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelectedTemplate(template)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-muted">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium line-clamp-1">{template.name}</h4>
                    <Badge className={cn('mt-1', categoryColors[template.category])}>
                      {template.category.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
                {template.isSystem && (
                  <Badge variant="outline" className="text-xs">System</Badge>
                )}
              </div>
              
              {template.description && (
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {template.description}
                </p>
              )}
              
              <div className="flex items-center gap-2 mb-3">
                {template.supportedChannels.map(channel => {
                  const Icon = channelIcons[channel];
                  return (
                    <Badge key={channel} variant="secondary" className="text-xs">
                      <Icon className="h-3 w-3 mr-1" />
                      {channel}
                    </Badge>
                  );
                })}
              </div>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t">
                <span>Used {template.useCount} times</span>
                {template.lastUsedAt && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDistanceToNow(new Date(template.lastUsedAt), { addSuffix: true })}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No templates found matching your criteria.</p>
        </div>
      )}

      {/* Template Detail Dialog */}
      <Dialog open={!!selectedTemplate} onOpenChange={() => setSelectedTemplate(null)}>
        <DialogContent className="max-w-2xl">
          {selectedTemplate && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedTemplate.name}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-2">
                  <Badge className={categoryColors[selectedTemplate.category]}>
                    {selectedTemplate.category.replace('_', ' ')}
                  </Badge>
                  {selectedTemplate.supportedChannels.map(channel => {
                    const Icon = channelIcons[channel];
                    return (
                      <Badge key={channel} variant="outline">
                        <Icon className="h-3 w-3 mr-1" />
                        {channel}
                      </Badge>
                    );
                  })}
                  {selectedTemplate.isSystem && (
                    <Badge variant="secondary">System Template</Badge>
                  )}
                </div>
                
                {selectedTemplate.description && (
                  <p className="text-muted-foreground">{selectedTemplate.description}</p>
                )}
                
                {selectedTemplate.subject && (
                  <div>
                    <Label className="text-xs text-muted-foreground">Subject</Label>
                    <div className="p-3 rounded-lg bg-muted/50 font-mono text-sm">
                      {selectedTemplate.subject}
                    </div>
                  </div>
                )}
                
                <div>
                  <Label className="text-xs text-muted-foreground">Content</Label>
                  <div className="p-3 rounded-lg bg-muted/50 font-mono text-sm whitespace-pre-wrap">
                    {selectedTemplate.content}
                  </div>
                </div>
                
                {selectedTemplate.variables.length > 0 && (
                  <div>
                    <Label className="text-xs text-muted-foreground">Variables</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedTemplate.variables.map(variable => (
                        <Badge key={variable.name} variant="outline">
                          {`{{${variable.name}}}`}
                          {variable.required && <span className="text-destructive ml-1">*</span>}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => handleDuplicate(selectedTemplate)}>
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate
                  </Button>
                  <Button variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <div className="flex-1" />
                  <Button 
                    variant="outline" 
                    className="text-destructive"
                    onClick={() => handleDelete(selectedTemplate)}
                    disabled={selectedTemplate.isSystem}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
