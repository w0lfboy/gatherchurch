import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  UserPlus,
  Heart,
  Star,
  HandHeart,
  Send,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const cardTypes = [
  { id: 'first_time', label: 'First Time Visitor', icon: UserPlus, color: 'bg-blue-500' },
  { id: 'prayer_request', label: 'Prayer Request', icon: Heart, color: 'bg-purple-500' },
  { id: 'decision', label: 'Made a Decision', icon: Star, color: 'bg-green-500' },
  { id: 'volunteer_interest', label: 'Want to Serve', icon: HandHeart, color: 'bg-orange-500' },
];

export function DigitalConnectCard() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!formData.name) {
      toast.error('Please enter your name');
      return;
    }
    if (!selectedType) {
      toast.error('Please select a card type');
      return;
    }
    
    setSubmitted(true);
    toast.success('Thank you! Your card has been submitted.');
  };

  const handleReset = () => {
    setSelectedType(null);
    setFormData({ name: '', email: '', phone: '', message: '' });
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
          <Check className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-2xl font-display font-semibold text-foreground text-center mb-2">
          Thank You!
        </h1>
        <p className="text-muted-foreground text-center mb-8">
          We've received your connect card and someone will reach out soon.
        </p>
        <Button onClick={handleReset}>Submit Another Card</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-4">
      {/* Header */}
      <div className="px-4">
        <h1 className="text-2xl font-display font-semibold text-foreground">
          Connect Card
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          We'd love to connect with you
        </p>
      </div>

      {/* Card Type Selection */}
      <div className="px-4">
        <Label className="text-base font-medium mb-3 block">I'm here to...</Label>
        <div className="grid grid-cols-2 gap-3">
          {cardTypes.map(type => {
            const isSelected = selectedType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={cn(
                  'p-4 rounded-xl border-2 text-left transition-all',
                  isSelected 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                )}
              >
                <div className={cn(
                  'w-10 h-10 rounded-lg flex items-center justify-center mb-3',
                  isSelected ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
                )}>
                  <type.icon className="w-5 h-5" />
                </div>
                <div className="font-medium text-foreground text-sm">{type.label}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Contact Info */}
      <div className="px-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Your Name *</Label>
          <Input
            id="name"
            placeholder="John Smith"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(555) 123-4567"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">
            {selectedType === 'prayer_request' ? 'Prayer Request' : 
             selectedType === 'decision' ? 'Tell us about your decision' :
             selectedType === 'volunteer_interest' ? 'Areas of interest' :
             'Anything else?'}
          </Label>
          <Textarea
            id="message"
            placeholder={
              selectedType === 'prayer_request' 
                ? 'Share your prayer request...' 
                : 'Share any additional information...'
            }
            value={formData.message}
            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            rows={4}
          />
        </div>
      </div>

      {/* Submit */}
      <div className="px-4">
        <Button className="w-full h-12 text-base" onClick={handleSubmit}>
          <Send className="w-5 h-5 mr-2" />
          Submit Card
        </Button>
      </div>
    </div>
  );
}
