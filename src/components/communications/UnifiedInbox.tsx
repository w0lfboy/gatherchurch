import { useState } from 'react';
import { Message, MessageThread } from '@/types/communications';
import { mockMessages, mockThreads } from '@/data/mockCommunicationsData';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Search, 
  Mail, 
  MessageSquare, 
  Bell,
  Archive,
  Star,
  Reply,
  Forward,
  Trash2,
  MoreHorizontal,
  Send
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

const channelIcons = {
  email: Mail,
  sms: MessageSquare,
  push: Bell,
  in_app: Bell
};

const channelColors = {
  email: 'bg-blue-500/10 text-blue-600',
  sms: 'bg-green-500/10 text-green-600',
  push: 'bg-purple-500/10 text-purple-600',
  in_app: 'bg-orange-500/10 text-orange-600'
};

export function UnifiedInbox() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedThread, setSelectedThread] = useState<MessageThread | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [replyText, setReplyText] = useState('');

  const inboundMessages = mockMessages.filter(m => m.direction === 'inbound');
  const unreadCount = mockThreads.reduce((sum, t) => sum + t.unreadCount, 0);

  const filteredMessages = mockMessages.filter(msg => {
    const matchesSearch = msg.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         msg.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         msg.senderName.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'inbox') return matchesSearch && msg.direction === 'inbound';
    if (activeTab === 'sent') return matchesSearch && msg.direction === 'outbound';
    return matchesSearch;
  });

  const getThreadMessages = (threadId: string) => {
    return mockMessages.filter(m => m.threadId === threadId);
  };

  return (
    <div className="flex h-[600px] border rounded-lg overflow-hidden">
      {/* Message List */}
      <div className="w-96 border-r flex flex-col">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="mx-4 mt-2">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="inbox" className="relative">
              Inbox
              {unreadCount > 0 && (
                <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center bg-primary">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="sent">Sent</TabsTrigger>
          </TabsList>
          
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              {filteredMessages.map(message => {
                const Icon = channelIcons[message.channel];
                const isSelected = selectedThread?.id === message.threadId;
                
                return (
                  <div
                    key={message.id}
                    className={cn(
                      "p-3 rounded-lg cursor-pointer transition-colors",
                      isSelected ? "bg-primary/10" : "hover:bg-muted/50"
                    )}
                    onClick={() => {
                      const thread = mockThreads.find(t => t.id === message.threadId);
                      setSelectedThread(thread || null);
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {message.direction === 'inbound' 
                            ? message.senderName.charAt(0)
                            : message.recipientName?.charAt(0) || 'M'}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium truncate">
                            {message.direction === 'inbound' ? message.senderName : message.recipientName}
                          </span>
                          <Badge className={cn('text-xs', channelColors[message.channel])}>
                            <Icon className="h-3 w-3 mr-1" />
                            {message.channel}
                          </Badge>
                        </div>
                        
                        <p className="text-sm font-medium truncate">{message.subject}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {message.content}
                        </p>
                        
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                          </span>
                          {message.direction === 'outbound' && message.recipientCount > 1 && (
                            <span className="text-xs text-muted-foreground">
                              To {message.recipientCount} recipients
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </Tabs>
      </div>

      {/* Message Detail */}
      <div className="flex-1 flex flex-col">
        {selectedThread ? (
          <>
            <div className="p-4 border-b flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{selectedThread.subject}</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedThread.participants.map(p => p.name).join(', ')}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon">
                  <Archive className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Star className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {getThreadMessages(selectedThread.id).map(message => (
                  <Card key={message.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarFallback>{message.senderName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{message.senderName}</span>
                            <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                            </span>
                          </div>
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="flex-1"
                />
                <Button>
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Select a message to view</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
