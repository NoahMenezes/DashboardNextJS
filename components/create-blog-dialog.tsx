"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle, Image as ImageIcon, X } from "lucide-react";
import { motion } from "motion/react";
import { apiClient, API_ENDPOINTS } from "@/lib/api";

interface CreateBlogDialogProps {
  onBlogCreated?: () => void;
}

export function CreateBlogDialog({ onBlogCreated }: CreateBlogDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [content, setContent] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [uploadingImage, setUploadingImage] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const categories = [
    "Technology",
    "Development",
    "Design",
    "AI & Trends",
    "Startups",
    "Business",
    "Personal",
    "Tutorial",
    "News",
    "Other",
  ];

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file (PNG, JPG, GIF, etc.)");
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB");
      return;
    }

    setUploadingImage(true);
    setError("");

    try {
      // Convert image to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
        setUploadingImage(false);
      };
      reader.onerror = () => {
        setError("Failed to read image file");
        setUploadingImage(false);
      };
      reader.readAsDataURL(file);
    } catch {
      setError("Failed to process image");
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await apiClient.post(API_ENDPOINTS.userBlogs, {
        title,
        category: category || "General",
        imageUrl,
        content,
      });

      // Reset form
      setTitle("");
      setCategory("");
      setImageUrl("");
      setContent("");

      // Close dialog and notify parent
      setOpen(false);
      if (onBlogCreated) {
        onBlogCreated();
      }
    } catch (error: unknown) {
      console.error("Failed to create blog:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to create blog post. Please try again.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-white hover:bg-zinc-200 text-black px-6 py-6 rounded-2xl font-bold flex items-center gap-2 shadow-lg hover:shadow-white/10 transition-all">
          <PlusCircle className="w-5 h-5" />
          Create Blog Post
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-900 border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Create New Blog Post
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Share your thoughts and ideas with the community
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white font-medium">
              Title *
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your blog title..."
              required
              className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus:border-primary transition-all"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-white font-medium">
              Category
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-white/10 text-white">
                {categories.map((cat) => (
                  <SelectItem
                    key={cat}
                    value={cat}
                    className="hover:bg-white/10 focus:bg-white/10"
                  >
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Image Upload/URL */}
          <div className="space-y-2">
            <Label
              htmlFor="imageUrl"
              className="text-white font-medium flex items-center gap-2"
            >
              <ImageIcon className="w-4 h-4" />
              Blog Image
            </Label>

            {/* File upload button and URL input */}
            <div className="flex gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingImage}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/10"
              >
                {uploadingImage ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Upload Image
                  </>
                )}
              </Button>
              <Input
                id="imageUrl"
                value={imageUrl.startsWith("data:") ? "" : imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Or paste image URL..."
                type="url"
                disabled={uploadingImage || imageUrl.startsWith("data:")}
                className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus:border-primary transition-all"
              />
            </div>

            <p className="text-xs text-zinc-500">
              Upload an image from your computer (max 5MB) or paste an image URL
            </p>

            {imageUrl && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative aspect-video rounded-xl overflow-hidden border border-white/10 mt-3"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(
                    e: React.SyntheticEvent<HTMLImageElement, Event>,
                  ) => {
                    (e.target as HTMLImageElement).src = "/placeholder.png";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setImageUrl("")}
                  className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                {imageUrl.startsWith("data:") && (
                  <div className="absolute bottom-2 left-2 px-3 py-1 bg-black/70 rounded-full text-xs text-white">
                    📎 Uploaded from computer
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content" className="text-white font-medium">
              Content *
            </Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog content here... (You can use HTML formatting)"
              required
              rows={10}
              className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus:border-primary transition-all resize-none"
            />
            <p className="text-xs text-zinc-500">
              Tip: You can use HTML tags like &lt;h1&gt;, &lt;p&gt;,
              &lt;strong&gt;, &lt;em&gt;, etc.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1 border-white/10 hover:bg-white/5 text-white"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-white hover:bg-zinc-200 text-black font-bold"
            >
              {loading ? "Creating..." : "Create Post"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
