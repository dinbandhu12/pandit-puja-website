import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TestimonialCard from "@/components/TestimonialCard";
import ServiceCard from "@/components/ServiceCard";
import { 
  Phone, 
  Star, 
  Award, 
  Clock, 
  Users, 
  Heart,
  Home,
  Flame,
  CircleCheck,
  Gift,
  Crown,
  Calendar
} from "lucide-react";
import { Link } from "react-router-dom";
import heroTemple from "@/assets/hero-temple.jpg";
import panditPuja from "@/assets/pandit-puja.jpg";
import weddingCeremony from "@/assets/wedding-ceremony.jpg";
import ganeshPuja from "@/assets/ganesh-puja.jpg";

const Index = () => {
  const featuredServices = [
    {
      title: "Griha Pravesh Puja",
      description: "Traditional house warming ceremony to bless your new home with prosperity and positive energy.",
      icon: Home,
      price: "₹3,500",
      duration: "2-3 hours",
      features: ["Complete puja materials", "Sanskrit mantras", "Prasadam included", "Home blessing ritual"],
      image: panditPuja
    },
    {
      title: "Marriage Puja",
      description: "Sacred wedding ceremonies performed with authentic Vedic rituals for a blessed union.",
      icon: Heart,
      price: "₹15,000",
      duration: "4-6 hours",
      features: ["Full wedding ceremony", "Sacred fire ritual", "Traditional customs", "Blessing ceremonies"],
      image: weddingCeremony
    },
    {
      title: "Ganapathi Puja",
      description: "Remove obstacles and invite prosperity with authentic Lord Ganesha worship rituals.",
      icon: Crown,
      price: "₹2,500",
      duration: "1-2 hours",
      features: ["Ganesha idol setup", "Modak prasadam", "Special mantras", "Obstacle removal ritual"],
      image: ganeshPuja
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "Bangalore, Karnataka",
      rating: 5,
      testimonial: "Excellent service! The pandit ji was very knowledgeable and performed the Griha Pravesh puja with complete devotion. Our home feels blessed now.",
      service: "Griha Pravesh Puja"
    },
    {
      name: "Priya Sharma",
      location: "Delhi, India",
      rating: 5,
      testimonial: "Perfect wedding ceremony! Every ritual was explained beautifully and performed with precision. Our families were very happy with the authentic traditions.",
      service: "Marriage Puja"
    },
    {
      name: "Amit Gupta",
      location: "Mumbai, Maharashtra",
      rating: 5,
      testimonial: "Amazing Satyanarayan puja service. The pandit arrived on time with all materials and conducted the ceremony with great devotion. Highly recommended!",
      service: "Satyanarayan Puja"
    },
    {
      name: "Sunita Devi",
      location: "Pune, Maharashtra",
      rating: 5,
      testimonial: "Very professional and knowledgeable pandits. The Navagraha puja was performed exactly as per scriptures. We felt divine presence throughout the ceremony.",
      service: "Navagraha Puja"
    },
    {
      name: "Vikram Singh",
      location: "Hyderabad, Telangana",
      rating: 5,
      testimonial: "Outstanding service for our family function. The pandit ji explained every step and made sure we understood the significance of each ritual. Truly blessed experience!",
      service: "Lakshmi Puja"
    }
  ];

  const stats = [
    { icon: Users, number: "2000+", label: "Happy Families" },
    { icon: Award, number: "15+", label: "Years Experience" },
    { icon: Clock, number: "24/7", label: "Available" },
    { icon: Star, number: "4.9", label: "Average Rating" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroTemple})` }}
        >
          <div className="absolute inset-0 gradient-sacred opacity-75"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-shadow-sacred animate-divine-float">
            Divine Puja Services
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-shadow-sacred">
            Experience the Authenticity and Charm of North Indian Hindi Pandits
          </p>
          <p className="text-lg mb-10 max-w-2xl mx-auto opacity-90">
            Bringing sacred Hindu traditions to your doorstep with deep knowledge of scriptures, 
            authentic rituals, and divine blessings for your family's spiritual journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white hover:text-primary text-lg px-8 py-6 hover-sacred"
              asChild
            >
              <Link to="/services">
                Explore Our Services
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6 hover-sacred"
              asChild
            >
              <Link to="/contact">
                <Phone className="mr-2 h-5 w-5" />
                Book Now: +91 620 647 1543
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 gradient-divine">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-12 h-12 text-primary mx-auto mb-4 animate-sacred-glow" />
                <h3 className="text-3xl font-bold text-primary mb-2">{stat.number}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 gradient-sacred text-white">About Our Services</Badge>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Authentic North Indian Hindu Pandit Services
              </h2>
              <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                As you traverse the bustling streets of modern cities, you'll encounter a treasure trove 
                of temples, ashrams, and cultural centers. These sacred spaces pulsate with the energy 
                of devotion and are adorned with intricate architectural details, inviting you to explore 
                and experience the profound wisdom of ancient traditions.
              </p>
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                The North Indian Hindi Pandits, with their deep knowledge of Hindu scriptures and rituals, 
                are revered for their spiritual guidance and the sacred ceremonies they conduct. Dressed 
                in resplendent traditional attire, their presence exudes an aura of reverence and humility.
              </p>
              <div className="space-y-4">
                {[
                  "15+ Years of Experience in Hindu Rituals",
                  "Authentic Sanskrit Mantras & Vedic Procedures",
                  "Complete Puja Materials & Setup Included",
                  "Available 24/7 for Emergency Ceremonies"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CircleCheck className="w-6 h-6 text-primary" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
              <Button className="mt-8 gradient-sacred hover-sacred" size="lg" asChild>
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </div>
            <div className="relative">
              <img 
                src={panditPuja} 
                alt="Hindu Pandit performing puja" 
                className="rounded-2xl shadow-lg hover-sacred w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-card rounded-xl p-6 shadow-lg border border-primary/20">
                <Flame className="w-8 h-8 text-primary mb-2" />
                <p className="font-semibold text-foreground">Sacred Fire Rituals</p>
                <p className="text-sm text-muted-foreground">Traditional Havan & Homam</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 gradient-divine">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 gradient-sacred text-white">Our Sacred Services</Badge>
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Traditional Hindu Puja Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From life celebrations to spiritual ceremonies, we provide authentic Hindu rituals 
              performed with devotion and precision according to ancient Vedic traditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredServices.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>

          <div className="text-center">
            <Button className="gradient-sacred hover-sacred" size="lg" asChild>
              <Link to="/services">
                <Gift className="mr-2 h-5 w-5" />
                View All Services
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-sacred opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ready to Experience Divine Blessings?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contact us today to book your personalized puja service. Our experienced pandits 
              are available 24/7 to bring sacred rituals to your home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gradient-sacred hover-sacred text-lg px-8 py-6" asChild>
                <Link to="/contact">
                  <Phone className="mr-2 h-5 w-5" />
                  Call +91 620 647 1543
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white text-lg px-8 py-6 hover-sacred"
                asChild
              >
                <Link to="/contact">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Online
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 gradient-divine">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 gradient-sacred text-white">Client Testimonials</Badge>
            <h2 className="text-4xl font-bold text-foreground mb-6">
              What Our Devotees Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the experiences of families who have been blessed by our authentic 
              Hindu puja services across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white hover-sacred" asChild>
              <Link to="/about">View More Testimonials</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;