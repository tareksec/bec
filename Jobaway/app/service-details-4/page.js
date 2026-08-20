'use client'
import React from 'react'
import Link from "next/link"
import Layout from "@/components/layout/Layout"
import Subscribe from '@/components/sections/home2/Subscribe'

export default function Service_Details_Four() {

    return (
        <div className="boxed_wrapper">
            <Layout headerStyle={3} footerStyle={2} breadcrumbTitle="Networking Platforms">

            <section className="service-details pt_110 pb_120">
                <div className="auto-container">
                    <div className="row clearfix">
                        <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
                            <div className="service-sidebar mr_40">
                                <div className="category-widget mb_40">
                                    <ul className="category-list clearfix">
                                        <li><Link href="/service-details">Talent Acquisition &amp; HR <i className="icon-42"></i></Link></li>
                                        <li><Link href="/service-details-2">Training &amp; Workshops <i className="icon-42"></i></Link></li>
                                        <li><Link href="/service-details-3">Business Consulting <i className="icon-42"></i></Link></li>
                                        <li><Link href="/service-details-4" className="current">Networking Platforms <i className="icon-42"></i></Link></li>
                                    </ul>
                                </div>
                                <div className="download-widget">
                                    <div className="shape" style={{ backgroundImage: "url(assets/images/shape/shape-24.png)" }}></div>
                                    <div className="inner-box">
                                        <div className="icon-box bec-cta-icon"><i className="icon-28"></i></div>
                                        <h4>Ready to grow your network?</h4>
                                        <Link href="/contact" className="theme-btn btn-one">Discuss with an Expert</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-12 col-sm-12 content-side">
                            <div className="service-details-content">
                                <div className="sec-title mb_70">
                                    <span className="sub-title mb_10">Networking Platforms</span>
                                    <h2>Meaningful Connections That Drive Collaboration</h2>
                                    <p className="mt_20">Facilitating meaningful connections through digital media and exclusive events that drive collaboration.</p>
                                </div>
                                <figure className="image-box mb_30"><img src="assets/images/service/service-11.jpg" alt=""/></figure>
                                <div className="text-box mb_70">
                                    <h2>What We Offer</h2>
                                    <p>Purpose-built spaces — online and offline — where professionals meet, share ideas, and build relationships that move careers forward.</p>
                                </div>
                                <div className="text-box mb_70">
                                    <ul className="list-item bec-feature-list clearfix">
                                        <li>Professional visibility enhancement</li>
                                        <li>LinkedIn profile growth</li>
                                        <li>Exclusive industry events</li>
                                        <li>Peer-to-peer collaboration</li>
                                        <li>Direct mentor access</li>
                                    </ul>
                                </div>
                                <div className="text-box">
                                    <h2>Our Approach</h2>
                                    <p className="mb_25">We believe opportunity travels through relationships. Our platforms are designed to put the right people in the same room — physically or digitally.</p>
                                    <p>From curated industry events to active online communities, we help members build the networks that open doors.</p>
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