import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Helmet } from "react-helmet-async";
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
import { initiatePhoneCall } from "@/utils/phoneUtils";
import { openWhatsAppChat, openWhatsAppConsultation } from "@/utils/whatsappUtils";

const Contact = () => {
  const { toast } = useToast();

  const quickActions = [
    {
      icon: Phone,
      title: "Call Directly",
      description: "Immediate assistance available",
      action: "Call +91 8105107271",
      variant: "primary",
      onClick: () => initiatePhoneCall("+91 8105107271")
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Chat",
      description: "Quick responses on WhatsApp",
      action: "Message Now",
      variant: "primary",
      // variant: "secondary",
      onClick: () => openWhatsAppChat("+91 8105107271")
    },
    {
      icon: Calendar,
      title: "Book Consultation",
      description: "Free spiritual consultation",
      action: "Schedule Meeting",
      variant: "outline",
      onClick: () => openWhatsAppConsultation("+91 8105107271")
    }
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Contact Us - Book Hindu Puja Services | Call +91 8105107271</title>
        <meta name="description" content="Contact Vedokta Pooja Services for authentic Hindu puja ceremonies. Call +91 8105107271 or WhatsApp for immediate assistance. Available 24/7 in Bangalore and worldwide online." />
        <meta name="keywords" content="contact pandit, book puja services, Hindu priest contact, Bangalore pandit, WhatsApp consultation, phone booking, online puja booking" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://your-domain.com/contact" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Contact Us - Book Hindu Puja Services | Call +91 8105107271" />
        <meta property="og:description" content="Contact Vedokta Pooja Services for authentic Hindu puja ceremonies. Available 24/7 in Bangalore and worldwide online." />
        <meta property="og:url" content="https://your-domain.com/contact" />
        <meta property="og:image" content="https://your-domain.com/images/contact-bg.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us - Book Hindu Puja Services" />
        <meta name="twitter:description" content="Contact Vedokta Pooja Services for authentic Hindu puja ceremonies. Available 24/7 in Bangalore and worldwide online." />
        <meta name="twitter:image" content="https://your-domain.com/images/contact-bg.jpg" />
        
        {/* Structured Data - FAQ */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How much advance booking is needed?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We recommend booking at least 7 days in advance for regular ceremonies. For weddings and major festivals, 2-3 weeks is ideal. Emergency services available 24/7."
                }
              },
              {
                "@type": "Question",
                "name": "What's included in the service?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Complete puja materials, traditional setup, Sanskrit mantras, ceremony guidance, and blessed prasadam. Travel costs included within city limits."
                }
              },
              {
                "@type": "Question",
                "name": "Do you provide services in different languages?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! Our pandits are fluent in Hindi, Sanskrit, English, and regional languages including Tamil, Telugu, Kannada, and Bengali."
                }
              },
              {
                "@type": "Question",
                "name": "Can you customize ceremonies for family traditions?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely! We respect and incorporate your family's specific traditions while maintaining authentic Vedic procedures. Each ceremony is personalized."
                }
              },
              {
                "@type": "Question",
                "name": "How do online puja services work for families abroad?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our online pujas are conducted live via video calls, guiding you through every step. We provide detailed instructions, send blessed materials, and ensure you feel connected to the divine from anywhere in the world."
                }
              },
              {
                "@type": "Question",
                "name": "What time zones do you accommodate for international clients?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We offer flexible scheduling to accommodate different time zones worldwide. Whether you're in the US, UK, Canada, Australia, or anywhere else, we'll find a suitable time for your sacred ceremony."
                }
              }
            ]
          })}
        </script>
      </Helmet>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-8 md:py-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/images/contact-bg.jpg')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-sacred/85 via-sacred/75 to-sacred/90"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto w-full">
          <div className="mb-4 md:mb-6">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm">
              Contact Us
            </Badge>
          </div>
          <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent">
            Connect with Divine Blessings Worldwide
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 text-white/95 font-medium px-2">
          Connecting families worldwide with genuine Hindu traditions. Our skilled pandits are available 24/7 to perform sacred ceremonies online and offline, whether you are in India or abroad.
          </p>

          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            {quickActions.map((action, index) => (
              <Card key={index} className="hover-sacred border-primary/20 text-center bg-white/95 backdrop-blur-sm">
                <CardContent className="pt-4 md:pt-6 p-4">
                  <action.icon className="w-10 h-10 md:w-12 md:h-12 text-primary mx-auto mb-3 md:mb-4 animate-sacred-glow" />
                  <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">{action.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4">{action.description}</p>
                  <Button 
                    size="sm"
                    className={action.variant === "primary" ? "gradient-sacred-btn hover-sacred" : 
                               action.variant === "secondary" ? "bg-accent hover:bg-accent/80" : 
                               "border-primary text-primary hover:border-om hover:gradient-sacred-btn hover-sacred"}
                    variant={action.variant === "outline" ? "outline" : "default"}
                    onClick={action.onClick}
                  >
                    {action.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 gradient-sacred text-white">Get in Touch</Badge>
            <h2 className="text-3xl font-bold text-sacred mb-6">
              Contact Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Primary Contact */}
              <Card className="border-primary/20 hover-sacred">
                <CardHeader>
                  <CardTitle className="flex items-center text-primary">
                    <Phone className="w-6 h-6 mr-3" />
                    Direct Phone Line
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p 
                    className="text-2xl font-bold text-foreground mb-2 cursor-pointer hover:text-primary transition-colors"
                    onClick={() => initiatePhoneCall("+91 8105107271")}
                    title="Click to call +91 8105107271"
                  >
                    +91 8105107271
                  </p>
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
                  <p className="text-lg font-semibold text-foreground mb-2">sharmakabhay25@gmail.com</p>
                  <p className="text-muted-foreground">We respond within 24 hours</p>
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
                  <p className="text-muted-foreground mb-3">Online services available worldwide</p>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>• Chennai, Hyderabad, Pune, Mumbai</p>
                    <p>• Delhi NCR, Kolkata, Ahmedabad</p>
                    <p>• Online consultation available worldwide</p>
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
            </div>

            {/* Consultation Info - Full Width */}
            <Card className="gradient-divine border-primary/20 mt-8">
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
                <Button 
                  className="w-full gradient-sacred-btn hover-sacred"
                  onClick={() => openWhatsAppConsultation("+91 8105107271")}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Free Consultation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <Badge className="mb-4 gradient-sacred text-white">Common Questions</Badge>
            <h2 className="text-3xl font-bold text-sacred mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
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
              
              <Card className="border-primary/20 hover-sacred">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-foreground mb-3">How do online puja services work for families abroad?</h3>
                  <p className="text-muted-foreground">
                    Our online pujas are conducted live via video calls, guiding you through every step. 
                    We provide detailed instructions, send blessed materials, and ensure you feel connected 
                    to the divine from anywhere in the world.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-primary/20 hover-sacred">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-foreground mb-3">What time zones do you accommodate for international clients?</h3>
                  <p className="text-muted-foreground">
                    We offer flexible scheduling to accommodate different time zones worldwide. 
                    Whether you're in the US, UK, Canada, Australia, or anywhere else, we'll find 
                    a suitable time for your sacred ceremony.
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