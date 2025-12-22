import { useState, useEffect, useCallback, useRef } from "react";
import { 
  ChevronLeft, ChevronRight, Users, Target, TrendingUp, 
  Calendar, DollarSign, Rocket, Shield, Heart, 
  CheckCircle, ArrowRight, Zap, Globe, Lock,
  Maximize, Minimize, Keyboard, X, AlertTriangle,
  Clock, MapPin, Smartphone, BarChart3, MessageSquare,
  CreditCard, UserCheck, Building2, Star, Quote,
  ChevronDown, Sparkles, CircleDot
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
}

const PitchDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  
  // Touch/swipe state
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 50;

  const slides: Slide[] = [
    // Slide 1: Title
    {
      id: 1,
      title: "Title",
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center px-8 md:px-16 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-sage/20 blur-3xl animate-pulse-soft" />
            <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-coral/20 blur-3xl animate-pulse-soft animation-delay-300" />
            <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-gold/15 blur-2xl animate-float" />
          </div>
          
          <div className="relative z-10 animate-fade-up">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-3xl bg-gradient-to-br from-sage to-sage-dark flex items-center justify-center mb-8 shadow-elevated mx-auto transform hover:scale-105 transition-transform">
              <span className="text-primary-foreground font-display font-bold text-5xl md:text-6xl">G</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-semibold text-foreground mb-4">
              GatherChurch
            </h1>
            <p className="text-xl md:text-2xl text-charcoal-light mb-10 max-w-lg mx-auto">
              One place to gather your church together
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-sage-light border border-sage/30 shadow-card">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-sage"></span>
              </span>
              <span className="text-sage-dark font-medium">
                Strategic Partnership Proposal 2025
              </span>
            </div>
          </div>
          
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
            <ChevronDown className="w-6 h-6 text-muted-foreground" />
          </div>
        </div>
      ),
    },
    // Slide 2: The Problem - Story Hook
    {
      id: 2,
      title: "The Problem",
      subtitle: "A growing crisis in church administration",
      content: (
        <div className="px-8 md:px-16 py-8 md:py-12 h-full flex flex-col">
          <div className="animate-fade-up">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-6 h-6 text-coral" />
              <span className="text-sm font-medium text-coral uppercase tracking-wider">The Crisis</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-2">
              Small Churches Are Drowning
            </h2>
            <p className="text-lg text-charcoal-light mb-8 max-w-2xl">
              While megachurches thrive with enterprise tools, the <span className="text-sage font-semibold">300,000+ small to mid-size churches</span> struggle with fragmented, expensive software.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
            <div className="space-y-4 animate-fade-up animation-delay-100">
              <div className="p-5 rounded-2xl bg-coral-light border border-coral/20 hover:shadow-card transition-shadow">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-coral/20 flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-5 h-5 text-coral" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-coral">Crushing Costs</h3>
                    <p className="text-sm text-charcoal-light mt-1">
                      Planning Center charges <strong>$300+/month</strong> for full features. Per-module pricing punishes growth.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-5 rounded-2xl bg-secondary border border-border hover:shadow-card transition-shadow">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-charcoal-light" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Outdated Tech</h3>
                    <p className="text-sm text-charcoal-light mt-1">
                      19-year-old architecture. No AI. No automation. Staff waste <strong>10+ hours/week</strong> on manual tasks.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-5 rounded-2xl bg-secondary border border-border hover:shadow-card transition-shadow">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-charcoal-light" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Steep Learning Curve</h3>
                    <p className="text-sm text-charcoal-light mt-1">
                      Volunteer admins can't master complex systems. Churches use only <strong>20% of features</strong> they pay for.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col justify-center animate-fade-up animation-delay-200">
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-sage-light via-secondary to-coral-light/30 border border-sage/20">
                <div className="absolute -top-3 -right-3 bg-coral text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                  Ripe for disruption
                </div>
                <div className="text-center">
                  <div className="text-6xl md:text-7xl font-display font-bold text-sage mb-2">60K+</div>
                  <p className="text-lg text-sage-dark font-medium">Churches on Planning Center alone</p>
                  <div className="w-16 h-px bg-sage/30 mx-auto my-4" />
                  <p className="text-sm text-charcoal-light">
                    "We pay for 7 modules but only really use 3. It's too expensive and too complicated."
                  </p>
                  <p className="text-xs text-muted-foreground mt-2 italic">
                    — Pastor, 200-member church in Texas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    // Slide 3: Market Opportunity
    {
      id: 3,
      title: "Market Opportunity",
      subtitle: "An underserved market worth billions",
      content: (
        <div className="px-8 md:px-16 py-8 md:py-12 h-full flex flex-col">
          <div className="animate-fade-up">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="w-6 h-6 text-sage" />
              <span className="text-sm font-medium text-sage uppercase tracking-wider">Market Analysis</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-8">
              The Sweet Spot: 50-500 Member Churches
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-up animation-delay-100">
            {[
              { value: "300K+", label: "Churches in the US", sublabel: "Protestant & Catholic", color: "sage" },
              { value: "$4.2B", label: "ChMS Market Size", sublabel: "By 2028 (CAGR 8.7%)", color: "coral" },
              { value: "72%", label: "Have <200 Members", sublabel: "Underserved segment", color: "gold" },
            ].map((stat, i) => (
              <div 
                key={i} 
                className={cn(
                  "p-6 rounded-2xl text-center transform hover:scale-105 transition-all",
                  stat.color === "sage" && "bg-sage-light border border-sage/20",
                  stat.color === "coral" && "bg-coral-light border border-coral/20",
                  stat.color === "gold" && "bg-secondary border border-gold/30"
                )}
              >
                <div className={cn(
                  "text-4xl md:text-5xl font-display font-bold mb-2",
                  stat.color === "sage" && "text-sage",
                  stat.color === "coral" && "text-coral",
                  stat.color === "gold" && "text-gold"
                )}>
                  {stat.value}
                </div>
                <p className="font-semibold text-foreground">{stat.label}</p>
                <p className="text-sm text-muted-foreground">{stat.sublabel}</p>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 animate-fade-up animation-delay-200">
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-sage" />
                Competitive Landscape
              </h3>
              <div className="space-y-3">
                {[
                  { name: "Planning Center", price: "$150-400/mo", weakness: "Complex, expensive" },
                  { name: "Breeze", price: "$72/mo", weakness: "Limited features" },
                  { name: "ChurchTrac", price: "$9-45/mo", weakness: "Outdated UI/UX" },
                  { name: "GatherChurch", price: "$49-99/mo", strength: "Modern, AI-first, all-in-one" },
                ].map((competitor, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "flex items-center justify-between p-3 rounded-xl",
                      i === 3 ? "bg-sage-light border border-sage/30" : "bg-secondary"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {i === 3 && <Star className="w-4 h-4 text-gold fill-gold" />}
                      <span className={cn("font-medium", i === 3 ? "text-sage-dark" : "text-foreground")}>
                        {competitor.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className={cn("text-sm font-semibold", i === 3 ? "text-sage" : "text-muted-foreground")}>
                        {competitor.price}
                      </span>
                      <p className={cn("text-xs", i === 3 ? "text-sage-dark" : "text-muted-foreground")}>
                        {competitor.weakness || competitor.strength}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-6 rounded-2xl bg-sage-light border border-sage/20">
              <h3 className="font-semibold text-sage-dark mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-sage" />
                Why Now?
              </h3>
              <ul className="space-y-3">
                {[
                  "AI/automation tech finally accessible to small teams",
                  "Post-COVID digital transformation mandate",
                  "Growing frustration with legacy tools",
                  "No modern competitor has emerged",
                ].map((reason, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-charcoal-light">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    // Slide 4: The Solution
    {
      id: 4,
      title: "The Solution",
      subtitle: "Modern church management, reimagined",
      content: (
        <div className="px-8 md:px-16 py-8 md:py-12 h-full flex flex-col">
          <div className="animate-fade-up">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-6 h-6 text-sage" />
              <span className="text-sm font-medium text-sage uppercase tracking-wider">Our Solution</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-2">
              GatherChurch: Everything in One Place
            </h2>
            <p className="text-lg text-charcoal-light mb-8 max-w-2xl">
              A modern, AI-powered platform designed for the way churches actually work—not how software companies think they should.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-fade-up animation-delay-100">
            {[
              { icon: Users, name: "People", desc: "Member directory & families" },
              { icon: UserCheck, name: "Check-Ins", desc: "Child safety & attendance" },
              { icon: Calendar, name: "Events", desc: "Scheduling & registration" },
              { icon: Heart, name: "Groups", desc: "Small groups & classes" },
              { icon: Smartphone, name: "Services", desc: "Worship planning" },
              { icon: MessageSquare, name: "Messages", desc: "Email & SMS campaigns" },
              { icon: DollarSign, name: "Giving", desc: "Donations & pledges" },
              { icon: Users, name: "Volunteers", desc: "Scheduling & teams" },
            ].map((module, i) => (
              <div 
                key={i} 
                className="p-4 rounded-xl bg-card border border-border hover:border-sage/50 hover:shadow-card transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-sage-light flex items-center justify-center mb-3 group-hover:bg-sage group-hover:text-primary-foreground transition-colors">
                  <module.icon className="w-5 h-5 text-sage group-hover:text-primary-foreground transition-colors" />
                </div>
                <h4 className="font-semibold text-foreground text-sm">{module.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{module.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-up animation-delay-200">
            <div className="p-5 rounded-2xl bg-sage-light border border-sage/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-sage flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-sage-dark">Modern Stack</h3>
              </div>
              <p className="text-sm text-charcoal-light">
                React, TypeScript, Supabase. Fast, secure, mobile-first. Built for the 2020s.
              </p>
            </div>
            
            <div className="p-5 rounded-2xl bg-coral-light border border-coral/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-coral flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-coral">AI-Powered</h3>
              </div>
              <p className="text-sm text-charcoal-light">
                Smart scheduling, automated follow-ups, predictive insights. Save 10+ hours/week.
              </p>
            </div>
            
            <div className="p-5 rounded-2xl bg-secondary border border-gold/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gold flex items-center justify-center">
                  <Lock className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground">Easy Migration</h3>
              </div>
              <p className="text-sm text-charcoal-light">
                API sync with Planning Center & Breeze. Import in minutes, not weeks.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    // Slide 5: Product Status
    {
      id: 5,
      title: "Product",
      subtitle: "Built with AI, ready for users",
      content: (
        <div className="px-8 md:px-16 py-8 md:py-12 h-full flex flex-col">
          <div className="animate-fade-up">
            <div className="flex items-center gap-3 mb-2">
              <Smartphone className="w-6 h-6 text-sage" />
              <span className="text-sm font-medium text-sage uppercase tracking-wider">Current State</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-2">
              UI Complete. Backend Ready to Wire.
            </h2>
            <p className="text-lg text-charcoal-light mb-8 max-w-2xl">
              Leveraging AI-assisted development, we've built a complete UI in record time. Now we need engineering muscle to connect the backend.
            </p>
          </div>
          
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3 mb-6 animate-fade-up animation-delay-100">
            {[
              { name: "People", done: true },
              { name: "Groups", done: true },
              { name: "Check-Ins", done: true },
              { name: "Services", done: true },
              { name: "Volunteers", done: true },
              { name: "Giving", done: true },
              { name: "Events", done: true },
              { name: "Messages", done: true },
            ].map((module, i) => (
              <div 
                key={i} 
                className="p-3 rounded-xl bg-sage-light border border-sage/20 text-center"
              >
                <CheckCircle className="w-5 h-5 text-sage mx-auto mb-1" />
                <p className="font-medium text-sage-dark text-xs">{module.name}</p>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 animate-fade-up animation-delay-200">
            <div className="p-6 rounded-2xl bg-sage-light border border-sage/20">
              <h3 className="font-semibold text-sage-dark mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-sage" />
                Already Built
              </h3>
              <ul className="space-y-2">
                {[
                  "Full multi-tenant architecture with Supabase",
                  "Role-based permissions (5 granular levels)",
                  "All 8 module UIs with shadcn/ui components",
                  "Mobile-responsive layouts across all modules",
                  "Landing page, pricing, and onboarding flows",
                  "PWA-ready mobile app shell",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-charcoal-light">
                    <CircleDot className="w-4 h-4 text-sage flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-6 rounded-2xl bg-coral-light border border-coral/20">
              <h3 className="font-semibold text-coral mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-coral" />
                Engineering Needs
              </h3>
              <ul className="space-y-2">
                {[
                  "Domain database tables for each module",
                  "React Query hooks for data fetching",
                  "API integrations (PCO, Breeze sync)",
                  "Email/SMS (Resend, Twilio integration)",
                  "Payment processing (Stripe Connect)",
                  "Automated workflows & AI features",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-charcoal-light">
                    <ArrowRight className="w-4 h-4 text-coral flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    // Slide 6: 3-Month Roadmap
    {
      id: 6,
      title: "Roadmap",
      subtitle: "From prototype to paying customers",
      content: (
        <div className="px-8 md:px-16 py-8 md:py-12 h-full flex flex-col">
          <div className="animate-fade-up">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-6 h-6 text-sage" />
              <span className="text-sm font-medium text-sage uppercase tracking-wider">Launch Plan</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-8">
              3-Month Sprint to Beta
            </h2>
          </div>
          
          <div className="relative flex-1 animate-fade-up animation-delay-100">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" />
            
            <div className="space-y-6">
              {[
                {
                  month: "Month 1",
                  title: "Working Prototype",
                  subtitle: "Foundation & Core Features",
                  color: "sage",
                  items: [
                    "Launch gatherchurch.com domain",
                    "Complete Supabase backend schema",
                    "Wire all 8 modules to real data",
                    "Basic onboarding & auth flows",
                  ],
                  milestone: "Internal testing begins",
                },
                {
                  month: "Month 2",
                  title: "Feature Parity",
                  subtitle: "Polish & Integrations",
                  color: "coral",
                  items: [
                    "Bug hunting & QA sprint",
                    "Multi-tenant subdomains",
                    "Planning Center API sync",
                    "Breeze migration tool",
                  ],
                  milestone: "5-10 beta signups",
                },
                {
                  month: "Month 3",
                  title: "Beta Launch",
                  subtitle: "Real Users & Feedback",
                  color: "gold",
                  items: [
                    "Migrate first paying customer",
                    "Internal testing at Lamb",
                    "Forum outreach & marketing",
                    "Collect testimonials & iterate",
                  ],
                  milestone: "First revenue!",
                },
              ].map((phase, i) => (
                <div key={i} className="relative flex flex-col md:flex-row gap-4 md:gap-8">
                  {/* Timeline dot */}
                  <div className={cn(
                    "absolute left-4 md:left-1/2 w-3 h-3 rounded-full border-4 md:-translate-x-1/2 translate-y-2",
                    phase.color === "sage" && "bg-sage border-sage-light",
                    phase.color === "coral" && "bg-coral border-coral-light",
                    phase.color === "gold" && "bg-gold border-secondary"
                  )} />
                  
                  {/* Left side (month label on desktop) */}
                  <div className="md:w-1/2 md:text-right pl-10 md:pl-0 md:pr-12">
                    <span className={cn(
                      "inline-block px-3 py-1 rounded-full text-xs font-bold text-primary-foreground mb-2",
                      phase.color === "sage" && "bg-sage",
                      phase.color === "coral" && "bg-coral",
                      phase.color === "gold" && "bg-gold"
                    )}>
                      {phase.month}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground">{phase.title}</h3>
                    <p className="text-sm text-muted-foreground">{phase.subtitle}</p>
                  </div>
                  
                  {/* Right side (content) */}
                  <div className={cn(
                    "md:w-1/2 pl-10 md:pl-12 pb-6",
                  )}>
                    <div className={cn(
                      "p-4 rounded-xl",
                      phase.color === "sage" && "bg-sage-light border border-sage/20",
                      phase.color === "coral" && "bg-coral-light border border-coral/20",
                      phase.color === "gold" && "bg-secondary border border-gold/20"
                    )}>
                      <ul className="space-y-1.5 mb-3">
                        {phase.items.map((item, j) => (
                          <li key={j} className="flex items-center gap-2 text-sm text-charcoal-light">
                            <CheckCircle className={cn(
                              "w-4 h-4 flex-shrink-0",
                              phase.color === "sage" && "text-sage",
                              phase.color === "coral" && "text-coral",
                              phase.color === "gold" && "text-gold"
                            )} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div className={cn(
                        "text-xs font-semibold px-2 py-1 rounded-full inline-block",
                        phase.color === "sage" && "bg-sage/20 text-sage-dark",
                        phase.color === "coral" && "bg-coral/20 text-coral",
                        phase.color === "gold" && "bg-gold/20 text-gold"
                      )}>
                        🎯 {phase.milestone}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    // Slide 7: Team
    {
      id: 7,
      title: "Team",
      subtitle: "Builders with church DNA",
      content: (
        <div className="px-8 md:px-16 py-8 md:py-12 h-full flex flex-col">
          <div className="animate-fade-up">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-6 h-6 text-sage" />
              <span className="text-sm font-medium text-sage uppercase tracking-wider">Founding Team</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-2">
              Why Us? We Live This Problem.
            </h2>
            <p className="text-lg text-charcoal-light mb-8 max-w-2xl">
              Active church members who've experienced the pain firsthand, with the technical skills to fix it.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 animate-fade-up animation-delay-100">
            <div className="p-6 rounded-2xl bg-sage-light border border-sage/20 hover:shadow-card transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-sage flex items-center justify-center flex-shrink-0">
                  <Target className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Taylor</h3>
                  <p className="text-sage font-medium">CEO & Product</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-charcoal-light mb-4">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sage" />
                  Product vision & strategy
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sage" />
                  Sales & customer relationships
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sage" />
                  Fundraising & partnerships
                </li>
              </ul>
              <div className="p-3 rounded-xl bg-sage/10 border border-sage/20">
                <p className="text-xs text-sage-dark italic">
                  "I've seen 3 churches struggle with Planning Center. There has to be a better way."
                </p>
              </div>
            </div>
            
            <div className="p-6 rounded-2xl bg-coral-light border border-coral/20 hover:shadow-card transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-coral flex items-center justify-center flex-shrink-0">
                  <Shield className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Barrett</h3>
                  <p className="text-coral font-medium">CTO & Engineering</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-charcoal-light mb-4">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-coral" />
                  Technical architecture & AI
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-coral" />
                  Security & infrastructure
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-coral" />
                  Full-stack development
                </li>
              </ul>
              <div className="p-3 rounded-xl bg-coral/10 border border-coral/20">
                <p className="text-xs text-coral italic">
                  "Modern web tech can solve this 10x better than what exists. Let's build it."
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-5 rounded-2xl bg-secondary border border-border animate-fade-up animation-delay-200">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Rocket className="w-5 h-5 text-sage" />
              Future Hires (As We Scale)
            </h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center p-3 rounded-xl bg-background border border-border">
                <p className="font-medium text-foreground">Marketing Lead</p>
                <p className="text-muted-foreground text-xs">Month 3-4</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-background border border-border">
                <p className="font-medium text-foreground">Support Engineer</p>
                <p className="text-muted-foreground text-xs">Month 6+</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-background border border-border">
                <p className="font-medium text-foreground">Advisory Board</p>
                <p className="text-muted-foreground text-xs">For seed round</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    // Slide 8: Business Model
    {
      id: 8,
      title: "Business Model",
      subtitle: "Simple pricing, sustainable margins",
      content: (
        <div className="px-8 md:px-16 py-8 md:py-12 h-full flex flex-col">
          <div className="animate-fade-up">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-6 h-6 text-sage" />
              <span className="text-sm font-medium text-sage uppercase tracking-wider">Revenue Model</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-8">
              Flat Pricing That Churches Love
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-up animation-delay-100">
            {[
              { 
                tier: "Starter", 
                price: "Free", 
                desc: "Up to 100 people",
                features: ["Basic people management", "1 admin user", "Community support"],
                cta: "Get started",
                color: "secondary"
              },
              { 
                tier: "Growth", 
                price: "$49", 
                period: "/mo",
                desc: "Unlimited members",
                features: ["All 8 modules", "Check-ins & groups", "5 admin users", "Email support"],
                cta: "Most popular",
                color: "sage-light",
                popular: true
              },
              { 
                tier: "Pro", 
                price: "$99", 
                period: "/mo",
                desc: "Everything + AI",
                features: ["Giving & pledges", "AI automation", "Unlimited admins", "Priority support", "API access"],
                cta: "Full power",
                color: "sage"
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={cn(
                  "relative p-6 rounded-2xl text-center transition-transform hover:scale-105",
                  plan.color === "sage" && "bg-sage text-primary-foreground",
                  plan.color === "sage-light" && "bg-sage-light border-2 border-sage",
                  plan.color === "secondary" && "bg-secondary border border-border"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-coral text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">
                    Most Popular
                  </div>
                )}
                <p className={cn(
                  "text-sm font-medium mb-2",
                  plan.color === "sage" ? "text-sage-light" : "text-muted-foreground"
                )}>
                  {plan.tier}
                </p>
                <div className="flex items-baseline justify-center mb-2">
                  <span className={cn(
                    "text-4xl font-display font-bold",
                    plan.color === "sage" ? "text-primary-foreground" : "text-foreground"
                  )}>
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className={cn(
                      "text-lg",
                      plan.color === "sage" ? "text-sage-light" : "text-muted-foreground"
                    )}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className={cn(
                  "text-sm mb-4",
                  plan.color === "sage" ? "text-sage-light" : "text-charcoal-light"
                )}>
                  {plan.desc}
                </p>
                <ul className="space-y-2 text-left mb-4">
                  {plan.features.map((feature, j) => (
                    <li key={j} className={cn(
                      "flex items-center gap-2 text-sm",
                      plan.color === "sage" ? "text-sage-light" : "text-charcoal-light"
                    )}>
                      <CheckCircle className={cn(
                        "w-4 h-4",
                        plan.color === "sage" ? "text-primary-foreground" : "text-sage"
                      )} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-up animation-delay-200">
            <div className="p-5 rounded-2xl bg-sage-light border border-sage/20">
              <h3 className="font-semibold text-sage-dark mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Additional Revenue
              </h3>
              <ul className="space-y-2 text-sm text-charcoal-light">
                <li className="flex items-center justify-between">
                  <span>Giving processing</span>
                  <span className="font-medium text-sage">2.0% + $0.25</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>SMS credits</span>
                  <span className="font-medium text-sage">$0.02/message</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Custom integrations</span>
                  <span className="font-medium text-sage">Enterprise only</span>
                </li>
              </ul>
            </div>
            
            <div className="p-5 rounded-2xl bg-secondary border border-border">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Star className="w-5 h-5 text-gold" />
                Key Advantages
              </h3>
              <ul className="space-y-2 text-sm text-charcoal-light">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sage" />
                  No per-seat pricing (PCO's #1 complaint)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sage" />
                  Month-to-month, cancel anytime
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sage" />
                  Undercuts Breeze ($72/mo) with more features
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    // Slide 9: Traction & Goals
    {
      id: 9,
      title: "Traction",
      subtitle: "Year 1 milestones",
      content: (
        <div className="px-8 md:px-16 py-8 md:py-12 h-full flex flex-col">
          <div className="animate-fade-up">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-sage" />
              <span className="text-sm font-medium text-sage uppercase tracking-wider">Growth Plan</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-8">
              Conservative, Achievable Targets
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 animate-fade-up animation-delay-100">
            <div className="p-8 rounded-3xl bg-sage-light border border-sage/20 text-center hover:shadow-card transition-shadow">
              <div className="text-6xl md:text-7xl font-display font-bold text-sage mb-2">100-150</div>
              <p className="text-xl text-sage-dark font-medium">Paying Customers</p>
              <p className="text-sm text-charcoal-light mt-2">
                Foundational base for seed round
              </p>
              <div className="mt-4 pt-4 border-t border-sage/20">
                <p className="text-xs text-sage-dark">
                  Average customer = $75/mo = <strong>$7,500-11,250 MRR</strong>
                </p>
              </div>
            </div>
            
            <div className="p-8 rounded-3xl bg-coral-light border border-coral/20 text-center hover:shadow-card transition-shadow">
              <div className="text-6xl md:text-7xl font-display font-bold text-coral mb-2">$5-10K</div>
              <p className="text-xl text-coral font-medium">Monthly Recurring Revenue</p>
              <p className="text-sm text-charcoal-light mt-2">
                Proves sustainable unit economics
              </p>
              <div className="mt-4 pt-4 border-t border-coral/20">
                <p className="text-xs text-coral">
                  $60-120K ARR = seed fundable
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-6 rounded-2xl bg-card border border-border animate-fade-up animation-delay-200">
            <h3 className="font-semibold text-foreground mb-4">Quarterly Milestones</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { q: "Q1", customers: "5-10", mrr: "$500", focus: "Beta launch", color: "sage" },
                { q: "Q2", customers: "25-40", mrr: "$2K", focus: "Product-market fit", color: "sage" },
                { q: "Q3", customers: "60-80", mrr: "$5K", focus: "Growth channels", color: "coral" },
                { q: "Q4", customers: "100-150", mrr: "$10K", focus: "Scale prep", color: "gold" },
              ].map((quarter, i) => (
                <div key={i} className="text-center p-4 rounded-xl bg-secondary border border-border">
                  <div className={cn(
                    "inline-block px-2 py-0.5 rounded text-xs font-bold mb-2",
                    quarter.color === "sage" && "bg-sage text-primary-foreground",
                    quarter.color === "coral" && "bg-coral text-primary-foreground",
                    quarter.color === "gold" && "bg-gold text-primary-foreground"
                  )}>
                    {quarter.q}
                  </div>
                  <p className="text-2xl font-display font-semibold text-foreground">{quarter.customers}</p>
                  <p className="text-xs text-muted-foreground">customers</p>
                  <p className={cn(
                    "text-sm font-semibold mt-2",
                    quarter.color === "sage" && "text-sage",
                    quarter.color === "coral" && "text-coral",
                    quarter.color === "gold" && "text-gold"
                  )}>
                    {quarter.mrr}
                  </p>
                  <p className="text-xs text-charcoal-light mt-1">{quarter.focus}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    // Slide 10: Vision
    {
      id: 10,
      title: "Vision",
      subtitle: "Year 2 and beyond",
      content: (
        <div className="px-8 md:px-16 py-8 md:py-12 h-full flex flex-col">
          <div className="animate-fade-up">
            <div className="flex items-center gap-3 mb-2">
              <Rocket className="w-6 h-6 text-sage" />
              <span className="text-sm font-medium text-sage uppercase tracking-wider">Long-Term Vision</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-8">
              Year 2: Seed Round & Scale
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1 animate-fade-up animation-delay-100">
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-sage-light border border-sage/20 hover:shadow-card transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-sage flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-sage-dark">Seed Funding</h3>
                </div>
                <p className="text-sm text-charcoal-light">
                  With 100+ customers and proven MRR, raise seed capital to accelerate growth and expand team.
                </p>
              </div>
              
              <div className="p-5 rounded-2xl bg-secondary border border-border hover:shadow-card transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                    <Users className="w-5 h-5 text-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground">Team Expansion</h3>
                </div>
                <ul className="text-sm text-charcoal-light space-y-1">
                  <li>• 2-3 additional engineers</li>
                  <li>• Full-time marketing</li>
                  <li>• Customer success lead</li>
                </ul>
              </div>
              
              <div className="p-5 rounded-2xl bg-coral-light border border-coral/20 hover:shadow-card transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-coral flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-coral">Product Expansion</h3>
                </div>
                <ul className="text-sm text-charcoal-light space-y-1">
                  <li>• Native iOS & Android apps</li>
                  <li>• Advanced AI assistant features</li>
                  <li>• Church website builder</li>
                </ul>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-sage/20 via-transparent to-coral/20 rounded-3xl blur-2xl" />
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-sage-light via-secondary to-coral-light/50 border border-sage/20 text-center">
                  <div className="text-7xl md:text-8xl font-display font-bold text-sage mb-2">1,000+</div>
                  <p className="text-xl text-sage-dark font-medium mb-4">Churches by Year 2</p>
                  <div className="w-16 h-px bg-sage/30 mx-auto mb-4" />
                  <div className="text-3xl md:text-4xl font-display font-semibold text-coral mb-2">
                    $50-100K
                  </div>
                  <p className="text-coral font-medium">Monthly Recurring Revenue</p>
                  <p className="text-sm text-charcoal-light mt-4">
                    Sustainable, profitable growth with strong unit economics
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    // Slide 11: The Ask
    {
      id: 11,
      title: "The Ask",
      subtitle: "Join us on this mission",
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center px-8 md:px-16 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 right-20 w-40 h-40 rounded-full bg-sage/30 blur-3xl animate-pulse-soft" />
            <div className="absolute bottom-20 left-20 w-56 h-56 rounded-full bg-coral/20 blur-3xl animate-pulse-soft animation-delay-300" />
          </div>
          
          <div className="relative z-10 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-4">
              Let's Build This Together
            </h2>
            <p className="text-lg text-charcoal-light mb-10 max-w-xl mx-auto">
              We're looking for a technical co-founder who shares our vision of serving churches with modern, accessible technology.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-3xl">
              <div className="p-6 rounded-2xl bg-sage-light border border-sage/20 hover:shadow-card transition-shadow transform hover:scale-105">
                <Calendar className="w-10 h-10 text-sage mx-auto mb-3" />
                <h3 className="font-semibold text-foreground">3 Months</h3>
                <p className="text-sm text-charcoal-light">To working beta</p>
              </div>
              <div className="p-6 rounded-2xl bg-coral-light border border-coral/20 hover:shadow-card transition-shadow transform hover:scale-105">
                <Users className="w-10 h-10 text-coral mx-auto mb-3" />
                <h3 className="font-semibold text-foreground">2-Person Team</h3>
                <p className="text-sm text-charcoal-light">Lean & focused</p>
              </div>
              <div className="p-6 rounded-2xl bg-secondary border border-gold/20 hover:shadow-card transition-shadow transform hover:scale-105">
                <Rocket className="w-10 h-10 text-gold mx-auto mb-3" />
                <h3 className="font-semibold text-foreground">1,000+ Churches</h3>
                <p className="text-sm text-charcoal-light">Within 2 years</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-sage text-primary-foreground shadow-elevated hover:shadow-glow transition-all cursor-pointer transform hover:scale-105">
                <span className="font-semibold text-lg">Barrett — Ready to join?</span>
                <ArrowRight className="w-5 h-5" />
              </div>
              
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Quote className="w-4 h-4" />
                <p className="text-sm italic">
                  "One place to gather your church together"
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < slides.length && !isAnimating) {
      setIsAnimating(true);
      setCurrentSlide(index);
      setTimeout(() => setIsAnimating(false), 300);
    }
  }, [slides.length, isAnimating]);

  const nextSlide = useCallback(() => {
    goToSlide(currentSlide + 1);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide - 1);
  }, [currentSlide, goToSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'Escape') {
        if (isFullscreen) {
          exitFullscreen();
        }
        setShowShortcuts(false);
      } else if (e.key === '?') {
        setShowShortcuts(prev => !prev);
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goToSlide(slides.length - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, goToSlide, slides.length, isFullscreen]);

  // Fullscreen handlers
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const exitFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Touch/swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div 
      ref={containerRef}
      className={cn(
        "min-h-screen bg-background flex flex-col",
        isFullscreen && "fixed inset-0 z-50"
      )}
    >
      {/* Keyboard Shortcuts Overlay */}
      {showShortcuts && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl border border-border shadow-elevated max-w-md w-full p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-display font-semibold text-foreground">Keyboard Shortcuts</h3>
              <button 
                onClick={() => setShowShortcuts(false)}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <div className="space-y-3">
              {[
                { keys: ['←', '→'], action: 'Navigate slides' },
                { keys: ['Space'], action: 'Next slide' },
                { keys: ['Home'], action: 'First slide' },
                { keys: ['End'], action: 'Last slide' },
                { keys: ['F'], action: 'Toggle fullscreen' },
                { keys: ['Esc'], action: 'Exit fullscreen' },
                { keys: ['?'], action: 'Toggle shortcuts' },
              ].map((shortcut, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-charcoal-light">{shortcut.action}</span>
                  <div className="flex items-center gap-1">
                    {shortcut.keys.map((key, j) => (
                      <kbd 
                        key={j}
                        className="px-2 py-1 bg-secondary rounded text-xs font-mono text-foreground border border-border"
                      >
                        {key}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Swipe left/right on touch devices
            </p>
          </div>
        </div>
      )}

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-muted z-40">
        <div 
          className="h-full bg-sage transition-all duration-300 ease-out"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Main slide area */}
      <div 
        ref={slideRef}
        className={cn(
          "flex-1 flex items-center justify-center",
          isFullscreen ? "p-4" : "p-4 md:p-8 pt-6"
        )}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className={cn(
          "w-full bg-card rounded-2xl shadow-elevated border border-border overflow-hidden transition-all duration-300",
          isFullscreen ? "max-w-full h-full max-h-full" : "max-w-6xl aspect-[16/9]"
        )}>
          <div 
            key={currentSlide}
            className="h-full animate-fade-in"
          >
            {slides[currentSlide].content}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className={cn(
        "p-4 md:p-6 bg-card border-t border-border transition-opacity",
        isFullscreen && "absolute bottom-0 left-0 right-0 opacity-0 hover:opacity-100"
      )}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </Button>
          </div>

          <div className="flex items-center gap-1.5">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(i)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === currentSlide
                    ? "bg-sage w-8"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2"
                )}
                title={slide.title}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block font-medium">
              {currentSlide + 1} / {slides.length}
            </span>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowShortcuts(true)}
              className="hidden sm:flex"
              title="Keyboard shortcuts (?)"
            >
              <Keyboard className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              title={isFullscreen ? "Exit fullscreen (Esc)" : "Fullscreen (F)"}
            >
              {isFullscreen ? (
                <Minimize className="w-4 h-4" />
              ) : (
                <Maximize className="w-4 h-4" />
              )}
            </Button>

            <Button
              variant="outline"
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="gap-2"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitchDeck;
