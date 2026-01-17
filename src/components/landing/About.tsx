import { Church, Heart, Users, Target, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const values = [
  {
    icon: Heart,
    title: "Ministry First",
    description: "We build tools that serve your mission, not the other way around. Every feature is designed with real church workflows in mind.",
  },
  {
    icon: Users,
    title: "Built by Church People",
    description: "Our team includes pastors, worship leaders, and volunteers who've felt the pain of disconnected tools firsthand.",
  },
  {
    icon: Target,
    title: "Simplicity is Sacred",
    description: "We believe complexity kills momentum. That's why we obsess over making powerful features feel effortless.",
  },
];

export const About = () => {
  const { ref: leftRef, isRevealed: leftRevealed } = useScrollReveal();
  const { ref: rightRef, isRevealed: rightRevealed } = useScrollReveal();

  return (
    <section id="about" className="section-padding bg-background relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-primary/[0.02] blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="container px-6 mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left content - narrative */}
          <div 
            ref={leftRef}
            className={`transition-all duration-700 ${
              leftRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/[0.08] text-primary border border-primary/10">
              About Us
            </span>
            <h2 className="font-display font-semibold text-foreground mb-6">
              We believe church software
              <br />
              <span className="text-primary">should feel like a gift</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Gather was born out of frustration with fragmented church management tools. 
              We asked: what if everything just... worked together? What if volunteers 
              actually enjoyed checking their schedules? What if pastors spent less time 
              in software and more time with people?
            </p>
            
            {/* Stats card - tactile */}
            <div className="flex items-center gap-5 p-5 rounded-2xl bg-card border border-border/50 shadow-soft hover-lift">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Church className="w-7 h-7 text-primary" />
              </div>
              <div>
                <p className="text-3xl font-display font-semibold text-foreground">500+</p>
                <p className="text-muted-foreground">Churches trust Gather for their ministry</p>
              </div>
            </div>

            <div className="mt-8">
              <Button variant="soft" asChild className="group">
                <Link to="/demo">
                  See Gather in action
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right content - Values */}
          <div 
            ref={rightRef}
            className="space-y-5"
          >
            {values.map((value, index) => (
              <div
                key={value.title}
                className={`group p-6 rounded-2xl bg-card border border-border/50 hover:border-border hover:shadow-card transition-all duration-500 ${
                  rightRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                  transitionDelay: rightRevealed ? `${index * 100}ms` : '0ms',
                }}
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                    <value.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
