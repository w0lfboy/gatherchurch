import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, CheckCircle } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export const CTA = () => {
  const { ref, isRevealed } = useScrollReveal();

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Immersive background */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 gradient-glow" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-[10%] w-[300px] h-[300px] rounded-full bg-primary/[0.04] blur-3xl animate-breathe" />
      <div className="absolute bottom-20 right-[10%] w-[400px] h-[400px] rounded-full bg-accent/[0.04] blur-3xl animate-breathe animation-delay-300" />
      
      <div 
        ref={ref}
        className={`container px-6 mx-auto relative transition-all duration-700 ${
          isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge - delightful */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-accent/10 border border-accent/20">
            <Heart className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">
              Made with love for churches
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-display font-semibold text-foreground mb-6">
            Ready to simplify
            <br />
            <span className="text-primary">your church management?</span>
          </h2>

          {/* Subtext */}
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Join hundreds of churches who've made the switch. Start your free trial 
            today—no credit card required, no commitment needed.
          </p>

          {/* CTA buttons - obvious, tactile */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button 
              variant="hero" 
              size="xl" 
              asChild
              className="group shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Link to="/demo">
                Start your free trial
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
            <Button variant="soft" size="xl" className="group">
              Schedule a demo
            </Button>
          </div>

          {/* Trust indicators - transparent */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
