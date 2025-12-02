import { Church, Heart, Users, Target } from "lucide-react";

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
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container px-4 mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-sage-light text-sage-dark">
              About Us
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-6">
              We believe church software
              <br />
              should feel like a gift
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Gather was born out of frustration with fragmented church management tools. 
              We asked: what if everything just... worked together? What if volunteers 
              actually enjoyed checking their schedules? What if pastors spent less time 
              in software and more time with people?
            </p>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Church className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-display font-semibold text-foreground">500+ Churches</p>
                <p className="text-sm text-muted-foreground">Trust Gather for their ministry</p>
              </div>
            </div>
          </div>

          {/* Right content - Values */}
          <div className="space-y-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="p-6 rounded-2xl bg-card border border-border hover:shadow-soft transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-coral-light flex items-center justify-center flex-shrink-0">
                    <value.icon className="w-5 h-5 text-coral" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
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
