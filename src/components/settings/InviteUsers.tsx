import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Copy, CheckCircle, Loader2, UserPlus } from "lucide-react";

type AppRole = 'super_admin' | 'admin' | 'editor' | 'viewer';

const emailSchema = z.string().email('Please enter a valid email address');

const roleDescriptions: Record<AppRole, string> = {
  super_admin: "Full access to everything including system settings",
  admin: "Full access to most features, cannot manage system settings",
  editor: "Can create and edit content in assigned modules",
  viewer: "Read-only access to assigned modules",
};

export function InviteUsers() {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [emails, setEmails] = useState("");
  const [selectedRole, setSelectedRole] = useState<AppRole>("viewer");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [inviteLink, setInviteLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleInvite = async () => {
    const emailList = emails
      .split(/[,\n]/)
      .map(e => e.trim())
      .filter(e => e.length > 0);

    if (emailList.length === 0) {
      toast({
        title: "No emails",
        description: "Please enter at least one email address",
        variant: "destructive",
      });
      return;
    }

    // Validate all emails
    const invalidEmails = emailList.filter(email => {
      try {
        emailSchema.parse(email);
        return false;
      } catch {
        return true;
      }
    });

    if (invalidEmails.length > 0) {
      toast({
        title: "Invalid emails",
        description: `These emails are invalid: ${invalidEmails.join(', ')}`,
        variant: "destructive",
      });
      return;
    }

    setSending(true);
    try {
      // Create invitations for each email
      const invitations = emailList.map(email => ({
        email,
        role: selectedRole,
        invited_by: user?.id,
      }));

      const { data, error } = await supabase
        .from('user_invitations')
        .insert(invitations)
        .select();

      if (error) throw error;

      // Generate invite link for the first invitation
      if (data && data.length > 0) {
        const link = `${window.location.origin}/auth?invite=${data[0].token}`;
        setInviteLink(link);
      }

      toast({
        title: "Invitations sent",
        description: `Successfully created ${emailList.length} invitation(s)`,
      });

      setEmails("");
      setMessage("");
    } catch (error: any) {
      console.error('Error creating invitations:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create invitations",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied!",
        description: "Invite link copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy link",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Invite Team Members
          </CardTitle>
          <CardDescription>
            Send invitations to add new staff and volunteers to your church
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="emails">Email Addresses</Label>
            <Textarea
              id="emails"
              placeholder="Enter email addresses (comma or newline separated)&#10;example@church.org&#10;another@church.org"
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              rows={4}
            />
            <p className="text-xs text-muted-foreground">
              You can enter multiple emails, separated by commas or new lines
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Default Role</Label>
            <Select value={selectedRole} onValueChange={(v) => setSelectedRole(v as AppRole)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="viewer">
                  <div className="flex flex-col">
                    <span>Viewer</span>
                  </div>
                </SelectItem>
                <SelectItem value="editor">
                  <div className="flex flex-col">
                    <span>Editor</span>
                  </div>
                </SelectItem>
                <SelectItem value="admin">
                  <div className="flex flex-col">
                    <span>Admin</span>
                  </div>
                </SelectItem>
                <SelectItem value="super_admin">
                  <div className="flex flex-col">
                    <span>Super Admin</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {roleDescriptions[selectedRole]}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Personal Message (Optional)</Label>
            <Textarea
              id="message"
              placeholder="Add a personal message to your invitation..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
            />
          </div>

          <Button onClick={handleInvite} disabled={sending} className="w-full">
            {sending ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Mail className="w-4 h-4 mr-2" />
            )}
            Send Invitations
          </Button>
        </CardContent>
      </Card>

      {inviteLink && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              Invitation Created
            </CardTitle>
            <CardDescription>
              Share this link with your invitees
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Input
                value={inviteLink}
                readOnly
                className="font-mono text-sm"
              />
              <Button 
                variant="outline" 
                onClick={handleCopyLink}
                className="flex-shrink-0"
              >
                {copied ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              This link will expire in 7 days
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
