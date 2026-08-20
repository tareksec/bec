'use client'
import React from 'react'
import Layout from "@/components/layout/Layout"
import Subscribe from '@/components/sections/home2/Subscribe'
import { useState } from "react"

export default function Testimonial_Page() {

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="boxed_wrapper">
            <Layout headerStyle={3} footerStyle={2} breadcrumbTitle="Reviews & Testimonials">
                <section className="testimonial-section p_relative pt_120 pb_120">
                    <div className="pattern-layer" style={{ backgroundImage: "url(assets/images/shape/shape-3.png)" }}></div>
                    <div className="auto-container">
                        <div className="sec-title mb_50 sec-title-animation animation-style2">
                            <span className="sub-title mb_10 title-animation">Reviews &amp; Testimonials</span>
                            <h2 className="title-animation">Words From Our Community</h2>
                            <p className="bec-reviews-intro">See what our members and partners are saying about their experience with BEC.</p>
                        </div>
                        <div className="bec-reviews-empty">
                            <div className="icon-box"><i className="icon-38"></i></div>
                            <h3>Reviews Coming Soon</h3>
                            <p>We are gathering feedback from our community.<br/>Your story could be featured here.</p>
                        </div>
                    </div>
                </section>
                <section className="bec-review-form-section pb_120">
                    <div className="auto-container">
                        <div className="row clearfix justify-content-center">
                            <div className="col-lg-8 col-md-12 col-sm-12">
                                <div className="bec-review-form-inner">
                                    <div className="group-title mb_30">
                                        <h2>Share Your Story</h2>
                                        <p>Help others by sharing your professional experience with BEC.</p>
                                    </div>
                                    {submitted ? (
                                        <div className="bec-form-success">
                                            <div className="icon-box"><i className="icon-28"></i></div>
                                            <h3>Your review has been submitted and is pending approval.</h3>
                                            <p>Thank you for sharing your experience with our community.</p>
                                        </div>
                                    ) : (
                                        <form method="post" action="/testimonial" onSubmit={handleSubmit}>
                                            <div className="row clearfix">
                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                    <label>Name <span>*</span></label>
                                                    <input type="text" name="name" placeholder="Your full name" required/>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                    <label>Designation <span>*</span></label>
                                                    <input type="text" name="designation" placeholder="Your designation" required/>
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                    <label>Your Review <span>*</span></label>
                                                    <textarea name="review" placeholder="Share your experience with BEC..."></textarea>
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                    <div className="message-btn">
                                                        <button type="submit" className="theme-btn btn-one">Submit Review</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
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