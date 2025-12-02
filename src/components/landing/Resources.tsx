import { Button } from "@/components/ui/button";
import { BookOpen, Video, FileText, MessageCircle, ArrowRight } from "lucide-react";

const resources = [
  {
    icon: BookOpen,
    title: "Getting Started Guide",
    description: "A step-by-step walkthrough to set up your church in under 30 minutes.",
    link: "#",
    color: "sage",
  },
  {
    icon: Video,
    title: "Video Tutorials",
    description: "Watch bite-sized videos covering every feature, from basics to advanced workflows.",
    link: "#",
    color: "coral",
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
    color: "sage",
  },
];

const colorMap = {
  sage: {
    bg: "bg-sage-light",
    icon: "text-sage-dark",
  },
  coral: {
    bg: "bg-coral-light",
    icon: "text-coral",
  },
  gold: {
    bg: "bg-secondary",
    icon: "text-gold",
  },
};

export const Resources = () => {
  return (
    <section id="resources" className="py-24 bg-cream-dark">
      <div className="container px-4 mx-auto">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-gold/20 text-gold">
            Resources
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-6">
            Everything you need to succeed
          </h2>
          <p className="text-lg text-muted-foreground">
            We're here to help your church thrive. Explore our guides, tutorials, 
            and community resources.
          </p>
        </div>

        {/* Resources grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {resources.map((resource, index) => {
            const colors = colorMap[resource.color as keyof typeof colorMap];
            return (
              <a
                key={resource.title}
                href={resource.link}
                className="group p-6 rounded-2xl bg-card border border-border hover:shadow-elevated transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <resource.icon className={`w-6 h-6 ${colors.icon}`} />
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {resource.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {resource.description}
                </p>
                <span className="inline-flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            );
          })}
        </div>

        {/* Help CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Can't find what you're looking for?
          </p>
          <Button variant="soft">
            Contact Support
          </Button>
        </div>
      </div>
    </section>
  );
};
