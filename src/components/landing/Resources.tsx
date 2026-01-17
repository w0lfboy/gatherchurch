import { Button } from "@/components/ui/button";
import { BookOpen, Video, FileText, MessageCircle, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const resources = [
  {
    icon: BookOpen,
    title: "Getting Started Guide",
    description: "A step-by-step walkthrough to set up your church in under 30 minutes.",
    link: "#",
    color: "primary",
  },
  {
    icon: Video,
    title: "Video Tutorials",
    description: "Watch bite-sized videos covering every feature, from basics to advanced workflows.",
    link: "#",
    color: "accent",
  },
  {
    icon: FileText,
    title: "Best Practices",
    description: "Learn how thriving churches use Gather to streamline their operations.",
    link: "#",
    color: "gold",
  },
  {
    icon: MessageCircle,
    title: "Community Forum",
    description: "Connect with other church leaders, share tips, and get answers from our team.",
    link: "#",
    color: "primary",
  },
];

const colorMap = {
  primary: {
    bg: "bg-primary/[0.08]",
    icon: "text-primary",
    border: "border-primary/10",
  },
  accent: {
    bg: "bg-accent/[0.08]",
    icon: "text-accent",
    border: "border-accent/10",
  },
  gold: {
    bg: "bg-gold/[0.08]",
    icon: "text-gold",
    border: "border-gold/10",
  },
};

export const Resources = () => {
  const { ref: headerRef, isRevealed: headerRevealed } = useScrollReveal();
  const { ref: gridRef, isRevealed: gridRevealed } = useScrollReveal();

  return (
    <section id="resources" className="section-padding bg-muted/30 relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gold/[0.03] blur-3xl -translate-x-1/2 translate-y-1/2" />
      
      <div className="container px-6 mx-auto relative">
        {/* Section header */}
        <div 
          ref={headerRef}
          className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-700 ${
            headerRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-gold/[0.15] text-gold border border-gold/20">
            Resources
          </span>
          <h2 className="font-display font-semibold text-foreground mb-6">
            Everything you need to succeed
          </h2>
          <p className="text-lg text-muted-foreground">
            We're here to help your church thrive. Explore our guides, tutorials, 
            and community resources.
          </p>
        </div>

        {/* Resources grid - tactile cards */}
        <div 
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto"
        >
          {resources.map((resource, index) => {
            const colors = colorMap[resource.color as keyof typeof colorMap];
            return (
              <a
                key={resource.title}
                href={resource.link}
                className={`group p-6 rounded-2xl bg-card border border-border/50 hover:border-border hover:shadow-card transition-all duration-500 ${
                  gridRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                  transitionDelay: gridRevealed ? `${index * 75}ms` : '0ms',
                }}
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl ${colors.bg} ${colors.border} border flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500`}>
                  <resource.icon className={`w-6 h-6 ${colors.icon}`} />
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {resource.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {resource.description}
                </p>
                
                {/* Link indicator */}
                <span className="inline-flex items-center text-sm font-medium text-primary">
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </a>
            );
          })}
        </div>

        {/* Help CTA */}
        <div 
          className={`mt-16 text-center transition-all duration-700 delay-300 ${
            gridRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-muted-foreground mb-4">
            Can't find what you're looking for?
          </p>
          <Button variant="soft" className="group">
            Contact Support
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </section>
  );
};
