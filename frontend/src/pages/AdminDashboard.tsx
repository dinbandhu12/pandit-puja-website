import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  LogOut, 
  FileText, 
  Tag, 
  Calendar,
  ArrowLeft,
  RefreshCw
} from "lucide-react";
import { toast } from "sonner";
import { BlogPost, apiService } from '@/services/api';
import UserFriendlyBlogEditor from '@/components/UserFriendlyBlogEditor';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Check if user is admin (simple frontend check)
  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/admin-login');
      return;
    }
    fetchPosts();
  }, [navigate]);

  const fetchPosts = async () => {
    try {
      const data = await apiService.getPosts();
      setPosts(data);
      console.log('Fetched posts:', data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to fetch posts. Please try again.');
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin-login');
    toast.success('Logged out successfully');
  };

  const handleCreatePost = async (postData: any) => {
    try {
      const newPost = await apiService.createPost(postData);
      toast.success('Post created successfully!');
      setShowEditor(false);
      await fetchPosts(); // Refresh the posts list
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post. Please try again.');
    }
  };

  const handleUpdatePost = async (postData: any) => {
    if (!editingPost) return;

    try {
      await apiService.updatePost(editingPost.id, postData);
      toast.success('Post updated successfully!');
      setShowEditor(false);
      setEditingPost(null);
      await fetchPosts(); // Refresh the posts list
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error('Failed to update post. Please try again.');
    }
  };

  const handleDeletePost = async (postId: number) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      await apiService.deletePost(postId);
      toast.success('Post deleted successfully!');
      await fetchPosts(); // Refresh the posts list
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post. Please try again.');
    }
  };

  const openCreateEditor = () => {
    setEditingPost(null);
    setShowEditor(true);
  };

  const openEditEditor = (post: BlogPost) => {
    setEditingPost(post);
    setShowEditor(true);
  };

  const closeEditor = () => {
    setShowEditor(false);
    setEditingPost(null);
  };

  const refreshPosts = async () => {
    setIsRefreshing(true);
    await fetchPosts();
    setIsRefreshing(false);
    toast.success('Posts refreshed!');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // If showing editor, render the user-friendly editor
  if (showEditor) {
    const initialData = editingPost ? {
      title: editingPost.title,
      subtitle: editingPost.subtitle,
      content: editingPost.content,
      tags: editingPost.tags,
      links: editingPost.links,
      featuredImage: editingPost.featured_image
    } : undefined;

    return (
      <UserFriendlyBlogEditor
        initialData={initialData}
        onSave={editingPost ? handleUpdatePost : handleCreatePost}
        onCancel={closeEditor}
        isEditing={!!editingPost}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen py-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/blog')}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your blog posts</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Admin Access
            </Badge>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Posts</p>
                  <p className="text-2xl font-bold">{posts.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Latest Post</p>
                  <p className="text-sm font-medium">
                    {posts.length > 0 ? formatDate(posts[0].created_at) : 'No posts'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Tag className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Categories</p>
                  <p className="text-sm font-medium">
                    {new Set(posts.flatMap(post => post.tags?.split(',').map(t => t.trim()) || [])).size}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Blog Posts</h2>
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={refreshPosts}
              disabled={isRefreshing}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
            <Button onClick={openCreateEditor} className="gradient-sacred hover-sacred">
              <Plus className="w-4 h-4 mr-2" />
              Create New Post
            </Button>
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold">{post.title}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {post.tags?.split(',')[0]?.trim() || 'Blog Post'}
                      </Badge>
                    </div>
                    {post.subtitle && (
                      <p className="text-muted-foreground mb-3">{post.subtitle}</p>
                    )}
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(post.created_at)}
                      </span>
                      <span className="flex items-center">
                        <Tag className="w-4 h-4 mr-1" />
                        {post.tags?.split(',').length || 0} tags
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/blog/${post.id}`)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditEditor(post)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeletePost(post.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-16">
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
            <p className="text-muted-foreground mb-6">
              Create your first blog post to get started
            </p>
            <Button onClick={openCreateEditor} className="gradient-sacred hover-sacred">
              <Plus className="w-4 h-4 mr-2" />
              Create First Post
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

