import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import omSymbol from "@/assets/om-symbol.jpg";

const Footer = () => {
  return (
    <footer className="gradient-divine border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src={omSymbol} 
                alt="Divine Puja Services" 
                className="w-10 h-10 rounded-full border border-primary"
              />
              <div>
                <h3 className="text-xl font-bold text-primary">Divine Puja Services</h3>
                <p className="text-sm text-muted-foreground">Authentic Hindu Rituals</p>
              </div>
            </div>
            <p className="text-muted-foreground">
              Experience the authenticity and charm of North Indian Hindi Pandits. 
              We provide traditional puja services with deep knowledge of Hindu scriptures and rituals.
            </p>
            <div className="flex space-x-3">
              <Facebook className="w-5 h-5 text-primary hover:text-accent transition-colors cursor-pointer" />
              <Instagram className="w-5 h-5 text-primary hover:text-accent transition-colors cursor-pointer" />
              <Youtube className="w-5 h-5 text-primary hover:text-accent transition-colors cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/about" className="block text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
              <Link to="/services" className="block text-muted-foreground hover:text-primary transition-colors">
                Our Services
              </Link>
              <Link to="/gallery" className="block text-muted-foreground hover:text-primary transition-colors">
                Gallery
              </Link>
              <Link to="/blog" className="block text-muted-foreground hover:text-primary transition-colors">
                Blog
              </Link>
              <Link to="/contact" className="block text-muted-foreground hover:text-primary transition-colors">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Our Services</h3>
            <div className="space-y-2">
              <Link to="/services" className="block text-muted-foreground hover:text-primary transition-colors">
                Griha Pravesh Puja
              </Link>
              <Link to="/services" className="block text-muted-foreground hover:text-primary transition-colors">
                Satyanarayan Puja
              </Link>
              <Link to="/services" className="block text-muted-foreground hover:text-primary transition-colors">
                Marriage Puja
              </Link>
              <Link to="/services" className="block text-muted-foreground hover:text-primary transition-colors">
                Ganapathi Puja
              </Link>
              <Link to="/services" className="block text-muted-foreground hover:text-primary transition-colors">
                Rudrabhishek Puja
              </Link>
              <Link to="/services" className="block text-muted-foreground hover:text-primary transition-colors">
                Navagraha Puja
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">+91 620 647 1543</p>
                  <p className="text-sm text-muted-foreground">Available 24/7</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">info@divinepuja.com</p>
                  <p className="text-sm text-muted-foreground">Email us anytime</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Bangalore, Karnataka</p>
                  <p className="text-sm text-muted-foreground">Serving across India</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground">
            © 2024 Divine Puja Services. All rights reserved. | 
            <span className="text-primary"> Bringing Divine Blessings to Your Home</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;