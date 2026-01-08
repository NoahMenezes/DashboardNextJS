"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { TextEffect } from "@/components/ui/text-effect";
import { HeroHeader } from "./header";
import FooterSection from "./footer";
import { motion } from "motion/react";
import { CreateBlogDialog } from "./create-blog-dialog";
import { EditBlogDialog } from "./edit-blog-dialog";
import { Trash2, Edit } from "lucide-react";
import { apiClient, API_ENDPOINTS } from "@/lib/api";

interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image?: string;
  image_url?: string;
}

export function BlogSection() {
  const [posts, setPosts] = React.useState<BlogPost[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [editingPost, setEditingPost] = React.useState<BlogPost | null>(null);

  const fetchPosts = React.useCallback(async () => {
    try {
      setError("");
      setLoading(true);
      const res = await fetch(API_ENDPOINTS.blogs);
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error(error);
      setError(
        "Could not load blog posts. Please make sure the backend is running.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchPosts();

    // Check if user is admin
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        // Check if user is admin (user id 3 or email contains 'admin')
        setIsAdmin(payload.id === 3 || payload.email?.includes("admin"));
      } catch (e) {
        console.error("Failed to parse token");
      }
    }
  }, [fetchPosts]);

  const handleDelete = async (postId: number) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      await apiClient.delete(API_ENDPOINTS.blogById(postId));
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (err) {
      console.error("Failed to delete blog:", err);
      alert("Failed to delete blog post");
    }
  };

  if (loading) {
    return (
      <div className="py-24 bg-black text-white text-center">
        Loading AI productivity insights...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-24 bg-black text-white text-center">
        <p className="text-red-400 mb-4">{error}</p>
        <button
          onClick={fetchPosts}
          className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <section className="relative py-24 overflow-hidden bg-black">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <TextEffect
              preset="fade-in-blur"
              as="h2"
              className="text-4xl md:text-5xl font-bold tracking-tight text-white"
            >
              AI Productivity Insights
            </TextEffect>
            <p className="text-zinc-400 max-w-md text-lg leading-relaxed">
              Discover how AI-powered tools and intelligent automation are
              transforming productivity across industries.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/blog"
              className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors duration-300 md:mb-2"
            >
              View all posts
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                →
              </motion.span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatedGroup
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 col-span-full"
            variants={{
              container: {
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              },
              item: {
                hidden: { opacity: 0, scale: 0.9, y: 30 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    duration: 0.6,
                  },
                },
              },
            }}
          >
            {posts.map((post) => (
              <div key={post.id} className="relative group">
                <Link href={`/blog/${post.id}`} className="block relative">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] border border-white/10 bg-zinc-900 transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-[0_0_50px_-12px_rgba(var(--primary),0.2)]">
                    <Image
                      src={post.image || post.image_url || "/placeholder.png"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                    <div className="absolute top-6 left-6">
                      <span className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white">
                        {post.category}
                      </span>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center gap-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">
                        <span>{post.date}</span>
                        <span className="w-1 h-1 rounded-full bg-zinc-600" />
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="text-xl font-bold leading-tight text-white group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h3>
                    </div>
                  </div>
                </Link>

                {/* Edit/Delete buttons for admin */}
                {isAdmin && (
                  <div
                    className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setEditingPost(post);
                      }}
                      className="p-3 bg-blue-500/90 hover:bg-blue-600 rounded-full transition-all shadow-lg hover:scale-110"
                      title="Edit blog"
                    >
                      <Edit className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDelete(post.id);
                      }}
                      className="p-3 bg-red-500/90 hover:bg-red-600 rounded-full transition-all shadow-lg hover:scale-110"
                      title="Delete blog"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </AnimatedGroup>
        </div>
      </div>

      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[150px] rounded-full -z-10 pointer-events-none animate-pulse" />

      {/* Edit Dialog */}
      {editingPost && (
        <EditBlogDialog
          blog={{
            id: editingPost.id,
            title: editingPost.title,
            category: editingPost.category,
            imageUrl: editingPost.image || editingPost.image_url,
            content: "",
          }}
          open={!!editingPost}
          onClose={() => setEditingPost(null)}
          onBlogUpdated={() => {
            fetchPosts();
            setEditingPost(null);
          }}
        />
      )}
    </section>
  );
}

export default function BlogPage() {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-primary/30">
      <HeroHeader />
      <main className="pt-20">
        <BlogSection />
      </main>
      <FooterSection />
    </div>
  );
}
