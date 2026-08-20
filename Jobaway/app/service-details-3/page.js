'use client'
import React from 'react'
import Link from "next/link"
import Layout from "@/components/layout/Layout"
import Subscribe from '@/components/sections/home2/Subscribe'

export default function Service_Details_Three() {

    return (
        <div className="boxed_wrapper">
            <Layout headerStyle={3} footerStyle={2} breadcrumbTitle="Business Consulting">

            <section className="service-details pt_110 pb_120">
                <div className="auto-container">
                    <div className="row clearfix">
                        <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
                            <div className="service-sidebar mr_40">
                                <div className="category-widget mb_40">
                                    <ul className="category-list clearfix">
                                        <li><Link href="/service-details">Talent Acquisition &amp; HR <i className="icon-42"></i></Link></li>
                                        <li><Link href="/service-details-2">Training &amp; Workshops <i className="icon-42"></i></Link></li>
                                        <li><Link href="/service-details-3" className="current">Business Consulting <i className="icon-42"></i></Link></li>
                                        <li><Link href="/service-details-4">Networking Platforms <i className="icon-42"></i></Link></li>
                                    </ul>
                                </div>
                                <div className="download-widget">
                                    <div className="shape" style={{ backgroundImage: "url(assets/images/shape/shape-24.png)" }}></div>
                                    <div className="inner-box">
                                        <div className="icon-box bec-cta-icon"><i className="icon-28"></i></div>
                                        <h4>Ready to scale your business?</h4>
                                        <Link href="/contact" className="theme-btn btn-one">Discuss with an Expert</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-12 col-sm-12 content-side">
                            <div className="service-details-content">
                                <div className="sec-title mb_70">
                                    <span className="sub-title mb_10">Business Consulting</span>
                                    <h2>Strategic Guidance for Sustainable Growth</h2>
                                    <p className="mt_20">Strategic guidance for business development, sales, and corporate marketing. We help you scale with proven methodologies.</p>
                                </div>
                                <figure className="image-box mb_30"><img src="assets/images/service/service-10.jpg" alt=""/></figure>
                                <div className="text-box mb_70">
                                    <h2>What We Offer</h2>
                                    <p>Data-driven strategy and hands-on support to help your organization enter new markets, strengthen its brand, and grow with confidence.</p>
                                </div>
                                <div className="text-box mb_70">
                                    <ul className="list-item bec-feature-list clearfix">
                                        <li>Sales strategy development</li>
                                        <li>Marketing operations optimization</li>
                                        <li>Brand positioning &amp; identity</li>
                                        <li>In-depth market research</li>
                                        <li>Corporate growth planning</li>
                                    </ul>
                                </div>
                                <div className="text-box">
                                    <h2>Our Approach</h2>
                                    <p className="mb_25">We combine proven international frameworks with deep insight into the Bangladesh business environment.</p>
                                    <p>Whether you are a startup finding your footing or an established firm planning your next chapter, we partner with you to turn ambition into measurable results.</p>
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