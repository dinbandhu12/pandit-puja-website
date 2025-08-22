import { Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface TestimonialCardProps {
  name: string;
  location: string;
  rating: number;
  testimonial: string;
  service: string;
}

const TestimonialCard = ({ name, location, rating, testimonial, service }: TestimonialCardProps) => {
  return (
    <Card className="hover-sacred border-primary/20 bg-card/50 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-center space-x-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating ? "text-accent fill-accent" : "text-muted-foreground"
              }`}
            />
          ))}
        </div>
        <blockquote className="text-foreground mb-4 italic">
          "{testimonial}"
        </blockquote>
        <div className="border-t border-border pt-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-primary">{name}</p>
              <p className="text-sm text-muted-foreground">{location}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-accent font-medium uppercase tracking-wide">
                {service}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;