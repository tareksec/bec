'use client'
import React from 'react'
import Link from "next/link"
import Layout from "@/components/layout/Layout"
import Subscribe from '@/components/sections/home2/Subscribe'

export default function Blog_Details() {

    return (
        <div className="boxed_wrapper">
            <Layout headerStyle={3} footerStyle={2} breadcrumbTitle="Blog Details">
                
                <section className="sidebar-page-container p_relative pt_110 pb_120">
                    <div className="auto-container">
                        <div className="row clearfix">
                            <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
                                <div className="blog-sidebar mr_40 mb_30">
                                    <div className="search-widget mb_60">
                                        <div className="search-form">
                                            <form method="post" action="/blog-details">
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
                                                <li><Link href="/blog">Career Tips</Link></li>
                                                <li><Link href="/blog">Business</Link></li>
                                                <li><Link href="/blog">Industry Insights</Link></li>
                                                <li><Link href="/blog">Training</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="sidebar-widget post-widget mb_60">
                                        <div className="widget-title mb_20">
                                            <h3>Latest Posts</h3>
                                        </div>
                                        <div className="post-inner">
                                            <div className="post">
                                                <figure className="post-thumb"><Link href="/blog-details"><img src="assets/images/news/post-1.jpg" alt=""/></Link></figure>
                                                <h6><Link href="/blog-details">Building a Personal Brand That Opens Doors</Link></h6>
                                                <span className="post-date">March 20, 2023</span>
                                            </div>
                                            <div className="post">
                                                <figure className="post-thumb"><Link href="/blog-details"><img src="assets/images/news/post-2.jpg" alt=""/></Link></figure>
                                                <h6><Link href="/blog-details">Five Hiring Mistakes Growing Companies Make</Link></h6>
                                                <span className="post-date">March 19, 2023</span>
                                            </div>
                                            <div className="post">
                                                <figure className="post-thumb"><Link href="/blog-details"><img src="assets/images/news/post-3.jpg" alt=""/></Link></figure>
                                                <h6><Link href="/blog-details">Why Networking Still Wins in a Digital Economy</Link></h6>
                                                <span className="post-date">March 18, 2023</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sidebar-widget tags-widget mb_45">
                                        <div className="widget-title mb_20">
                                            <h3>Popular Topics</h3>
                                        </div>
                                        <div className="widget-content">
                                            <ul className="tags-list clearfix">
                                                <li><Link href="/blog">Career Tips</Link></li>
                                                <li><Link href="/blog">Business</Link></li>
                                                <li><Link href="/blog">Industry Insights</Link></li>
                                                <li><Link href="/blog">Training</Link></li>
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
                                <div className="blog-details-content">
                                    <div className="news-block-two">
                                        <div className="inner-box">
                                            <div className="image-box">
                                                <figure className="image"><img src="assets/images/news/news-15.jpg" alt=""/></figure>
                                            </div>
                                            <div className="lower-content">
                                                <span className="category">Career Tips</span>
                                                <h3>Building a Personal Brand That Opens Doors</h3>
                                                <ul className="post-info">
                                                    <li>By <Link href="/blog-details">BEC Editorial Team</Link></li>
                                                    <li><span>March 20, 2023</span></li>
                                                </ul>
                                            </div>
                                            <div className="text-box pt_25 mb_50">
                                                <p className="mb_30">Your personal brand is what people say about you when you are not in the room. In Bangladesh's fast-growing corporate landscape, professionals who communicate their value clearly move faster.</p>
                                                <p className="mb_40">Whether you are a fresh graduate entering the market or a seasoned executive changing direction, a deliberate personal brand turns opportunity into invitation. It is not about self-promotion — it is about clarity: knowing what you stand for, who you serve, and what you deliver.</p>
                                                <blockquote>
                                                    <div className="icon-box"><i className="icon-36"></i></div>
                                                    <h4>Why your professional reputation is your most valuable career asset — and how to build it deliberately.</h4>
                                                    <h3>BEC Editorial Team</h3>
                                                </blockquote>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="two-column">
                                        <div className="row clearfix">
                                            <div className="col-lg-6 col-md-6 col-sm-12 image-column">
                                                <figure className="image-box mb_25"><img src="assets/images/news/news-17.jpg" alt=""/></figure>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12 image-column">
                                                <figure className="image-box mb_25"><img src="assets/images/news/news-18.jpg" alt=""/></figure>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="content-one mb_40">
                                        <h3>Three Steps to a Stronger Brand</h3>
                                        <p>Start with an honest audit of how you are currently perceived, then build outward with consistency. Your LinkedIn profile, your conversations, and your delivery should all tell the same story.</p>
                                        <h4>Your Gateway to Career Growth</h4>
                                        <ul className="list-item clearfix">
                                            <li>Define the value you bring in one clear sentence.</li>
                                            <li>Share your expertise consistently — write, speak, and contribute.</li>
                                            <li>Network with intention, not just volume.</li>
                                        </ul>
                                    </div>
                                    <div className="post-share-option mb_60">
                                        <ul className="tags-list">
                                            <li><h6>Tags:</h6></li>
                                            <li><Link href="/blog">Career Tips</Link></li>
                                            <li><Link href="/blog">Personal Branding</Link></li>
                                        </ul>
                                        <ul className="social-links"> 
                                            <li><h6>Share This :</h6></li>
                                            <li><Link href="/blog-details"><i className="icon-22"></i></Link></li>
                                            <li><Link href="/blog-details"><i className="icon-23"></i></Link></li>
                                            <li><Link href="/blog-details"><i className="icon-24"></i></Link></li>
                                        </ul>
                                    </div>
                                    <div className="comment-box">
                                        <div className="group-title mb_25"><h3>Write Comment</h3></div>
                                        <div className="form-inner">
                                            <form method="post" action="/blog-details">
                                                <div className="row clearfix">
                                                    <div className="col-lg-6 col-md-6 col-sm-12 single-column">
                                                        <div className="form-group">
                                                            <label>Name <span>*</span></label>
                                                            <input type="text" name="name"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-12 single-column">
                                                        <div className="form-group">
                                                            <label>Email <span>*</span></label>
                                                            <input type="email" name="email"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-sm-12 single-column">
                                                        <div className="form-group">
                                                            <label>Message <span>*</span></label>
                                                            <textarea name="message"></textarea>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-sm-12 single-column">
                                                        <div className="check-box mb_35">
                                                            <input className="check" type="checkbox" id="checkbox9"/>
                                                            <label for="checkbox9">Save my name, email, and website in this browser for the next time I comment.</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-sm-12 single-column">
                                                        <div className="message-btn">
                                                            <button type="submit" className="theme-btn btn-one">Submit Comment</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
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