import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import TestimonialCard from "@/components/TestimonialCard";
import { 
  Award, 
  BookOpen, 
  Heart, 
  Users, 
  Clock, 
  Star,
  GraduationCap,
  Globe,
  Shield,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import panditPuja from "@/assets/pandit-puja.jpg";
import omSymbol from "@/assets/om-symbol.jpg";

const About = () => {
  const achievements = [
    { icon: Users, number: "2000+", label: "Families Served" },
    { icon: Award, number: "15+", label: "Years Experience" },
    { icon: Star, number: "4.9/5", label: "Customer Rating" },
    { icon: Globe, number: "25+", label: "Cities Covered" }
  ];

  const values = [
    {
      icon: BookOpen,
      title: "Authentic Scriptures",
      description: "We follow traditional Vedic scriptures and mantras passed down through generations of learned pandits."
    },
    {
      icon: Heart,
      title: "Devotional Service",
      description: "Every ceremony is performed with complete devotion and respect for the sacred traditions."
    },
    {
      icon: Shield,
      title: "Trust & Reliability",
      description: "15+ years of trusted service with thousands of satisfied families across India."
    },
    {
      icon: GraduationCap,
      title: "Learned Pandits",
      description: "Our pandits are well-versed in Sanskrit, Vedic traditions, and Hindu religious practices."
    }
  ];

  const allTestimonials = [
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

  return (
    <div className="min-h-screen py-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={omSymbol} 
            alt="Sacred Om Symbol" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 gradient-divine"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-4 gradient-sacred text-white">About Us</Badge>
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Preserving Sacred Traditions
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              With over 15 years of dedicated service, we are committed to preserving and sharing 
              the authentic traditions of Hindu dharma through our experienced North Indian Hindi pandits.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center hover-sacred border-primary/20">
                <CardContent className="pt-6">
                  <achievement.icon className="w-12 h-12 text-primary mx-auto mb-4 animate-sacred-glow" />
                  <h3 className="text-3xl font-bold text-primary mb-2">{achievement.number}</h3>
                  <p className="text-muted-foreground">{achievement.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 gradient-sacred text-white">Our Journey</Badge>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                A Legacy of Sacred Service
              </h2>
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Divine Puja Services was founded with a simple yet profound mission: to make authentic 
                  Hindu religious ceremonies accessible to families across India. Our journey began in 
                  Bangalore over 15 years ago when our founder, Pandit Ramesh Sharma, recognized the need 
                  for traditional North Indian Hindi pandits in South India.
                </p>
                <p>
                  Born and raised in Varanasi, the spiritual capital of India, Pandit Sharma completed 
                  his studies in Sanskrit literature and Vedic scriptures at the prestigious Banaras 
                  Hindu University. His deep understanding of ancient traditions, combined with his 
                  ability to explain complex rituals in simple terms, quickly made him a beloved 
                  figure among devotees.
                </p>
                <p>
                  Today, our team consists of learned pandits who have dedicated their lives to 
                  preserving and practicing Hindu dharma. Each member of our team brings years of 
                  experience and a genuine commitment to serving families with devotion and authenticity.
                </p>
              </div>
              <div className="mt-8 space-y-4">
                {[
                  "Certified pandits from traditional Sanskrit universities",
                  "Deep knowledge of North Indian and South Indian customs",
                  "Fluent in Hindi, Sanskrit, English, and regional languages",
                  "Commitment to authentic Vedic procedures and mantras"
                ].map((point, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                    <span className="text-foreground">{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img 
                src={panditPuja} 
                alt="Traditional Hindu puja ceremony" 
                className="rounded-2xl shadow-lg hover-sacred w-full h-[600px] object-cover"
              />
              <div className="absolute -top-6 -right-6 bg-card rounded-xl p-6 shadow-lg border border-primary/20">
                <img src={omSymbol} alt="Om Symbol" className="w-16 h-16 rounded-full mb-3" />
                <p className="font-semibold text-foreground">Sacred Traditions</p>
                <p className="text-sm text-muted-foreground">Since 2008</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 gradient-divine">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 gradient-sacred text-white">Our Values</Badge>
            <h2 className="text-4xl font-bold text-foreground mb-6">
              What Guides Our Service
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our core values shape every ceremony we perform and every interaction 
              we have with our beloved devotees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="hover-sacred border-primary/20">
                <CardHeader className="text-center">
                  <value.icon className="w-12 h-12 text-primary mx-auto mb-4 animate-sacred-glow" />
                  <CardTitle className="text-xl text-foreground">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Philosophy */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 gradient-sacred text-white">Our Philosophy</Badge>
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Dharma, Devotion, and Service
            </h2>
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                We believe that every Hindu ritual is not just a ceremony, but a sacred bridge 
                connecting the earthly realm with the divine. Our pandits approach each puja 
                with the reverence and dedication it deserves, ensuring that every mantra is 
                chanted with precision and every ritual is performed according to ancient scriptures.
              </p>
              <p>
                In today's fast-paced world, we understand the challenges families face in 
                maintaining traditional practices. That's why we've made it our mission to 
                bring authentic Hindu ceremonies directly to your doorstep, making it easier 
                for you to stay connected with your spiritual roots.
              </p>
              <p>
                Whether it's a joyous celebration like a wedding or Griha Pravesh, or a solemn 
                ceremony like Shradh puja, we ensure that each ritual is conducted with the 
                appropriate spiritual atmosphere and traditional authenticity that your family deserves.
              </p>
            </div>
            <Button className="mt-8 gradient-sacred hover-sacred" size="lg" asChild>
              <Link to="/contact">Connect With Our Team</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 gradient-divine">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 gradient-sacred text-white">Devotee Experiences</Badge>
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Blessed Families Share Their Stories
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Read what families across India have to say about their spiritual 
              journey with our authentic puja services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {allTestimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>

          <div className="text-center">
            <Button className="gradient-sacred hover-sacred" size="lg" asChild>
              <Link to="/services">Explore Our Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;