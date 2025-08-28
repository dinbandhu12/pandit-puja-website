import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import heroTemple from "@/assets/hero-temple.jpg";
import panditPuja from "@/assets/pandit-puja.jpg";
import weddingCeremony from "@/assets/wedding-ceremony.jpg";
import ganeshPuja from "@/assets/ganesh-puja.jpg";
import omSymbol from "@/assets/om-symbol.jpg";
import pujaGallery from "@/assets/puja-gallery.jpg";

const Gallery = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const galleryImages = [
    {
      id: 1,
      src: "/images/Img_01.jpeg",
      category: "Puja"
    },
    {
      id: 2,
      src: "/images/Img_02.jpeg",
      category: "Puja"
    },
    {
      id: 3,
      src: "/images/Img_03.jpeg",
      category: "Puja"
    },
    {
      id: 4,
      src: "/images/Img_04.jpeg",
      category: "Puja"
    },
    {
      id: 5,
      src: "/images/Img_05.jpeg",
      category: "Puja"
    },
    {
      id: 6,
      src: "/images/Img_06.jpeg",
      category: "Puja"
    },
    {
      id: 7,
      src: "/images/Satyanarayan_pooja.jpeg",
      category: "Puja"
    },
    {
      id: 8,
      src: "/images/Grahpravesh.jpeg",
      category: "Puja"
    },
    {
      id: 9,
      src: "/images/Grah-pooja.jpeg",
      category: "Puja"
    },
    {
      id: 10,
      src: "/images/Navgrah_pooja.jpeg",
      category: "Puja"
    },
    {
      id: 11,
      src: "/images/rudraabhishek.jpeg",
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
            Click on any image to view in full size
          </p>
        </div>
      </section>

      {/* Simple Gallery Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image, index) => (
              <div 
                key={image.id} 
                className="relative group cursor-pointer overflow-hidden rounded-lg"
                onClick={() => openImage(index)}
              >
                <img 
                  src={image.src} 
                  alt={image.category}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <Badge className="absolute top-2 right-2 gradient-sacred text-white text-xs">
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
                  className="h-12 w-12 p-0 bg-white/20 hover:bg-white/30 text-white rounded-full"
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
                  className="absolute left-8 top-1/2 transform -translate-y-1/2 h-14 w-14 p-0 bg-white/20 hover:bg-white/30 text-white rounded-full z-10"
                >
                  <ChevronLeft className="h-7 w-7" />
                </Button>
              )}

              {selectedImageIndex < filteredImages.length - 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextImage}
                  className="absolute right-8 top-1/2 transform -translate-y-1/2 h-14 w-14 p-0 bg-white/20 hover:bg-white/30 text-white rounded-full z-10"
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