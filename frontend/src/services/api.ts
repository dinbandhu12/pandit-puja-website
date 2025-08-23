const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface BlogPost {
  id: number;
  title: string;
  subtitle?: string;
  content: string;
  tags?: string;
  links?: string;
  featured_image?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateBlogPost {
  title: string;
  subtitle?: string;
  content: string;
  tags?: string;
  links?: string;
  featuredImage?: string;
}

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Get all blog posts
  async getPosts(): Promise<BlogPost[]> {
    console.log('API Service: Fetching posts from:', `${API_BASE_URL}/posts`);
    const result = await this.request<BlogPost[]>('/posts');
    console.log('API Service: Posts received:', result);
    return result;
  }

  // Get single blog post by ID
  async getPost(id: number): Promise<BlogPost> {
    return this.request<BlogPost>(`/posts/${id}`);
  }

  // Create new blog post (admin only)
  async createPost(post: CreateBlogPost): Promise<BlogPost> {
    return this.request<BlogPost>('/admin/posts', {
      method: 'POST',
      body: JSON.stringify({
        ...post,
        username: 'website-admin',
        password: 'website-admin'
      }),
    });
  }

  // Update existing blog post (admin only)
  async updatePost(id: number, post: Partial<CreateBlogPost>): Promise<BlogPost> {
    return this.request<BlogPost>(`/admin/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        ...post,
        username: 'website-admin',
        password: 'website-admin'
      }),
    });
  }

  // Delete blog post (admin only)
  async deletePost(id: number): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/admin/posts/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({
        username: 'website-admin',
        password: 'website-admin'
      }),
    });
  }

  // Admin login
  async adminLogin(credentials: { username: string; password: string }): Promise<{ success: boolean; message: string; isAdmin: boolean }> {
    return this.request<{ success: boolean; message: string; isAdmin: boolean }>('/admin/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return this.request<{ status: string; timestamp: string }>('/health');
  }
}

export const apiService = new ApiService();
