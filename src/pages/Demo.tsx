import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useTenant } from '@/hooks/useTenant';
import { Church, Loader2, Users, Calendar, Heart, CheckCircle2, ArrowRight } from 'lucide-react';

const churchNameSchema = z.string().min(2, 'Church name must be at least 2 characters').max(100);
const slugSchema = z.string().min(2, 'URL must be at least 2 characters').max(50).regex(/^[a-z0-9-]+$/, 'URL can only contain lowercase letters, numbers, and hyphens');
const emailSchema = z.string().email('Please enter a valid email address');
const passwordSchema = z.string().min(8, 'Password must be at least 8 characters');
const nameSchema = z.string().min(2, 'Name must be at least 2 characters');

export default function Demo() {
  const navigate = useNavigate();
  const { user, signUp } = useAuth();
  const { createTenant } = useTenant();
  const { toast } = useToast();

  const [step, setStep] = useState<'info' | 'account' | 'setup'>(user ? 'setup' : 'info');
  const [isLoading, setIsLoading] = useState(false);

  // Church info
  const [churchName, setChurchName] = useState('');
  const [churchSlug, setChurchSlug] = useState('');

  // Account info
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50);
  };

  const handleChurchNameChange = (value: string) => {
    setChurchName(value);
    if (!churchSlug || churchSlug === generateSlug(churchName)) {
      setChurchSlug(generateSlug(value));
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    try {
      churchNameSchema.parse(churchName);
    } catch (e) {
      if (e instanceof z.ZodError) newErrors.churchName = e.errors[0].message;
    }

    try {
      slugSchema.parse(churchSlug);
    } catch (e) {
      if (e instanceof z.ZodError) newErrors.churchSlug = e.errors[0].message;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};

    try {
      nameSchema.parse(fullName);
    } catch (e) {
      if (e instanceof z.ZodError) newErrors.fullName = e.errors[0].message;
    }

    try {
      emailSchema.parse(email);
    } catch (e) {
      if (e instanceof z.ZodError) newErrors.email = e.errors[0].message;
    }

    try {
      passwordSchema.parse(password);
    } catch (e) {
      if (e instanceof z.ZodError) newErrors.password = e.errors[0].message;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(user ? 'setup' : 'account');
    }
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setIsLoading(true);
    const { error } = await signUp(email, password, fullName);

    if (error) {
      toast({
        title: 'Signup failed',
        description: error.message,
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    setStep('setup');
    setIsLoading(false);
  };

  const handleSetupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep1()) {
      setStep('info');
      return;
    }

    setIsLoading(true);
    const { tenant, error } = await createTenant(churchName, churchSlug);

    if (error) {
      toast({
        title: 'Setup failed',
        description: error.message,
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    toast({
      title: 'Welcome to Gather!',
      description: `${churchName} is now set up with a 14-day free trial.`,
    });

    navigate('/dashboard');
    setIsLoading(false);
  };

  const features = [
    { icon: Users, title: 'People Management', description: 'Track members, visitors, and families' },
    { icon: Calendar, title: 'Event Scheduling', description: 'Plan services, meetings, and activities' },
    { icon: Heart, title: 'Giving & Donations', description: 'Accept and track contributions' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-cream-dark">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Church className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-2xl text-foreground">Gather</span>
          </a>
          <a href="/auth" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Already have an account? Sign in
          </a>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Start Your Free Trial
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get your church set up with Gather in minutes. No credit card required.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Form */}
            <Card className="border-border shadow-elevated">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  {['info', 'account', 'setup'].map((s, i) => (
                    <div key={s} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step === s ? 'bg-primary text-primary-foreground' :
                        ['info', 'account', 'setup'].indexOf(step) > i ? 'bg-primary/20 text-primary' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {['info', 'account', 'setup'].indexOf(step) > i ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          i + 1
                        )}
                      </div>
                      {i < 2 && <div className="w-8 h-0.5 bg-muted mx-1" />}
                    </div>
                  ))}
                </div>
                <CardTitle className="text-xl">
                  {step === 'info' && 'Church Information'}
                  {step === 'account' && 'Create Your Account'}
                  {step === 'setup' && 'Complete Setup'}
                </CardTitle>
                <CardDescription>
                  {step === 'info' && "Tell us about your church"}
                  {step === 'account' && "Create your admin account"}
                  {step === 'setup' && "You're almost ready!"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {step === 'info' && (
                  <form onSubmit={handleStep1Submit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="church-name">Church Name</Label>
                      <Input
                        id="church-name"
                        placeholder="First Baptist Church"
                        value={churchName}
                        onChange={(e) => handleChurchNameChange(e.target.value)}
                        className={errors.churchName ? 'border-destructive' : ''}
                      />
                      {errors.churchName && (
                        <p className="text-sm text-destructive">{errors.churchName}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="church-slug">Your Gather URL</Label>
                      <div className="flex items-center">
                        <span className="text-sm text-muted-foreground mr-1">gather.app/</span>
                        <Input
                          id="church-slug"
                          placeholder="first-baptist"
                          value={churchSlug}
                          onChange={(e) => setChurchSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                          className={errors.churchSlug ? 'border-destructive' : ''}
                        />
                      </div>
                      {errors.churchSlug && (
                        <p className="text-sm text-destructive">{errors.churchSlug}</p>
                      )}
                    </div>

                    <Button type="submit" className="w-full">
                      Continue <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                )}

                {step === 'account' && (
                  <form onSubmit={handleStep2Submit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="full-name">Full Name</Label>
                      <Input
                        id="full-name"
                        placeholder="Pastor John Smith"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className={errors.fullName ? 'border-destructive' : ''}
                      />
                      {errors.fullName && (
                        <p className="text-sm text-destructive">{errors.fullName}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="pastor@church.org"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={errors.email ? 'border-destructive' : ''}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={errors.password ? 'border-destructive' : ''}
                      />
                      {errors.password && (
                        <p className="text-sm text-destructive">{errors.password}</p>
                      )}
                      <p className="text-xs text-muted-foreground">Must be at least 8 characters</p>
                    </div>

                    <div className="flex gap-2">
                      <Button type="button" variant="outline" onClick={() => setStep('info')}>
                        Back
                      </Button>
                      <Button type="submit" className="flex-1" disabled={isLoading}>
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                        Create Account
                      </Button>
                    </div>
                  </form>
                )}

                {step === 'setup' && (
                  <form onSubmit={handleSetupSubmit} className="space-y-4">
                    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                      <p className="text-sm font-medium">Setting up:</p>
                      <p className="text-lg font-semibold">{churchName || 'Your Church'}</p>
                      <p className="text-sm text-muted-foreground">gather.app/{churchSlug || 'your-church'}</p>
                    </div>

                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                      <p className="text-sm font-medium text-primary mb-1">14-Day Free Trial</p>
                      <p className="text-sm text-muted-foreground">
                        Full access to all features. No credit card required.
                      </p>
                    </div>

                    <div className="flex gap-2">
                      {!user && (
                        <Button type="button" variant="outline" onClick={() => setStep('account')}>
                          Back
                        </Button>
                      )}
                      <Button type="submit" className="flex-1" disabled={isLoading}>
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                        Start Free Trial
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Features */}
            <div className="space-y-6">
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Everything you need to manage your church
              </h2>
              <div className="space-y-4">
                {features.map((feature) => (
                  <div key={feature.title} className="flex gap-4 p-4 bg-background rounded-lg border border-border">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-muted/50 rounded-lg p-6">
                <p className="text-sm text-muted-foreground mb-4">
                  "Gather transformed how we connect with our congregation. Setup took minutes and the team has been incredibly supportive."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                    PM
                  </div>
                  <div>
                    <p className="font-medium text-sm">Pastor Michael</p>
                    <p className="text-xs text-muted-foreground">Grace Community Church</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
