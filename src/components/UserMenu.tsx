import { useState } from 'react';
import { User, Settings, Bug, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserProfile {
  full_name: string | null;
  email: string;
  phone: string | null;
  avatar_url: string | null;
}

export function UserMenu() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [reportIssueOpen, setReportIssueOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [issueDescription, setIssueDescription] = useState('');
  const [issueTitle, setIssueTitle] = useState('');

  const initials = profile?.full_name
    ? profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : user?.email?.slice(0, 2).toUpperCase() || 'U';

  const loadProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('full_name, email, phone, avatar_url')
      .eq('id', user.id)
      .single();
    
    if (data) {
      setProfile(data);
    } else if (error) {
      setProfile({
        full_name: null,
        email: user.email || '',
        phone: null,
        avatar_url: null,
      });
    }
    setLoading(false);
  };

  const handlePreferencesOpen = () => {
    loadProfile();
    setPreferencesOpen(true);
  };

  const handleSaveProfile = async () => {
    if (!user || !profile) return;
    
    setLoading(true);
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: profile.full_name,
        phone: profile.phone,
      })
      .eq('id', user.id);
    
    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Profile updated',
        description: 'Your preferences have been saved.',
      });
      setPreferencesOpen(false);
    }
    setLoading(false);
  };

  const handleReportIssue = async () => {
    if (!issueTitle.trim() || !issueDescription.trim()) {
      toast({
        title: 'Missing information',
        description: 'Please provide both a title and description.',
        variant: 'destructive',
      });
      return;
    }

    // For now, we'll just show a success message
    // In production, this would send to a support system or create a database entry
    toast({
      title: 'Issue reported',
      description: 'Thank you for your feedback. Our team will review this shortly.',
    });
    setIssueTitle('');
    setIssueDescription('');
    setReportIssueOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-full">
            <Avatar className="h-9 w-9 cursor-pointer">
              <AvatarImage src={profile?.avatar_url || undefined} />
              <AvatarFallback className="bg-gradient-to-br from-sage-light to-coral-light text-sage-dark text-sm font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="px-2 py-1.5">
            <p className="text-sm font-medium text-foreground">{profile?.full_name || 'User'}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handlePreferencesOpen} className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            User Preferences
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setReportIssueOpen(true)} className="cursor-pointer">
            <Bug className="mr-2 h-4 w-4" />
            Report Issue
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive focus:text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* User Preferences Dialog */}
      <Dialog open={preferencesOpen} onOpenChange={setPreferencesOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>User Preferences</DialogTitle>
            <DialogDescription>
              Update your personal information and preferences.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={profile?.full_name || ''}
                onChange={(e) => setProfile(prev => prev ? { ...prev, full_name: e.target.value } : null)}
                placeholder="Enter your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={profile?.email || user?.email || ''}
                disabled
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">Email cannot be changed here.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={profile?.phone || ''}
                onChange={(e) => setProfile(prev => prev ? { ...prev, phone: e.target.value } : null)}
                placeholder="Enter your phone number"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setPreferencesOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveProfile} disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Report Issue Dialog */}
      <Dialog open={reportIssueOpen} onOpenChange={setReportIssueOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Report an Issue</DialogTitle>
            <DialogDescription>
              Found a bug or have feedback? Let us know and we'll look into it.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="issueTitle">Issue Title</Label>
              <Input
                id="issueTitle"
                value={issueTitle}
                onChange={(e) => setIssueTitle(e.target.value)}
                placeholder="Brief description of the issue"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="issueDescription">Description</Label>
              <Textarea
                id="issueDescription"
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
                placeholder="Please describe the issue in detail. Include steps to reproduce if applicable."
                rows={5}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setReportIssueOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleReportIssue}>
              Submit Report
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
