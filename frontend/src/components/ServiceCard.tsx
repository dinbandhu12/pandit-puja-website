import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  price: string;
  duration: string;
  features: string[];
  image?: string;
}

const ServiceCard = ({ 
  title, 
  description, 
  icon: Icon, 
  price, 
  duration, 
  features,
  image 
}: ServiceCardProps) => {
  return (
    <Card className="hover-sacred border-primary/20 bg-card/80 backdrop-blur-sm overflow-hidden group">
      {image && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 gradient-sacred opacity-20"></div>
        </div>
      )}
      <CardHeader className="relative">
        <div className="flex items-center justify-between">
          <Icon className="w-10 h-10 text-primary animate-sacred-glow" />
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">{price}</p>
            <p className="text-sm text-muted-foreground">{duration}</p>
          </div>
        </div>
        <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          {description}
        </p>
        <div className="space-y-2">
          <h4 className="font-semibold text-primary">Includes:</h4>
          <ul className="space-y-1">
            {features.map((feature, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-center">
                <span className="w-2 h-2 rounded-full bg-accent mr-2"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <Button className="w-full gradient-sacred hover-sacred">
          Book This Puja
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;