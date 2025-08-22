import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type,
  Save,
  X,
  Plus,
  Trash2
} from "lucide-react";
import { ImageUpload } from "./ImageUpload";

interface BlogPostData {
  title: string;
  subtitle?: string;
  content: string;
  tags?: string;
  links?: string;
  featuredImage?: string;
}

interface UserFriendlyBlogEditorProps {
  initialData?: BlogPostData;
  onSave: (data: BlogPostData) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const UserFriendlyBlogEditor: React.FC<UserFriendlyBlogEditorProps> = ({
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
  const editorRef = useRef<HTMLDivElement>(null);

  // Initialize editor content
  useEffect(() => {
    if (editorRef.current && formData.content) {
      editorRef.current.innerHTML = formData.content;
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Please enter a title for your blog post');
      return;
    }

    if (!editorRef.current?.innerHTML || editorRef.current.innerHTML.trim() === '') {
      alert('Please write some content for your blog post');
      return;
    }

    const finalData = {
      ...formData,
      content: editorRef.current.innerHTML
    };

    setIsSubmitting(true);
    try {
      await onSave(finalData);
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Failed to save post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof BlogPostData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Rich text formatting functions
  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const insertHeading = (level: number) => {
    const heading = `h${level}`;
    formatText('formatBlock', heading);
  };

  const insertList = (ordered: boolean = false) => {
    formatText(ordered ? 'insertOrderedList' : 'insertUnorderedList');
  };

  const insertLink = () => {
    const url = prompt('Enter the link URL:');
    if (url) {
      formatText('createLink', url);
    }
  };

  const insertImage = () => {
    const url = prompt('Enter the image URL:');
    if (url) {
      formatText('insertImage', url);
    }
  };

  const setTextAlign = (alignment: string) => {
    formatText(`justify${alignment.charAt(0).toUpperCase() + alignment.slice(1)}`);
  };

  // Tag management
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8">
      <div className="max-w-5xl mx-auto p-6">
        <Card className="shadow-xl border-0">
          <CardHeader className="border-b bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
            <CardTitle className="text-3xl flex items-center gap-3">
              <span className="text-2xl">
                {isEditing ? '✏️' : '✨'}
              </span>
              {isEditing ? 'Edit Your Blog Post' : 'Create a New Blog Post'}
            </CardTitle>
            <p className="text-orange-100 text-lg">
              {isEditing ? 'Make changes to your blog post' : 'Share your thoughts with the world'}
            </p>
          </CardHeader>
          
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Title Section */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-lg font-semibold text-gray-700 mb-2 block">
                    Blog Post Title *
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Write an engaging title for your blog post..."
                    className="text-xl p-4 border-2 border-gray-200 rounded-lg focus:border-orange-400 transition-colors"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="subtitle" className="text-lg font-semibold text-gray-700 mb-2 block">
                    Subtitle (Optional)
                  </Label>
                  <Input
                    id="subtitle"
                    value={formData.subtitle || ''}
                    onChange={(e) => handleInputChange('subtitle', e.target.value)}
                    placeholder="Add a brief description or subtitle..."
                    className="text-lg p-3 border-2 border-gray-200 rounded-lg focus:border-orange-400 transition-colors"
                  />
                </div>

                {/* Featured Image Upload */}
                <ImageUpload
                  value={formData.featuredImage || ''}
                  onChange={(imageUrl) => handleInputChange('featuredImage', imageUrl)}
                />
              </div>

              {/* Rich Text Editor */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold text-gray-700 block">
                  Write Your Content *
                </Label>
                
                {/* Formatting Toolbar */}
                <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {/* Text Formatting */}
                    <div className="flex gap-1 border-r pr-3">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => formatText('bold')}
                        className="hover:bg-orange-100 border-orange-200"
                        title="Bold"
                      >
                        <Bold className="w-4 h-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => formatText('italic')}
                        className="hover:bg-orange-100 border-orange-200"
                        title="Italic"
                      >
                        <Italic className="w-4 h-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => formatText('underline')}
                        className="hover:bg-orange-100 border-orange-200"
                        title="Underline"
                      >
                        <Underline className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Headings */}
                    <div className="flex gap-1 border-r pr-3">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => insertHeading(1)}
                        className="hover:bg-orange-100 border-orange-200 text-xs px-2"
                        title="Large Heading"
                      >
                        H1
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => insertHeading(2)}
                        className="hover:bg-orange-100 border-orange-200 text-xs px-2"
                        title="Medium Heading"
                      >
                        H2
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => insertHeading(3)}
                        className="hover:bg-orange-100 border-orange-200 text-xs px-2"
                        title="Small Heading"
                      >
                        H3
                      </Button>
                    </div>

                    {/* Lists */}
                    <div className="flex gap-1 border-r pr-3">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => insertList(false)}
                        className="hover:bg-orange-100 border-orange-200"
                        title="Bullet List"
                      >
                        <List className="w-4 h-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => insertList(true)}
                        className="hover:bg-orange-100 border-orange-200"
                        title="Numbered List"
                      >
                        <ListOrdered className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Alignment */}
                    <div className="flex gap-1 border-r pr-3">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setTextAlign('left')}
                        className="hover:bg-orange-100 border-orange-200"
                        title="Align Left"
                      >
                        <AlignLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setTextAlign('center')}
                        className="hover:bg-orange-100 border-orange-200"
                        title="Align Center"
                      >
                        <AlignCenter className="w-4 h-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setTextAlign('right')}
                        className="hover:bg-orange-100 border-orange-200"
                        title="Align Right"
                      >
                        <AlignRight className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Insert */}
                    <div className="flex gap-1">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={insertLink}
                        className="hover:bg-orange-100 border-orange-200"
                        title="Insert Link"
                      >
                        <Link className="w-4 h-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={insertImage}
                        className="hover:bg-orange-100 border-orange-200"
                        title="Insert Image"
                      >
                        <Image className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Rich Text Editor Area */}
                <div
                  ref={editorRef}
                  contentEditable
                  className="min-h-[400px] p-6 border-2 border-gray-200 rounded-lg focus:border-orange-400 transition-colors bg-white prose prose-lg max-w-none"
                  style={{ outline: 'none' }}
                  placeholder="Start writing your blog post here..."
                  onBlur={() => {
                    if (editorRef.current) {
                      setFormData(prev => ({ ...prev, content: editorRef.current!.innerHTML }));
                    }
                  }}
                />
                <p className="text-sm text-gray-500">
                  Use the toolbar above to format your text. Just like in Microsoft Word!
                </p>
              </div>

              {/* Tags Section */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold text-gray-700 block">Tags</Label>
                <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                  {formData.tags?.split(',').map((tag, index) => (
                    tag.trim() && (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="px-3 py-1 bg-orange-100 text-orange-800 cursor-pointer hover:bg-red-100 hover:text-red-800 transition-colors"
                        onClick={() => removeTag(tag.trim())}
                      >
                        {tag.trim()} 
                        <X className="w-3 h-3 ml-1" />
                      </Badge>
                    )
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag and press Enter"
                    className="border-2 border-gray-200 focus:border-orange-400"
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
                    className="border-orange-200 hover:bg-orange-100"
                    onClick={() => {
                      const input = document.querySelector('input[placeholder="Add a tag and press Enter"]') as HTMLInputElement;
                      if (input.value.trim()) {
                        addTag(input.value);
                        input.value = '';
                      }
                    }}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                {/* Suggested Tags */}
                <div>
                  <p className="text-sm text-gray-600 mb-2">Quick Tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="cursor-pointer hover:bg-orange-100 border-orange-200 text-orange-700"
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
                <Label htmlFor="links" className="text-lg font-semibold text-gray-700">
                  Reference Links (Optional)
                </Label>
                <Input
                  id="links"
                  value={formData.links || ''}
                  placeholder="Add any reference links (separate multiple links with commas)"
                  onChange={(e) => handleInputChange('links', e.target.value)}
                  className="border-2 border-gray-200 focus:border-orange-400"
                />
                <p className="text-sm text-gray-500">
                  Example: https://example.com, https://another-example.com
                </p>
              </div>

              <Separator className="my-8" />

              {/* Action Buttons */}
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  disabled={isSubmitting}
                  className="px-6 py-2 border-2 border-gray-300 hover:bg-gray-100"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSubmitting ? (
                    'Saving...'
                  ) : (
                    isEditing ? 'Update Post' : 'Publish Post'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserFriendlyBlogEditor;