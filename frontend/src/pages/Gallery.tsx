import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, Eye, Calendar, MapPin } from "lucide-react";
import heroTemple from "@/assets/hero-temple.jpg";
import panditPuja from "@/assets/pandit-puja.jpg";
import weddingCeremony from "@/assets/wedding-ceremony.jpg";
import ganeshPuja from "@/assets/ganesh-puja.jpg";
import omSymbol from "@/assets/om-symbol.jpg";
import pujaGallery from "@/assets/puja-gallery.jpg";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const galleryImages = [
    {
      id: 1,
      src: heroTemple,
      title: "Sacred Temple Architecture",
      category: "Temples",
      description: "Beautiful Hindu temple with golden domes and traditional architecture",
      location: "Bangalore, Karnataka",
      date: "2024-01-15"
    },
    {
      id: 2,
      src: panditPuja,
      title: "Traditional Puja Ceremony",
      category: "Ceremonies",
      description: "Experienced pandit performing authentic Hindu rituals with devotion",
      location: "Mumbai, Maharashtra",
      date: "2024-01-20"
    },
    {
      id: 3,
      src: weddingCeremony,
      title: "Sacred Wedding Ritual",
      category: "Weddings",
      description: "Traditional Hindu wedding ceremony with sacred fire and Vedic rituals",
      location: "Delhi, India",
      date: "2024-02-10"
    },
    {
      id: 4,
      src: ganeshPuja,
      title: "Ganesh Chaturthi Celebration",
      category: "Festivals",
      description: "Devotees celebrating Ganesh Chaturthi with traditional decorations",
      location: "Pune, Maharashtra",
      date: "2024-02-15"
    },
    {
      id: 5,
      src: omSymbol,
      title: "Sacred Om Symbol",
      category: "Symbols",
      description: "Golden Om symbol with lotus petals in spiritual mandala design",
      location: "Varanasi, Uttar Pradesh",
      date: "2024-02-20"
    },
    {
      id: 6,
      src: pujaGallery,
      title: "Puja Room Setup",
      category: "Ceremonies",
      description: "Traditional puja room setup with all sacred items and decorations",
      location: "Hyderabad, Telangana",
      date: "2024-03-01"
    },
    {
      id: 7,
      src: heroTemple,
      title: "Evening Temple Prayers",
      category: "Temples",
      description: "Beautiful temple illuminated during evening aarti ceremony",
      location: "Chennai, Tamil Nadu",
      date: "2024-03-05"
    },
    {
      id: 8,
      src: weddingCeremony,
      title: "Griha Pravesh Ceremony",
      category: "Ceremonies",
      description: "Family performing Griha Pravesh puja for their new home blessing",
      location: "Kolkata, West Bengal",
      date: "2024-03-10"
    },
    {
      id: 9,
      src: ganeshPuja,
      title: "Festival Celebrations",
      category: "Festivals",
      description: "Community gathering for traditional festival celebrations",
      location: "Ahmedabad, Gujarat",
      date: "2024-03-15"
    }
  ];

  const categories = ["All", ...new Set(galleryImages.map(img => img.category))];

  const filteredImages = selectedCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <div className="min-h-screen py-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={pujaGallery} 
            alt="Traditional Puja Gallery" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 gradient-divine"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <Badge className="mb-4 gradient-sacred text-white">Our Gallery</Badge>
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Sacred Moments Captured
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Explore our collection of beautiful moments from Hindu ceremonies, festivals, 
              and spiritual celebrations. Each image tells a story of devotion, tradition, and divine blessings.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category 
                  ? "gradient-sacred" 
                  : "border-primary text-primary hover:bg-primary hover:text-white"
                }
              >
                {category}
              </Button>
            ))}
          </div>

          <p className="text-center text-muted-foreground mb-8">
            Click on any image to view in full size with details
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredImages.map((image) => (
              <Card 
                key={image.id} 
                className="overflow-hidden hover-sacred border-primary/20 cursor-pointer group"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={image.src} 
                    alt={image.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-semibold text-lg mb-2">{image.title}</h3>
                      <div className="flex items-center justify-between text-white/80 text-sm">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {image.location}
                        </div>
                        <Eye className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                  <Badge className="absolute top-4 right-4 gradient-sacred text-white">
                    {image.category}
                  </Badge>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{image.title}</h3>
                  <p className="text-muted-foreground mb-3">{image.description}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {image.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(image.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </Card>
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
        </div>
      </section>

      {/* Image Preview Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-hidden p-0">
          {selectedImage && (
            <>
              <DialogHeader className="p-6 pb-0">
                <div className="flex items-center justify-between">
                  <div>
                    <DialogTitle className="text-2xl font-bold text-foreground mb-2">
                      {selectedImage.title}
                    </DialogTitle>
                    <Badge className="gradient-sacred text-white">
                      {selectedImage.category}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedImage(null)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </DialogHeader>
              
              <div className="px-6">
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.title}
                  className="w-full max-h-[60vh] object-contain rounded-lg"
                />
                
                <div className="py-6">
                  <p className="text-muted-foreground mb-4 text-lg">
                    {selectedImage.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground border-t border-border pt-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{selectedImage.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{new Date(selectedImage.date).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Call to Action */}
      <section className="py-20 gradient-divine">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Want to Be Part of Our Gallery?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Book your puja ceremony with us and create beautiful sacred moments 
              for your family. Every ceremony is a divine celebration worth capturing.
            </p>
            <Button className="gradient-sacred hover-sacred" size="lg">
              Book Your Ceremony
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;