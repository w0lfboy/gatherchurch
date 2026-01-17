import { 
  Users, Calendar, Music, Heart, MessageSquare, 
  CheckCircle, LayoutDashboard, Smartphone 
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const features = [
  {
    icon: LayoutDashboard,
    title: "One Unified Dashboard",
    description: "No more app-hopping. People, services, groups, giving—everything lives together in one beautiful experience.",
    color: "primary",
  },
  {
    icon: Calendar,
    title: "Smart Volunteer Scheduling",
    description: "Auto-scheduling based on preferences, easy swaps, and mobile confirmations. Volunteers actually love using it.",
    color: "accent",
  },
  {
    icon: Music,
    title: "Intuitive Worship Planning",
    description: "Drag-and-drop service builder, song library with arrangements, and one-click service cloning.",
    color: "gold",
  },
  {
    icon: Heart,
    title: "Simple Giving & Reports",
    description: "Recurring giving, donor statements, and forecasting. Transparent, compliant, and fewer clicks.",
    color: "primary",
  },
  {
    icon: Users,
    title: "Groups That Connect",
    description: "Attendance tracking, integrated messaging, and resource sharing. Keep your small groups thriving.",
    color: "accent",
  },
  {
    icon: CheckCircle,
    title: "Effortless Check-Ins",
    description: "Hardware-agnostic, printable or digital labels, and built-in volunteer alerts. Parents feel secure.",
    color: "gold",
  },
  {
    icon: MessageSquare,
    title: "One Communication Hub",
    description: "Texts, emails, announcements, reminders—all in one feed. No more bouncing between systems.",
    color: "primary",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Experience",
    description: "Built for the way people actually use technology. Beautiful on every device.",
    color: "accent",
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

export const Features = () => {
  const { ref: headerRef, isRevealed: headerRevealed } = useScrollReveal();
  const { ref: gridRef, isRevealed: gridRevealed } = useScrollReveal();

  return (
    <section id="features" className="section-padding bg-background relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 gradient-glow opacity-50" />
      
      <div className="container px-6 mx-auto relative">
        {/* Section header - scannable */}
        <div 
          ref={headerRef}
          className={`max-w-3xl mx-auto text-center mb-20 transition-all duration-700 ${
            headerRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/[0.08] text-primary border border-primary/10">
            Features
          </span>
          <h2 className="font-display font-semibold text-foreground mb-6 text-balance">
            Everything your church needs,
            <br />
            <span className="text-muted-foreground">nothing it doesn't</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We've taken the best of church management and made it simpler, more unified, 
            and actually enjoyable to use.
          </p>
        </div>

        {/* Features grid - airy layout */}
        <div 
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {features.map((feature, index) => {
            const colors = colorMap[feature.color as keyof typeof colorMap];
            return (
              <div
                key={feature.title}
                className={`group p-6 rounded-2xl bg-card border border-border/50 hover:border-border hover:shadow-card transition-all duration-500 ${
                  gridRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                  transitionDelay: gridRevealed ? `${index * 75}ms` : '0ms',
                }}
              >
                {/* Icon - tactile */}
                <div className={`w-12 h-12 rounded-xl ${colors.bg} ${colors.border} border flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500`}>
                  <feature.icon className={`w-6 h-6 ${colors.icon}`} />
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
