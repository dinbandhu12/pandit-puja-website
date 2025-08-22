import React, { useState, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Image, 
  Link, 
  Quote, 
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Heading1,
  Heading2,
  Heading3,
  Palette,
  Undo,
  Redo,
  HelpCircle,
  Lightbulb,
  Eye,
  EyeOff
} from "lucide-react";

interface BlogPostData {
  title: string;
  subtitle?: string;
  content: string;
  tags?: string;
  links?: string;
  featuredImage?: string;
}

interface RichBlogEditorProps {
  initialData?: BlogPostData;
  onSave: (data: BlogPostData) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const RichBlogEditor: React.FC<RichBlogEditorProps> = ({
  initialData,
  onSave,
  onCancel,
  isEditing = false
}) => {
  const [formData, setFormData] = useState<BlogPostData>({
    title: initialData?.title || '',
    subtitle: initialData?.subtitle || '',
    content: initialData?.content || '',
    tags: initialData?.tags || '',
    links: initialData?.links || '',
    featuredImage: initialData?.featuredImage || ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Simplified Quill editor modules configuration for better UX
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['link', 'image'],
        ['blockquote'],
        ['clean']
      ],
      handlers: {
        image: imageHandler,
        link: linkHandler
      }
    },
    clipboard: {
      matchVisual: false
    }
  }), []);

  // Quill editor formats
  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'color', 'background',
    'align', 'direction', 'code-block'
  ];

  // User-friendly image handler with better feedback
  function imageHandler() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
          alert('Image size should be less than 5MB');
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
          const quill = (document.querySelector('.ql-editor') as any)?.__quill;
          if (quill) {
            const range = quill.getSelection();
            quill.insertEmbed(range.index, 'image', e.target?.result);
          }
        };
        reader.readAsDataURL(file);
      }
    };
  }

  // User-friendly link handler
  function linkHandler() {
    const url = prompt('Enter the web address (URL):\n\nExample: https://www.example.com');
    if (url && url.trim()) {
      let formattedUrl = url.trim();
      if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
        formattedUrl = 'https://' + formattedUrl;
      }
      const quill = (document.querySelector('.ql-editor') as any)?.__quill;
      if (quill) {
        const range = quill.getSelection();
        if (range.length > 0) {
          quill.formatText(range.index, range.length, 'link', formattedUrl);
        } else {
          quill.insertText(range.index, formattedUrl, 'link', formattedUrl);
        }
      }
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters long';
    }
    
    if (!formData.content.trim() || formData.content.trim() === '<p><br></p>') {
      newErrors.content = 'Content is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave(formData);
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Failed to save the post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof BlogPostData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const addTag = (tag: string) => {
    if (tag.trim() && !formData.tags?.includes(tag.trim())) {
      const newTags = formData.tags ? `${formData.tags}, ${tag.trim()}` : tag.trim();
      setFormData(prev => ({ ...prev, tags: newTags }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    if (!formData.tags) return;
    const tags = formData.tags.split(',').map(t => t.trim()).filter(t => t !== tagToRemove);
    setFormData(prev => ({ ...prev, tags: tags.join(', ') }));
  };

  const suggestedTags = [
    'Hinduism', 'Puja', 'Spirituality', 'Culture', 'Festival', 
    'Temple', 'Mantra', 'Meditation', 'Yoga', 'Philosophy',
    'Tradition', 'Ceremony', 'Blessing', 'Rituals', 'Sacred'
  ];

  const getContentPreview = () => {
    const div = document.createElement('div');
    div.innerHTML = formData.content;
    return div.textContent || div.innerText || '';
  };

  const wordCount = getContentPreview().split(' ').filter(word => word.trim().length > 0).length;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {showHelp && (
        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <HelpCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Quick Tips:</strong>
            <ul className="mt-2 text-sm space-y-1">
              <li>• Write a clear, descriptive title that tells readers what to expect</li>
              <li>• Use headings (H1, H2, H3) to organize your content into sections</li>
              <li>• Add images to make your post more engaging</li>
              <li>• Use bullet points or numbered lists for easy reading</li>
              <li>• Add relevant tags to help people find your post</li>
            </ul>
          </AlertDescription>
        </Alert>
      )}
      
      <Card className="shadow-lg">
        <CardHeader className="border-b">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <span className="text-primary">
                  {isEditing ? '✏️ Edit' : '✨ Create'} Blog Post
                </span>
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                {isEditing ? 'Update your blog post' : 'Share your thoughts and insights with the world'}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowHelp(!showHelp)}
              >
                <HelpCircle className="w-4 h-4 mr-1" />
                Tips
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
              >
                {showPreview ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
                {showPreview ? 'Edit' : 'Preview'}
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          {showPreview ? (
            <div className="space-y-6">
              <div className="prose max-w-none">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{formData.title || 'Untitled'}</h1>
                {formData.subtitle && (
                  <p className="text-xl text-gray-600 mb-4">{formData.subtitle}</p>
                )}
                {formData.featuredImage && (
                  <img src={formData.featuredImage} alt="Featured" className="w-full rounded-lg mb-4" />
                )}
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: formData.content || '<p>No content yet...</p>' }}
                />
                {formData.tags && (
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Tags:</h3>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.split(',').map((tag, index) => (
                        tag.trim() && (
                          <Badge key={index} variant="secondary">{tag.trim()}</Badge>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="text-sm text-muted-foreground text-center py-4 border-t">
                Word count: {wordCount} words
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium flex items-center gap-2">
                    Title *
                    <Lightbulb className="w-4 h-4 text-yellow-500" />
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g., 'The Importance of Daily Puja in Hindu Life'"
                    className={`text-lg font-semibold ${errors.title ? 'border-red-500' : ''}`}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-600">{errors.title}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Choose a clear, descriptive title that tells readers what your post is about
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subtitle" className="text-sm font-medium">
                    Subtitle (Optional)
                  </Label>
                  <Input
                    id="subtitle"
                    value={formData.subtitle || ''}
                    onChange={(e) => handleInputChange('subtitle', e.target.value)}
                    placeholder="e.g., 'A guide to morning prayers and their spiritual benefits'"
                  />
                  <p className="text-xs text-muted-foreground">
                    A brief description that expands on your title
                  </p>
                </div>
              </div>

            {/* Featured Image */}
            <div className="space-y-2">
              <Label htmlFor="featuredImage" className="text-sm font-medium">
                Featured Image URL
              </Label>
              <Input
                id="featuredImage"
                type="url"
                value={formData.featuredImage || ''}
                onChange={(e) => handleInputChange('featuredImage', e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              {formData.featuredImage && (
                <div className="mt-2">
                  <img 
                    src={formData.featuredImage} 
                    alt="Featured" 
                    className="w-32 h-24 object-cover rounded border"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

              {/* Rich Content Editor */}
              <div className="space-y-3">
                <Label className="text-sm font-medium flex items-center gap-2">
                  Content *
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {wordCount} words
                  </span>
                </Label>
                <div className={`border rounded-lg overflow-hidden ${errors.content ? 'border-red-500' : ''}`}>
                  <ReactQuill
                    theme="snow"
                    value={formData.content}
                    onChange={(content) => handleInputChange('content', content)}
                    modules={modules}
                    formats={formats}
                    placeholder="Start writing your blog post here...\n\nTips:\n• Use headings to organize your content\n• Add images to make it more engaging\n• Write in a conversational tone\n• Break up long paragraphs with bullet points"
                    style={{ height: '400px' }}
                  />
                </div>
                {errors.content && (
                  <p className="text-sm text-red-600">{errors.content}</p>
                )}
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs text-blue-700 font-medium mb-1">Formatting Guide:</p>
                  <p className="text-xs text-blue-600">
                    Use the toolbar buttons to: <strong>Bold text</strong>, <em>make it italic</em>, add bullet points, insert links, and more!
                  </p>
                </div>
              </div>

              {/* Tags Section */}
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Tags (Help people find your post)</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Add tags related to your topic. People can search by these tags to find your post.
                  </p>
                </div>
                
                {formData.tags && (
                  <div>
                    <p className="text-xs font-medium text-gray-600 mb-2">Your tags:</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.split(',').map((tag, index) => (
                        tag.trim() && (
                          <Badge 
                            key={index} 
                            variant="secondary" 
                            className="cursor-pointer hover:bg-red-100 transition-colors"
                            onClick={() => removeTag(tag.trim())}
                          >
                            {tag.trim()} <span className="ml-1 text-red-600">×</span>
                          </Badge>
                        )
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a tag and press Enter"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag((e.target as HTMLInputElement).value);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }}
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      const input = document.querySelector('input[placeholder="Type a tag and press Enter"]') as HTMLInputElement;
                      if (input.value.trim()) {
                        addTag(input.value);
                        input.value = '';
                      }
                    }}
                  >
                    Add
                  </Button>
                </div>
                
                {/* Suggested Tags */}
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-2">Popular tags (click to add):</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary/10 transition-colors"
                        onClick={() => addTag(tag)}
                      >
                        + {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* External Links */}
              <div className="space-y-2">
                <Label htmlFor="links" className="text-sm font-medium">
                  External Links (Optional)
                </Label>
                <Textarea
                  id="links"
                  value={formData.links || ''}
                  placeholder="Add useful links for your readers (optional)\n\nExample:\nhttps://en.wikipedia.org/wiki/Hindu_temple\nhttps://www.example-website.com"
                  rows={3}
                  onChange={(e) => handleInputChange('links', e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Add links to websites, articles, or resources that relate to your post. Separate multiple links with commas.
                </p>
              </div>

              <Separator />

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                <div className="text-sm text-muted-foreground">
                  {wordCount} words • {formData.tags?.split(',').filter(t => t.trim()).length || 0} tags
                </div>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="gradient-sacred hover-sacred"
                    disabled={isSubmitting || (!formData.title.trim() || !formData.content.trim())}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Saving...
                      </span>
                    ) : (
                      isEditing ? '✅ Update Post' : '🚀 Publish Post'
                    )}
                  </Button>
                </div>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RichBlogEditor;
