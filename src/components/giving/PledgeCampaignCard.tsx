import { PledgeCampaign } from '@/types/giving';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Target, TrendingUp, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PledgeCampaignCardProps {
  campaign: PledgeCampaign;
  onClick?: () => void;
}

export const PledgeCampaignCard = ({ campaign, onClick }: PledgeCampaignCardProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
  };

  const raisedPercentage = Math.round((campaign.raisedAmount / campaign.goalAmount) * 100);
  const pledgedPercentage = Math.round((campaign.pledgedAmount / campaign.goalAmount) * 100);
  
  const daysRemaining = Math.ceil((new Date(campaign.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  const getStatusColor = (status: PledgeCampaign['status']) => {
    switch (status) {
      case 'active': return 'text-sage-dark bg-sage-light';
      case 'draft': return 'text-muted-foreground bg-muted';
      case 'completed': return 'text-primary bg-primary/10';
      case 'cancelled': return 'text-coral bg-coral-light';
    }
  };

  return (
    <div 
      onClick={onClick}
      className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className={cn(
            "text-xs px-2 py-0.5 rounded-full capitalize",
            getStatusColor(campaign.status)
          )}>
            {campaign.status}
          </span>
          <h3 className="text-xl font-display font-semibold text-foreground mt-2">{campaign.name}</h3>
          {campaign.description && (
            <p className="text-sm text-muted-foreground mt-1">{campaign.description}</p>
          )}
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Goal</p>
          <p className="text-2xl font-display font-semibold text-foreground">{formatCurrency(campaign.goalAmount)}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Raised: {formatCurrency(campaign.raisedAmount)}</span>
          <span className="text-sm font-medium text-foreground">{raisedPercentage}%</span>
        </div>
        <div className="h-3 bg-secondary rounded-full overflow-hidden relative">
          {/* Pledged amount (lighter) */}
          <div 
            className="absolute inset-y-0 left-0 bg-primary/30 rounded-full"
            style={{ width: `${Math.min(pledgedPercentage, 100)}%` }}
          />
          {/* Raised amount (solid) */}
          <div 
            className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all"
            style={{ width: `${Math.min(raisedPercentage, 100)}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
          <span>Pledged: {formatCurrency(campaign.pledgedAmount)} ({pledgedPercentage}%)</span>
          <span>{formatCurrency(campaign.goalAmount - campaign.raisedAmount)} to go</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 rounded-xl bg-secondary/50">
          <Users className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
          <p className="text-lg font-semibold text-foreground">{campaign.donorCount}</p>
          <p className="text-xs text-muted-foreground">Donors</p>
        </div>
        <div className="text-center p-3 rounded-xl bg-secondary/50">
          <Target className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
          <p className="text-lg font-semibold text-foreground">{campaign.pledgeCount}</p>
          <p className="text-xs text-muted-foreground">Pledges</p>
        </div>
        <div className="text-center p-3 rounded-xl bg-secondary/50">
          <Calendar className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
          <p className="text-lg font-semibold text-foreground">{daysRemaining}</p>
          <p className="text-xs text-muted-foreground">Days Left</p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>
            {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
          </span>
        </div>
        <Button variant="ghost" size="sm">
          View Details
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};
