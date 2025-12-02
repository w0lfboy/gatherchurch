import { useState } from 'react';
import { ApprovalRequest } from '@/types/events';
import { mockApprovalRequests } from '@/data/mockEventsData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Check, 
  X, 
  Clock, 
  Calendar, 
  MapPin, 
  Package,
  MessageSquare,
  AlertTriangle
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const typeIcons = {
  event: Calendar,
  room: MapPin,
  equipment: Package
};

const priorityStyles = {
  low: 'bg-muted text-muted-foreground',
  normal: 'bg-blue-500/10 text-blue-600',
  high: 'bg-orange-500/10 text-orange-600',
  urgent: 'bg-red-500/10 text-red-600'
};

export function ApprovalQueue() {
  const [requests, setRequests] = useState<ApprovalRequest[]>(mockApprovalRequests);
  const [selectedRequest, setSelectedRequest] = useState<ApprovalRequest | null>(null);
  const [comment, setComment] = useState('');
  const [activeTab, setActiveTab] = useState('pending');

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const processedRequests = requests.filter(r => r.status !== 'pending');

  const handleApprove = (requestId: string) => {
    setRequests(requests.map(r => 
      r.id === requestId 
        ? { ...r, status: 'approved', reviewedAt: new Date().toISOString(), comments: comment }
        : r
    ));
    toast.success('Request approved');
    setSelectedRequest(null);
    setComment('');
  };

  const handleReject = (requestId: string) => {
    if (!comment.trim()) {
      toast.error('Please provide a reason for rejection');
      return;
    }
    setRequests(requests.map(r => 
      r.id === requestId 
        ? { ...r, status: 'rejected', reviewedAt: new Date().toISOString(), comments: comment }
        : r
    ));
    toast.success('Request rejected');
    setSelectedRequest(null);
    setComment('');
  };

  const RequestCard = ({ request }: { request: ApprovalRequest }) => {
    const Icon = typeIcons[request.type];
    
    return (
      <Card 
        className="cursor-pointer hover:shadow-md transition-shadow"
        onClick={() => setSelectedRequest(request)}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className={cn(
              "p-2 rounded-lg",
              request.type === 'event' && 'bg-primary/10 text-primary',
              request.type === 'room' && 'bg-purple-500/10 text-purple-600',
              request.type === 'equipment' && 'bg-green-500/10 text-green-600'
            )}>
              <Icon className="h-5 w-5" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="capitalize text-xs">
                  {request.type}
                </Badge>
                <Badge className={priorityStyles[request.priority]}>
                  {request.priority}
                </Badge>
                {request.status !== 'pending' && (
                  <Badge className={cn(
                    request.status === 'approved' && 'bg-green-500/10 text-green-600',
                    request.status === 'rejected' && 'bg-red-500/10 text-red-600'
                  )}>
                    {request.status}
                  </Badge>
                )}
              </div>
              
              <h4 className="font-medium truncate">{request.title}</h4>
              
              {request.description && (
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                  {request.description}
                </p>
              )}
              
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span>By {request.requestedByName}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatDistanceToNow(new Date(request.requestedAt), { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-yellow-500/10">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{pendingRequests.length}</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-500/10">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">
                {pendingRequests.filter(r => r.priority === 'urgent' || r.priority === 'high').length}
              </div>
              <div className="text-sm text-muted-foreground">High Priority</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/10">
              <Check className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">
                {processedRequests.filter(r => r.status === 'approved').length}
              </div>
              <div className="text-sm text-muted-foreground">Approved Today</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Request Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="pending" className="relative">
            Pending
            {pendingRequests.length > 0 && (
              <span className="ml-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                {pendingRequests.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="processed">Processed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="mt-4">
          {pendingRequests.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Check className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>All caught up! No pending requests.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingRequests.map(request => (
                <RequestCard key={request.id} request={request} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="processed" className="mt-4">
          {processedRequests.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No processed requests yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {processedRequests.map(request => (
                <RequestCard key={request.id} request={request} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Detail Dialog */}
      <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
        <DialogContent className="max-w-lg">
          {selectedRequest && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedRequest.title}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="capitalize">
                    {selectedRequest.type} Request
                  </Badge>
                  <Badge className={priorityStyles[selectedRequest.priority]}>
                    {selectedRequest.priority} priority
                  </Badge>
                </div>
                
                {selectedRequest.description && (
                  <p className="text-muted-foreground">{selectedRequest.description}</p>
                )}
                
                <div className="p-3 rounded-lg bg-muted/50 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Requested by</span>
                    <span className="font-medium">{selectedRequest.requestedByName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Submitted</span>
                    <span>{formatDistanceToNow(new Date(selectedRequest.requestedAt), { addSuffix: true })}</span>
                  </div>
                </div>
                
                {selectedRequest.status === 'pending' && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Add Comment
                      </label>
                      <Textarea
                        placeholder="Optional for approval, required for rejection..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </div>
                    
                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleReject(selectedRequest.id)}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                      <Button 
                        className="flex-1"
                        onClick={() => handleApprove(selectedRequest.id)}
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                    </div>
                  </>
                )}
                
                {selectedRequest.status !== 'pending' && selectedRequest.comments && (
                  <div className="p-3 rounded-lg border">
                    <div className="text-sm font-medium mb-1">Review Comments</div>
                    <p className="text-sm text-muted-foreground">{selectedRequest.comments}</p>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
