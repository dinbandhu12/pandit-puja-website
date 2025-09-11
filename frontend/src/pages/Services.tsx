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
import { initiatePhoneCall } from "@/utils/phoneUtils";
import { openWhatsAppConsultation } from "@/utils/whatsappUtils";

const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const allServices = [
    {
      title: "Online Pooja Services",
      description: "Performed live and guided through digital platforms, ensuring that families across the globe can connect with the divine from their homes.",
      icon: Home,
      duration: "1-3 hours",
      features: [
        "Satyanarayan Katha",
        "Namkaran (Naming Ceremony)",
        "Ganapati/Ganesh Pooja",
        "Live digital guidance",
        "Interactive sessions",
        "Global accessibility"
      ],
      image: heroTemple,
      category: "Online Services"
    },
    {
      title: "Consultation",
      description: "Guidance rooted in tradition and calculation to bring balance and prosperity.",
      icon: Heart,
      duration: "30-60 minutes",
      features: [
        "Numerology Consultation",
        "Personal guidance",
        "Traditional calculations",
        "Prosperity guidance",
        "Life path analysis",
        "Spiritual counseling"
      ],
      image: omSymbol,
      category: "Consultation"
    },
    {
      title: "Griha Pravesh Pooja",
      description: "Traditional house warming ceremony to bless your new home with prosperity, peace, and positive energy.",
      icon: Crown,
      duration: "2-3 hours",
      features: [
        "Complete puja materials",
        "Vastu Shanti Pooja",
        "Home blessing ritual",
        "Sanskrit mantras",
        "Prasadam included",
        "Family participation"
      ],
      image: spiritualBlog,
      category: "Offline Services"
    },
    {
      title: "Mahaganapathi Homa / Havan",
      description: "Sacred fire ritual dedicated to Lord Ganesha for obstacle removal and new beginnings.",
      icon: Star,
      duration: "2-4 hours",
      features: [
        "Sacred fire ceremony",
        "Ganesha mantras",
        "Havan materials",
        "Blessings for success",
        "Obstacle removal",
        "Prosperity enhancement"
      ],
      image: panditPuja,
      category: "Offline Services"
    },
    {
      title: "Rudrabhishek",
      description: "Powerful Lord Shiva worship ceremony for health, peace, and spiritual upliftment.",
      icon: Flame,
      duration: "2-4 hours",
      features: [
        "Shiva Linga abhishek",
        "Rudram chanting",
        "Sacred water offerings",
        "Health blessings",
        "Spiritual purification",
        "Peace and harmony"
      ],
      image: weddingCeremony,
      category: "Offline Services"
    },
    {
      title: "Griha Shanti Havan",
      description: "Sacred fire ceremony for peace, prosperity, and harmony in your home and family.",
      icon: Sun,
      duration: "2-3 hours",
      features: [
        "Peace rituals",
        "Family harmony",
        "Sacred fire ceremony",
        "Vedic mantras",
        "Prosperity blessings",
        "Home purification"
      ],
      image: ganeshPuja,
      category: "Offline Services"
    },
    {
      title: "Mahamrityunjay Homa / Havan",
      description: "Powerful fire ceremony for health, longevity, and protection from untimely death.",
      icon: Gift,
      duration: "2-3 hours",
      features: [
        "Health and longevity",
        "Protection rituals",
        "Sacred fire ceremony",
        "Mritunjay mantras",
        "Healing blessings",
        "Life protection"
      ],
      image: pujaGallery,
      category: "Offline Services"
    },
    {
      title: "Office / Business Pooja",
      description: "Sacred ceremony to bless your business, office, or workplace with prosperity and success.",
      icon: Book,
      duration: "1-2 hours",
      features: [
        "Business prosperity",
        "Success blessings",
        "Office purification",
        "Wealth attraction",
        "Team harmony",
        "Growth enhancement"
      ],
      image: heroTemple,
      category: "Offline Services"
    },
    {
      title: "Bhoomi Pooja",
      description: "Land blessing ceremony performed before construction to ensure prosperity and remove obstacles.",
      icon: Flower,
      duration: "1-2 hours",
      features: [
        "Land purification",
        "Construction blessings",
        "Obstacle removal",
        "Vastu corrections",
        "Prosperity enhancement",
        "Safe construction"
      ],
      image: panditPuja,
      category: "Offline Services"
    },
    {
      title: "Namkaran (Naming Ceremony)",
      description: "Sacred naming ceremony for newborns to bless them with a prosperous and meaningful life.",
      icon: Star,
      duration: "1-2 hours",
      features: [
        "Baby naming ritual",
        "Astrological guidance",
        "Family blessings",
        "Prosperity wishes",
        "Traditional customs",
        "Life path blessings"
      ],
      image: ganeshPuja,
      category: "Offline Services"
    },
    {
      title: "Nakshatra Shanti Pooja",
      description: "Planetary peace ceremony to reduce negative effects of birth stars and enhance positive influences.",
      icon: Sun,
      duration: "2-3 hours",
      features: [
        "Birth star analysis",
        "Planetary peace rituals",
        "Astrological guidance",
        "Harmony restoration",
        "Positive energy enhancement",
        "Life balance"
      ],
      image: heroTemple,
      category: "Offline Services"
    },
    {
      title: "Durga Saptashati / Chandi Paath",
      description: "Powerful recitation of Durga Saptashati for protection, courage, and victory over obstacles.",
      icon: Flame,
      duration: "3-4 hours",
      features: [
        "Durga mantras",
        "Protection rituals",
        "Courage enhancement",
        "Obstacle removal",
        "Victory blessings",
        "Spiritual strength"
      ],
      image: pujaGallery,
      category: "Offline Services"
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
            <h1 className="text-5xl font-bold text-sacred mb-6">
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
              className={searchTerm === "" ? "gradient-sacred-btn" : "border-primary text-primary hover:bg-primary hover:text-white hover-sacred"}
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
                className="mt-4 gradient-sacred-btn hover-sacred"
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
            <h2 className="text-4xl font-bold text-sacred mb-6">
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
            <h2 className="text-4xl font-bold text-sacred mb-6">
              Ready to Book Your Sacred Ceremony?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contact our experienced pandits today for personalized consultation and 
              booking. We're available 24/7 to serve your spiritual needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="gradient-sacred-btn hover-sacred text-lg px-8 py-6"
                                 onClick={() => initiatePhoneCall("+91 987 654 3211")}
              >
                <Phone className="mr-2 h-5 w-5" />
                                 Call +91 987 654 3211
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-primary text-primary hover:border-om hover:gradient-sacred-btn hover:text-white text-lg px-8 py-6 hover-sacred"
                                 onClick={() => openWhatsAppConsultation("+91 987 654 3211")}
              >
                Get Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;