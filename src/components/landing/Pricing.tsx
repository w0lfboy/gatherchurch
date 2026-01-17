import { Button } from "@/components/ui/button";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Seedling",
    subtitle: "For small churches",
    price: "Free",
    period: "forever",
    description: "Perfect for churches under 100 people who need the essentials.",
    features: [
      "Up to 100 people",
      "Unified dashboard",
      "Basic volunteer scheduling",
      "Service planning",
      "Check-ins",
      "Email support",
    ],
    cta: "Start free",
    variant: "outline" as const,
    popular: false,
  },
  {
    name: "Growing",
    subtitle: "For medium churches",
    price: "$49",
    period: "/month",
    description: "Full features for churches of 100-350 people ready to thrive.",
    features: [
      "Up to 350 people",
      "Everything in Seedling",
      "Smart auto-scheduling",
      "Giving & donor statements",
      "Groups management",
      "Communication hub",
      "Song library & arrangements",
      "Priority support",
    ],
    cta: "Start 14-day trial",
    variant: "default" as const,
    popular: true,
  },
  {
    name: "Flourishing",
    subtitle: "For large churches",
    price: "$99",
    period: "/month",
    description: "Advanced workflows for churches of 350+ with complex needs.",
    features: [
      "Unlimited people",
      "Everything in Growing",
      "Advanced workflows",
      "Multi-campus support",
      "Custom permissions",
      "API access",
      "Dedicated success manager",
      "Phone support",
    ],
    cta: "Contact us",
    variant: "soft" as const,
    popular: false,
  },
];

export const Pricing = () => {
  const { ref: headerRef, isRevealed: headerRevealed } = useScrollReveal();
  const { ref: gridRef, isRevealed: gridRevealed } = useScrollReveal();

  return (
    <section id="pricing" className="section-padding bg-muted/30 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute inset-0 gradient-glow opacity-30" />
      
      <div className="container px-6 mx-auto relative">
        {/* Section header - transparent communication */}
        <div 
          ref={headerRef}
          className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-700 ${
            headerRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-accent/[0.08] text-accent border border-accent/10">
            Pricing
          </span>
          <h2 className="font-display font-semibold text-foreground mb-6">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            No per-module fees. No surprise charges. One price that covers everything 
            your church needs to gather well.
          </p>
        </div>

        {/* Pricing cards - tactile, scannable */}
        <div 
          ref={gridRef}
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative group p-8 rounded-2xl bg-card border transition-all duration-500 ${
                plan.popular 
                  ? 'border-primary shadow-lg shadow-primary/10 scale-[1.02]' 
                  : 'border-border/50 hover:border-border hover:shadow-card'
              } ${
                gridRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                transitionDelay: gridRevealed ? `${index * 100}ms` : '0ms',
              }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-full bg-primary text-primary-foreground shadow-md">
                    <Sparkles className="w-3.5 h-3.5" />
                    Most popular
                  </span>
                </div>
              )}

              {/* Plan header */}
              <div className="mb-6">
                <h3 className="text-xl font-display font-semibold text-foreground mb-1">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground">{plan.subtitle}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-display font-bold text-foreground">
                  {plan.price}
                </span>
                <span className="text-muted-foreground ml-1">{plan.period}</span>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                {plan.description}
              </p>

              {/* CTA Button */}
              <Button 
                variant={plan.variant} 
                className={`w-full mb-8 group/btn ${plan.popular ? 'shadow-soft' : ''}`}
                asChild
              >
                <Link to="/demo">
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-0.5 transition-transform duration-300" />
                </Link>
              </Button>

              {/* Features list - scannable */}
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Comparison note - transparent */}
        <div 
          className={`mt-12 text-center transition-all duration-700 delay-300 ${
            gridRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-sm text-muted-foreground">
            Compare to Planning Center: typically $150-300+/month for similar features across multiple apps.
          </p>
        </div>
      </div>
    </section>
  );
};
