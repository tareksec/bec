'use client'
import React from 'react'
import Link from "next/link"
import Image from "next/image"
import Layout from "@/components/layout/Layout"
import Subscribe from '@/components/sections/home2/Subscribe'

export default function Service_Page() {

    return (
        <div className="boxed_wrapper">
            <Layout headerStyle={3} footerStyle={2} breadcrumbTitle="Our Services">

            <section className="service-section centred pt_110 pb_120">
                <div className="auto-container">
                    <div className="sec-title pb_60 sec-title-animation animation-style2">
                        <span className="sub-title mb_10 title-animation">What We Do</span>
                        <h2 className="title-animation">Comprehensive Solutions for Excellence</h2>
                        <p className="bec-services-intro">Comprehensive solutions for individuals and organizations aiming for excellence.</p>
                    </div>
                    <div className="row clearfix">
                        <div className="col-lg-3 col-md-6 col-sm-12 service-block">
                            <div className="service-block-one wow fadeInUp animated" data-wow-delay="00ms" data-wow-duration="1500ms">
                                <div className="inner-box">
                                    <div className="image-box">
                                        <figure className="image"><Link href="/service-details"><Image src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80" alt="Talent Acquisition" width={300} height={200} style={{ width: '100%', height: 'auto', objectFit: 'cover' }}/></Link></figure>
                                        <figure className="overlay-image"><Link href="/service-details"><Image src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80" alt="Talent Acquisition" width={300} height={200} style={{ width: '100%', height: 'auto', objectFit: 'cover' }}/></Link></figure>
                                    </div>
                                    <div className="lower-content">
                                        <h3><Link href="/service-details">Talent Acquisition &amp; HR</Link></h3>
                                        <p>Connecting skilled professionals with reputable organizations.</p>
                                        <div className="btn-box"><Link href="/service-details" className="theme-btn btn-one">View Details</Link></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12 service-block">
                            <div className="service-block-one wow fadeInUp animated" data-wow-delay="300ms" data-wow-duration="1500ms">
                                <div className="inner-box">
                                    <div className="image-box">
                                        <figure className="image"><Link href="/service-details-2"><Image src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80" alt="Training and Workshops" width={300} height={200} style={{ width: '100%', height: 'auto', objectFit: 'cover' }}/></Link></figure>
                                        <figure className="overlay-image"><Link href="/service-details-2"><Image src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80" alt="Training and Workshops" width={300} height={200} style={{ width: '100%', height: 'auto', objectFit: 'cover' }}/></Link></figure>
                                    </div>
                                    <div className="lower-content">
                                        <h3><Link href="/service-details-2">Training &amp; Workshops</Link></h3>
                                        <p>Empowering the next generation of leaders.</p>
                                        <div className="btn-box"><Link href="/service-details-2" className="theme-btn btn-one">View Details</Link></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12 service-block">
                            <div className="service-block-one wow fadeInUp animated" data-wow-delay="600ms" data-wow-duration="1500ms">
                                <div className="inner-box">
                                    <div className="image-box">
                                        <figure className="image"><Link href="/service-details-3"><Image src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80" alt="Business Consulting" width={300} height={200} style={{ width: '100%', height: 'auto', objectFit: 'cover' }}/></Link></figure>
                                        <figure className="overlay-image"><Link href="/service-details-3"><Image src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80" alt="Business Consulting" width={300} height={200} style={{ width: '100%', height: 'auto', objectFit: 'cover' }}/></Link></figure>
                                    </div>
                                    <div className="lower-content">
                                        <h3><Link href="/service-details-3">Business Consulting</Link></h3>
                                        <p>Strategic guidance for business development and growth.</p>
                                        <div className="btn-box"><Link href="/service-details-3" className="theme-btn btn-one">View Details</Link></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12 service-block">
                            <div className="service-block-one wow fadeInUp animated" data-wow-delay="900ms" data-wow-duration="1500ms">
                                <div className="inner-box">
                                    <div className="image-box">
                                        <figure className="image"><Link href="/service-details-4"><Image src="https://images.unsplash.com/photo-1515169067868-5387ec356754?w=600&q=80" alt="Networking Platforms" width={300} height={200} style={{ width: '100%', height: 'auto', objectFit: 'cover' }}/></Link></figure>
                                        <figure className="overlay-image"><Link href="/service-details-4"><Image src="https://images.unsplash.com/photo-1515169067868-5387ec356754?w=600&q=80" alt="Networking Platforms" width={300} height={200} style={{ width: '100%', height: 'auto', objectFit: 'cover' }}/></Link></figure>
                                    </div>
                                    <div className="lower-content">
                                        <h3><Link href="/service-details-4">Networking Platforms</Link></h3>
                                        <p>Facilitating meaningful connections that drive collaboration.</p>
                                        <div className="btn-box"><Link href="/service-details-4" className="theme-btn btn-one">View Details</Link></div>
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