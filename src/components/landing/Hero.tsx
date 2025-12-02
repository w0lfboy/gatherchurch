import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen gradient-hero overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-sage/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-coral/5 rounded-full blur-3xl animate-float animation-delay-200" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/3 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 px-4 pt-32 pb-20 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-sage-light/80 border border-sage/20 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-sage animate-pulse-soft" />
            <span className="text-sm font-medium text-sage-dark">
              Built for churches, by church people
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-semibold text-foreground leading-tight mb-6 animate-fade-up animation-delay-100">
            One place to{" "}
            <span className="text-primary">gather</span>
            <br />
            your church together
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-charcoal-light max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up animation-delay-200">
            The simple, unified platform for scheduling volunteers, planning worship, 
            managing groups, and keeping your congregation connected.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up animation-delay-300">
            <Button variant="hero" size="xl" asChild>
              <Link to="/demo">
                Start free trial
                <ArrowRight className="w-5 h-5 ml-1" />
              </Link>
            </Button>
            <Button variant="soft" size="xl">
              <Play className="w-5 h-5" />
              Watch demo
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="animate-fade-up animation-delay-400">
            <p className="text-sm text-muted-foreground mb-4">
              Trusted by churches of all sizes
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-sage/20" />
                <span className="font-medium text-charcoal-light">Grace Community</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-coral/20" />
                <span className="font-medium text-charcoal-light">Riverside Chapel</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gold/20" />
                <span className="font-medium text-charcoal-light">New Hope Fellowship</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard preview */}
        <div className="mt-16 max-w-5xl mx-auto animate-fade-up animation-delay-500">
          <div className="relative rounded-2xl overflow-hidden shadow-elevated bg-card border border-border">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80 z-10 pointer-events-none" />
            <DashboardPreview />
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
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold text-lg">G</span>
          </div>
          <span className="font-display font-semibold text-lg">Gather</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-sage-light" />
        </div>
      </div>

      {/* Dashboard content */}
      <div className="grid grid-cols-12 gap-4">
        {/* Sidebar */}
        <div className="col-span-2 space-y-2">
          {["Dashboard", "Services", "People", "Groups", "Giving"].map((item, i) => (
            <div 
              key={item} 
              className={`px-3 py-2 rounded-lg text-sm ${i === 0 ? 'bg-sage-light text-sage-dark font-medium' : 'text-muted-foreground'}`}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="col-span-10 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {/* Stats cards */}
            <div className="p-4 rounded-xl bg-sage-light/50 border border-sage/10">
              <p className="text-sm text-muted-foreground mb-1">This Sunday</p>
              <p className="text-2xl font-display font-semibold text-foreground">247</p>
              <p className="text-xs text-sage">Expected attendance</p>
            </div>
            <div className="p-4 rounded-xl bg-coral-light/50 border border-coral/10">
              <p className="text-sm text-muted-foreground mb-1">Volunteers</p>
              <p className="text-2xl font-display font-semibold text-foreground">18/20</p>
              <p className="text-xs text-coral">Positions filled</p>
            </div>
            <div className="p-4 rounded-xl bg-secondary border border-border">
              <p className="text-sm text-muted-foreground mb-1">Groups Active</p>
              <p className="text-2xl font-display font-semibold text-foreground">12</p>
              <p className="text-xs text-muted-foreground">Meeting this week</p>
            </div>
          </div>

          {/* Service preview */}
          <div className="p-4 rounded-xl bg-secondary/50 border border-border">
            <div className="flex items-center justify-between mb-3">
              <p className="font-medium">Sunday Service - 9:00 AM</p>
              <span className="text-xs px-2 py-1 rounded-full bg-sage-light text-sage-dark">Ready</span>
            </div>
            <div className="space-y-2">
              {["Worship Set • 4 songs", "Announcements • 5 min", "Message • Pastor John"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-sage" />
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
