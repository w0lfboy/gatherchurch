import { Heart, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Integrations", href: "#" },
    { label: "Changelog", href: "#" },
  ],
  Resources: [
    { label: "Help Center", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Guides", href: "#" },
    { label: "Webinars", href: "#" },
  ],
  Company: [
    { label: "About", href: "#about" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Press", href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Security", href: "#" },
  ],
};

const socialLinks = [
  { label: "Twitter", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "YouTube", href: "#" },
];

export const Footer = () => {
  return (
    <footer className="py-16 bg-foreground text-background relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
      
      <div className="container px-6 mx-auto relative">
        <div className="grid md:grid-cols-6 gap-12 lg:gap-16 mb-16">
          {/* Brand column */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <span className="text-primary-foreground font-display font-bold text-lg">G</span>
              </div>
              <span className="font-display font-semibold text-xl text-background">Gather</span>
            </Link>
            <p className="text-background/60 text-sm leading-relaxed mb-8 max-w-xs">
              The simple, unified church management platform. Built for churches 
              who want to spend less time on software and more time on ministry.
            </p>
            <div className="flex items-center gap-2 text-sm text-background/40">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-accent fill-accent" />
              <span>for churches</span>
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-background mb-5 text-sm tracking-wide">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a 
                      href={link.href} 
                      className="group inline-flex items-center gap-1 text-sm text-background/50 hover:text-background transition-colors duration-300"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-background/40">
            © 2025 Gather. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            {socialLinks.map((link) => (
              <a 
                key={link.label}
                href={link.href} 
                className="text-sm text-background/50 hover:text-background transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
