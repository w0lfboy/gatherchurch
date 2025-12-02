import { RecurringGift } from '@/types/giving';
import { Button } from '@/components/ui/button';
import { 
  RefreshCw, Calendar, CreditCard, Pause, Play, 
  MoreHorizontal, DollarSign
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecurringGiftCardProps {
  gift: RecurringGift;
  onEdit?: () => void;
  onPause?: () => void;
}

export const RecurringGiftCard = ({ gift, onEdit, onPause }: RecurringGiftCardProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const getFrequencyLabel = (freq: RecurringGift['frequency']) => {
    const labels: Record<string, string> = {
      one_time: 'One-time',
      weekly: 'Weekly',
      bi_weekly: 'Bi-weekly',
      monthly: 'Monthly',
      quarterly: 'Quarterly',
      annually: 'Annually',
    };
    return labels[freq] || freq;
  };

  const getPaymentMethodLabel = (method: string) => {
    const labels: Record<string, string> = {
      credit_card: 'Credit Card',
      ach: 'Bank Transfer',
      apple_pay: 'Apple Pay',
      google_pay: 'Google Pay',
    };
    return labels[method] || method;
  };

  const getStatusColor = (status: RecurringGift['status']) => {
    switch (status) {
      case 'active': return 'text-sage-dark bg-sage-light border-sage/30';
      case 'paused': return 'text-gold bg-secondary border-gold/30';
      case 'cancelled': return 'text-muted-foreground bg-muted border-border';
    }
  };

  return (
    <div className="p-5 rounded-xl bg-card border border-border hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <RefreshCw className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{gift.donorName}</h3>
            <p className="text-sm text-muted-foreground">{gift.fundName}</p>
          </div>
        </div>
        <span className={cn(
          "text-xs px-2.5 py-1 rounded-full border capitalize",
          getStatusColor(gift.status)
        )}>
          {gift.status}
        </span>
      </div>

      {/* Amount */}
      <div className="flex items-baseline gap-1 mb-4">
        <span className="text-3xl font-display font-semibold text-foreground">
          {formatCurrency(gift.amount)}
        </span>
        <span className="text-muted-foreground">/ {getFrequencyLabel(gift.frequency).toLowerCase()}</span>
      </div>

      {/* Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>Next: {new Date(gift.nextProcessingDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CreditCard className="w-4 h-4" />
          <span>{getPaymentMethodLabel(gift.paymentMethod)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <DollarSign className="w-4 h-4" />
          <span>{formatCurrency(gift.totalGiven)} total ({gift.giftCount} gifts)</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-4 border-t border-border">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={onEdit}
        >
          Edit
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onPause}
        >
          {gift.status === 'paused' ? (
            <>
              <Play className="w-4 h-4 mr-1" />
              Resume
            </>
          ) : (
            <>
              <Pause className="w-4 h-4 mr-1" />
              Pause
            </>
          )}
        </Button>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
