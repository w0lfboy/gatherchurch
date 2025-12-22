import { useState, useEffect, useRef } from "react";
import { 
  Users, Target, TrendingUp, 
  Calendar, DollarSign, Rocket, Shield, Heart, 
  CheckCircle, ArrowRight, Zap, Lock,
  AlertTriangle, Smartphone, BarChart3, MessageSquare,
  CreditCard, UserCheck, Star,
  Sparkles, CircleDot, Clock, ExternalLink, ChevronUp
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Section {
  id: string;
  label: string;
  shortLabel: string;
}

const sections: Section[] = [
  { id: "hero", label: "GatherChurch", shortLabel: "Home" },
  { id: "problem", label: "The Problem", shortLabel: "Problem" },
  { id: "market", label: "Market", shortLabel: "Market" },
  { id: "solution", label: "Solution", shortLabel: "Solution" },
  { id: "product", label: "Product", shortLabel: "Product" },
  { id: "roadmap", label: "Roadmap", shortLabel: "Roadmap" },
  { id: "team", label: "Team", shortLabel: "Team" },
  { id: "business", label: "Business Model", shortLabel: "Pricing" },
  { id: "traction", label: "Traction", shortLabel: "Goals" },
  { id: "vision", label: "Vision", shortLabel: "Vision" },
  { id: "ask", label: "The Ask", shortLabel: "Ask" },
];

// Animated section wrapper component
const AnimatedSection = ({ 
  children, 
  className,
  id,
  delay = 0
}: { 
  children: React.ReactNode; 
  className?: string;
  id: string;
  delay?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className
      )}
    >
      {children}
    </section>
  );
};

// Animated element for staggered children
const AnimatedElement = ({ 
  children, 
  className,
  delay = 0 
}: { 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-500 ease-out",
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95",
        className
      )}
    >
      {children}
    </div>
  );
};

const PitchDeck = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Track active section and scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
      setShowBackToTop(scrollTop > 500);

      // Find active section
      const sectionElements = sections.map(s => document.getElementById(s.id));
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        {/* Progress bar */}
        <div className="h-1 bg-muted">
          <div 
            className="h-full bg-gradient-to-r from-sage to-coral transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <button 
              onClick={() => scrollToSection("hero")}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sage to-sage-dark flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-sm">G</span>
              </div>
              <span className="font-display font-semibold text-foreground hidden sm:block">GatherChurch</span>
            </button>

            {/* Section navigation */}
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
              {sections.slice(1, -1).map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap",
                    activeSection === section.id
                      ? "bg-sage text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <span className="hidden md:inline">{section.label}</span>
                  <span className="md:hidden">{section.shortLabel}</span>
                </button>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => scrollToSection("ask")}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-semibold transition-all",
                activeSection === "ask"
                  ? "bg-coral text-primary-foreground"
                  : "bg-sage text-primary-foreground hover:bg-sage-dark"
              )}
            >
              The Ask
            </button>
          </div>
        </div>
      </nav>

      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-sage text-primary-foreground shadow-elevated flex items-center justify-center transition-all hover:bg-sage-dark",
          showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        <ChevronUp className="w-5 h-5" />
      </button>

      {/* Hero Section */}
      <AnimatedSection id="hero" className="min-h-screen flex flex-col items-center justify-center text-center px-8 md:px-16 relative overflow-hidden pt-16">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-sage/20 blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-coral/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-gold/15 blur-2xl" />
        </div>
        
        <div className="relative z-10">
          <AnimatedElement delay={100}>
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-3xl bg-gradient-to-br from-sage to-sage-dark flex items-center justify-center mb-8 shadow-elevated mx-auto transform hover:scale-105 transition-transform">
              <span className="text-primary-foreground font-display font-bold text-5xl md:text-6xl">G</span>
            </div>
          </AnimatedElement>
          <AnimatedElement delay={200}>
            <h1 className="text-5xl md:text-7xl font-display font-semibold text-foreground mb-4">
              GatherChurch
            </h1>
          </AnimatedElement>
          <AnimatedElement delay={300}>
            <p className="text-xl md:text-2xl text-charcoal-light mb-10 max-w-lg mx-auto">
              One place to gather your church together
            </p>
          </AnimatedElement>
          <AnimatedElement delay={400}>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-sage-light border border-sage/30 shadow-card">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-sage"></span>
              </span>
              <span className="text-sage-dark font-medium">
                Strategic Partnership Proposal 2025
              </span>
            </div>
          </AnimatedElement>
        </div>
      </AnimatedSection>

      {/* The Problem Section */}
      <AnimatedSection id="problem" className="py-20 px-8 md:px-16 bg-secondary/30 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <AnimatedElement>
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-6 h-6 text-coral" />
              <span className="text-sm font-medium text-coral uppercase tracking-wider">The Crisis</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-semibold text-foreground mb-4">
              Small Churches Are Drowning
            </h2>
            <p className="text-lg text-charcoal-light mb-12 max-w-3xl">
              While megachurches thrive with enterprise tools, the <span className="text-sage font-semibold">300,000+ small to mid-size churches</span> struggle with fragmented, expensive software.
            </p>
          </AnimatedElement>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: CreditCard, title: "Crushing Costs", desc: "Planning Center charges $300+/month for full features. Per-module pricing punishes growth.", color: "coral" },
              { icon: Clock, title: "Outdated Tech", desc: "19-year-old architecture. No AI. No automation. Staff waste 10+ hours/week on manual tasks.", color: "muted" },
              { icon: Users, title: "Steep Learning Curve", desc: "Volunteer admins can't master complex systems. Churches use only 20% of features they pay for.", color: "muted" },
            ].map((item, i) => (
              <AnimatedElement key={i} delay={i * 100}>
                <div className={cn(
                  "p-6 rounded-2xl hover:shadow-card transition-shadow h-full",
                  item.color === "coral" ? "bg-coral-light border border-coral/20" : "bg-card border border-border"
                )}>
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                    item.color === "coral" ? "bg-coral/20" : "bg-muted"
                  )}>
                    <item.icon className={cn("w-6 h-6", item.color === "coral" ? "text-coral" : "text-charcoal-light")} />
                  </div>
                  <h3 className={cn("text-xl font-semibold mb-2", item.color === "coral" ? "text-coral" : "text-foreground")}>{item.title}</h3>
                  <p className="text-charcoal-light">{item.desc}</p>
                </div>
              </AnimatedElement>
            ))}
          </div>

          <AnimatedElement delay={300}>
            <div className="p-8 rounded-3xl bg-gradient-to-br from-sage-light via-secondary to-coral-light/30 border border-sage/20 max-w-xl mx-auto relative">
              <div className="absolute -top-3 -right-3 bg-coral text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                Ripe for disruption
              </div>
              <div className="text-center">
                <div className="text-6xl md:text-7xl font-display font-bold text-sage mb-2">60K+</div>
                <p className="text-lg text-sage-dark font-medium">Churches on Planning Center alone</p>
                <div className="w-16 h-px bg-sage/30 mx-auto my-4" />
                <p className="text-charcoal-light italic">
                  "We pay for 7 modules but only really use 3. It's too expensive and too complicated."
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  — Pastor, 200-member church in Texas
                </p>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </AnimatedSection>

      {/* Market Opportunity Section */}
      <AnimatedSection id="market" className="py-20 px-8 md:px-16 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <AnimatedElement>
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="w-6 h-6 text-sage" />
              <span className="text-sm font-medium text-sage uppercase tracking-wider">Market Analysis</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-semibold text-foreground mb-12">
              The Sweet Spot: 50-500 Member Churches
            </h2>
          </AnimatedElement>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { 
                value: "300K+", 
                label: "Churches in the US", 
                sublabel: "Protestant & Catholic", 
                color: "sage",
                source: "Hartford Institute for Religion Research",
                link: "https://hirr.hartsem.edu/"
              },
              { 
                value: "$4.2B", 
                label: "ChMS Market Size", 
                sublabel: "By 2028 (CAGR 8.7%)", 
                color: "coral",
                source: "Grand View Research, 2023",
                link: "https://www.grandviewresearch.com/"
              },
              { 
                value: "72%", 
                label: "Have <200 Members", 
                sublabel: "Underserved segment", 
                color: "gold",
                source: "Pew Research Center",
                link: "https://www.pewresearch.org/"
              },
            ].map((stat, i) => (
              <AnimatedElement key={i} delay={i * 100}>
                <div 
                  className={cn(
                    "p-8 rounded-2xl text-center transform hover:scale-105 transition-all",
                    stat.color === "sage" && "bg-sage-light border border-sage/20",
                    stat.color === "coral" && "bg-coral-light border border-coral/20",
                    stat.color === "gold" && "bg-secondary border border-gold/30"
                  )}
                >
                  <div className={cn(
                    "text-5xl md:text-6xl font-display font-bold mb-2",
                    stat.color === "sage" && "text-sage",
                    stat.color === "coral" && "text-coral",
                    stat.color === "gold" && "text-gold"
                  )}>
                    {stat.value}
                  </div>
                  <p className="font-semibold text-foreground text-lg">{stat.label}</p>
                  <p className="text-sm text-muted-foreground mb-3">{stat.sublabel}</p>
                  <a 
                    href={stat.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    {stat.source}
                  </a>
                </div>
              </AnimatedElement>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedElement delay={300}>
              <div className="p-8 rounded-2xl bg-card border border-border h-full">
                <h3 className="font-semibold text-foreground mb-6 flex items-center gap-2 text-xl">
                  <Target className="w-6 h-6 text-sage" />
                  Competitive Landscape
                </h3>
                <div className="space-y-4">
                  {[
                    { name: "Planning Center", price: "$150-400/mo", weakness: "Complex, expensive" },
                    { name: "Breeze", price: "$72/mo", weakness: "Limited features" },
                    { name: "ChurchTrac", price: "$9-45/mo", weakness: "Outdated UI/UX" },
                    { name: "GatherChurch", price: "$49-99/mo", strength: "Modern, AI-first, all-in-one" },
                  ].map((competitor, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "flex items-center justify-between p-4 rounded-xl",
                        i === 3 ? "bg-sage-light border border-sage/30" : "bg-secondary"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {i === 3 && <Star className="w-5 h-5 text-gold fill-gold" />}
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
            </AnimatedElement>
            
            <AnimatedElement delay={400}>
              <div className="p-8 rounded-2xl bg-sage-light border border-sage/20 h-full">
                <h3 className="font-semibold text-sage-dark mb-6 flex items-center gap-2 text-xl">
                  <Sparkles className="w-6 h-6 text-sage" />
                  Why Now?
                </h3>
                <ul className="space-y-4">
                  {[
                    "AI/automation tech finally accessible to small teams",
                    "Post-COVID digital transformation mandate",
                    "Growing frustration with legacy tools",
                    "No modern competitor has emerged",
                  ].map((reason, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                      <span className="text-charcoal-light">{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </AnimatedSection>

      {/* The Solution Section */}
      <AnimatedSection id="solution" className="py-20 px-8 md:px-16 bg-secondary/30 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <AnimatedElement>
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-6 h-6 text-sage" />
              <span className="text-sm font-medium text-sage uppercase tracking-wider">Our Solution</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-semibold text-foreground mb-4">
              GatherChurch: Everything in One Place
            </h2>
            <p className="text-lg text-charcoal-light mb-12 max-w-3xl">
              A modern, AI-powered platform designed for the way churches actually work—not how software companies think they should.
            </p>
          </AnimatedElement>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
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
              <AnimatedElement key={i} delay={i * 50}>
                <div className="p-5 rounded-xl bg-card border border-border hover:border-sage/50 hover:shadow-card transition-all group h-full">
                  <div className="w-12 h-12 rounded-lg bg-sage-light flex items-center justify-center mb-3 group-hover:bg-sage transition-colors">
                    <module.icon className="w-6 h-6 text-sage group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h4 className="font-semibold text-foreground">{module.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{module.desc}</p>
                </div>
              </AnimatedElement>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "Modern Stack", desc: "React, TypeScript, Supabase. Fast, secure, mobile-first. Built for the 2020s.", color: "sage" },
              { icon: Sparkles, title: "AI-Powered", desc: "Smart scheduling, automated follow-ups, predictive insights. Save 10+ hours/week.", color: "coral" },
              { icon: Lock, title: "Easy Migration", desc: "API sync with Planning Center & Breeze. Import in minutes, not weeks.", color: "gold" },
            ].map((item, i) => (
              <AnimatedElement key={i} delay={400 + i * 100}>
                <div className={cn(
                  "p-6 rounded-2xl h-full",
                  item.color === "sage" && "bg-sage-light border border-sage/20",
                  item.color === "coral" && "bg-coral-light border border-coral/20",
                  item.color === "gold" && "bg-secondary border border-gold/20"
                )}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      item.color === "sage" && "bg-sage",
                      item.color === "coral" && "bg-coral",
                      item.color === "gold" && "bg-gold"
                    )}>
                      <item.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className={cn(
                      "font-semibold text-lg",
                      item.color === "sage" && "text-sage-dark",
                      item.color === "coral" && "text-coral",
                      item.color === "gold" && "text-foreground"
                    )}>{item.title}</h3>
                  </div>
                  <p className="text-charcoal-light">{item.desc}</p>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Product Status Section */}
      <AnimatedSection id="product" className="py-20 px-8 md:px-16 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <AnimatedElement>
            <div className="flex items-center gap-3 mb-2">
              <Smartphone className="w-6 h-6 text-sage" />
              <span className="text-sm font-medium text-sage uppercase tracking-wider">Current State</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-semibold text-foreground mb-4">
              UI Complete. Backend Ready to Wire.
            </h2>
            <p className="text-lg text-charcoal-light mb-12 max-w-3xl">
              Leveraging AI-assisted development, we've built a complete UI in record time. Now we need engineering muscle to connect the backend.
            </p>
          </AnimatedElement>
          
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3 mb-12">
            {["People", "Groups", "Check-Ins", "Services", "Volunteers", "Giving", "Events", "Messages"].map((name, i) => (
              <AnimatedElement key={i} delay={i * 50}>
                <div className="p-4 rounded-xl bg-sage-light border border-sage/20 text-center">
                  <CheckCircle className="w-6 h-6 text-sage mx-auto mb-2" />
                  <p className="font-medium text-sage-dark text-sm">{name}</p>
                </div>
              </AnimatedElement>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedElement delay={400}>
              <div className="p-8 rounded-2xl bg-sage-light border border-sage/20 h-full">
                <h3 className="font-semibold text-sage-dark mb-6 flex items-center gap-2 text-xl">
                  <CheckCircle className="w-6 h-6 text-sage" />
                  Already Built
                </h3>
                <ul className="space-y-3">
                  {[
                    "Full multi-tenant architecture with Supabase",
                    "Role-based permissions (5 granular levels)",
                    "All 8 module UIs with shadcn/ui components",
                    "Mobile-responsive layouts across all modules",
                    "Landing page, pricing, and onboarding flows",
                    "PWA-ready mobile app shell",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-charcoal-light">
                      <CircleDot className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedElement>
            
            <AnimatedElement delay={500}>
              <div className="p-8 rounded-2xl bg-coral-light border border-coral/20 h-full">
                <h3 className="font-semibold text-coral mb-6 flex items-center gap-2 text-xl">
                  <Target className="w-6 h-6 text-coral" />
                  Engineering Needs
                </h3>
                <ul className="space-y-3">
                  {[
                    "Domain database tables for each module",
                    "React Query hooks for data fetching",
                    "API integrations (PCO, Breeze sync)",
                    "Email/SMS (Resend, Twilio integration)",
                    "Payment processing (Stripe Connect)",
                    "Automated workflows & AI features",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-charcoal-light">
                      <ArrowRight className="w-5 h-5 text-coral flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </AnimatedSection>

      {/* Roadmap Section */}
      <AnimatedSection id="roadmap" className="py-20 px-8 md:px-16 bg-secondary/30 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <AnimatedElement>
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-6 h-6 text-sage" />
              <span className="text-sm font-medium text-sage uppercase tracking-wider">Launch Plan</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-semibold text-foreground mb-12">
              3-Month Sprint to Beta
            </h2>
          </AnimatedElement>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                month: "Month 1",
                title: "Working Prototype",
                subtitle: "Foundation & Core Features",
                color: "sage",
                items: ["Launch gatherchurch.com domain", "Complete Supabase backend schema", "Wire all 8 modules to real data", "Basic onboarding & auth flows"],
                milestone: "Internal testing begins",
              },
              {
                month: "Month 2",
                title: "Feature Parity",
                subtitle: "Polish & Integrations",
                color: "coral",
                items: ["Bug hunting & QA sprint", "Multi-tenant subdomains", "Planning Center API sync", "Breeze migration tool"],
                milestone: "5-10 beta signups",
              },
              {
                month: "Month 3",
                title: "Beta Launch",
                subtitle: "Real Users & Feedback",
                color: "gold",
                items: ["Migrate first paying customer", "Internal testing at Lamb", "Forum outreach & marketing", "Collect testimonials & iterate"],
                milestone: "First revenue!",
              },
            ].map((phase, i) => (
              <AnimatedElement key={i} delay={i * 150}>
                <div className={cn(
                  "p-8 rounded-2xl h-full",
                  phase.color === "sage" && "bg-sage-light border border-sage/20",
                  phase.color === "coral" && "bg-coral-light border border-coral/20",
                  phase.color === "gold" && "bg-secondary border border-gold/20"
                )}>
                  <span className={cn(
                    "inline-block px-4 py-1.5 rounded-full text-sm font-bold text-primary-foreground mb-4",
                    phase.color === "sage" && "bg-sage",
                    phase.color === "coral" && "bg-coral",
                    phase.color === "gold" && "bg-gold"
                  )}>
                    {phase.month}
                  </span>
                  <h3 className="text-xl font-semibold text-foreground mb-1">{phase.title}</h3>
                  <p className="text-muted-foreground mb-6">{phase.subtitle}</p>
                  
                  <ul className="space-y-3 mb-6">
                    {phase.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-3 text-charcoal-light">
                        <CheckCircle className={cn(
                          "w-5 h-5 flex-shrink-0",
                          phase.color === "sage" && "text-sage",
                          phase.color === "coral" && "text-coral",
                          phase.color === "gold" && "text-gold"
                        )} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className={cn(
                    "text-sm font-semibold px-3 py-2 rounded-full inline-block",
                    phase.color === "sage" && "bg-sage/20 text-sage-dark",
                    phase.color === "coral" && "bg-coral/20 text-coral",
                    phase.color === "gold" && "bg-gold/20 text-gold"
                  )}>
                    🎯 {phase.milestone}
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Team Section */}
      <AnimatedSection id="team" className="py-20 px-8 md:px-16 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <AnimatedElement>
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-6 h-6 text-sage" />
              <span className="text-sm font-medium text-sage uppercase tracking-wider">Founding Team</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-semibold text-foreground mb-4">
              Why Us? We Live This Problem.
            </h2>
            <p className="text-lg text-charcoal-light mb-12 max-w-3xl">
              Active church members who've experienced the pain firsthand, with the technical skills to fix it.
            </p>
          </AnimatedElement>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <AnimatedElement delay={100}>
              <div className="p-8 rounded-2xl bg-sage-light border border-sage/20 hover:shadow-card transition-shadow h-full">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-sage flex items-center justify-center flex-shrink-0">
                    <Target className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground">Taylor</h3>
                    <p className="text-sage font-medium text-lg">CEO & Product</p>
                  </div>
                </div>
                <ul className="space-y-3 text-charcoal-light mb-6">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-sage" />
                    Product vision & strategy
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-sage" />
                    Sales & customer relationships
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-sage" />
                    Fundraising & partnerships
                  </li>
                </ul>
                <div className="p-4 rounded-xl bg-sage/10 border border-sage/20">
                  <p className="text-sage-dark italic">
                    "I've seen 3 churches struggle with Planning Center. There has to be a better way."
                  </p>
                </div>
              </div>
            </AnimatedElement>
            
            <AnimatedElement delay={200}>
              <div className="p-8 rounded-2xl bg-coral-light border border-coral/20 hover:shadow-card transition-shadow h-full">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-coral flex items-center justify-center flex-shrink-0">
                    <Shield className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground">Barrett</h3>
                    <p className="text-coral font-medium text-lg">CTO & Engineering</p>
                  </div>
                </div>
                <ul className="space-y-3 text-charcoal-light mb-6">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-coral" />
                    Technical architecture & AI
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-coral" />
                    Security & infrastructure
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-coral" />
                    Full-stack development
                  </li>
                </ul>
                <div className="p-4 rounded-xl bg-coral/10 border border-coral/20">
                  <p className="text-coral italic">
                    "Modern web tech can solve this 10x better than what exists. Let's build it."
                  </p>
                </div>
              </div>
            </AnimatedElement>
          </div>
          
          <AnimatedElement delay={300}>
            <div className="p-8 rounded-2xl bg-secondary border border-border">
              <h3 className="font-semibold text-foreground mb-6 flex items-center gap-2 text-xl">
                <Rocket className="w-6 h-6 text-sage" />
                Future Hires (As We Scale)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "Marketing Lead", time: "Month 3-4" },
                  { title: "Support Engineer", time: "Month 6+" },
                  { title: "Advisory Board", time: "For seed round" },
                ].map((hire, i) => (
                  <div key={i} className="text-center p-6 rounded-xl bg-background border border-border">
                    <p className="font-semibold text-foreground text-lg">{hire.title}</p>
                    <p className="text-muted-foreground">{hire.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedElement>
        </div>
      </AnimatedSection>

      {/* Business Model Section */}
      <AnimatedSection id="business" className="py-20 px-8 md:px-16 bg-secondary/30 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <AnimatedElement>
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-6 h-6 text-sage" />
              <span className="text-sm font-medium text-sage uppercase tracking-wider">Revenue Model</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-semibold text-foreground mb-12">
              Flat Pricing That Churches Love
            </h2>
          </AnimatedElement>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { tier: "Starter", price: "Free", desc: "Up to 100 people", features: ["Basic people management", "1 admin user", "Community support"], color: "secondary" },
              { tier: "Growth", price: "$49", period: "/mo", desc: "Unlimited members", features: ["All 8 modules", "Check-ins & groups", "5 admin users", "Email support"], color: "sage-light", popular: true },
              { tier: "Pro", price: "$99", period: "/mo", desc: "Everything + AI", features: ["Giving & pledges", "AI automation", "Unlimited admins", "Priority support", "API access"], color: "sage" },
            ].map((plan, i) => (
              <AnimatedElement key={i} delay={i * 100}>
                <div className={cn(
                  "relative p-8 rounded-2xl text-center transition-transform hover:scale-105 h-full",
                  plan.color === "sage" && "bg-sage text-primary-foreground",
                  plan.color === "sage-light" && "bg-sage-light border-2 border-sage",
                  plan.color === "secondary" && "bg-card border border-border"
                )}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-coral text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </div>
                  )}
                  <p className={cn("text-sm font-medium mb-2", plan.color === "sage" ? "text-sage-light" : "text-muted-foreground")}>
                    {plan.tier}
                  </p>
                  <div className="mb-4">
                    <span className={cn(
                      "text-5xl font-display font-bold",
                      plan.color === "sage" ? "text-primary-foreground" : plan.color === "sage-light" ? "text-sage" : "text-foreground"
                    )}>
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className={cn("text-lg", plan.color === "sage" ? "text-sage-light" : "text-muted-foreground")}>
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p className={cn("mb-6", plan.color === "sage" ? "text-sage-light" : "text-charcoal-light")}>
                    {plan.desc}
                  </p>
                  <ul className="space-y-3 text-left">
                    {plan.features.map((feature, j) => (
                      <li key={j} className={cn("flex items-center gap-3", plan.color === "sage" ? "text-sage-light" : "text-charcoal-light")}>
                        <CheckCircle className={cn("w-5 h-5", plan.color === "sage" ? "text-primary-foreground" : "text-sage")} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedElement>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedElement delay={300}>
              <div className="p-8 rounded-2xl bg-sage-light border border-sage/20 h-full">
                <h3 className="font-semibold text-sage-dark mb-6 flex items-center gap-2 text-xl">
                  <TrendingUp className="w-6 h-6" />
                  Additional Revenue
                </h3>
                <ul className="space-y-4 text-charcoal-light">
                  <li className="flex items-center justify-between">
                    <span>Giving processing</span>
                    <span className="font-semibold text-sage">2.0% + $0.25</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>SMS credits</span>
                    <span className="font-semibold text-sage">$0.02/message</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Custom integrations</span>
                    <span className="font-semibold text-sage">Enterprise only</span>
                  </li>
                </ul>
              </div>
            </AnimatedElement>
            
            <AnimatedElement delay={400}>
              <div className="p-8 rounded-2xl bg-card border border-border h-full">
                <h3 className="font-semibold text-foreground mb-6 flex items-center gap-2 text-xl">
                  <Star className="w-6 h-6 text-gold" />
                  Key Advantages
                </h3>
                <ul className="space-y-4 text-charcoal-light">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-sage" />
                    No per-seat pricing (PCO's #1 complaint)
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-sage" />
                    Month-to-month, cancel anytime
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-sage" />
                    Undercuts Breeze ($72/mo) with more features
                  </li>
                </ul>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </AnimatedSection>

      {/* Traction & Goals Section */}
      <AnimatedSection id="traction" className="py-20 px-8 md:px-16 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <AnimatedElement>
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-sage" />
              <span className="text-sm font-medium text-sage uppercase tracking-wider">Growth Plan</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-semibold text-foreground mb-12">
              Conservative, Achievable Targets
            </h2>
          </AnimatedElement>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <AnimatedElement delay={100}>
              <div className="p-10 rounded-3xl bg-sage-light border border-sage/20 text-center hover:shadow-card transition-shadow">
                <div className="text-6xl md:text-7xl font-display font-bold text-sage mb-2">100-150</div>
                <p className="text-xl text-sage-dark font-medium">Paying Customers</p>
                <p className="text-charcoal-light mt-2">Foundational base for seed round</p>
                <div className="mt-6 pt-6 border-t border-sage/20">
                  <p className="text-sage-dark">Average customer = $75/mo = <strong>$7,500-11,250 MRR</strong></p>
                </div>
              </div>
            </AnimatedElement>
            
            <AnimatedElement delay={200}>
              <div className="p-10 rounded-3xl bg-coral-light border border-coral/20 text-center hover:shadow-card transition-shadow">
                <div className="text-6xl md:text-7xl font-display font-bold text-coral mb-2">$5-10K</div>
                <p className="text-xl text-coral font-medium">Monthly Recurring Revenue</p>
                <p className="text-charcoal-light mt-2">Proves sustainable unit economics</p>
                <div className="mt-6 pt-6 border-t border-coral/20">
                  <p className="text-coral">$60-120K ARR = seed fundable</p>
                </div>
              </div>
            </AnimatedElement>
          </div>
          
          <AnimatedElement delay={300}>
            <div className="p-8 rounded-2xl bg-card border border-border">
              <h3 className="font-semibold text-foreground mb-8 text-xl">Quarterly Milestones</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { q: "Q1", customers: "5-10", mrr: "$500", focus: "Beta launch", color: "sage" },
                  { q: "Q2", customers: "25-40", mrr: "$2K", focus: "Product-market fit", color: "sage" },
                  { q: "Q3", customers: "60-80", mrr: "$5K", focus: "Growth channels", color: "coral" },
                  { q: "Q4", customers: "100-150", mrr: "$10K", focus: "Scale prep", color: "gold" },
                ].map((quarter, i) => (
                  <div key={i} className="text-center p-6 rounded-xl bg-secondary border border-border">
                    <div className={cn(
                      "inline-block px-3 py-1 rounded text-sm font-bold mb-3",
                      quarter.color === "sage" && "bg-sage text-primary-foreground",
                      quarter.color === "coral" && "bg-coral text-primary-foreground",
                      quarter.color === "gold" && "bg-gold text-primary-foreground"
                    )}>
                      {quarter.q}
                    </div>
                    <p className="text-3xl font-display font-semibold text-foreground">{quarter.customers}</p>
                    <p className="text-sm text-muted-foreground">customers</p>
                    <p className={cn(
                      "text-lg font-semibold mt-3",
                      quarter.color === "sage" && "text-sage",
                      quarter.color === "coral" && "text-coral",
                      quarter.color === "gold" && "text-gold"
                    )}>
                      {quarter.mrr}
                    </p>
                    <p className="text-sm text-charcoal-light mt-1">{quarter.focus}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedElement>
        </div>
      </AnimatedSection>

      {/* Vision Section */}
      <AnimatedSection id="vision" className="py-20 px-8 md:px-16 bg-secondary/30 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <AnimatedElement>
            <div className="flex items-center gap-3 mb-2">
              <Rocket className="w-6 h-6 text-sage" />
              <span className="text-sm font-medium text-sage uppercase tracking-wider">Long-Term Vision</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-semibold text-foreground mb-12">
              Year 2: Seed Round & Scale
            </h2>
          </AnimatedElement>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {[
                { icon: DollarSign, title: "Seed Funding", desc: "With 100+ customers and proven MRR, raise seed capital to accelerate growth and expand team.", color: "sage" },
                { icon: Users, title: "Team Expansion", desc: "2-3 additional engineers, Full-time marketing, Customer success lead", color: "muted" },
                { icon: Sparkles, title: "Product Expansion", desc: "Native iOS & Android apps, Advanced AI assistant features, Church website builder", color: "coral" },
              ].map((item, i) => (
                <AnimatedElement key={i} delay={i * 100}>
                  <div className={cn(
                    "p-6 rounded-2xl hover:shadow-card transition-shadow",
                    item.color === "sage" && "bg-sage-light border border-sage/20",
                    item.color === "muted" && "bg-card border border-border",
                    item.color === "coral" && "bg-coral-light border border-coral/20"
                  )}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center",
                        item.color === "sage" && "bg-sage",
                        item.color === "muted" && "bg-muted",
                        item.color === "coral" && "bg-coral"
                      )}>
                        <item.icon className={cn(
                          "w-6 h-6",
                          item.color === "muted" ? "text-foreground" : "text-primary-foreground"
                        )} />
                      </div>
                      <h3 className={cn(
                        "font-semibold text-lg",
                        item.color === "sage" && "text-sage-dark",
                        item.color === "muted" && "text-foreground",
                        item.color === "coral" && "text-coral"
                      )}>{item.title}</h3>
                    </div>
                    <p className="text-charcoal-light">{item.desc}</p>
                  </div>
                </AnimatedElement>
              ))}
            </div>
            
            <AnimatedElement delay={300} className="flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-br from-sage/20 via-transparent to-coral/20 rounded-3xl blur-2xl" />
                <div className="relative p-10 rounded-3xl bg-gradient-to-br from-sage-light via-secondary to-coral-light/50 border border-sage/20 text-center">
                  <div className="text-7xl md:text-8xl font-display font-bold text-sage mb-2">1,000+</div>
                  <p className="text-xl text-sage-dark font-medium mb-6">Churches by Year 2</p>
                  <div className="w-16 h-px bg-sage/30 mx-auto mb-6" />
                  <div className="text-4xl md:text-5xl font-display font-semibold text-coral mb-2">$50-100K</div>
                  <p className="text-coral font-medium text-lg">Monthly Recurring Revenue</p>
                  <p className="text-charcoal-light mt-6">Sustainable, profitable growth with strong unit economics</p>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </AnimatedSection>

      {/* The Ask Section */}
      <AnimatedSection id="ask" className="py-24 px-8 md:px-16 relative overflow-hidden scroll-mt-16">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-20 w-40 h-40 rounded-full bg-sage/30 blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-56 h-56 rounded-full bg-coral/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <AnimatedElement>
            <h2 className="text-4xl md:text-6xl font-display font-semibold text-foreground mb-6">
              Let's Build This Together
            </h2>
            <p className="text-xl text-charcoal-light mb-12 max-w-2xl mx-auto">
              We're looking for a technical co-founder who shares our vision of serving churches with modern, accessible technology.
            </p>
          </AnimatedElement>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: Calendar, title: "3 Months", desc: "To working beta", color: "sage" },
              { icon: Users, title: "2-Person Team", desc: "Lean & focused", color: "coral" },
              { icon: Rocket, title: "1,000+ Churches", desc: "Within 2 years", color: "gold" },
            ].map((item, i) => (
              <AnimatedElement key={i} delay={100 + i * 100}>
                <div className={cn(
                  "p-8 rounded-2xl hover:shadow-card transition-all transform hover:scale-105",
                  item.color === "sage" && "bg-sage-light border border-sage/20",
                  item.color === "coral" && "bg-coral-light border border-coral/20",
                  item.color === "gold" && "bg-secondary border border-gold/20"
                )}>
                  <item.icon className={cn(
                    "w-12 h-12 mx-auto mb-4",
                    item.color === "sage" && "text-sage",
                    item.color === "coral" && "text-coral",
                    item.color === "gold" && "text-gold"
                  )} />
                  <h3 className="font-semibold text-foreground text-xl">{item.title}</h3>
                  <p className="text-charcoal-light">{item.desc}</p>
                </div>
              </AnimatedElement>
            ))}
          </div>
          
          <AnimatedElement delay={400}>
            <div className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-sage text-primary-foreground shadow-elevated hover:shadow-glow transition-all cursor-pointer transform hover:scale-105">
              <span className="font-semibold text-xl">Barrett — Ready to join?</span>
              <ArrowRight className="w-6 h-6" />
            </div>
            
            <p className="text-muted-foreground mt-8 italic text-lg">
              "One place to gather your church together"
            </p>
          </AnimatedElement>
        </div>
      </AnimatedSection>

      {/* Sources Footer */}
      <footer className="py-12 px-8 md:px-16 bg-secondary border-t border-border">
        <div className="max-w-6xl mx-auto">
          <h3 className="font-semibold text-foreground mb-6">Market Data Sources</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-charcoal-light mb-2">Church Count & Demographics</p>
              <a href="https://hirr.hartsem.edu/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-1">
                <ExternalLink className="w-3 h-3" />
                Hartford Institute for Religion Research
              </a>
            </div>
            <div>
              <p className="font-medium text-charcoal-light mb-2">ChMS Market Size & Growth</p>
              <a href="https://www.grandviewresearch.com/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-1">
                <ExternalLink className="w-3 h-3" />
                Grand View Research, 2023 Report
              </a>
            </div>
            <div>
              <p className="font-medium text-charcoal-light mb-2">Congregation Size Distribution</p>
              <a href="https://www.pewresearch.org/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-1">
                <ExternalLink className="w-3 h-3" />
                Pew Research Center
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PitchDeck;
