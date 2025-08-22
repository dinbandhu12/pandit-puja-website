import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

interface BlogPost {
  id: number;
  title: string;
  subtitle?: string;
  content: string;
  created_at: string;
  tags?: string;
}

const BlogSimple = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'https://web-production-81be.up.railway.app/api';
        const response = await fetch(`${API_URL}/posts`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-8">Sacred Wisdom & Insights</h1>
            <p className="text-xl text-muted-foreground mb-12">Loading blog posts...</p>
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-8">Sacred Wisdom & Insights</h1>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl mx-auto">
              <p className="text-red-700 mb-4">Error loading blog posts:</p>
              <p className="text-red-600 text-sm font-mono">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      {/* Hero Section */}
      <section className="py-20 gradient-divine">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 gradient-sacred text-white">Spiritual Blog</Badge>
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Sacred Wisdom & Insights
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Explore the rich traditions of Hindu culture and spiritual wisdom.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Recent Articles ({posts.length} posts found)</h2>
          
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">No blog posts available yet.</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article key={post.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="mb-4">
                    {post.tags && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.split(',').map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag.trim()}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    {post.subtitle && (
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {post.subtitle}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <time dateTime={post.created_at}>
                      {new Date(post.created_at).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    <button className="text-primary hover:underline">
                      Read More →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogSimple;