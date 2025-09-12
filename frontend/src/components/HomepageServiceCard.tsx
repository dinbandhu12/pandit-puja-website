import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LucideIcon, Clock, Users, Globe, MapPin } from "lucide-react";

interface HomepageServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  duration: string;
  features: string[];
  image?: string;
}

const HomepageServiceCard = ({ 
  title, 
  description, 
  icon: Icon, 
  duration, 
  features,
  image 
}: HomepageServiceCardProps) => {
  // Determine service type for better styling
  const isOnline = title.toLowerCase().includes('online');
  const isOffline = title.toLowerCase().includes('offline');
  const isConsultation = title.toLowerCase().includes('consultation');

  return (
    <Card className="border-primary/30 bg-white shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Enhanced Header with Service Type Badge */}
      <CardHeader className="relative pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl text-sacred font-bold group-hover:text-primary transition-colors">
                {title}
              </CardTitle>
              <div className="flex items-center mt-1 space-x-4 text-sm">
                <div className="flex items-center text-gray-600 font-medium">
                  <Clock className="w-4 h-4 mr-1" />
                  {duration}
                </div>
                {isOnline && (
                  <div className="flex items-center text-green-700 font-semibold">
                    <Globe className="w-4 h-4 mr-1" />
                    Online
                  </div>
                )}
                {isOffline && (
                  <div className="flex items-center text-blue-700 font-semibold">
                    <MapPin className="w-4 h-4 mr-1" />
                    In-Person
                  </div>
                )}
                {isConsultation && (
                  <div className="flex items-center text-purple-700 font-semibold">
                    <Users className="w-4 h-4 mr-1" />
                    Consultation
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      {/* Enhanced Content */}
      <CardContent className="space-y-5">
        {/* Description */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/10 p-4 rounded-lg border border-primary/10">
          <p className="text-gray-700 leading-relaxed font-medium">
            {description}
          </p>
        </div>

        {/* Features with Enhanced Styling */}
        <div className="space-y-3">
          <h4 className="font-bold text-sacred flex items-center text-lg">
            <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
            What's Included:
          </h4>
          <div className="grid gap-2">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center p-3 bg-gradient-to-r from-primary/8 to-accent/12 rounded-md hover:from-primary/15 hover:to-accent/20 transition-all duration-200 border border-primary/10">
                <div className="w-2 h-2 rounded-full bg-primary mr-3 flex-shrink-0"></div>
                <span className="text-sm text-gray-800 font-semibold">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Service Type Indicator */}
        <div className="pt-3 border-t border-gray-200">
          <div className="flex items-center justify-center">
            {isOnline && (
              <div className="flex items-center px-4 py-2 bg-green-200 text-green-800 rounded-full text-sm font-bold border border-green-300">
                <Globe className="w-4 h-4 mr-2" />
                Digital Service
              </div>
            )}
            {isOffline && (
              <div className="flex items-center px-4 py-2 bg-blue-200 text-blue-800 rounded-full text-sm font-bold border border-blue-300">
                <MapPin className="w-4 h-4 mr-2" />
                Physical Service
              </div>
            )}
            {isConsultation && (
              <div className="flex items-center px-4 py-2 bg-purple-200 text-purple-800 rounded-full text-sm font-bold border border-purple-300">
                <Users className="w-4 h-4 mr-2" />
                Guidance Service
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HomepageServiceCard;
