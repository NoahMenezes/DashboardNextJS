'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { HeroHeader } from '@/components/header'
import FooterSection from '@/components/footer'
import { CreateBlogDialog } from '@/components/create-blog-dialog'
import { TextEffect } from '@/components/ui/text-effect'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { Trash2, Eye } from 'lucide-react'
import { apiClient } from '@/lib/api'
import { motion } from 'motion/react'

interface MyBlog {
    id: number
    title: string
    category: string
    imageUrl?: string
    content: string
    createdAt: string
    updatedAt: string
}

export default function MyBlogsPage() {
    const [blogs, setBlogs] = React.useState<MyBlog[]>([])
    const [loading, setLoading] = React.useState(true)
    const [isAuthenticated, setIsAuthenticated] = React.useState(false)

    const fetchMyBlogs = React.useCallback(async () => {
        try {
            const data = await apiClient.get('http://localhost:5000/api/user-blogs/my-blogs')
            setBlogs(data)
            setIsAuthenticated(true)
        } catch (error) {
            console.error('Failed to fetch my blogs:', error)
            setIsAuthenticated(false)
        } finally {
            setLoading(false)
        }
    }, [])

    React.useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            setLoading(false)
            setIsAuthenticated(false)
            return
        }
        fetchMyBlogs()
    }, [fetchMyBlogs])

    const handleDelete = async (blogId: number) => {
        if (!confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) return

        try {
            await apiClient.delete(`http://localhost:5000/api/user-blogs/${blogId}`)
            setBlogs(blogs.filter(blog => blog.id !== blogId))
        } catch (err) {
            console.error('Failed to delete blog:', err)
            alert('Failed to delete blog post')
        }
    }

    if (!isAuthenticated && !loading) {
        return (
            <div className="bg-black min-h-screen text-white selection:bg-primary/30">
                <HeroHeader />
                <main className="pt-32 pb-24">
                    <div className="mx-auto max-w-4xl px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-8"
                        >
                            <div className="w-24 h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                                <svg className="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold">Authentication Required</h1>
                            <p className="text-xl text-zinc-400">
                                Please login to view and manage your blog posts.
                            </p>
                            <div className="flex gap-4 justify-center pt-4">
                                <Link href="/login" className="px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold transition-all">
                                    Login
                                </Link>
                                <Link href="/signup" className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-bold transition-all">
                                    Sign Up
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </main>
                <FooterSection />
            </div>
        )
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="relative">
                    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                    <div className="mt-4 text-zinc-400 font-medium">Loading your blogs...</div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-black min-h-screen text-white selection:bg-primary/30">
            <HeroHeader />
            
            <main className="pt-32 pb-24">
                <section className="mx-auto max-w-7xl px-6">
                    <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
                        <div className="space-y-4">
                            <TextEffect
                                preset="fade-in-blur"
                                as="h1"
                                className="text-4xl md:text-5xl font-bold tracking-tight text-white"
                            >
                                My Blog Posts
                            </TextEffect>
                            <p className="text-zinc-400 max-w-md text-lg leading-relaxed">
                                Manage and view all your published blog posts.
                            </p>
                        </div>
                        <CreateBlogDialog onBlogCreated={fetchMyBlogs} />
                    </div>

                    {blogs.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
                                <svg className="w-12 h-12 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">No blogs yet</h3>
                            <p className="text-zinc-400 mb-6">Start sharing your thoughts by creating your first blog post!</p>
                            <CreateBlogDialog onBlogCreated={fetchMyBlogs} />
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
                                                duration: 0.6
                                            }
                                        },
                                    },
                                }}
                            >
                                {blogs.map((blog) => {
                                    const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })

                                    return (
                                        <div key={blog.id} className="relative group">
                                            <Link href={`/blog/user/${blog.id}`}>
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
                                                            <svg className="w-20 h-20 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                                                    <div className="absolute top-6 left-6 flex gap-2">
                                                        <span className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white">
                                                            {blog.category}
                                                        </span>
                                                    </div>

                                                    <div className="absolute bottom-6 left-6 right-6">
                                                        <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">
                                                            {formattedDate}
                                                        </div>
                                                        <h3 className="text-xl font-bold leading-tight text-white group-hover:text-primary transition-colors duration-300 line-clamp-2">
                                                            {blog.title}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </Link>
                                            
                                            {/* Action buttons */}
                                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                                <Link
                                                    href={`/blog/user/${blog.id}`}
                                                    className="p-3 bg-primary/90 hover:bg-primary rounded-full transition-all shadow-lg"
                                                    title="View blog"
                                                >
                                                    <Eye className="w-4 h-4 text-white" />
                                                </Link>
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        handleDelete(blog.id)
                                                    }}
                                                    className="p-3 bg-red-500/90 hover:bg-red-600 rounded-full transition-all shadow-lg"
                                                    title="Delete blog"
                                                >
                                                    <Trash2 className="w-4 h-4 text-white" />
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </AnimatedGroup>
                        </div>
                    )}
                </section>
            </main>

            <FooterSection />
        </div>
    )
}
