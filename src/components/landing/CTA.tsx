import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-24 gradient-hero">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-coral-light/60 border border-coral/20">
            <Heart className="w-4 h-4 text-coral" />
            <span className="text-sm font-medium text-coral">
              Made with love for churches
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-6">
            Ready to simplify
            <br />
            your church management?
          </h2>

          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Join hundreds of churches who've made the switch. Start your free trial 
            today—no credit card required, no commitment needed.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl" asChild>
              <Link to="/demo">
                Start your free trial
                <ArrowRight className="w-5 h-5 ml-1" />
              </Link>
            </Button>
            <Button variant="soft" size="xl">
              Schedule a demo
            </Button>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            14-day free trial • No credit card required • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};
