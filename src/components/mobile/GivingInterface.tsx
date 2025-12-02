import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Heart,
  CreditCard,
  Calendar,
  TrendingUp,
  ChevronRight,
  Clock,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const presetAmounts = [25, 50, 100, 250, 500];

const fundOptions = [
  { id: 'general', label: 'General Fund', description: 'Supporting church operations' },
  { id: 'missions', label: 'Missions', description: 'Global and local outreach' },
  { id: 'building', label: 'Building Fund', description: 'Facility improvements' },
  { id: 'benevolence', label: 'Benevolence', description: 'Helping those in need' },
];

export function GivingInterface() {
  const [amount, setAmount] = useState('');
  const [selectedFund, setSelectedFund] = useState('general');
  const [frequency, setFrequency] = useState<'one-time' | 'weekly' | 'monthly'>('one-time');
  const [step, setStep] = useState(1);

  const handleAmountSelect = (value: number) => {
    setAmount(value.toString());
  };

  const handleContinue = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter an amount');
      return;
    }
    setStep(2);
  };

  const handleGive = () => {
    toast.success(`Thank you for your ${frequency === 'one-time' ? '' : frequency + ' '}gift of $${amount}!`);
    setAmount('');
    setStep(1);
  };

  return (
    <div className="space-y-6 pb-4">
      {/* Header */}
      <div className="px-4">
        <h1 className="text-2xl font-display font-semibold text-foreground">
          Give
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Support the mission of our church
        </p>
      </div>

      {step === 1 && (
        <>
          {/* Amount Selection */}
          <div className="px-4">
            <Label className="text-base font-medium mb-3 block">Amount</Label>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {presetAmounts.map(preset => (
                <Button
                  key={preset}
                  variant={amount === preset.toString() ? 'default' : 'outline'}
                  onClick={() => handleAmountSelect(preset)}
                  className="h-12"
                >
                  ${preset}
                </Button>
              ))}
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  type="number"
                  placeholder="Other"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="h-12 pl-7"
                />
              </div>
            </div>
          </div>

          {/* Frequency */}
          <div className="px-4">
            <Label className="text-base font-medium mb-3 block">Frequency</Label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={frequency === 'one-time' ? 'default' : 'outline'}
                onClick={() => setFrequency('one-time')}
                className="h-12"
              >
                One-time
              </Button>
              <Button
                variant={frequency === 'weekly' ? 'default' : 'outline'}
                onClick={() => setFrequency('weekly')}
                className="h-12"
              >
                Weekly
              </Button>
              <Button
                variant={frequency === 'monthly' ? 'default' : 'outline'}
                onClick={() => setFrequency('monthly')}
                className="h-12"
              >
                Monthly
              </Button>
            </div>
          </div>

          {/* Fund Selection */}
          <div className="px-4">
            <Label className="text-base font-medium mb-3 block">Fund</Label>
            <RadioGroup value={selectedFund} onValueChange={setSelectedFund}>
              <div className="space-y-2">
                {fundOptions.map(fund => (
                  <label
                    key={fund.id}
                    className={cn(
                      'flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors',
                      selectedFund === fund.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:bg-secondary/50'
                    )}
                  >
                    <RadioGroupItem value={fund.id} className="flex-shrink-0" />
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{fund.label}</div>
                      <div className="text-sm text-muted-foreground">{fund.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </RadioGroup>
          </div>

          <div className="px-4">
            <Button className="w-full h-12 text-base" onClick={handleContinue}>
              Continue
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          {/* Summary */}
          <div className="px-4">
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-4xl font-bold text-foreground">${amount}</div>
                  <div className="text-muted-foreground mt-1">
                    {frequency === 'one-time' ? 'One-time gift' : `${frequency.charAt(0).toUpperCase() + frequency.slice(1)} giving`}
                  </div>
                </div>
                
                <div className="space-y-3 border-t border-border/50 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Fund</span>
                    <span className="font-medium text-foreground">
                      {fundOptions.find(f => f.id === selectedFund)?.label}
                    </span>
                  </div>
                  {frequency !== 'one-time' && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Next payment</span>
                      <span className="font-medium text-foreground">Today</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Method */}
          <div className="px-4">
            <Label className="text-base font-medium mb-3 block">Payment Method</Label>
            <Card className="border-2 border-primary">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-foreground">•••• •••• •••• 4242</div>
                  <div className="text-sm text-muted-foreground">Expires 12/25</div>
                </div>
                <Check className="w-5 h-5 text-primary" />
              </CardContent>
            </Card>
            <Button variant="link" className="px-0 mt-2 text-primary">
              + Add new payment method
            </Button>
          </div>

          <div className="px-4 space-y-3">
            <Button className="w-full h-12 text-base" onClick={handleGive}>
              <Heart className="w-5 h-5 mr-2" />
              Give ${amount}
            </Button>
            <Button variant="ghost" className="w-full" onClick={() => setStep(1)}>
              Back
            </Button>
          </div>
        </>
      )}

      {/* Recent Giving */}
      <div className="px-4 mt-8">
        <h2 className="font-semibold text-foreground mb-4">Your Giving</h2>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">This Year</span>
              </div>
              <div className="text-xl font-bold text-foreground">$2,450</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">This Month</span>
              </div>
              <div className="text-xl font-bold text-foreground">$300</div>
            </CardContent>
          </Card>
        </div>
        <Button variant="outline" className="w-full">
          View Giving History
        </Button>
      </div>
    </div>
  );
}
