'use client'
import React from 'react'
import Link from "next/link"
import Layout from "@/components/layout/Layout"
import Subscribe from '@/components/sections/home2/Subscribe'

export default function Service_Details_Two() {

    return (
        <div className="boxed_wrapper">
            <Layout headerStyle={3} footerStyle={2} breadcrumbTitle="Training & Workshops">

            <section className="service-details pt_110 pb_120">
                <div className="auto-container">
                    <div className="row clearfix">
                        <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
                            <div className="service-sidebar mr_40">
                                <div className="category-widget mb_40">
                                    <ul className="category-list clearfix">
                                        <li><Link href="/service-details">Talent Acquisition &amp; HR <i className="icon-42"></i></Link></li>
                                        <li><Link href="/service-details-2" className="current">Training &amp; Workshops <i className="icon-42"></i></Link></li>
                                        <li><Link href="/service-details-3">Business Consulting <i className="icon-42"></i></Link></li>
                                        <li><Link href="/service-details-4">Networking Platforms <i className="icon-42"></i></Link></li>
                                    </ul>
                                </div>
                                <div className="download-widget">
                                    <div className="shape" style={{ backgroundImage: "url(assets/images/shape/shape-24.png)" }}></div>
                                    <div className="inner-box">
                                        <div className="icon-box bec-cta-icon"><i className="icon-28"></i></div>
                                        <h4>Ready to upskill your team?</h4>
                                        <Link href="/contact" className="theme-btn btn-one">Discuss with an Expert</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-12 col-sm-12 content-side">
                            <div className="service-details-content">
                                <div className="sec-title mb_70">
                                    <span className="sub-title mb_10">Training &amp; Workshops</span>
                                    <h2>Empowering the Next Generation of Leaders</h2>
                                    <p className="mt_20">Sessions on soft skills, leadership, and technical career readiness. Empowering the next generation of leaders.</p>
                                </div>
                                <figure className="image-box mb_30"><img src="assets/images/service/service-9.jpg" alt=""/></figure>
                                <div className="text-box mb_70">
                                    <h2>What We Offer</h2>
                                    <p>Practical, hands-on programs designed to build confidence, communication, and career readiness at every stage of your professional journey.</p>
                                </div>
                                <div className="text-box mb_70">
                                    <ul className="list-item bec-feature-list clearfix">
                                        <li>Effective communication skills</li>
                                        <li>Leadership &amp; management training</li>
                                        <li>Professional CV building</li>
                                        <li>Interview preparation &amp; tactics</li>
                                        <li>Personalized career coaching</li>
                                    </ul>
                                </div>
                                <div className="text-box">
                                    <h2>Our Approach</h2>
                                    <p className="mb_25">Every program is designed with the Bangladesh professional in mind, combining global best practices with local market realities.</p>
                                    <p>From fresh graduates to mid-career professionals, our workshops give you the skills that employers actually look for.</p>
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