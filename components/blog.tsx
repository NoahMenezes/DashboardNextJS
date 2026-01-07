'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { TextEffect } from '@/components/ui/text-effect'
import { HeroHeader } from './header'
import FooterSection from './footer'
import { motion } from 'motion/react'

export function BlogSection() {
    const [posts, setPosts] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/blogs')
                if (!res.ok) throw new Error('Failed to fetch posts')
                const data = await res.json()
                setPosts(data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchPosts()
    }, [])

    if (loading) {
        return <div className="py-24 bg-black text-white text-center">Loading insights...</div>
    }

    return (
        <section className="relative py-24 overflow-hidden bg-black">
            <div className="mx-auto max-w-7xl px-6">
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
                    <div className="space-y-4">
                        <TextEffect
                            preset="fade-in-blur"
                            as="h2"
                            className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                            Latest Insights
                        </TextEffect>
                        <p className="text-zinc-400 max-w-md text-lg leading-relaxed">
                            Exploring the intersection of design, technology, and the future of digital experiences.
                        </p>
                    </div>
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
                                        duration: 0.6
                                    }
                                },
                            },
                        }}
                    >
                        {posts.map((post: any) => (
                            <Link key={post.id} href={`/blog/${post.id}`} className="block group">
                                <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] border border-white/10 bg-zinc-900 transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-[0_0_50px_-12px_rgba(var(--primary),0.2)]">
                                    <Image
                                        src={post.image || post.image_url}
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
                        ))}
                    </AnimatedGroup>
                </div>
            </div>

            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[150px] rounded-full -z-10 pointer-events-none animate-pulse" />
        </section>
    )
}

export default function BlogPage() {
    return (
        <div className="bg-black min-h-screen text-white selection:bg-primary/30">
            <HeroHeader />
            <main className="pt-20">
                <BlogSection />

                <section className="mx-auto max-w-7xl px-6 py-24 border-t border-white/5">
                    <div className="flex flex-col items-center justify-center space-y-8 text-center">
                        <h2 className="text-3xl font-bold">Stay Updated with Our Newsletter</h2>
                        <p className="text-zinc-400 max-w-lg">Get the latest news and industry insights delivered straight to your inbox.</p>
                        <div className="flex w-full max-w-md gap-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/20 transition-all"
                            />
                            <button className="px-8 py-4 rounded-2xl bg-white text-black font-bold hover:bg-zinc-200 transition-all">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </section>
            </main>
            <FooterSection />
        </div>
    )
}
