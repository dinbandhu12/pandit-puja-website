import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import spiritualBlog from "@/assets/spiritual-blog.jpg";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { BlogCard } from "@/components/BlogCard";
import { LoadingSpinner, BlogCardSkeleton } from "@/components/ui/loading-spinner";
import { BlogPost } from "@/services/api";
import { Settings, FileText, Calendar, Users } from "lucide-react";

const Blog = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("All Posts");
  const { data: posts, isLoading, error } = useBlogPosts();

  const handleReadMore = (post: BlogPost) => {
    navigate(`/blog/${post.id}`);
  };

  const getCategories = () => {
    if (!posts) return [];
    const categories = posts.map(post => {
      // Extract category from tags or use default
      if (post.tags) {
        const firstTag = post.tags.split(',')[0].trim();
        return firstTag.charAt(0).toUpperCase() + firstTag.slice(1);
      }
      return "Blog Post";
    });
    return ["All Posts", ...Array.from(new Set(categories))];
  };

  const getFilteredPosts = () => {
    if (!posts) return [];
    if (selectedCategory === "All Posts") return posts;
    
    return posts.filter(post => {
      if (!post.tags) return false;
      const postCategories = post.tags.split(',').map(tag => tag.trim());
      return postCategories.some(cat => 
        cat.toLowerCase() === selectedCategory.toLowerCase()
      );
    });
  };

  const categories = getCategories();
  const filteredPosts = getFilteredPosts();
  const featuredPost = filteredPosts[0]; // First post as featured
  const regularPosts = filteredPosts.slice(1);

  // Show coming soon message when no posts and not loading
  if (!isLoading && (!posts || posts.length === 0)) {
    return (
      <div className="min-h-screen py-16">
        {/* Hero Section - Same as before */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={spiritualBlog} 
              alt="Spiritual Knowledge and Wisdom" 
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 gradient-divine"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Badge className="gradient-sacred text-white">Spiritual Blog</Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/admin-login')}
                  className="text-white hover:bg-white/20"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Admin
                </Button>
              </div>
              <h1 className="text-5xl font-bold text-foreground mb-6">
                Sacred Wisdom & Insights
              </h1>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Explore the rich traditions of Hindu culture, understand the significance of sacred rituals, 
                and deepen your spiritual knowledge with our collection of authentic articles.
              </p>
            </div>
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-primary/10 rounded-full mb-8">
                <FileText className="w-12 h-12 text-primary" />
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Blog Coming Soon!
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                We're preparing amazing content about Hindu traditions, puja procedures, and spiritual wisdom. 
                Our team of learned pandits is working hard to bring you authentic and insightful articles.
              </p>
              
              {/* Features Preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <FileText className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Sacred Rituals</h3>
                  <p className="text-muted-foreground">
                    Learn about traditional puja procedures and their significance
                  </p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <Calendar className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Festival Wisdom</h3>
                  <p className="text-muted-foreground">
                    Discover the meaning behind Hindu festivals and celebrations
                  </p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Spiritual Guidance</h3>
                  <p className="text-muted-foreground">
                    Insights from our experienced pandits and spiritual leaders
                  </p>
                </div>
              </div>

              {/* Admin Access */}
              <div className="bg-muted/50 rounded-lg p-6 border border-border">
                <h3 className="text-lg font-semibold mb-3">Admin Access</h3>
                <p className="text-muted-foreground mb-4">
                  Are you an admin? Access the dashboard to start creating content.
                </p>
                <Button 
                  onClick={() => navigate('/admin-login')} 
                  className="gradient-sacred hover-sacred"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Admin Dashboard
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <Badge className="mb-4 gradient-sacred text-white">Stay Connected</Badge>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Get Notified When We Launch
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Subscribe to our newsletter to be the first to know when our blog goes live with 
                weekly articles on Hindu traditions and spiritual wisdom.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="px-6 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary flex-1 max-w-md"
                />
                <Button className="gradient-sacred hover-sacred px-8 py-3">
                  Subscribe
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-16">
        {/* Hero Section - Same as before */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={spiritualBlog} 
              alt="Spiritual Knowledge and Wisdom" 
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 gradient-divine"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Badge className="gradient-sacred text-white">Spiritual Blog</Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/admin-login')}
                  className="text-white hover:bg-white/20"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Admin
                </Button>
              </div>
              <h1 className="text-5xl font-bold text-foreground mb-6">
                Sacred Wisdom & Insights
              </h1>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Explore the rich traditions of Hindu culture, understand the significance of sacred rituals, 
                and deepen your spiritual knowledge with our collection of authentic articles.
              </p>
            </div>
          </div>
        </section>

        {/* Error Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-8">
              <FileText className="w-12 h-12 text-red-600" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">Connection Issue</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're experiencing a temporary connection issue. This could be because:
            </p>
            <div className="max-w-2xl mx-auto mb-8 text-left">
              <ul className="text-muted-foreground space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                  The backend server is not running
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                  Database connection issue
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                  Network configuration problem
                </li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => window.location.reload()} 
                className="gradient-sacred hover-sacred"
              >
                Try Again
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/admin-login')}
              >
                <Settings className="w-4 h-4 mr-2" />
                Check Admin Panel
              </Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={spiritualBlog} 
            alt="Spiritual Knowledge and Wisdom" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 gradient-divine"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Badge className="gradient-sacred text-white">Spiritual Blog</Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/admin-login')}
                className="text-white hover:bg-white/20"
              >
                <Settings className="w-4 h-4 mr-2" />
                Admin
              </Button>
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Sacred Wisdom & Insights
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Explore the rich traditions of Hindu culture, understand the significance of sacred rituals, 
              and deepen your spiritual knowledge with our collection of authentic articles.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {!isLoading && featuredPost && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <Badge className="mb-4 gradient-sacred text-white">Featured Article</Badge>
              <h2 className="text-3xl font-bold text-foreground mb-8">Latest Insights</h2>
            </div>
            
            <BlogCard 
              post={featuredPost} 
              featured={true} 
              onReadMore={handleReadMore}
            />
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-20 gradient-divine">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-8">Recent Articles</h2>
            
            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 mb-8">
              {categories.map((category) => (
                <Button 
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={selectedCategory === category 
                    ? "bg-primary text-white hover:bg-primary/90" 
                    : "border-primary text-primary hover:bg-primary hover:text-white"
                  }
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {isLoading ? (
            // Loading skeletons
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <BlogCardSkeleton key={index} />
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            // No posts found
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                No posts found
              </h3>
              <p className="text-muted-foreground mb-8">
                {selectedCategory === "All Posts" 
                  ? "No blog posts available at the moment." 
                  : `No posts found in the "${selectedCategory}" category.`
                }
              </p>
              {selectedCategory !== "All Posts" && (
                <Button 
                  onClick={() => setSelectedCategory("All Posts")}
                  variant="outline"
                >
                  View All Posts
                </Button>
              )}
            </div>
          ) : (
            // Blog posts grid
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <BlogCard 
                  key={post.id} 
                  post={post} 
                  onReadMore={handleReadMore}
                />
              ))}
            </div>
          )}

          {!isLoading && filteredPosts.length > 0 && (
            <div className="text-center mt-12">
              <Button className="gradient-sacred hover-sacred" size="lg">
                Load More Articles
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Badge className="mb-4 gradient-sacred text-white">Stay Connected</Badge>
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Get Spiritual Insights in Your Inbox
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Subscribe to our newsletter for weekly articles on Hindu traditions, 
              puja procedures, and spiritual wisdom from our learned pandits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="px-6 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary flex-1 max-w-md"
              />
              <Button className="gradient-sacred hover-sacred px-8 py-3">
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;