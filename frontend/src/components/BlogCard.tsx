import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { BlogPost } from "@/services/api";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
  className?: string;
  onReadMore?: (post: BlogPost) => void;
}

export const BlogCard = ({ post, featured = false, className, onReadMore }: BlogCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  };

  const getTags = (tagsString?: string) => {
    if (!tagsString) return [];
    return tagsString.split(',').map(tag => tag.trim()).slice(0, 3);
  };

  const getAuthorInitials = (title: string) => {
    return title.split(' ').map(word => word[0]).join('').slice(0, 2);
  };

  if (featured) {
    return (
      <Card className={cn("overflow-hidden hover-sacred border-primary/20 lg:flex", className)}>
        <div className="lg:w-1/2">
          {post.featured_image ? (
            <div className="w-full h-64 lg:h-full relative overflow-hidden">
              <img 
                src={post.featured_image} 
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          ) : (
            <div className="w-full h-64 lg:h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Tag className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-sm">Blog Post</p>
              </div>
            </div>
          )}
        </div>
        <div className="lg:w-1/2 p-8">
          <div className="mb-4">
            <Badge className="bg-primary/10 text-primary">
              Blog Post
            </Badge>
          </div>
          <h3 className="text-3xl font-bold text-foreground mb-4 line-clamp-2">
            {post.title}
          </h3>
          {post.subtitle && (
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed line-clamp-3">
              {post.subtitle}
            </p>
          )}
          
          <div className="flex items-center space-x-6 mb-6 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {formatDate(post.created_at)}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {getReadTime(post.content)}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {getAuthorInitials(post.title)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-foreground">Author</p>
                <p className="text-sm text-muted-foreground">Blog Writer</p>
              </div>
            </div>
            <Button 
              className="gradient-sacred hover-sacred"
              onClick={() => onReadMore?.(post)}
            >
              Read More
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn("overflow-hidden hover-sacred border-primary/20 group", className)}>
      <div className="relative overflow-hidden">
        {post.featured_image ? (
          <div className="w-full h-48 relative overflow-hidden">
            <img 
              src={post.featured_image} 
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Tag className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-xs">Blog Post</p>
            </div>
          </div>
        )}
        <Badge className="absolute top-4 right-4 gradient-sacred text-white">
          Blog Post
        </Badge>
      </div>
      
      <CardHeader>
        <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {post.subtitle && (
          <p className="text-muted-foreground mb-4 line-clamp-3">
            {post.subtitle}
          </p>
        )}
        
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            {formatDate(post.created_at)}
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            {getReadTime(post.content)}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="text-xs bg-primary/10 text-primary">
                {getAuthorInitials(post.title)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-foreground">Author</p>
            </div>
          </div>
          <Button 
            size="sm" 
            variant="ghost" 
            className="text-primary hover:text-primary hover:bg-primary/10"
            onClick={() => onReadMore?.(post)}
          >
            Read More
            <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        </div>

        {post.tags && (
          <div className="flex flex-wrap gap-1 mt-4">
            {getTags(post.tags).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

