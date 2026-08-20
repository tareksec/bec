'use client'
import React from 'react'
import Link from "next/link"
import Layout from "@/components/layout/Layout"
import Subscribe from '@/components/sections/home2/Subscribe'

export default function Service_Details() {

    return (
        <div className="boxed_wrapper">
            <Layout headerStyle={3} footerStyle={2} breadcrumbTitle="Talent Acquisition & HR">

            <section className="service-details pt_110 pb_120">
                <div className="auto-container">
                    <div className="row clearfix">
                        <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
                            <div className="service-sidebar mr_40">
                                <div className="category-widget mb_40">
                                    <ul className="category-list clearfix">
                                        <li><Link href="/service-details" className="current">Talent Acquisition &amp; HR <i className="icon-42"></i></Link></li>
                                        <li><Link href="/service-details-2">Training &amp; Workshops <i className="icon-42"></i></Link></li>
                                        <li><Link href="/service-details-3">Business Consulting <i className="icon-42"></i></Link></li>
                                        <li><Link href="/service-details-4">Networking Platforms <i className="icon-42"></i></Link></li>
                                    </ul>
                                </div>
                                <div className="download-widget">
                                    <div className="shape" style={{ backgroundImage: "url(assets/images/shape/shape-24.png)" }}></div>
                                    <div className="inner-box">
                                        <div className="icon-box bec-cta-icon"><i className="icon-28"></i></div>
                                        <h4>Need the right people on your team?</h4>
                                        <Link href="/contact" className="theme-btn btn-one">Discuss with an Expert</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-12 col-sm-12 content-side">
                            <div className="service-details-content">
                                <div className="sec-title mb_70">
                                    <span className="sub-title mb_10">Talent Acquisition &amp; HR</span>
                                    <h2>Building High-Performing Teams</h2>
                                    <p className="mt_20">Connecting skilled professionals with reputable organizations. Building high-performing teams through strategic evaluation and cultural alignment.</p>
                                </div>
                                <figure className="image-box mb_30"><img src="assets/images/service/service-7.jpg" alt=""/></figure>
                                <div className="text-box mb_70">
                                    <h2>What We Offer</h2>
                                    <p>From initial screening to final selection, we manage every step of the hiring journey so you can focus on growing your organization.</p>
                                </div>
                                <div className="text-box mb_70">
                                    <ul className="list-item bec-feature-list clearfix">
                                        <li>CV screening and evaluation</li>
                                        <li>Strategic job matching</li>
                                        <li>Comprehensive HR consulting</li>
                                        <li>Candidate shortlisting</li>
                                        <li>Interview coordination</li>
                                    </ul>
                                </div>
                                <div className="text-box">
                                    <h2>Our Approach</h2>
                                    <p className="mb_25">We take time to understand your organization's culture, values, and long-term goals. Every candidate we present is evaluated not just for skill, but for alignment with your team.</p>
                                    <p>With deep knowledge of the Bangladesh talent market, we help organizations build teams that thrive and professionals find roles where they belong.</p>
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