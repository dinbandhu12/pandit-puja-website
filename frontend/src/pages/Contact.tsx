import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle,
  Calendar,
  User,
  Home,
  Heart
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import omSymbol from "@/assets/om-symbol.jpg";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    location: "",
    message: ""
  });

  const services = [
    "Griha Pravesh Puja",
    "Marriage Ceremony",
    "Ganapathi Puja",
    "Satyanarayan Puja",
    "Rudrabhishek Puja",
    "Navagraha Puja",
    "Lakshmi Puja",
    "Akhand Ramayan Path",
    "Shradh Puja",
    "Other - Please specify in message"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Form Submitted Successfully!",
      description: "Thank you for contacting us. We'll get back to you within 2 hours.",
      duration: 5000,
    });
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      date: "",
      location: "",
      message: ""
    });
  };

  const quickActions = [
    {
      icon: Phone,
      title: "Call Directly",
      description: "Immediate assistance available",
      action: "Call +91 620 647 1543",
      variant: "primary"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Chat",
      description: "Quick responses on WhatsApp",
      action: "Message Now",
      variant: "secondary"
    },
    {
      icon: Calendar,
      title: "Book Consultation",
      description: "Free spiritual consultation",
      action: "Schedule Meeting",
      variant: "outline"
    }
  ];

  return (
    <div className="min-h-screen py-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={omSymbol} 
            alt="Om Symbol - Divine Connection" 
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 gradient-divine"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 gradient-sacred text-white">Contact Us</Badge>
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Connect with Divine Blessings
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Ready to invite sacred traditions into your life? Our experienced pandits are available 24/7 
              to guide you through authentic Hindu ceremonies and spiritual practices.
            </p>
          </div>

          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {quickActions.map((action, index) => (
              <Card key={index} className="hover-sacred border-primary/20 text-center">
                <CardContent className="pt-6">
                  <action.icon className="w-12 h-12 text-primary mx-auto mb-4 animate-sacred-glow" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">{action.title}</h3>
                  <p className="text-muted-foreground mb-4">{action.description}</p>
                  <Button 
                    className={action.variant === "primary" ? "gradient-sacred hover-sacred" : 
                               action.variant === "secondary" ? "bg-accent hover:bg-accent/80" : 
                               "border-primary text-primary hover:bg-primary hover:text-white"}
                    variant={action.variant === "outline" ? "outline" : "default"}
                  >
                    {action.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Badge className="mb-4 gradient-sacred text-white">Book Your Ceremony</Badge>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Request Your Sacred Service
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Fill out the form below with your requirements, and our experienced pandits 
                will contact you within 2 hours to discuss your ceremony details.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-foreground font-medium">Full Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="mt-2 border-primary/30 focus:border-primary"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-foreground font-medium">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="mt-2 border-primary/30 focus:border-primary"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-foreground font-medium">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="mt-2 border-primary/30 focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="service" className="text-foreground font-medium">Service Required *</Label>
                    <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                      <SelectTrigger className="mt-2 border-primary/30 focus:border-primary">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="date" className="text-foreground font-medium">Preferred Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                      className="mt-2 border-primary/30 focus:border-primary"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location" className="text-foreground font-medium">Service Location *</Label>
                  <Input
                    id="location"
                    type="text"
                    placeholder="Full address where service is needed"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="mt-2 border-primary/30 focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-foreground font-medium">Additional Details</Label>
                  <Textarea
                    id="message"
                    placeholder="Please share any specific requirements, family traditions, or questions you have..."
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className="mt-2 border-primary/30 focus:border-primary min-h-[120px]"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full gradient-sacred hover-sacred text-lg py-6"
                  size="lg"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Submit Request
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <Badge className="mb-4 gradient-sacred text-white">Get in Touch</Badge>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Contact Information
              </h2>

              <div className="space-y-8">
                {/* Primary Contact */}
                <Card className="border-primary/20 hover-sacred">
                  <CardHeader>
                    <CardTitle className="flex items-center text-primary">
                      <Phone className="w-6 h-6 mr-3" />
                      Direct Phone Line
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-foreground mb-2">+91 620 647 1543</p>
                    <p className="text-muted-foreground">Available 24/7 for immediate assistance</p>
                    <p className="text-sm text-primary mt-2">Best for urgent bookings and consultations</p>
                  </CardContent>
                </Card>

                {/* Email Contact */}
                <Card className="border-primary/20 hover-sacred">
                  <CardHeader>
                    <CardTitle className="flex items-center text-primary">
                      <Mail className="w-6 h-6 mr-3" />
                      Email Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold text-foreground mb-2">info@divinepuja.com</p>
                    <p className="text-muted-foreground">We respond within 2 hours</p>
                    <p className="text-sm text-primary mt-2">Best for detailed ceremony planning</p>
                  </CardContent>
                </Card>

                {/* Service Areas */}
                <Card className="border-primary/20 hover-sacred">
                  <CardHeader>
                    <CardTitle className="flex items-center text-primary">
                      <MapPin className="w-6 h-6 mr-3" />
                      Service Areas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold text-foreground mb-2">Primary: Bangalore, Karnataka</p>
                    <p className="text-muted-foreground mb-3">Serving across South India</p>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>• Chennai, Hyderabad, Pune, Mumbai</p>
                      <p>• Delhi NCR, Kolkata, Ahmedabad</p>
                      <p>• Video consultation available nationwide</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Operating Hours */}
                <Card className="border-primary/20 hover-sacred">
                  <CardHeader>
                    <CardTitle className="flex items-center text-primary">
                      <Clock className="w-6 h-6 mr-3" />
                      Operating Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Monday - Sunday:</span>
                        <span className="font-semibold text-foreground">24/7 Available</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Emergency Services:</span>
                        <span className="font-semibold text-foreground">Anytime</span>
                      </div>
                      <p className="text-sm text-primary mt-2">
                        We understand that spiritual needs don't follow schedules
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Consultation Info */}
                <Card className="gradient-divine border-primary/20">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <img src={omSymbol} alt="Om Symbol" className="w-12 h-12 rounded-full mr-4" />
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Free Consultation</h3>
                        <p className="text-muted-foreground">No obligation spiritual guidance</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Get personalized advice on the best ceremonies for your family's needs, 
                      auspicious timing, and traditional requirements.
                    </p>
                    <Button className="w-full gradient-sacred hover-sacred">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Free Consultation
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 gradient-divine">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 gradient-sacred text-white">Common Questions</Badge>
            <h2 className="text-3xl font-bold text-foreground mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <Card className="border-primary/20 hover-sacred">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-foreground mb-3">How much advance booking is needed?</h3>
                  <p className="text-muted-foreground">
                    We recommend booking at least 7 days in advance for regular ceremonies. 
                    For weddings and major festivals, 2-3 weeks is ideal. Emergency services available 24/7.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-primary/20 hover-sacred">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-foreground mb-3">What's included in the service?</h3>
                  <p className="text-muted-foreground">
                    Complete puja materials, traditional setup, Sanskrit mantras, 
                    ceremony guidance, and blessed prasadam. Travel costs included within city limits.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-primary/20 hover-sacred">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-foreground mb-3">Do you provide services in different languages?</h3>
                  <p className="text-muted-foreground">
                    Yes! Our pandits are fluent in Hindi, Sanskrit, English, and regional languages 
                    including Tamil, Telugu, Kannada, and Bengali.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-primary/20 hover-sacred">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-foreground mb-3">Can you customize ceremonies for family traditions?</h3>
                  <p className="text-muted-foreground">
                    Absolutely! We respect and incorporate your family's specific traditions 
                    while maintaining authentic Vedic procedures. Each ceremony is personalized.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;