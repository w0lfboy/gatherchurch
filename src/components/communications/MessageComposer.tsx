import { useState } from 'react';
import { MessageChannel, AudienceType } from '@/types/communications';
import { mockTemplates, audienceOptions } from '@/data/mockCommunicationsData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Mail, 
  MessageSquare, 
  Bell,
  Send,
  Clock,
  Users,
  FileText,
  CalendarIcon,
  Eye,
  Sparkles
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export function MessageComposer() {
  const [channel, setChannel] = useState<MessageChannel>('email');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [audience, setAudience] = useState<AudienceType>('all');
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleDate, setScheduleDate] = useState<Date>();
  const [scheduleTime, setScheduleTime] = useState('09:00');
  const [templateOpen, setTemplateOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const selectedAudience = audienceOptions.find(a => a.value === audience);
  const characterLimit = channel === 'sms' ? 160 : null;
  const charactersUsed = content.length;

  const handleTemplateSelect = (template: typeof mockTemplates[0]) => {
    if (template.subject) setSubject(template.subject);
    setContent(template.content);
    setTemplateOpen(false);
    toast.success(`Template "${template.name}" applied`);
  };

  const handleSend = () => {
    if (!content.trim()) {
      toast.error('Please enter a message');
      return;
    }
    
    if (isScheduled) {
      toast.success('Message scheduled successfully');
    } else {
      toast.success(`Message sent to ${selectedAudience?.count || 'selected'} recipients`);
    }
    
    // Reset form
    setSubject('');
    setContent('');
  };

  return (
    <div className="space-y-6">
      {/* Channel Selection */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Select Channel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Button
              variant={channel === 'email' ? 'default' : 'outline'}
              className="flex-1"
              onClick={() => setChannel('email')}
            >
              <Mail className="h-4 w-4 mr-2" />
              Email
            </Button>
            <Button
              variant={channel === 'sms' ? 'default' : 'outline'}
              className="flex-1"
              onClick={() => setChannel('sms')}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              SMS
            </Button>
            <Button
              variant={channel === 'push' ? 'default' : 'outline'}
              className="flex-1"
              onClick={() => setChannel('push')}
            >
              <Bell className="h-4 w-4 mr-2" />
              Push
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Compose Area */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardContent className="p-4 space-y-4">
              {/* Template Button */}
              <div className="flex justify-end">
                <Dialog open={templateOpen} onOpenChange={setTemplateOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Use Template
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Select a Template</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-3 py-4">
                      {mockTemplates
                        .filter(t => t.supportedChannels.includes(channel))
                        .map(template => (
                          <Card 
                            key={template.id}
                            className="cursor-pointer hover:bg-muted/50 transition-colors"
                            onClick={() => handleTemplateSelect(template)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="font-medium">{template.name}</h4>
                                  <p className="text-sm text-muted-foreground">{template.description}</p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Badge variant="outline">{template.category}</Badge>
                                    <span className="text-xs text-muted-foreground">
                                      Used {template.useCount} times
                                    </span>
                                  </div>
                                </div>
                                <Badge>{template.supportedChannels.join(', ')}</Badge>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Subject (Email only) */}
              {channel === 'email' && (
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Input
                    placeholder="Enter email subject..."
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
              )}

              {/* Message Content */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Message</Label>
                  {characterLimit && (
                    <span className={cn(
                      "text-xs",
                      charactersUsed > characterLimit ? "text-destructive" : "text-muted-foreground"
                    )}>
                      {charactersUsed}/{characterLimit}
                    </span>
                  )}
                </div>
                <Textarea
                  placeholder={channel === 'sms' ? 'Enter your SMS message...' : 'Compose your message...'}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[200px]"
                />
              </div>

              {/* Variable hints */}
              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-muted-foreground">Variables:</span>
                {['{{first_name}}', '{{last_name}}', '{{church_name}}'].map(variable => (
                  <Badge 
                    key={variable} 
                    variant="secondary" 
                    className="text-xs cursor-pointer"
                    onClick={() => setContent(prev => prev + ' ' + variable)}
                  >
                    {variable}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Message Preview</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <Card>
                    <CardContent className="p-4">
                      {channel === 'email' && subject && (
                        <h3 className="font-semibold mb-2">{subject}</h3>
                      )}
                      <p className="whitespace-pre-wrap text-sm">
                        {content || 'No content yet...'}
                      </p>
                    </CardContent>
                  </Card>
                  <p className="text-xs text-muted-foreground mt-2">
                    Variables will be replaced with actual values when sent.
                  </p>
                </div>
              </DialogContent>
            </Dialog>

            <div className="flex-1" />

            {isScheduled ? (
              <Button onClick={handleSend}>
                <Clock className="h-4 w-4 mr-2" />
                Schedule Message
              </Button>
            ) : (
              <Button onClick={handleSend}>
                <Send className="h-4 w-4 mr-2" />
                Send Now
              </Button>
            )}
          </div>
        </div>

        {/* Sidebar - Audience & Scheduling */}
        <div className="space-y-4">
          {/* Audience Selection */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-4 w-4" />
                Audience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={audience} onValueChange={(v: AudienceType) => setAudience(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select audience" />
                </SelectTrigger>
                <SelectContent>
                  {audienceOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center justify-between w-full">
                        <span>{option.label}</span>
                        {option.count && (
                          <span className="text-muted-foreground ml-2">({option.count})</span>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedAudience?.count && (
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="text-2xl font-bold">{selectedAudience.count}</div>
                  <div className="text-sm text-muted-foreground">recipients</div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Scheduling */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Scheduling
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="schedule-toggle">Schedule for later</Label>
                <Switch
                  id="schedule-toggle"
                  checked={isScheduled}
                  onCheckedChange={setIsScheduled}
                />
              </div>

              {isScheduled && (
                <>
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          {scheduleDate ? format(scheduleDate, 'PPP') : 'Select date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={scheduleDate}
                          onSelect={setScheduleDate}
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Time</Label>
                    <Select value={scheduleTime} onValueChange={setScheduleTime}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => {
                          const hour = i.toString().padStart(2, '0');
                          return (
                            <>
                              <SelectItem key={`${hour}:00`} value={`${hour}:00`}>{hour}:00</SelectItem>
                              <SelectItem key={`${hour}:30`} value={`${hour}:30`}>{hour}:30</SelectItem>
                            </>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-primary">Pro Tip</p>
                  <p className="text-muted-foreground">
                    {channel === 'email' 
                      ? 'Emails sent between 9-11 AM have the highest open rates.'
                      : channel === 'sms'
                      ? 'Keep SMS messages under 160 characters to avoid splitting.'
                      : 'Push notifications work best with urgent, time-sensitive content.'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
