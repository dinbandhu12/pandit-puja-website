import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
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
  Heading1,
  Heading2,
  Heading3
} from "lucide-react";

interface BlogPostData {
  title: string;
  subtitle?: string;
  content: string;
  tags?: string;
  links?: string;
  featuredImage?: string;
}

interface SimpleBlogEditorProps {
  initialData?: BlogPostData;
  onSave: (data: BlogPostData) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const SimpleBlogEditor: React.FC<SimpleBlogEditorProps> = ({
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Please fill in title and content');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave(formData);
    } catch (error) {
      console.error('Error saving post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof BlogPostData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
    'Temple', 'Mantra', 'Meditation', 'Yoga', 'Philosophy'
  ];

  const insertFormat = (format: string) => {
    const textarea = document.getElementById('content') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    
    let replacement = '';
    switch (format) {
      case 'bold':
        replacement = `**${selectedText}**`;
        break;
      case 'italic':
        replacement = `*${selectedText}*`;
        break;
      case 'underline':
        replacement = `<u>${selectedText}</u>`;
        break;
      case 'h1':
        replacement = `# ${selectedText}`;
        break;
      case 'h2':
        replacement = `## ${selectedText}`;
        break;
      case 'h3':
        replacement = `### ${selectedText}`;
        break;
      case 'list':
        replacement = `- ${selectedText}`;
        break;
      case 'ordered-list':
        replacement = `1. ${selectedText}`;
        break;
      case 'quote':
        replacement = `> ${selectedText}`;
        break;
      case 'code':
        replacement = `\`${selectedText}\``;
        break;
      case 'link':
        const url = prompt('Enter URL:');
        if (url) {
          replacement = `[${selectedText}](${url})`;
        } else {
          return;
        }
        break;
      case 'image':
        const imageUrl = prompt('Enter image URL:');
        if (imageUrl) {
          replacement = `![${selectedText}](${imageUrl})`;
        } else {
          return;
        }
        break;
      default:
        return;
    }

    const newValue = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
    setFormData(prev => ({ ...prev, content: newValue }));
    
    // Set cursor position after the inserted text
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + replacement.length, start + replacement.length);
    }, 0);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card className="shadow-lg">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl flex items-center gap-2">
            <span className="text-primary">
              {isEditing ? '✏️ Edit' : '✨ Create'} Blog Post
            </span>
          </CardTitle>
          <p className="text-muted-foreground">
            {isEditing ? 'Update your blog post with markdown formatting' : 'Create a new blog post with markdown formatting'}
          </p>
        </CardHeader>
        
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Title *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter blog post title"
                  className="text-lg font-semibold"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subtitle" className="text-sm font-medium">
                  Subtitle
                </Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle || ''}
                  onChange={(e) => handleInputChange('subtitle', e.target.value)}
                  placeholder="Enter subtitle (optional)"
                />
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

            {/* Content Editor with Formatting Toolbar */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Content * (Markdown supported)
              </Label>
              
              {/* Formatting Toolbar */}
              <div className="border rounded-lg p-2 bg-gray-50 flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertFormat('h1')}
                  className="h-8 px-2"
                >
                  <Heading1 className="w-3 h-3 mr-1" />
                  H1
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertFormat('h2')}
                  className="h-8 px-2"
                >
                  <Heading2 className="w-3 h-3 mr-1" />
                  H2
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertFormat('h3')}
                  className="h-8 px-2"
                >
                  <Heading3 className="w-3 h-3 mr-1" />
                  H3
                </Button>
                <Separator orientation="vertical" className="h-6" />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertFormat('bold')}
                  className="h-8 px-2"
                >
                  <Bold className="w-3 h-3 mr-1" />
                  Bold
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertFormat('italic')}
                  className="h-8 px-2"
                >
                  <Italic className="w-3 h-3 mr-1" />
                  Italic
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertFormat('underline')}
                  className="h-8 px-2"
                >
                  <Underline className="w-3 h-3 mr-1" />
                  Underline
                </Button>
                <Separator orientation="vertical" className="h-6" />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertFormat('list')}
                  className="h-8 px-2"
                >
                  <List className="w-3 h-3 mr-1" />
                  List
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertFormat('ordered-list')}
                  className="h-8 px-2"
                >
                  <ListOrdered className="w-3 h-3 mr-1" />
                  Ordered
                </Button>
                <Separator orientation="vertical" className="h-6" />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertFormat('quote')}
                  className="h-8 px-2"
                >
                  <Quote className="w-3 h-3 mr-1" />
                  Quote
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertFormat('code')}
                  className="h-8 px-2"
                >
                  <Code className="w-3 h-3 mr-1" />
                  Code
                </Button>
                <Separator orientation="vertical" className="h-6" />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertFormat('link')}
                  className="h-8 px-2"
                >
                  <Link className="w-3 h-3 mr-1" />
                  Link
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertFormat('image')}
                  className="h-8 px-2"
                >
                  <Image className="w-3 h-3 mr-1" />
                  Image
                </Button>
              </div>

              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                placeholder="Write your blog post content here... Use the toolbar above for formatting!"
                className="min-h-[400px] font-mono text-sm"
                required
              />
              <p className="text-xs text-muted-foreground">
                Use the toolbar above to format text, add headings, lists, links, and images. 
                Markdown syntax is supported: **bold**, *italic*, # headings, - lists, [links](url), ![images](url)
              </p>
            </div>

            {/* Tags Section */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Tags</Label>
              <div className="flex flex-wrap gap-2">
                {formData.tags?.split(',').map((tag, index) => (
                  tag.trim() && (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="cursor-pointer hover:bg-red-100"
                      onClick={() => removeTag(tag.trim())}
                    >
                      {tag.trim()} ×
                    </Badge>
                  )
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a tag"
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
                    const input = document.querySelector('input[placeholder="Add a tag"]') as HTMLInputElement;
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
              <div className="mt-3">
                <p className="text-xs text-muted-foreground mb-2">Suggested tags:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary/10"
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
                External Links
              </Label>
              <Textarea
                id="links"
                value={formData.links || ''}
                placeholder="Enter external links separated by commas (optional)"
                rows={3}
                onChange={(e) => handleInputChange('links', e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Example: https://example.com, https://another-example.com
              </p>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
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
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  'Saving...'
                ) : (
                  isEditing ? 'Update Post' : 'Create Post'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimpleBlogEditor;
