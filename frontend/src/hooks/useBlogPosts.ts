import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService, BlogPost, CreateBlogPost } from '@/services/api';
import { toast } from 'sonner';

export const useBlogPosts = () => {
  return useQuery({
    queryKey: ['blog-posts'],
    queryFn: () => apiService.getPosts(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

export const useBlogPost = (id: number) => {
  return useQuery({
    queryKey: ['blog-post', id],
    queryFn: () => apiService.getPost(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCreateBlogPost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (post: CreateBlogPost) => apiService.createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      toast.success('Blog post created successfully!');
    },
    onError: (error) => {
      console.error('Error creating blog post:', error);
      toast.error('Failed to create blog post. Please try again.');
    },
  });
};

export const useUpdateBlogPost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, post }: { id: number; post: Partial<CreateBlogPost> }) =>
      apiService.updatePost(id, post),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      queryClient.invalidateQueries({ queryKey: ['blog-post', id] });
      toast.success('Blog post updated successfully!');
    },
    onError: (error) => {
      console.error('Error updating blog post:', error);
      toast.error('Failed to update blog post. Please try again.');
    },
  });
};

export const useDeleteBlogPost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => apiService.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      toast.success('Blog post deleted successfully!');
    },
    onError: (error) => {
      console.error('Error deleting blog post:', error);
      toast.error('Failed to delete blog post. Please try again.');
    },
  });
};

