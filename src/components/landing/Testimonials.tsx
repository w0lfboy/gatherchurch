import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "We switched from Planning Center and cut our admin time in half. Everything being in one place is a game-changer.",
    author: "Pastor Sarah Mitchell",
    role: "Lead Pastor",
    church: "Grace Community Church",
    size: "180 members",
  },
  {
    quote: "Our volunteers actually respond to scheduling requests now. The mobile experience is so much better than what we had before.",
    author: "Marcus Thompson",
    role: "Worship Director",
    church: "Riverside Chapel",
    size: "320 members",
  },
  {
    quote: "The pricing alone made the switch worth it. But staying for the simplicity is what we didn't expect.",
    author: "Jennifer Lee",
    role: "Church Administrator",
    church: "New Hope Fellowship",
    size: "95 members",
  },
];

export const Testimonials = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4 mx-auto">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-sage-light text-sage-dark">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-6">
            Churches love gathering with us
          </h2>
          <p className="text-lg text-muted-foreground">
            Real feedback from church leaders who made the switch.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.author}
              className="relative p-8 rounded-2xl bg-card border border-border hover:shadow-card transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Quote className="w-10 h-10 text-sage-light mb-4" />
              <blockquote className="text-foreground leading-relaxed mb-6">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sage-light to-coral-light flex items-center justify-center">
                  <span className="font-display font-semibold text-sage-dark">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} • {testimonial.church}
                  </p>
                  <p className="text-xs text-muted-foreground">{testimonial.size}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
