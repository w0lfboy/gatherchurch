import { useState } from 'react';
import { TeamChat, ChatMessage } from '@/types/communications';
import { mockTeamChats, mockChatMessages } from '@/data/mockCommunicationsData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Hash, 
  Lock,
  Send,
  Plus,
  Users,
  Settings
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export function TeamChatPanel() {
  const [selectedChat, setSelectedChat] = useState<TeamChat | null>(mockTeamChats[0]);
  const [messageText, setMessageText] = useState('');

  const chatMessages = selectedChat 
    ? mockChatMessages.filter(m => m.chatId === selectedChat.id)
    : [];

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    toast.success('Message sent');
    setMessageText('');
  };

  return (
    <div className="flex h-[500px] border rounded-lg overflow-hidden">
      {/* Chat List */}
      <div className="w-64 border-r flex flex-col">
        <div className="p-3 border-b flex items-center justify-between">
          <h3 className="font-semibold">Team Chats</h3>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {mockTeamChats.map(chat => (
              <div
                key={chat.id}
                className={cn(
                  "p-2 rounded-lg cursor-pointer transition-colors",
                  selectedChat?.id === chat.id ? "bg-primary/10" : "hover:bg-muted/50"
                )}
                onClick={() => setSelectedChat(chat)}
              >
                <div className="flex items-center gap-2">
                  {chat.isPrivate ? (
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Hash className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="font-medium flex-1 truncate">{chat.name}</span>
                  {chat.unreadCount > 0 && (
                    <Badge className="h-5 w-5 p-0 flex items-center justify-center">
                      {chat.unreadCount}
                    </Badge>
                  )}
                </div>
                {chat.lastMessageAt && (
                  <p className="text-xs text-muted-foreground ml-6 mt-1">
                    {formatDistanceToNow(new Date(chat.lastMessageAt), { addSuffix: true })}
                  </p>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Header */}
            <div className="p-3 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                {selectedChat.isPrivate ? (
                  <Lock className="h-4 w-4" />
                ) : (
                  <Hash className="h-4 w-4" />
                )}
                <h3 className="font-semibold">{selectedChat.name}</h3>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Users className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {chatMessages.map(message => (
                  <div key={message.id} className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {message.senderName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{message.senderName}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm mt-1">{message.content}</p>
                      {message.reactions && message.reactions.length > 0 && (
                        <div className="flex gap-1 mt-1">
                          {message.reactions.map((reaction, i) => (
                            <span key={i} className="text-xs bg-muted px-2 py-0.5 rounded-full">
                              {reaction.emoji} {reaction.count}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-3 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder={`Message #${selectedChat.name}`}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button size="icon" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <p>Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}
