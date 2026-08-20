'use client'
import React from 'react'
import Link from "next/link"
import Layout from "@/components/layout/Layout"
import Subscribe from '@/components/sections/home2/Subscribe'
import { useState } from "react"

const blogPosts = [
    {
        id: 1,
        title: "Building a Personal Brand That Opens Doors",
        category: "Career Tips",
        excerpt: "Why your professional reputation is your most valuable career asset — and how to build it deliberately.",
        image: "assets/images/news/news-4.jpg",
        date: "March 20, 2023",
        author: "BEC Editorial Team",
    },
    {
        id: 2,
        title: "Five Hiring Mistakes Growing Companies Make",
        category: "Industry Insights",
        excerpt: "Recruitment errors quietly cost growing organizations far more than they realise.",
        image: "assets/images/news/news-5.jpg",
        date: "March 19, 2023",
        author: "BEC Editorial Team",
    },
    {
        id: 3,
        title: "Why Networking Still Wins in a Digital Economy",
        category: "Business",
        excerpt: "Digital tools amplify relationships — they do not replace them.",
        image: "assets/images/news/news-7.jpg",
        date: "March 18, 2023",
        author: "BEC Editorial Team",
    },
]

const blogCategories = ["All", "Career Tips", "Business", "Industry Insights", "Training"]

export default function Blog_Grid() {

    const [activeCategory, setActiveCategory] = useState("All")

    const filteredPosts = activeCategory === "All"
        ? blogPosts
        : blogPosts.filter((post) => post.category === activeCategory)

    return (
        <div className="boxed_wrapper">
            <Layout headerStyle={3} footerStyle={2} breadcrumbTitle="Insights & Resources">
                
                <section className="sidebar-page-container p_relative pt_110 pb_120">
                    <div className="auto-container">
                        <div className="row clearfix">
                            <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
                                <div className="blog-sidebar mr_40 mb_30">
                                    <div className="search-widget mb_60">
                                        <div className="search-form">
                                            <form method="post" action="/blog">
                                                <div className="form-group">
                                                    <input type="search" name="search-field" placeholder="Search insights..." required/>
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
                                                {blogCategories.map((category, index) => (
                                                    <li key={index}><Link href="#" onClick={(e) => { e.preventDefault(); setActiveCategory(category); }}>{category}</Link></li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="sidebar-widget tags-widget mb_45">
                                        <div className="widget-title mb_20">
                                            <h3>Popular Topics</h3>
                                        </div>
                                        <div className="widget-content">
                                            <ul className="tags-list clearfix">
                                                <li><Link href="#" onClick={(e) => { e.preventDefault(); setActiveCategory("Career Tips"); }}>Career Tips</Link></li>
                                                <li><Link href="#" onClick={(e) => { e.preventDefault(); setActiveCategory("Business"); }}>Business</Link></li>
                                                <li><Link href="#" onClick={(e) => { e.preventDefault(); setActiveCategory("Industry Insights"); }}>Industry Insights</Link></li>
                                                <li><Link href="#" onClick={(e) => { e.preventDefault(); setActiveCategory("Training"); }}>Training</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="sidebar-widget archives-widget">
                                        <div className="widget-title mb_11">
                                            <h3>Archives</h3>
                                        </div>
                                        <div className="widget-content">
                                            <ul className="archives-list clearfix">
                                                <li><Link href="/blog"><i className="fal fa-angle-right"></i>March 2023<span>(03)</span></Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8 col-md-12 col-sm-12 content-side">
                                <div className="blog-grid-content">
                                    <div className="sec-title pb_40 sec-title-animation animation-style2">
                                        <span className="sub-title mb_10 title-animation">Insights &amp; Resources</span>
                                        <h2 className="title-animation">Stay Ahead of the Curve</h2>
                                        <p className="bec-blog-intro">Stay updated with the latest industry trends, career tips, and business strategies.</p>
                                    </div>
                                    {filteredPosts.length > 0 ? (
                                        <div className="row clearfix">
                                            {filteredPosts.map((post) => (
                                                <div className="col-lg-6 col-md-6 col-sm-12 news-block" key={post.id}>
                                                    <div className="news-block-two wow fadeInUp animated" data-wow-delay="00ms" data-wow-duration="1500ms">
                                                        <div className="inner-box">
                                                            <div className="image-box">
                                                                <figure className="image"><Link href="/blog-details"><img src={post.image} alt=""/></Link></figure>
                                                                <figure className="overlay-image"><Link href="/blog-details"><img src={post.image} alt=""/></Link></figure>
                                                            </div>
                                                            <div className="lower-content">
                                                                <span className="category">{post.category}</span>
                                                                <h3><Link href="/blog-details">{post.title}</Link></h3>
                                                                <p className="bec-post-excerpt">{post.excerpt}</p>
                                                                <ul className="post-info">
                                                                    <li>By <Link href="/blog-details">{post.author}</Link></li>
                                                                    <li><span>{post.date}</span></li>
                                                                </ul>
                                                                <div className="btn-box mt_20"><Link href="/blog-details" className="theme-btn btn-one">Learn More</Link></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="bec-blog-empty">
                                            <div className="icon-box"><i className="icon-38"></i></div>
                                            <h3>Coming Soon</h3>
                                            <p>We are currently curating the best content for this category.</p>
                                            <Link href="/blog" className="theme-btn btn-one" onClick={(e) => { e.preventDefault(); setActiveCategory("All"); }}>View All Articles</Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <Subscribe/>

            </Layout>
        </div>
    )
}