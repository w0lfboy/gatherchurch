import { 
  Users, Calendar, Music, Heart, MessageSquare, 
  CheckCircle, LayoutDashboard, Smartphone 
} from "lucide-react";

const features = [
  {
    icon: LayoutDashboard,
    title: "One Unified Dashboard",
    description: "No more app-hopping. People, services, groups, giving—everything lives together in one beautiful, cohesive experience.",
    color: "sage",
  },
  {
    icon: Calendar,
    title: "Smart Volunteer Scheduling",
    description: "Auto-scheduling based on preferences, easy swaps, family logic, and mobile confirmations. Volunteers actually love using it.",
    color: "coral",
  },
  {
    icon: Music,
    title: "Intuitive Worship Planning",
    description: "Drag-and-drop service builder, song library with arrangements, and one-click service cloning for multi-service Sundays.",
    color: "gold",
  },
  {
    icon: Heart,
    title: "Simple Giving & Reports",
    description: "Recurring giving, donor statements, and forecasting. Transparent, compliant, and fewer clicks than you're used to.",
    color: "sage",
  },
  {
    icon: Users,
    title: "Groups That Connect",
    description: "Attendance tracking, integrated messaging, and resource sharing. Keep your small groups thriving.",
    color: "coral",
  },
  {
    icon: CheckCircle,
    title: "Effortless Check-Ins",
    description: "Hardware-agnostic, printable or digital labels, and built-in volunteer alerts. Parents feel secure, you stay organized.",
    color: "gold",
  },
  {
    icon: MessageSquare,
    title: "One Communication Hub",
    description: "Texts, emails, announcements, reminders—all in one feed. No more bouncing between five different messaging systems.",
    color: "sage",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Experience",
    description: "Built for the way people actually use technology. Leaders and congregants both get a beautiful mobile experience.",
    color: "coral",
  },
];

const colorMap = {
  sage: {
    bg: "bg-sage-light",
    icon: "text-sage-dark",
    border: "border-sage/20",
  },
  coral: {
    bg: "bg-coral-light",
    icon: "text-coral",
    border: "border-coral/20",
  },
  gold: {
    bg: "bg-secondary",
    icon: "text-gold",
    border: "border-gold/20",
  },
};

export const Features = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container px-4 mx-auto">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-sage-light text-sage-dark">
            Features
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-6">
            Everything your church needs,
            <br />
            nothing it doesn't
          </h2>
          <p className="text-lg text-muted-foreground">
            We've taken the best of Planning Center and made it simpler, more unified, 
            and actually enjoyable to use. No modules. No complexity. Just tools that work.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const colors = colorMap[feature.color as keyof typeof colorMap];
            return (
              <div
                key={feature.title}
                className="group p-6 rounded-2xl bg-card border border-border hover:shadow-elevated transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl ${colors.bg} ${colors.border} border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-6 h-6 ${colors.icon}`} />
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground mb-2">
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
