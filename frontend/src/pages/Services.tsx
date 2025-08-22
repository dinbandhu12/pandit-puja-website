import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ServiceCard from "@/components/ServiceCard";
import { 
  Home, 
  Heart, 
  Crown, 
  Flame, 
  Star, 
  Gift, 
  Book, 
  Sun, 
  Flower,
  Search,
  Clock,
  Phone
} from "lucide-react";
import { Link } from "react-router-dom";
import heroTemple from "@/assets/hero-temple.jpg";
import omSymbol from "@/assets/om-symbol.jpg";
import spiritualBlog from "@/assets/spiritual-blog.jpg";
import pujaGallery from "@/assets/puja-gallery.jpg";
import panditPuja from "@/assets/pandit-puja.jpg";
import weddingCeremony from "@/assets/wedding-ceremony.jpg";
import ganeshPuja from "@/assets/ganesh-puja.jpg";

const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const allServices = [
    {
      title: "Griha Pravesh Puja",
      description: "Traditional house warming ceremony to bless your new home with prosperity, peace, and positive energy according to Vastu principles.",
      icon: Home,
      price: "₹3,500",
      duration: "2-3 hours",
      features: [
        "Complete puja materials included",
        "Authentic Sanskrit mantras",
        "Vastu corrections if needed",
        "Prasadam for family",
        "Home blessing ritual",
        "Ganesh puja for obstacle removal"
      ],
      image: heroTemple,
      category: "Home Ceremonies"
    },
    {
      title: "Marriage Puja (Vivah)",
      description: "Sacred wedding ceremonies performed with authentic Vedic rituals for a blessed and harmonious married life.",
      icon: Heart,
      price: "₹15,000",
      duration: "4-6 hours",
      features: [
        "Complete wedding ceremony",
        "Sacred fire ritual (Hawan)",
        "Saptapadi (Seven vows)",
        "Mangalsutra ceremony",
        "Traditional customs",
        "Family blessing rituals"
      ],
      image: omSymbol,
      category: "Life Events"
    },
    {
      title: "Ganapathi Puja",
      description: "Remove obstacles and invite prosperity with authentic Lord Ganesha worship rituals for new beginnings.",
      icon: Crown,
      price: "₹2,500",
      duration: "1-2 hours",
      features: [
        "Ganesha idol arrangement",
        "21 types of offerings",
        "Modak prasadam",
        "Special Ganesha mantras",
        "Obstacle removal ritual",
        "Success and prosperity blessings"
      ],
      image: spiritualBlog,
      category: "Deity Worship"
    },
    {
      title: "Satyanarayan Puja",
      description: "Monthly spiritual ceremony dedicated to Lord Vishnu for family welfare, prosperity, and divine blessings.",
      icon: Star,
      price: "₹2,000",
      duration: "2-3 hours",
      features: [
        "Complete puja setup",
        "Satyanarayan Katha reading",
        "Panchamrit preparation",
        "Family participation guidance",
        "Blessed prasadam",
        "Monthly puja scheduling"
      ],
      image: panditPuja,
      category: "Regular Worship"
    },
    {
      title: "Rudrabhishek Puja",
      description: "Powerful Lord Shiva worship ceremony for health, peace, and spiritual upliftment with sacred abhishek rituals.",
      icon: Flame,
      price: "₹4,000",
      duration: "2-4 hours",
      features: [
        "Shiva Linga abhishek",
        "Rudram chanting",
        "Sacred water offerings",
        "Bilva leaves arrangement",
        "Health and peace blessings",
        "Spiritual purification"
      ],
      image: weddingCeremony,
      category: "Deity Worship"
    },
    {
      title: "Navagraha Puja",
      description: "Nine planetary worship ceremony to reduce negative planetary effects and enhance positive cosmic influences.",
      icon: Sun,
      price: "₹5,000",
      duration: "3-4 hours",
      features: [
        "Nine planet worship",
        "Specific mantras for each graha",
        "Gemstone recommendations",
        "Astrological guidance",
        "Planetary peace rituals",
        "Cosmic harmony restoration"
      ],
      image: ganeshPuja,
      category: "Astrological"
    },
    {
      title: "Lakshmi Puja",
      description: "Goddess Lakshmi worship for wealth, prosperity, and abundance in business and personal life.",
      icon: Gift,
      price: "₹3,000",
      duration: "2-3 hours",
      features: [
        "Lakshmi idol decoration",
        "Wealth attraction mantras",
        "Gold and silver offerings",
        "Business prosperity rituals",
        "Financial abundance blessings",
        "Prosperity yantra installation"
      ],
      image: pujaGallery,
      category: "Deity Worship"
    },
    {
      title: "Akhand Ramayan Path",
      description: "Continuous reading of Ramayan for spiritual purification, family harmony, and divine protection.",
      icon: Book,
      price: "₹8,000",
      duration: "24-48 hours",
      features: [
        "Non-stop Ramayan recitation",
        "Multiple pandit rotation",
        "Spiritual atmosphere creation",
        "Family karma purification",
        "Divine protection rituals",
        "Complete spiritual cleansing"
      ],
      image: heroTemple,
      category: "Scripture Reading"
    },
    {
      title: "Shradh Puja (Pitru Paksha)",
      description: "Ancestral worship ceremony to honor departed souls and seek their blessings for family welfare.",
      icon: Flower,
      price: "₹3,500",
      duration: "2-3 hours",
      features: [
        "Ancestral offerings",
        "Pitru mantras chanting",
        "Tarpan ceremony",
        "Food offerings to ancestors",
        "Family lineage blessings",
        "Spiritual liberation rituals"
      ],
      image: panditPuja,
      category: "Ancestral Worship"
    }
  ];

  const categories = [...new Set(allServices.map(service => service.category))];

  const filteredServices = allServices.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen py-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={pujaGallery} 
            alt="Traditional Puja Services" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 gradient-divine"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <Badge className="mb-4 gradient-sacred text-white">Our Sacred Services</Badge>
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Traditional Hindu Puja Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              From joyous celebrations to solemn ceremonies, we provide authentic Hindu rituals 
              performed with devotion and precision according to ancient Vedic traditions.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for puja services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg border-primary/30 focus:border-primary"
              />
            </div>
          </div>

          {/* Service Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Button
              variant={searchTerm === "" ? "default" : "outline"}
              onClick={() => setSearchTerm("")}
              className={searchTerm === "" ? "gradient-sacred" : "border-primary text-primary hover:bg-primary hover:text-white"}
            >
              All Services
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                onClick={() => setSearchTerm(category)}
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {filteredServices.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                No services found
              </h3>
              <p className="text-muted-foreground">
                Try searching with different keywords or browse all our services.
              </p>
              <Button 
                onClick={() => setSearchTerm("")}
                className="mt-4 gradient-sacred hover-sacred"
              >
                View All Services
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 gradient-divine">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 gradient-sacred text-white">Why Choose Us</Badge>
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Authentic • Experienced • Devoted
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover-sacred border-primary/20 text-center">
              <CardHeader>
                <Clock className="w-12 h-12 text-primary mx-auto mb-4 animate-sacred-glow" />
                <CardTitle className="text-xl text-foreground">Punctual Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our pandits arrive on time with all necessary materials, ensuring your 
                  ceremony starts and ends as scheduled with complete preparation.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-sacred border-primary/20 text-center">
              <CardHeader>
                <Book className="w-12 h-12 text-primary mx-auto mb-4 animate-sacred-glow" />
                <CardTitle className="text-xl text-foreground">Authentic Rituals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every ceremony follows traditional Vedic procedures with correct Sanskrit 
                  mantras, ensuring spiritual authenticity and divine blessings.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-sacred border-primary/20 text-center">
              <CardHeader>
                <Heart className="w-12 h-12 text-primary mx-auto mb-4 animate-sacred-glow" />
                <CardTitle className="text-xl text-foreground">Complete Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  From initial consultation to ceremony completion, we provide guidance, 
                  explanation, and support to make your spiritual journey meaningful.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Ready to Book Your Sacred Ceremony?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contact our experienced pandits today for personalized consultation and 
              booking. We're available 24/7 to serve your spiritual needs.
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
                <Link to="/contact">Get Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;