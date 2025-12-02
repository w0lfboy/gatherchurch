import { useState } from 'react';
import { mockMessages, mockAnalytics, mockAnnouncements, mockThreads } from '@/data/mockCommunicationsData';
import { UnifiedInbox } from './UnifiedInbox';
import { MessageComposer } from './MessageComposer';
import { AnnouncementFeed } from './AnnouncementFeed';
import { TemplateLibrary } from './TemplateLibrary';
import { TeamChatPanel } from './TeamChatPanel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Inbox, 
  Send, 
  Megaphone, 
  FileText, 
  MessageCircle,
  Mail,
  MessageSquare,
  Bell,
  TrendingUp,
  Users,
  MousePointer
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function CommunicationsDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const unreadCount = mockThreads.reduce((sum, t) => sum + t.unreadCount, 0);
  const recentMessages = mockMessages.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Communications Hub</h1>
        <p className="text-muted-foreground">Unified messaging across all channels</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{mockAnalytics.byChannel.email}</div>
                <div className="text-sm text-muted-foreground">Emails Sent</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <MessageSquare className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{mockAnalytics.byChannel.sms}</div>
                <div className="text-sm text-muted-foreground">SMS Sent</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{mockAnalytics.openRate}%</div>
                <div className="text-sm text-muted-foreground">Open Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-500/10">
                <MousePointer className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{mockAnalytics.clickRate}%</div>
                <div className="text-sm text-muted-foreground">Click Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:inline-grid">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="inbox" className="relative">
            <Inbox className="h-4 w-4 mr-2 hidden sm:inline" />
            Inbox
            {unreadCount > 0 && (
              <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center bg-primary">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="compose">
            <Send className="h-4 w-4 mr-2 hidden sm:inline" />
            Compose
          </TabsTrigger>
          <TabsTrigger value="announcements">
            <Megaphone className="h-4 w-4 mr-2 hidden sm:inline" />
            Feed
          </TabsTrigger>
          <TabsTrigger value="templates">
            <FileText className="h-4 w-4 mr-2 hidden sm:inline" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="chat">
            <MessageCircle className="h-4 w-4 mr-2 hidden sm:inline" />
            Team Chat
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          {/* Activity Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Message Activity (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockAnalytics.byDay}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'short' })}
                      className="text-xs"
                    />
                    <YAxis className="text-xs" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="count" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--primary))' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Recent Messages */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Recent Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentMessages.map(message => (
                    <div key={message.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                      <div className={`p-2 rounded-lg ${
                        message.channel === 'email' ? 'bg-blue-500/10' :
                        message.channel === 'sms' ? 'bg-green-500/10' : 'bg-purple-500/10'
                      }`}>
                        {message.channel === 'email' ? <Mail className="h-4 w-4 text-blue-600" /> :
                         message.channel === 'sms' ? <MessageSquare className="h-4 w-4 text-green-600" /> :
                         <Bell className="h-4 w-4 text-purple-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{message.subject || message.content}</p>
                        <p className="text-xs text-muted-foreground">
                          {message.direction === 'inbound' ? `From ${message.senderName}` : `To ${message.recipientName || message.recipientCount + ' recipients'}`}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">{message.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Announcements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Latest Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockAnnouncements.slice(0, 4).map(announcement => (
                    <div key={announcement.id} className="p-3 rounded-lg border">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-sm">{announcement.title}</h4>
                        <Badge variant="outline" className="text-xs">{announcement.priority}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {announcement.content}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                        <span>{announcement.viewCount} views</span>
                        <span>{announcement.likeCount} likes</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="inbox" className="mt-6">
          <UnifiedInbox />
        </TabsContent>

        <TabsContent value="compose" className="mt-6">
          <MessageComposer />
        </TabsContent>

        <TabsContent value="announcements" className="mt-6">
          <AnnouncementFeed />
        </TabsContent>

        <TabsContent value="templates" className="mt-6">
          <TemplateLibrary />
        </TabsContent>

        <TabsContent value="chat" className="mt-6">
          <TeamChatPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}
