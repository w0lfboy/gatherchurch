import { useState } from "react";
import { 
  ChevronLeft, ChevronRight, Users, Target, TrendingUp, 
  Calendar, DollarSign, Rocket, Shield, Heart, 
  CheckCircle, ArrowRight, Zap, Globe, Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Slide {
  id: number;
  title: string;
  content: React.ReactNode;
}

const PitchDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    // Slide 1: Title
    {
      id: 1,
      title: "Title",
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center px-12">
          <div className="w-24 h-24 rounded-3xl bg-sage flex items-center justify-center mb-8 shadow-lg">
            <span className="text-white font-display font-bold text-5xl">G</span>
          </div>
          <h1 className="text-6xl font-display font-semibold text-foreground mb-4">
            GatherChurch
          </h1>
          <p className="text-2xl text-charcoal-light mb-8">
            One place to gather your church together
          </p>
          <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-sage-light border border-sage/20">
            <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
            <span className="text-sage-dark font-medium">
              Strategic Plan 2026
            </span>
          </div>
        </div>
      ),
    },
    // Slide 2: The Problem
    {
      id: 2,
      title: "The Problem",
      content: (
        <div className="px-16 py-12">
          <h2 className="text-4xl font-display font-semibold text-sage mb-8">
            The Problem
          </h2>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-coral-light border border-coral/20">
                <h3 className="text-xl font-semibold text-coral mb-3">Planning Center Pain</h3>
                <ul className="space-y-2 text-charcoal-light">
                  <li className="flex items-start gap-2">
                    <span className="text-coral mt-1">•</span>
                    <span>Per-module pricing scales to $300+/mo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-coral mt-1">•</span>
                    <span>Steep learning curve overwhelms small churches</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-coral mt-1">•</span>
                    <span>19-year-old tech with no AI/automation</span>
                  </li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl bg-secondary border border-border">
                <h3 className="text-xl font-semibold text-foreground mb-3">Market Gap</h3>
                <ul className="space-y-2 text-charcoal-light">
                  <li className="flex items-start gap-2">
                    <span className="text-sage mt-1">•</span>
                    <span>50-500 member churches underserved</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sage mt-1">•</span>
                    <span>No modern, AI-first alternatives</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sage mt-1">•</span>
                    <span>High switching costs trap churches</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-7xl font-display font-bold text-sage mb-4">60K+</div>
                <p className="text-xl text-charcoal-light">Churches on Planning Center</p>
                <p className="text-lg text-muted-foreground mt-2">
                  Many frustrated with complexity & cost
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    // Slide 3: The Solution
    {
      id: 3,
      title: "The Solution",
      content: (
        <div className="px-16 py-12">
          <h2 className="text-4xl font-display font-semibold text-sage mb-8">
            Our Solution
          </h2>
          <div className="grid grid-cols-3 gap-6 mb-8">
            {[
              { icon: Zap, title: "Modern & Fast", desc: "React/TypeScript stack, instant updates, mobile-first" },
              { icon: Heart, title: "Simple Pricing", desc: "$49-99/mo flat rate, no per-seat costs, no surprises" },
              { icon: Globe, title: "All-in-One", desc: "People, Groups, Check-Ins, Events, Giving, Messages" },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-sage-light border border-sage/20 text-center">
                <div className="w-14 h-14 rounded-xl bg-sage/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-sage" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-charcoal-light text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-r from-sage-light to-coral-light border border-sage/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-sage flex items-center justify-center">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">Seamless Migration</h3>
                <p className="text-charcoal-light">
                  API sync with Planning Center & Breeze — import your data in minutes, not weeks
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    // Slide 4: Product Demo
    {
      id: 4,
      title: "Product",
      content: (
        <div className="px-16 py-12">
          <h2 className="text-4xl font-display font-semibold text-sage mb-8">
            The Product
          </h2>
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { name: "People", status: "UI Complete" },
              { name: "Groups", status: "UI Complete" },
              { name: "Check-Ins", status: "UI Complete" },
              { name: "Services", status: "UI Complete" },
              { name: "Volunteers", status: "UI Complete" },
              { name: "Giving", status: "UI Complete" },
              { name: "Events", status: "UI Complete" },
              { name: "Messages", status: "UI Complete" },
            ].map((module, i) => (
              <div key={i} className="p-4 rounded-xl bg-secondary border border-border text-center">
                <p className="font-semibold text-foreground">{module.name}</p>
                <p className="text-xs text-sage mt-1">{module.status}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-sage-light border border-sage/20">
              <h3 className="font-semibold text-sage-dark mb-3">✓ Already Built</h3>
              <ul className="space-y-1 text-sm text-charcoal-light">
                <li>• Supabase Auth & Multi-tenancy</li>
                <li>• Role-based permissions (5 levels)</li>
                <li>• All 8 module UIs with shadcn/ui</li>
                <li>• Mobile-responsive layouts</li>
              </ul>
            </div>
            <div className="p-5 rounded-2xl bg-coral-light border border-coral/20">
              <h3 className="font-semibold text-coral mb-3">○ Needs Engineering</h3>
              <ul className="space-y-1 text-sm text-charcoal-light">
                <li>• Domain database tables</li>
                <li>• React Query data hooks</li>
                <li>• API integrations (PCO, Breeze)</li>
                <li>• Email/SMS (Resend, Twilio)</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    // Slide 5: 3-Month Roadmap
    {
      id: 5,
      title: "Roadmap",
      content: (
        <div className="px-16 py-12">
          <h2 className="text-4xl font-display font-semibold text-sage mb-8">
            3-Month Roadmap
          </h2>
          <div className="space-y-6">
            {[
              {
                month: "Month 1",
                title: "Working Prototype",
                color: "sage",
                items: [
                  "Hosted domain (gatherchurch.com)",
                  "Complete backend with Supabase",
                  "All features wired to real data",
                  "Basic onboarding flow",
                ],
              },
              {
                month: "Month 2",
                title: "Feature Parity & Migration",
                color: "coral",
                items: [
                  "Bug hunting & QA across all 8 modules",
                  "Multi-tenant subdomains (church.gatherchurch.com)",
                  "Planning Center & Breeze API sync",
                  "Marketing strategy + 5-10 trial signups",
                ],
              },
              {
                month: "Month 3",
                title: "Beta Launch",
                color: "gold",
                items: [
                  "Migrate first customers (start with Lamb)",
                  "Internal testing with real congregation",
                  "Forum posts & market outreach",
                  "Consider marketing hire (Diocese network)",
                ],
              },
            ].map((phase, i) => (
              <div
                key={i}
                className={`p-5 rounded-2xl border ${
                  phase.color === "sage"
                    ? "bg-sage-light border-sage/20"
                    : phase.color === "coral"
                    ? "bg-coral-light border-coral/20"
                    : "bg-secondary border-gold/20"
                }`}
              >
                <div className="flex items-center gap-4 mb-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      phase.color === "sage"
                        ? "bg-sage text-white"
                        : phase.color === "coral"
                        ? "bg-coral text-white"
                        : "bg-gold text-white"
                    }`}
                  >
                    {phase.month}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground">{phase.title}</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {phase.items.map((item, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm text-charcoal-light">
                      <CheckCircle className="w-4 h-4 text-sage flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    // Slide 6: Team
    {
      id: 6,
      title: "Team",
      content: (
        <div className="px-16 py-12">
          <h2 className="text-4xl font-display font-semibold text-sage mb-8">
            The Team
          </h2>
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="p-6 rounded-2xl bg-sage-light border border-sage/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-sage flex items-center justify-center">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Taylor</h3>
                  <p className="text-sage-dark">CEO & Product</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-charcoal-light">
                <li className="flex items-center gap-2">
                  <span className="text-sage">•</span>
                  Product vision & strategy
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-sage">•</span>
                  Sales & customer relationships
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-sage">•</span>
                  Fundraising & partnerships
                </li>
              </ul>
            </div>
            <div className="p-6 rounded-2xl bg-coral-light border border-coral/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-coral flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Barrett</h3>
                  <p className="text-coral">CTO & Engineering</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-charcoal-light">
                <li className="flex items-center gap-2">
                  <span className="text-coral">•</span>
                  Technical architecture & AI
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-coral">•</span>
                  Security & infrastructure
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-coral">•</span>
                  Full-stack development
                </li>
              </ul>
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-secondary border border-border">
            <h3 className="font-semibold text-foreground mb-3">Future Hires (As We Scale)</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center p-3 rounded-xl bg-background">
                <p className="font-medium text-foreground">Marketing Lead</p>
                <p className="text-muted-foreground text-xs">Month 3-4</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-background">
                <p className="font-medium text-foreground">Support Engineer</p>
                <p className="text-muted-foreground text-xs">Month 6+ (Zeke?)</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-background">
                <p className="font-medium text-foreground">Advisory Board</p>
                <p className="text-muted-foreground text-xs">For seed round</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    // Slide 7: Business Model
    {
      id: 7,
      title: "Business Model",
      content: (
        <div className="px-16 py-12">
          <h2 className="text-4xl font-display font-semibold text-sage mb-8">
            Business Model
          </h2>
          <div className="grid grid-cols-3 gap-6 mb-8">
            {[
              { tier: "Starter", price: "Free", desc: "Up to 100 people", color: "secondary" },
              { tier: "Growth", price: "$49/mo", desc: "Unlimited + Check-ins", color: "sage-light" },
              { tier: "Pro", price: "$99/mo", desc: "All features + Giving + AI", color: "sage" },
            ].map((plan, i) => (
              <div
                key={i}
                className={`p-6 rounded-2xl text-center ${
                  plan.color === "sage"
                    ? "bg-sage text-white"
                    : plan.color === "sage-light"
                    ? "bg-sage-light border border-sage/20"
                    : "bg-secondary border border-border"
                }`}
              >
                <p className={`text-sm font-medium mb-2 ${plan.color === "sage" ? "text-sage-light" : "text-muted-foreground"}`}>
                  {plan.tier}
                </p>
                <p className={`text-4xl font-display font-bold mb-2 ${plan.color === "sage" ? "text-white" : "text-foreground"}`}>
                  {plan.price}
                </p>
                <p className={`text-sm ${plan.color === "sage" ? "text-sage-light" : "text-charcoal-light"}`}>
                  {plan.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-sage-light border border-sage/20">
              <h3 className="font-semibold text-sage-dark mb-3 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Revenue Streams
              </h3>
              <ul className="space-y-2 text-sm text-charcoal-light">
                <li>• SaaS subscriptions (primary)</li>
                <li>• Giving processing: 2.0% + $0.25</li>
                <li>• SMS credits at volume</li>
              </ul>
            </div>
            <div className="p-5 rounded-2xl bg-secondary border border-border">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-sage" />
                Key Advantages
              </h3>
              <ul className="space-y-2 text-sm text-charcoal-light">
                <li>• No per-seat pricing (PCO pain point)</li>
                <li>• Month-to-month, no contracts</li>
                <li>• Undercuts Breeze ($72/mo)</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    // Slide 8: Year 1 Goals
    {
      id: 8,
      title: "Year 1 Goals",
      content: (
        <div className="px-16 py-12">
          <h2 className="text-4xl font-display font-semibold text-sage mb-8">
            Year 1 Goals
          </h2>
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="p-8 rounded-2xl bg-sage-light border border-sage/20 text-center">
              <div className="text-6xl font-display font-bold text-sage mb-2">100-150</div>
              <p className="text-xl text-sage-dark">Paying Customers</p>
              <p className="text-sm text-charcoal-light mt-2">
                Foundational customer base
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-coral-light border border-coral/20 text-center">
              <div className="text-6xl font-display font-bold text-coral mb-2">$5-10K</div>
              <p className="text-xl text-coral">Monthly Recurring Revenue</p>
              <p className="text-sm text-charcoal-light mt-2">
                Sustainable unit economics
              </p>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-secondary border border-border">
            <h3 className="font-semibold text-foreground mb-4">Quarterly Milestones</h3>
            <div className="grid grid-cols-4 gap-4">
              {[
                { q: "Q1", customers: "5-10", mrr: "$500", focus: "Beta launch" },
                { q: "Q2", customers: "25-40", mrr: "$2K", focus: "Product-market fit" },
                { q: "Q3", customers: "60-80", mrr: "$5K", focus: "Growth channels" },
                { q: "Q4", customers: "100-150", mrr: "$10K", focus: "Scale prep" },
              ].map((quarter, i) => (
                <div key={i} className="text-center p-4 rounded-xl bg-background">
                  <p className="text-lg font-bold text-sage">{quarter.q}</p>
                  <p className="text-2xl font-display font-semibold text-foreground">{quarter.customers}</p>
                  <p className="text-xs text-muted-foreground">customers</p>
                  <p className="text-sm font-medium text-coral mt-2">{quarter.mrr}</p>
                  <p className="text-xs text-charcoal-light mt-1">{quarter.focus}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    // Slide 9: Year 2 Vision
    {
      id: 9,
      title: "Year 2 Vision",
      content: (
        <div className="px-16 py-12">
          <h2 className="text-4xl font-display font-semibold text-sage mb-8">
            Year 2 & Beyond
          </h2>
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-sage-light border border-sage/20">
                <h3 className="font-semibold text-sage-dark mb-2">Seed Funding Round</h3>
                <p className="text-sm text-charcoal-light">
                  With 100+ customers and proven MRR, raise seed capital to accelerate growth
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-secondary border border-border">
                <h3 className="font-semibold text-foreground mb-2">Team Expansion</h3>
                <ul className="text-sm text-charcoal-light space-y-1">
                  <li>• 2-3 additional engineers</li>
                  <li>• Full-time marketing</li>
                  <li>• Customer success lead</li>
                </ul>
              </div>
              <div className="p-5 rounded-2xl bg-coral-light border border-coral/20">
                <h3 className="font-semibold text-coral mb-2">Product Expansion</h3>
                <ul className="text-sm text-charcoal-light space-y-1">
                  <li>• Native mobile apps</li>
                  <li>• Advanced AI features</li>
                  <li>• Church website builder</li>
                </ul>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-sage-light to-coral-light border border-sage/20">
                <div className="text-7xl font-display font-bold text-sage mb-2">1,000+</div>
                <p className="text-xl text-sage-dark mb-4">Churches by Year 2</p>
                <div className="text-3xl font-display font-semibold text-coral">$50-100K MRR</div>
                <p className="text-sm text-charcoal-light mt-2">
                  Sustainable, profitable growth
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    // Slide 10: The Ask
    {
      id: 10,
      title: "The Ask",
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center px-16">
          <h2 className="text-4xl font-display font-semibold text-sage mb-8">
            Let's Build This Together
          </h2>
          <div className="grid grid-cols-3 gap-6 mb-12 w-full max-w-3xl">
            <div className="p-6 rounded-2xl bg-sage-light border border-sage/20">
              <Calendar className="w-10 h-10 text-sage mx-auto mb-3" />
              <h3 className="font-semibold text-foreground">3 Months</h3>
              <p className="text-sm text-charcoal-light">To working beta</p>
            </div>
            <div className="p-6 rounded-2xl bg-coral-light border border-coral/20">
              <Users className="w-10 h-10 text-coral mx-auto mb-3" />
              <h3 className="font-semibold text-foreground">2-Person Team</h3>
              <p className="text-sm text-charcoal-light">Lean & focused</p>
            </div>
            <div className="p-6 rounded-2xl bg-secondary border border-gold/20">
              <Rocket className="w-10 h-10 text-gold mx-auto mb-3" />
              <h3 className="font-semibold text-foreground">Big Vision</h3>
              <p className="text-sm text-charcoal-light">1,000+ churches</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-sage text-white">
            <span className="font-semibold">Barrett — Ready to join?</span>
            <ArrowRight className="w-5 h-5" />
          </div>
          <p className="text-sm text-muted-foreground mt-8 italic">
            "One place to gather your church together"
          </p>
        </div>
      ),
    },
  ];

  const goToSlide = (index: number) => {
    if (index >= 0 && index < slides.length) {
      setCurrentSlide(index);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main slide area */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-5xl aspect-[16/9] bg-card rounded-2xl shadow-elevated border border-border overflow-hidden">
          {slides[currentSlide].content}
        </div>
      </div>

      {/* Navigation */}
      <div className="p-6 bg-card border-t border-border">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => goToSlide(currentSlide - 1)}
            disabled={currentSlide === 0}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === currentSlide
                    ? "bg-sage w-8"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                title={slide.title}
              />
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {currentSlide + 1} / {slides.length}
            </span>
            <Button
              variant="outline"
              onClick={() => goToSlide(currentSlide + 1)}
              disabled={currentSlide === slides.length - 1}
              className="gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitchDeck;
