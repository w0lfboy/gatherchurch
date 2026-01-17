import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle, Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Immersive background */}
      <div className="absolute inset-0 gradient-hero" />
      
      {/* Floating decorative elements - tactile depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-[10%] w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-3xl animate-breathe" />
        <div className="absolute bottom-20 right-[5%] w-[600px] h-[600px] rounded-full bg-accent/[0.04] blur-3xl animate-breathe animation-delay-200" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full gradient-glow animate-pulse-soft" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="container relative z-10 px-6 pt-36 pb-24 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge - delightful entrance */}
          <div 
            className="inline-flex items-center gap-2.5 px-4 py-2 mb-8 rounded-full bg-primary/[0.08] border border-primary/10 shadow-soft animate-fade-down opacity-0"
            style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
          >
            <Sparkles className="w-4 h-4 text-primary animate-pulse-soft" />
            <span className="text-sm font-medium text-primary">
              Built for churches, by church people
            </span>
          </div>

          {/* Main headline - scannable, impactful */}
          <h1 
            className="fluid-xl font-display font-semibold text-foreground mb-8 animate-fade-up opacity-0"
            style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
          >
            One place to{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-primary">gather</span>
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-primary/10 -rotate-1 rounded" />
            </span>
            <br />
            your church together
          </h1>

          {/* Subheadline - clear value proposition */}
          <p 
            className="fluid-md text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-up opacity-0"
            style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
          >
            The simple, unified platform for scheduling volunteers, planning worship, 
            managing groups, and keeping your congregation connected.
          </p>

          {/* CTA buttons - obvious, tactile */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up opacity-0"
            style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
          >
            <Button 
              variant="hero" 
              size="xl" 
              asChild
              className="group shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Link to="/demo">
                Start free trial
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
            <Button 
              variant="soft" 
              size="xl"
              className="group"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
              Watch demo
            </Button>
          </div>

          {/* Trust indicators - transparent, scannable */}
          <div 
            className="animate-fade-up opacity-0"
            style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}
          >
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard preview - immersive, tactile */}
        <div 
          className="mt-20 max-w-5xl mx-auto animate-fade-up opacity-0"
          style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}
        >
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-4 rounded-3xl bg-primary/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Browser frame */}
            <div className="relative rounded-2xl overflow-hidden shadow-float bg-card border border-border/50">
              {/* Browser bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-muted/30 border-b border-border/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-gold/60" />
                  <div className="w-3 h-3 rounded-full bg-primary/60" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="max-w-md mx-auto h-6 rounded-lg bg-muted/50 flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">app.gather.church</span>
                  </div>
                </div>
              </div>
              
              {/* Content fade */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent z-10 pointer-events-none" />
              
              <DashboardPreview />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const DashboardPreview = () => {
  return (
    <div className="p-6 bg-card">
      {/* Header bar */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-soft">
            <span className="text-primary-foreground font-display font-bold text-lg">G</span>
          </div>
          <span className="font-display font-semibold text-lg text-foreground">Gather</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-muted animate-pulse-soft" />
        </div>
      </div>

      {/* Dashboard content */}
      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="col-span-2 space-y-1">
          {["Dashboard", "Services", "People", "Groups", "Giving", "Check-ins"].map((item, i) => (
            <div 
              key={item} 
              className={`px-3 py-2.5 rounded-xl text-sm transition-all duration-300 ${
                i === 0 
                  ? 'bg-primary/10 text-primary font-medium shadow-soft' 
                  : 'text-muted-foreground hover:bg-muted/50'
              }`}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="col-span-10 space-y-6">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-primary/[0.06] border border-primary/10 hover-lift">
              <p className="text-sm text-muted-foreground mb-1">This Sunday</p>
              <p className="text-3xl font-display font-semibold text-foreground">247</p>
              <p className="text-xs text-primary mt-1">Expected attendance</p>
            </div>
            <div className="p-5 rounded-2xl bg-accent/[0.08] border border-accent/10 hover-lift">
              <p className="text-sm text-muted-foreground mb-1">Volunteers</p>
              <p className="text-3xl font-display font-semibold text-foreground">18/20</p>
              <p className="text-xs text-accent mt-1">Positions filled</p>
            </div>
            <div className="p-5 rounded-2xl bg-muted/50 border border-border hover-lift">
              <p className="text-sm text-muted-foreground mb-1">Active Groups</p>
              <p className="text-3xl font-display font-semibold text-foreground">12</p>
              <p className="text-xs text-muted-foreground mt-1">Meeting this week</p>
            </div>
          </div>

          {/* Service preview */}
          <div className="p-5 rounded-2xl bg-muted/30 border border-border hover-lift">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">SUN</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Sunday Service</p>
                  <p className="text-sm text-muted-foreground">9:00 AM • Main Auditorium</p>
                </div>
              </div>
              <span className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium">
                Ready
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {["Worship Set • 4 songs", "Announcements • 5 min", "Message • Pastor John"].map((item) => (
                <div key={item} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background/50 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
