"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { HeroHeader } from "@/components/header";
import FooterSection from "@/components/footer";
import { motion } from "motion/react";
import { TextEffect } from "@/components/ui/text-effect";
import { API_ENDPOINTS } from "@/lib/api";

export default function BlogPostPage() {
  const params = useParams();
  const id = params.id;
  interface BlogPost {
    id: number;
    title: string;
    category: string;
    date: string;
    readTime: string;
    image: string;
    content: string;
  }
  const [post, setPost] = React.useState<BlogPost | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const fetchPost = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
          controller.abort("Request timeout");
        }, 5000);

        const res = await fetch(API_ENDPOINTS.blogById(id as string), {
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!res.ok) throw new Error("Failed to fetch post");
        const data = await res.json();
        setPost(data);
      } catch (error: unknown) {
        console.error("Fetch error:", error);
        if (error instanceof Error) {
          if (
            error.name === "AbortError" ||
            error.message.includes("timeout")
          ) {
            setError(
              "Backend connection timeout. Please start the backend server.",
            );
          } else if (
            error.message.includes("fetch") ||
            error.message.includes("Failed to fetch")
          ) {
            setError(
              "Could not connect to backend. Please make sure it's running on port 5000.",
            );
          } else {
            setError("Failed to load blog post");
          }
        } else {
          setError("Failed to load blog post");
        }
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <div className="mt-4 text-zinc-400 font-medium">Loading Story...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6 px-6">
        <h1 className="text-4xl font-bold text-red-400">Error Loading Post</h1>
        <p className="text-zinc-400 text-center max-w-md">{error}</p>
        <Link
          href="/blog"
          className="px-8 py-3 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">
        <h1 className="text-4xl font-bold">Post Not Found</h1>
        <Link
          href="/blog"
          className="px-8 py-3 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white selection:bg-primary/30">
      <HeroHeader />

      <main className="pt-32 pb-24">
        <article className="mx-auto max-w-4xl px-6">
          {/* Header */}
          <header className="space-y-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-primary"
            >
              <span>{post.category}</span>
              <span className="w-1 h-1 rounded-full bg-zinc-800" />
              <span className="text-zinc-500">{post.date}</span>
            </motion.div>

            <TextEffect
              preset="fade-in-blur"
              as="h1"
              className="text-4xl md:text-6xl font-bold leading-tight"
            >
              {post.title}
            </TextEffect>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-4 py-6 border-y border-white/10"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-purple-500" />
              <div>
                <div className="font-bold text-white">Editorial Team</div>
                <div className="text-sm text-zinc-500">
                  {post.readTime} read
                </div>
              </div>
            </motion.div>
          </header>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[21/9] rounded-[3rem] overflow-hidden border border-white/10 mb-16"
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-none"
          >
            <div
              className="text-zinc-300 leading-relaxed space-y-6
                            [&>h1]:text-4xl [&>h1]:font-bold [&>h1]:text-white [&>h1]:mt-12 [&>h1]:mb-6
                            [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-white [&>h2]:mt-10 [&>h2]:mb-4
                            [&>p]:text-lg [&>p]:leading-relaxed [&>p]:mb-6
                            [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6
                            [&>li]:mb-2"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </motion.div>

          {/* Footer / CTA */}
          <footer className="mt-24 pt-12 border-t border-white/10 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-3 text-zinc-400 hover:text-white transition-colors group"
            >
              <span className="group-hover:-translate-x-2 transition-transform">
                ←
              </span>
              Back to Insights
            </Link>
          </footer>
        </article>
      </main>

      <FooterSection />
    </div>
  );
}
