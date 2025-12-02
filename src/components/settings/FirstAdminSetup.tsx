import { useState, useEffect } from "react";
import { Shield, Crown, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export function FirstAdminSetup() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [hasAnySuperAdmin, setHasAnySuperAdmin] = useState<boolean | null>(null);
  const [setupComplete, setSetupComplete] = useState(false);

  useEffect(() => {
    checkForSuperAdmin();
  }, []);

  const checkForSuperAdmin = async () => {
    const { data, error } = await supabase.rpc('has_any_super_admin');
    if (!error) {
      setHasAnySuperAdmin(data);
    }
  };

  const handleMakeSuperAdmin = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('make_first_super_admin', {
        _user_id: user.id
      });

      if (error) throw error;

      if (data) {
        setSetupComplete(true);
        toast({
          title: "Success!",
          description: "You are now the super admin. Refreshing permissions...",
        });
        // Reload the page to refresh permissions
        setTimeout(() => window.location.reload(), 1500);
      } else {
        toast({
          title: "Cannot assign role",
          description: "A super admin already exists in the system.",
          variant: "destructive",
        });
        setHasAnySuperAdmin(true);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Don't show if we're still checking or if super admin exists
  if (hasAnySuperAdmin === null || hasAnySuperAdmin === true) {
    return null;
  }

  if (setupComplete) {
    return (
      <Card className="border-green-500/50 bg-green-500/5">
        <CardContent className="flex items-center gap-4 py-6">
          <CheckCircle className="w-8 h-8 text-green-500" />
          <div>
            <p className="font-medium text-foreground">Setup Complete!</p>
            <p className="text-sm text-muted-foreground">Refreshing your permissions...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary/50 bg-primary/5">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Crown className="w-6 h-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">First-Time Setup</CardTitle>
            <CardDescription>
              No administrator has been assigned yet
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          As the first user, you can claim the Super Admin role. This will give you full access 
          to manage all users, roles, and permissions in the system.
        </p>
        <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
          <Shield className="w-5 h-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            This action can only be performed once when no admins exist.
          </span>
        </div>
        <Button 
          onClick={handleMakeSuperAdmin} 
          disabled={loading}
          className="w-full"
        >
          {loading ? "Setting up..." : "Make Me Super Admin"}
        </Button>
      </CardContent>
    </Card>
  );
}