import { Quote, Star } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const testimonials = [
  {
    quote: "We switched from Planning Center and cut our admin time in half. Everything being in one place is a game-changer.",
    author: "Pastor Sarah Mitchell",
    role: "Lead Pastor",
    church: "Grace Community Church",
    size: "180 members",
    rating: 5,
  },
  {
    quote: "Our volunteers actually respond to scheduling requests now. The mobile experience is so much better than what we had before.",
    author: "Marcus Thompson",
    role: "Worship Director",
    church: "Riverside Chapel",
    size: "320 members",
    rating: 5,
  },
  {
    quote: "The pricing alone made the switch worth it. But staying for the simplicity is what we didn't expect.",
    author: "Jennifer Lee",
    role: "Church Administrator",
    church: "New Hope Fellowship",
    size: "95 members",
    rating: 5,
  },
];

export const Testimonials = () => {
  const { ref: headerRef, isRevealed: headerRevealed } = useScrollReveal();
  const { ref: gridRef, isRevealed: gridRevealed } = useScrollReveal();

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-accent/[0.03] blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/[0.03] blur-3xl" />
      
      <div className="container px-6 mx-auto relative">
        {/* Section header */}
        <div 
          ref={headerRef}
          className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-700 ${
            headerRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/[0.08] text-primary border border-primary/10">
            Testimonials
          </span>
          <h2 className="font-display font-semibold text-foreground mb-6">
            Churches love gathering with us
          </h2>
          <p className="text-lg text-muted-foreground">
            Real feedback from church leaders who made the switch.
          </p>
        </div>

        {/* Testimonials grid - airy cards */}
        <div 
          ref={gridRef}
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.author}
              className={`group relative p-8 rounded-2xl bg-card border border-border/50 hover:border-border hover:shadow-card transition-all duration-500 ${
                gridRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                transitionDelay: gridRevealed ? `${index * 100}ms` : '0ms',
              }}
            >
              {/* Quote icon */}
              <Quote className="w-10 h-10 text-primary/20 mb-5" />
              
              {/* Rating stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                ))}
              </div>
              
              {/* Quote text */}
              <blockquote className="text-foreground leading-relaxed mb-8">
                "{testimonial.quote}"
              </blockquote>
              
              {/* Author info */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shadow-soft">
                  <span className="font-display font-semibold text-primary text-sm">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {testimonial.church} • {testimonial.size}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
