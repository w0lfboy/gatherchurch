import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "About", href: "#about" },
  { label: "Pricing", href: "#pricing" },
  { label: "Resources", href: "#resources" },
];

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'py-2 glass border-b border-border/50' 
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="container px-6 mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group"
          >
            <div className="relative w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-soft group-hover:shadow-md transition-shadow duration-300">
              <span className="text-primary-foreground font-display font-bold text-lg">G</span>
              <div className="absolute inset-0 rounded-xl bg-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </div>
            <span className="font-display font-semibold text-xl text-foreground">
              Gather
            </span>
          </Link>

          {/* Desktop navigation - fluid, scannable */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
              </a>
            ))}
          </div>

          {/* Desktop CTA - obvious, tactile */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/auth">
              <Button 
                variant="ghost" 
                className="text-muted-foreground hover:text-foreground hover:bg-transparent"
              >
                Sign in
              </Button>
            </Link>
            <Link to="/demo">
              <Button 
                className="group shadow-soft hover:shadow-md transition-all duration-300"
              >
                Start free
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform duration-300" />
              </Button>
            </Link>
          </div>

          {/* Mobile menu button - responsive feedback */}
          <button
            className="md:hidden p-2.5 rounded-xl text-foreground hover:bg-muted/50 active:scale-95 transition-all duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <Menu className={`w-6 h-6 absolute transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
              <X className={`w-6 h-6 absolute transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
            </div>
          </button>
        </div>

        {/* Mobile menu - fluid, linear */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
            mobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
          }`}
        >
          <div className="py-4 px-2 rounded-2xl bg-card/80 backdrop-blur-lg border border-border/50 shadow-elevated">
            <div className="space-y-1">
              {navLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block py-3 px-4 text-foreground font-medium rounded-xl hover:bg-muted/50 active:bg-muted transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="pt-4 mt-4 border-t border-border/50 space-y-2 px-2">
              <Link to="/auth" className="block">
                <Button variant="outline" className="w-full justify-center">
                  Sign in
                </Button>
              </Link>
              <Link to="/demo" className="block">
                <Button className="w-full justify-center">
                  Start free trial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
