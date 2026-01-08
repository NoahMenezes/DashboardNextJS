"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { TextEffect } from "@/components/ui/text-effect";
import { motion } from "motion/react";
import { CreateBlogDialog } from "./create-blog-dialog";
import { EditBlogDialog } from "./edit-blog-dialog";
import { Trash2, Edit } from "lucide-react";
import { apiClient, API_ENDPOINTS } from "@/lib/api";

interface UserBlog {
  id: number;
  title: string;
  category: string;
  imageUrl?: string;
  content: string;
  createdAt: string;
  author?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
}

interface UserBlogsSectionProps {
  showCreateButton?: boolean;
  userId?: number;
  title?: string;
}

export function UserBlogsSection({
  showCreateButton = true,
  userId,
  title = "Community Blogs",
}: UserBlogsSectionProps) {
  const [blogs, setBlogs] = React.useState<UserBlog[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [currentUserId, setCurrentUserId] = React.useState<number | null>(null);
  const [editingBlog, setEditingBlog] = React.useState<UserBlog | null>(null);

  const fetchBlogs = React.useCallback(async () => {
    try {
      const endpoint = userId
        ? API_ENDPOINTS.userBlogsByUser(userId)
        : API_ENDPOINTS.userBlogs;

      const res = await fetch(endpoint, {
        headers: {
          ...(typeof window !== "undefined" && localStorage.getItem("token")
            ? { Authorization: `Bearer ${localStorage.getItem("token")}` }
            : {}),
        },
      });

      if (!res.ok) throw new Error("Failed to fetch blogs");
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  React.useEffect(() => {
    fetchBlogs();

    // Get current user ID
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setCurrentUserId(payload.id);
      } catch (e) {
        console.error("Failed to parse token");
      }
    }
  }, [fetchBlogs]);

  const handleDelete = async (blogId: number) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      await apiClient.delete(API_ENDPOINTS.userBlogById(blogId));
      setBlogs(blogs.filter((blog) => blog.id !== blogId));
    } catch (err) {
      console.error("Failed to delete blog:", err);
      alert("Failed to delete blog post");
    }
  };

  const canEditBlog = (blog: UserBlog) => {
    return blog.author?.id === currentUserId;
  };

  if (loading) {
    return (
      <div className="py-24 bg-black text-white text-center">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
        Loading community blogs...
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
              {title}
            </TextEffect>
            <p className="text-zinc-400 max-w-md text-lg leading-relaxed">
              Discover insights and stories shared by our community members.
            </p>
          </div>
          {showCreateButton && <CreateBlogDialog onBlogCreated={fetchBlogs} />}
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-zinc-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No blogs yet</h3>
            <p className="text-zinc-400 mb-6">
              Be the first to share your story!
            </p>
            {showCreateButton && (
              <CreateBlogDialog onBlogCreated={fetchBlogs} />
            )}
          </div>
        ) : (
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
              {blogs.map((blog) => (
                <div key={blog.id} className="relative group">
                  <Link
                    href={`/blog/user/${blog.id}`}
                    className="block relative"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] border border-white/10 bg-zinc-900 transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-[0_0_50px_-12px_rgba(var(--primary),0.2)]">
                      {blog.imageUrl ? (
                        <Image
                          src={blog.imageUrl}
                          alt={blog.title}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                          <svg
                            className="w-20 h-20 text-white/20"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1}
                              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                            />
                          </svg>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                      <div className="absolute top-6 left-6">
                        <span className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white">
                          {blog.category}
                        </span>
                      </div>

                      <div className="absolute bottom-6 left-6 right-6">
                        {blog.author && (
                          <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">
                            By {blog.author.firstName} {blog.author.lastName}
                          </div>
                        )}
                        <h3 className="text-xl font-bold leading-tight text-white group-hover:text-primary transition-colors duration-300 line-clamp-2">
                          {blog.title}
                        </h3>
                      </div>
                    </div>
                  </Link>

                  {/* Edit/Delete buttons for own blogs */}
                  {canEditBlog(blog) && (
                    <div
                      className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setEditingBlog(blog);
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
                          handleDelete(blog.id);
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
        )}
      </div>

      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[150px] rounded-full -z-10 pointer-events-none animate-pulse" />

      {/* Edit Dialog */}
      {editingBlog && (
        <EditBlogDialog
          blog={{
            id: editingBlog.id,
            title: editingBlog.title,
            category: editingBlog.category,
            imageUrl: editingBlog.imageUrl,
            content: editingBlog.content,
          }}
          open={!!editingBlog}
          onClose={() => setEditingBlog(null)}
          onBlogUpdated={() => {
            fetchBlogs();
            setEditingBlog(null);
          }}
        />
      )}
    </section>
  );
}
