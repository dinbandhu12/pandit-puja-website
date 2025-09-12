import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import TestimonialCard from "@/components/TestimonialCard";
import HomepageServiceCard from "@/components/HomepageServiceCard";
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
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
  Eye
} from "lucide-react";
import { Link } from "react-router-dom";
import heroTemple from "@/assets/hero-temple.jpg";
import panditPuja from "@/assets/pandit-puja.jpg";
import weddingCeremony from "@/assets/wedding-ceremony.jpg";
import ganeshPuja from "@/assets/ganesh-puja.jpg";
import omSymbol from "@/assets/om-symbol.jpg";
import pujaGallery from "@/assets/puja-gallery.jpg";
import { initiatePhoneCall } from "@/utils/phoneUtils";

const Index = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const galleryImages = [
    {
      id: 1,
      src: "/images/Img_01.webp",
      category: "Puja"
    },
    {
      id: 2,
      src: "/images/Img_02.webp",
      category: "Puja"
    },
    {
      id: 3,
      src: "/images/Img_03.webp",
      category: "Puja"
    },
    {
      id: 4,
      src: "/images/Img_04.webp",
      category: "Puja"
    },
    {
      id: 5,
      src: "/images/Img_05.webp",
      category: "Puja"
    },
    {
      id: 6,
      src: "/images/Img_06.webp",
      category: "Puja"
    },
    {
      id: 7,
      src: "/images/Satyanarayan_pooja.webp",
      category: "Puja"
    },
    {
      id: 8,
      src: "/images/Grahpravesh.webp",
      category: "Puja"
    },
    {
      id: 9,
      src: "/images/Grah-pooja.webp",
      category: "Puja"
    },
    {
      id: 10,
      src: "/images/Navgrah_pooja.webp",
      category: "Puja"
    },
    {
      id: 11,
      src: "/images/rudraabhishek.webp",
      category: "Puja"
    },
    {
      id: 12,
      src: heroTemple,
      category: "Temples"
    },
    {
      id: 13,
      src: panditPuja,
      category: "Ceremonies"
    },
    {
      id: 14,
      src: weddingCeremony,
      category: "Weddings"
    },
    {
      id: 15,
      src: ganeshPuja,
      category: "Festivals"
    },
    {
      id: 16,
      src: omSymbol,
      category: "Symbols"
    },
    {
      id: 17,
      src: pujaGallery,
      category: "Ceremonies"
    },
    {
      id: 18,
      src: heroTemple,
      category: "Temples"
    },
    {
      id: 19,
      src: weddingCeremony,
      category: "Ceremonies"
    },
    {
      id: 20,
      src: ganeshPuja,
      category: "Festivals"
    }
  ];

  const categories = ["All", ...new Set(galleryImages.map(img => img.category))];

  const filteredImages = selectedCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openImage = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeImage = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex < filteredImages.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const previousImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const featuredServices = [
    {
      title: "Online Pooja Services",
      description: "Performed live and guided through digital platforms, ensuring that families across the globe can connect with the divine from their homes.",
      icon: Home,
      duration: "1-3 hours",
      features: ["Satyanarayan Katha", "Namkaran (Naming Ceremony)", "Ganapati/Ganesh Pooja", "Live digital guidance"],
      image: panditPuja
    },
    {
      title: "Consultation",
      description: "Guidance rooted in tradition and calculation to bring balance and prosperity.",
      icon: Heart,
      duration: "30-60 minutes",
      features: ["Numerology Consultation", "Personal guidance", "Traditional calculations", "Prosperity guidance"],
      image: weddingCeremony
    },
    {
      title: "Offline Pooja Services",
      description: "Performed in person at your home, temple, office, or sacred location.",
      icon: Crown,
      duration: "2-6 hours",
      features: ["Griha Pravesh Pooja", "Vastu Shanti Pooja", "Mahaganapathi Homa", "Wedding Ceremonies"],
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
          <div className="absolute inset-0 bg-gradient-to-br from-sacred/85 via-sacred/75 to-sacred/90"></div>
        </div>
        
        {/* Floating Elements */}
        {/* <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-white/5 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-20 w-12 h-12 bg-white/8 rounded-full animate-pulse delay-2000"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-white/6 rounded-full animate-pulse delay-500"></div>
        </div> */}
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="mb-6">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm">
              ✨ Authentic Vedic Traditions
            </Badge>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent">
            Vedokta Pooja Services
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/95 font-medium">
            Connecting Tradition with Today — Online & Offline Pooja Services
          </p>
          <p className="text-lg mb-10 max-w-2xl mx-auto text-white/90 leading-relaxed">
          Bringing the blessings of tradition into your home, office, or sacred space. <br />
          With a proud family lineage of respected priests and years of dedicated training under senior
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
              onClick={() => initiatePhoneCall("+91 620 647 1543")}
            >
              <Phone className="mr-2 h-5 w-5" />
              Book Now: +91 987 654 3211
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-sacred mb-4">Trusted by Thousands</h2>
            <p className="text-gray-600">Our commitment to authentic Hindu traditions</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-3xl font-bold text-sacred mb-2">{stat.number}</h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white">About Our Services</Badge>
              <h2 className="text-4xl font-bold mb-6 text-sacred">
                Connecting Tradition with Today
                <span className="block text-orange-600 mt-2">Online & Offline Pooja Services</span>
              </h2>
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  Bringing the blessings of tradition into your home, office, or sacred space — wherever you are in the world.
                  With a proud family lineage of respected priests and years of dedicated training under senior
                  Acharyas, I perform authentic Vedic rituals, samskaras, and homas with devotion, clarity, and
                  scriptural precision for families across the globe.
                </p>
                <p>
                  Whether you're in India or abroad, seeking to perform a sacred ceremony at home, inaugurate a new business, 
                  or connect with divinity through online guided pujas, I ensure every ritual is conducted with peace, devotion,
                  and guidance for your family, bridging the distance between tradition and your spiritual needs.
                </p>
              </div>
              <Button className="mt-8 gradient-sacred-btn hover-sacred" size="lg" asChild>
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
      <section className="py-20" style={{backgroundColor: 'hsl(217, 37%, 90%)'}}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 gradient-sacred text-white">Our Sacred Services</Badge>
            <h2 className="text-4xl font-bold text-sacred mb-6">
              Traditional Hindu Puja Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From life celebrations to spiritual ceremonies, we provide authentic Hindu rituals 
              performed with devotion and precision according to ancient Vedic traditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredServices.map((service, index) => (
              <HomepageServiceCard key={index} {...service} />
            ))}
          </div>

          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="gradient-sacred-btn hover-sacred text-lg px-8 py-6"
                onClick={() => initiatePhoneCall("+91 987 654 3211")}
              >
                <Phone className="mr-2 h-5 w-5" />
                Call to Book: +91 987 654 3211
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-primary text-primary hover:border-om hover:gradient-sacred-btn hover:text-white text-lg px-8 py-6 hover-sacred"
                asChild
              >
                <Link to="/services">
                  <Gift className="mr-2 h-5 w-5" />
                  View All Services
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20" style={{backgroundColor: 'hsl(25, 35%, 88%)'}}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 gradient-sacred text-white">Sacred Gallery</Badge>
            <h2 className="text-4xl font-bold text-sacred mb-6">
              Sacred Moments Captured
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our collection of beautiful moments from Hindu ceremonies, festivals, 
              and spiritual celebrations. Each image tells a story of devotion, tradition, and divine blessings.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category 
                  ? "gradient-sacred-btn text-sm px-3 py-1" 
                  : "border-primary text-primary hover:bg-primary hover:text-white hover-sacred text-sm px-3 py-1"
                }
              >
                {category}
              </Button>
            ))}
          </div>

          <p className="text-center text-muted-foreground mb-8">
            Click on any image to view in full size
          </p>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {filteredImages.slice(0, 8).map((image, index) => (
              <div 
                key={image.id} 
                className="relative group cursor-pointer overflow-hidden rounded-lg hover-sacred"
                onClick={() => openImage(index)}
              >
                <img 
                  src={image.src} 
                  alt={image.category}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <Badge className="absolute top-2 right-2 gradient-sacred-btn text-white text-xs">
                  {image.category}
                </Badge>
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                No images found in this category
              </h3>
              <p className="text-muted-foreground">
                Try selecting a different category to view more images.
              </p>
            </div>
          )}

          <div className="text-center">
            <Button 
              className="gradient-sacred-btn hover-sacred" 
              size="lg" 
              onClick={() => initiatePhoneCall("+91 987 654 3211")}
            >
              <Phone className="mr-2 h-5 w-5" />
              Book Your Ceremony
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-blue-300 via-purple-300 to-indigo-300">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-200/40 via-purple-200/40 to-indigo-200/40 opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-sacred mb-6">
              Ready to Experience Vedic Blessings?
            </h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Contact us today to book your personalized puja service. Our experienced pandits 
              are available 24/7 to bring Vedic rituals to your home.
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
                className="border-2 border-temple hover:border-om text-primary hover:gradient-sacred-btn hover:text-white text-lg px-8 py-6 hover-sacred"
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
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 gradient-sacred text-white">Client Testimonials</Badge>
            <h2 className="text-4xl font-bold text-sacred mb-6">
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
            <Button variant="outline" className="border-primary text-primary hover:gradient-sacred-btn hover:text-white hover-sacred" asChild>
              <Link to="/about">View More Testimonials</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Image Preview Modal */}
      <Dialog open={selectedImageIndex !== null} onOpenChange={closeImage}>
        <DialogContent className="max-w-6xl w-full max-h-[95vh] overflow-hidden p-0 bg-black/20 border-0">
          {selectedImageIndex !== null && (
            <>
              {/* Header with close button */}
              <div className="absolute top-6 right-6 z-10">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeImage}
                  className="h-12 w-12 p-0 bg-white/20 hover:bg-white/30 text-white rounded-full hover-sacred"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Navigation buttons */}
              {selectedImageIndex > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={previousImage}
                  className="absolute left-8 top-1/2 transform -translate-y-1/2 h-14 w-14 p-0 bg-white/20 hover:bg-white/30 text-white rounded-full z-10 hover-sacred"
                >
                  <ChevronLeft className="h-7 w-7" />
                </Button>
              )}

              {selectedImageIndex < filteredImages.length - 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextImage}
                  className="absolute right-8 top-1/2 transform -translate-y-1/2 h-14 w-14 p-0 bg-white/20 hover:bg-white/30 text-white rounded-full z-10 hover-sacred"
                >
                  <ChevronRight className="h-7 w-7" />
                </Button>
              )}

              {/* Image */}
              <div className="flex items-center justify-center h-full p-12">
                <img 
                  src={filteredImages[selectedImageIndex].src} 
                  alt={filteredImages[selectedImageIndex].category}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              </div>

              {/* Image counter */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                {selectedImageIndex + 1} of {filteredImages.length}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;