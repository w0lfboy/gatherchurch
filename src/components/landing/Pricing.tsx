import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";

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
    variant: "hero" as const,
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
  return (
    <section className="py-24 bg-cream-dark">
      <div className="container px-4 mx-auto">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-coral-light text-coral">
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-6">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            No per-module fees. No surprise charges. One price that covers everything 
            your church needs to gather well.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative p-8 rounded-2xl bg-card border ${
                plan.popular ? 'border-primary shadow-elevated' : 'border-border'
              } animate-fade-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-primary text-primary-foreground">
                    <Sparkles className="w-3 h-3" />
                    Most popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-display font-semibold text-foreground mb-1">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground">{plan.subtitle}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-display font-bold text-foreground">
                  {plan.price}
                </span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                {plan.description}
              </p>

              <Button variant={plan.variant} className="w-full mb-8">
                {plan.cta}
              </Button>

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

        {/* Comparison note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Compare to Planning Center: typically $150-300+/month for similar features across multiple apps.
          </p>
        </div>
      </div>
    </section>
  );
};
