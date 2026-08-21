'use client'
import React, { useState, useEffect, Suspense } from 'react'
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import Layout from "@/components/layout/Layout"
import Subscribe from '@/components/sections/home2/Subscribe'
import { supabase } from '@/lib/supabase/client'

function BlogDetailsContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const slug = searchParams.get('slug')
    const id = searchParams.get('id')
    
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchPost() {
            if (!slug && !id) {
                setLoading(false)
                setError("No post slug provided.")
                return
            }
            
            setLoading(true)
            let query = supabase.from('posts').select('*')
            query = slug ? query.eq('slug', slug) : query.eq('id', id)
            let { data, error } = await query.single()

            // Keep old ID links working while all new links use slugs.
            if (error && slug && id) {
                ({ data, error } = await supabase.from('posts').select('*').eq('id', id).single())
            }
            
            if (error) {
                setError("Could not find this post.")
            } else if (data) {
                setPost(data)
            }
            setLoading(false)
        }
        fetchPost()
    }, [slug, id])

    const handleSearch = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const searchQuery = formData.get('q')
        router.push(`/blog?q=${encodeURIComponent(searchQuery)}`)
    }

    return (
        <Layout headerStyle={3} footerStyle={2} breadcrumbTitle={post ? post.title : "Blog Details"}>
            <section className="sidebar-page-container p_relative pt_110 pb_120">
                <div className="auto-container">
                    <div className="row clearfix">
                        <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
                            <div className="blog-sidebar mr_40 mb_30">
                                <div className="search-widget mb_60">
                                    <div className="search-form">
                                        <form onSubmit={handleSearch}>
                                            <div className="form-group">
                                                <input type="search" name="q" placeholder="Search insights..." required/>
                                                <button type="submit"><i className="icon-1"></i></button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="sidebar-widget category-widget mb_50">
                                    <div className="widget-title mb_11">
                                        <h3>Categories</h3>
                                    </div>
                                    <div className="widget-content">
                                        <ul className="category-list clearfix">
                                            <li><Link href="/blog">Career Tips</Link></li>
                                            <li><Link href="/blog">Business</Link></li>
                                            <li><Link href="/blog">Industry Insights</Link></li>
                                            <li><Link href="/blog">Training</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-12 col-sm-12 content-side">
                            <div className="blog-details-content">
                                {loading ? (
                                    <div className="loading-state">Loading post details...</div>
                                ) : error ? (
                                    <div className="error-state">
                                        <h3>{error}</h3>
                                        <Link href="/blog" className="theme-btn btn-one mt_20">Back to Blog</Link>
                                    </div>
                                ) : post ? (
                                    <>
                                        <div className="news-block-two">
                                            <div className="inner-box">
                                                <div className="image-box">
                                                    <figure className="image">
                                                        <img src={post.cover_image || "/assets/images/placeholder.svg"} alt={post.title} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                                                    </figure>
                                                </div>
                                                <div className="lower-content">
                                                    <span className="category">{post.category || "General"}</span>
                                                    <h3>{post.title}</h3>
                                                    <ul className="post-info">
                                                        <li>By <Link href="#">{post.author || "Admin"}</Link></li>
                                                        <li><span>{post.created_at ? new Date(post.created_at).toLocaleDateString() : '—'}</span></li>
                                                    </ul>
                                                </div>
                                                <div className="text-box pt_25 mb_50">
                                                    <p className="mb_30">{post.excerpt}</p>
                                                    <div style={{ whiteSpace: "pre-wrap" }}>
                                                        {post.content}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Subscribe/>
        </Layout>
    )
}

export default function Blog_Details() {
    return (
        <div className="boxed_wrapper">
            <Suspense fallback={<div>Loading...</div>}>
                <BlogDetailsContent />
            </Suspense>
        </div>
    )
}