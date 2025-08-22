import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Calendar, 
  Tag, 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Copy, 
  Link as LinkIcon,
  Eye,
  Heart,
  MessageCircle,
  Bookmark
} from "lucide-react";
import { toast } from "sonner";
import { BlogPost } from '@/services/api';

const BlogPostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    if (id) {
      fetchPost(parseInt(id));
    }
  }, [id]);

  const fetchPost = async (postId: number) => {
    try {
      const response = await fetch(`http://localhost:3001/api/posts/${postId}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data);
      } else {
        toast.error('Post not found');
        navigate('/blog');
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      toast.error('Failed to load post');
      navigate('/blog');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = (platform: string) => {
    if (!post) return;

    const url = window.location.href;
    const title = post.title;
    const text = post.subtitle || post.title;

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard!');
        break;
      default:
        break;
    }
    setShowShareMenu(false);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    toast.success(isLiked ? 'Removed from likes' : 'Added to likes');
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
  };

  const renderContent = (content: string) => {
    // Simple HTML rendering - in production you'd use a proper HTML sanitizer
    return { __html: content };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen py-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
          <Button onClick={() => navigate('/blog')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Featured Image */}
      <div className="relative">
        {/* Featured Image Background */}
        {post.featured_image ? (
          <div className="relative h-[70vh] min-h-[500px] bg-gray-900">
            <img 
              src={post.featured_image} 
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
          </div>
        ) : (
          <div className="relative h-[50vh] min-h-[400px] bg-gradient-to-r from-orange-600 via-red-600 to-pink-600">
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        )}

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-between text-white">
          {/* Back Button */}
          <div className="container mx-auto px-4 pt-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/blog')}
              className="text-white hover:bg-white/20 backdrop-blur-sm bg-black/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </div>

          {/* Post Header */}
          <div className="container mx-auto px-4 pb-16">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
                {post.title}
              </h1>
              {post.subtitle && (
                <p className="text-xl md:text-2xl text-gray-100 mb-8 leading-relaxed drop-shadow-md">
                  {post.subtitle}
                </p>
              )}
              
              {/* Meta Info */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-gray-200 backdrop-blur-sm bg-black/20 rounded-full px-6 py-3 inline-flex">
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {formatDate(post.created_at)}
                </span>
                <span className="flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  {Math.floor(Math.random() * 1000) + 100} reads
                </span>
                <span className="flex items-center">
                  <Heart className="w-4 h-4 mr-2" />
                  {Math.floor(Math.random() * 100) + 20} likes
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Article */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Tags */}
          {post.tags && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.split(',').map((tag, index) => (
                tag.trim() && (
                  <Badge key={index} className="bg-orange-100 text-orange-800 hover:bg-orange-200 px-3 py-1">
                    {tag.trim()}
                  </Badge>
                )
              ))}
            </div>
          )}

          {/* Content */}
          <article className="prose prose-xl max-w-none">
            <div 
              className="text-gray-700 leading-relaxed text-lg"
              style={{
                fontFamily: 'Georgia, serif',
                lineHeight: '1.8'
              }}
              dangerouslySetInnerHTML={renderContent(post.content)}
            />
          </article>

          {/* Simple Share Buttons */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-gray-600 font-medium">Share this article:</p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleShare('facebook')}
                  className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                  title="Share on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="w-8 h-8 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
                  title="Share on Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors"
                  title="Share on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('copy')}
                  className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                  title="Copy Link"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* External Links */}
          {post.links && (
            <div className="mt-12 p-6 bg-orange-50 rounded-lg border-l-4 border-orange-500">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <LinkIcon className="w-5 h-5 mr-2 text-orange-600" />
                Related Resources
              </h3>
              <div className="space-y-2">
                {post.links.split(',').map((link, index) => (
                  link.trim() && (
                    <a
                      key={index}
                      href={link.trim()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-orange-600 hover:text-orange-800 transition-colors underline"
                    >
                      {link.trim()}
                    </a>
                  )
                ))}
              </div>
            </div>
          )}

          {/* Author/Call to Action */}
          <div className="mt-16 p-8 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">🙏 Thank you for reading!</h3>
              <p className="text-gray-600 mb-6 text-lg">
                We hope this spiritual guidance brings peace and wisdom to your life. 
                Share it with others who might benefit from these teachings.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate('/blog')}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Read More Articles
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigator.clipboard.writeText(window.location.href).then(() => toast.success('Link copied!'))}
                  className="border-orange-300 text-orange-700 hover:bg-orange-50 px-6 py-3"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share This Wisdom
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetail;

