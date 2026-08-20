'use client'
import React from 'react'
import Link from "next/link"
import Image from "next/image"
import Layout from "@/components/layout/Layout"
import Subscribe from '@/components/sections/home2/Subscribe'
import { useState } from "react"

export default function Faq_Page() {

    const [isActive, setActive] = useState(1);
    const handleToggle = (key) => {
        setActive(isActive === key ? 0 : key);
    };

    return (
        <div className="boxed_wrapper">
            <Layout headerStyle={3} footerStyle={2} breadcrumbTitle="FAQ">
                <section className="testimonial-page-section p_relative pt_110 pb_120">
                    <div className="auto-container">
                        <div className="row clearfix">
                            <div className="col-lg-6 col-md-12 col-sm-12 content-column">
                                <div className="content_block_three">
                                    <div className="block-content">
                                        <div className="sec-title mb_50 sec-title-animation animation-style2">
                                            <span className="sub-title mb_10 title-animation">FAQ</span>
                                            <h2 className="title-animation">Frequently Asked Questions</h2>
                                        </div>
                                        <div className="accordion-box">
                                            <div className="accordion-block active-block">
                                                <div className="accordion-btn" onClick={() => handleToggle(1)}>
                                                    <h4>What is Bangladesh Executive Chamber (BEC)?</h4>
                                                    <span className={isActive === 1 ? "icon-box active" : "icon-box"}><i className="icon-21"></i></span>
                                                </div>
                                                {isActive === 1 && (
                                                    <div className="accordion-content">
                                                        <p>BEC is a professional ecosystem in Bangladesh focused on career development, business consulting, talent acquisition, and professional networking. We bridge the gap between talented professionals and leading organizations nationwide.</p>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="accordion-block">
                                                <div className="accordion-btn" onClick={() => handleToggle(2)}>
                                                    <h4>Who can join BEC?</h4>
                                                    <span className={isActive === 2 ? "icon-box active" : "icon-box"}><i className="icon-21"></i></span>
                                                </div>
                                                {isActive === 2 && (
                                                    <div className="accordion-content">
                                                        <p>BEC welcomes fresh graduates, mid-career professionals, entrepreneurs, and corporate organizations. Whether you are seeking career growth or business consulting, BEC has a membership tier suited for you.</p>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="accordion-block">
                                                <div className="accordion-btn" onClick={() => handleToggle(3)}>
                                                    <h4>What services does BEC provide?</h4>
                                                    <span className={isActive === 3 ? "icon-box active" : "icon-box"}><i className="icon-21"></i></span>
                                                </div>
                                                {isActive === 3 && (
                                                    <div className="accordion-content">
                                                        <p>BEC offers four core services: Talent Acquisition &amp; HR (connecting professionals with top companies), Business Consulting (strategy and growth guidance), Training &amp; Workshops (skill development programs), and Networking Platforms (professional visibility).</p>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="accordion-block">
                                                <div className="accordion-btn" onClick={() => handleToggle(4)}>
                                                    <h4>How do I register for BEC training events?</h4>
                                                    <span className={isActive === 4 ? "icon-box active" : "icon-box"}><i className="icon-21"></i></span>
                                                </div>
                                                {isActive === 4 && (
                                                    <div className="accordion-content">
                                                        <p>Visit the Training &amp; Events page on our website. Each upcoming workshop or seminar has a Register button. Fill in your details and complete the secure payment to confirm your seat.</p>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="accordion-block">
                                                <div className="accordion-btn" onClick={() => handleToggle(5)}>
                                                    <h4>Is BEC membership available nationwide?</h4>
                                                    <span className={isActive === 5 ? "icon-box active" : "icon-box"}><i className="icon-21"></i></span>
                                                </div>
                                                {isActive === 5 && (
                                                    <div className="accordion-content">
                                                        <p>Yes. While our headquarters are in Dhaka, BEC operates nationwide. Our consulting services and training programs are accessible across all 64 districts through both in-person and digital platforms.</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 image-column">
                                <figure className="image-box ml_70"><Image src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80" alt="FAQ" width={500} height={600} style={{ width: '100%', height: 'auto', objectFit: 'cover' }}/></figure>
                            </div>
                        </div>
                    </div>
                </section>
                <Subscribe/>

            </Layout>
        </div>
    )
}