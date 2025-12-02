import { useState } from 'react';
import { calculateFees, feeRates } from '@/data/mockGivingData';
import { PaymentMethod } from '@/types/giving';
import { Calculator, CreditCard, Building2, Smartphone, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

export const FeeCalculator = () => {
  const [amount, setAmount] = useState<number>(100);
  const [method, setMethod] = useState<PaymentMethod>('credit_card');

  const fees = calculateFees(amount, method);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  const paymentMethods: { id: PaymentMethod; label: string; icon: any }[] = [
    { id: 'credit_card', label: 'Card', icon: CreditCard },
    { id: 'ach', label: 'ACH', icon: Building2 },
    { id: 'apple_pay', label: 'Apple Pay', icon: Smartphone },
    { id: 'text_to_give', label: 'Text', icon: MessageSquare },
  ];

  return (
    <div className="p-6 rounded-2xl bg-card border border-border">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-display font-semibold text-foreground">Fee Calculator</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        See exactly how much reaches your church
      </p>

      {/* Amount Input */}
      <div className="mb-4">
        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Gift Amount</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
            className="w-full h-12 pl-8 pr-4 rounded-xl bg-secondary border-0 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Payment Method */}
      <div className="mb-6">
        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Payment Method</label>
        <div className="grid grid-cols-4 gap-2">
          {paymentMethods.map(pm => (
            <button
              key={pm.id}
              onClick={() => setMethod(pm.id)}
              className={cn(
                "flex flex-col items-center gap-1 p-3 rounded-xl text-xs font-medium transition-colors",
                method === pm.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              <pm.icon className="w-4 h-4" />
              {pm.label}
            </button>
          ))}
        </div>
      </div>

      {/* Fee Breakdown */}
      <div className="space-y-3 p-4 rounded-xl bg-secondary/50">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Gift amount</span>
          <span className="font-medium text-foreground">{formatCurrency(fees.amount)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Processing fee ({feeRates[method].percentage}%)</span>
          <span className="text-coral">-{formatCurrency(fees.processingFee)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Platform fee (1%)</span>
          <span className="text-coral">-{formatCurrency(fees.platformFee)}</span>
        </div>
        <div className="border-t border-border pt-3 flex justify-between">
          <span className="font-medium text-foreground">Church receives</span>
          <span className="font-semibold text-sage-dark">{formatCurrency(fees.netAmount)}</span>
        </div>
        <div className="text-center">
          <span className="text-xs text-muted-foreground">
            Total fees: {fees.feePercentage}% of gift
          </span>
        </div>
      </div>

      {/* Cover Fees Option */}
      <div className="mt-4 p-3 rounded-xl bg-sage-light/50 border border-sage/20">
        <p className="text-sm text-sage-dark">
          💡 <strong>Tip:</strong> Donors can choose to cover fees so 100% goes to the church
        </p>
      </div>
    </div>
  );
};
