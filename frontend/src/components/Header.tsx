import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X, Phone } from "lucide-react";
import omSymbol from "@/assets/om-symbol.jpg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Gallery", path: "/gallery" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-sacred border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover-sacred">
            <img 
              src={omSymbol} 
              alt="Hindu Puja Services" 
              className="w-12 h-12 rounded-full border-2 border-primary animate-om-pulse"
            />
            <div>
              <h1 className="text-2xl font-bold text-primary text-shadow-sacred">
                Divine Puja Services
              </h1>
              <p className="text-sm text-muted-foreground">Authentic Hindu Rituals</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.path) 
                    ? "text-primary border-b-2 border-primary" 
                    : "text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Call to Action */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Book Your Puja</p>
              <p className="text-lg font-bold text-primary">+91 620 647 1543</p>
            </div>
            <Button 
              variant="default" 
              className="gradient-sacred hover-sacred"
              asChild
            >
              <Link to="/contact">
                <Phone className="w-4 h-4 mr-2" />
                Book Now
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 py-6 border-t border-border">
            <div className="flex flex-col items-center space-y-5">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-lg font-semibold transition-colors hover:text-primary text-center py-2 px-4 rounded-lg hover:bg-primary/10 w-full max-w-xs ${
                    isActive(item.path) ? "text-primary bg-primary/10" : "text-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-6 border-t border-border w-full max-w-xs">
                <Button 
                  variant="default" 
                  className="w-full gradient-sacred text-base py-3"
                  asChild
                >
                  <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                    <Phone className="w-5 h-5 mr-2" />
                    Book Puja - +91 620 647 1543
                  </Link>
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;