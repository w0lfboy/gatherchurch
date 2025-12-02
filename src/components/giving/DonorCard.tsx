import { Donor } from '@/types/giving';
import { 
  Mail, Phone, TrendingUp, TrendingDown, RefreshCw,
  Award, Star, Heart, Sparkles, Crown
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DonorCardProps {
  donor: Donor;
  onClick?: () => void;
}

export const DonorCard = ({ donor, onClick }: DonorCardProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const getTierIcon = (tier: Donor['givingTier']) => {
    switch (tier) {
      case 'major': return Crown;
      case 'faithful': return Star;
      case 'regular': return Heart;
      case 'occasional': return Sparkles;
      default: return Award;
    }
  };

  const getTierColor = (tier: Donor['givingTier']) => {
    switch (tier) {
      case 'major': return 'text-gold bg-secondary';
      case 'faithful': return 'text-primary bg-primary/10';
      case 'regular': return 'text-sage-dark bg-sage-light';
      case 'occasional': return 'text-coral bg-coral-light';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getTierLabel = (tier: Donor['givingTier']) => {
    return tier.charAt(0).toUpperCase() + tier.slice(1);
  };

  const TierIcon = getTierIcon(donor.givingTier);
  const yearOverYearChange = donor.lastYearGiving > 0 
    ? ((donor.yearToDateGiving - donor.lastYearGiving) / donor.lastYearGiving * 100)
    : 100;

  return (
    <div 
      onClick={onClick}
      className="p-5 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sage-light to-coral-light flex items-center justify-center flex-shrink-0">
          <span className="text-lg font-semibold text-sage-dark">
            {donor.firstName[0]}{donor.lastName[0]}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-semibold text-foreground">
                {donor.firstName} {donor.lastName}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded-full flex items-center gap-1",
                  getTierColor(donor.givingTier)
                )}>
                  <TierIcon className="w-3 h-3" />
                  {getTierLabel(donor.givingTier)}
                </span>
                {donor.recurringGifts.length > 0 && (
                  <span className="text-xs text-primary flex items-center gap-1">
                    <RefreshCw className="w-3 h-3" />
                    Recurring
                  </span>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-display font-semibold text-foreground">
                {formatCurrency(donor.totalGiven)}
              </p>
              <p className="text-xs text-muted-foreground">lifetime</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div>
              <p className="text-xs text-muted-foreground">This Year</p>
              <p className="font-medium text-foreground">{formatCurrency(donor.yearToDateGiving)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Avg Gift</p>
              <p className="font-medium text-foreground">{formatCurrency(donor.averageGift)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">YoY Change</p>
              <p className={cn(
                "font-medium flex items-center gap-1",
                yearOverYearChange >= 0 ? "text-sage-dark" : "text-coral"
              )}>
                {yearOverYearChange >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {Math.abs(yearOverYearChange).toFixed(0)}%
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
            {donor.email && (
              <a 
                href={`mailto:${donor.email}`}
                onClick={(e) => e.stopPropagation()}
                className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1.5 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                {donor.email}
              </a>
            )}
            {donor.phone && (
              <a 
                href={`tel:${donor.phone}`}
                onClick={(e) => e.stopPropagation()}
                className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                {donor.phone}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
