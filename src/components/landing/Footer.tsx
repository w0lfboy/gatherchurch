import { Heart } from "lucide-react";

const footerLinks = {
  Product: ["Features", "Pricing", "Integrations", "Changelog"],
  Resources: ["Help Center", "Blog", "Guides", "Webinars"],
  Company: ["About", "Careers", "Contact", "Press"],
  Legal: ["Privacy", "Terms", "Security"],
};

export const Footer = () => {
  return (
    <footer className="py-16 bg-foreground text-background">
      <div className="container px-4 mx-auto">
        <div className="grid md:grid-cols-6 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-lg">G</span>
              </div>
              <span className="font-display font-semibold text-xl text-background">Gather</span>
            </div>
            <p className="text-background/60 text-sm leading-relaxed mb-6">
              The simple, unified church management platform. Built for churches 
              who want to spend less time on software and more time on ministry.
            </p>
            <div className="flex items-center gap-2 text-sm text-background/40">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-coral fill-coral" />
              <span>for churches</span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-background mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-sm text-background/60 hover:text-background transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/40">
            © 2024 Gather. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-background/60 hover:text-background transition-colors">
              Twitter
            </a>
            <a href="#" className="text-sm text-background/60 hover:text-background transition-colors">
              LinkedIn
            </a>
            <a href="#" className="text-sm text-background/60 hover:text-background transition-colors">
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
