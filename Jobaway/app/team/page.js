'use client'
import React from 'react'
import Link from "next/link"
import Layout from "@/components/layout/Layout"
import Subscribe from '@/components/sections/home2/Subscribe'

export default function Team_Page() {

    return (
        <div className="boxed_wrapper">
            <Layout headerStyle={3} footerStyle={2} breadcrumbTitle="Our Team">
                <section className="team-section centred pt_110 pb_70">
                    <div className="pattern-layer" style={{ backgroundImage: "url(assets/images/shape/shape-2.png)" }}></div>
                    <div className="auto-container">
                        <div className="sec-title pb_60 sec-title-animation animation-style2">
                            <span className="sub-title mb_10 title-animation">Leadership</span>
                            <h2 className="title-animation">Meet Our Leadership</h2>
                            <p className="bec-leadership-intro">The visionary professionals driving Bangladesh's premier executive network.</p>
                        </div>
                        <div className="row clearfix">
                            <div className="col-lg-3 col-md-6 col-sm-12 team-block">
                                <div className="team-block-one wow fadeInUp animated" data-wow-delay="00ms" data-wow-duration="1500ms">
                                    <div className="inner-box">
                                        <div className="image-box">
                                            <div className="bec-avatar">MRH</div>
                                        </div>
                                        <div className="lower-content">
                                            <h3><Link href="https://www.linkedin.com/company/bangladesh-executive-chamber/" target="_blank" rel="noreferrer">Md. Rakibul Hasan</Link></h3>
                                            <span className="designation">Founder &amp; Chief Executive</span>
                                            <p className="bec-bio">Passionate leader dedicated to fostering a professional ecosystem in Bangladesh through innovation and strategic growth.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12 team-block">
                                <div className="team-block-one wow fadeInUp animated" data-wow-delay="200ms" data-wow-duration="1500ms">
                                    <div className="inner-box">
                                        <div className="image-box">
                                            <div className="bec-avatar">FI</div>
                                        </div>
                                        <div className="lower-content">
                                            <h3><Link href="https://www.linkedin.com/company/bangladesh-executive-chamber/" target="_blank" rel="noreferrer">Farhana Islam</Link></h3>
                                            <span className="designation">Head of Talent Solutions</span>
                                            <p className="bec-bio">Passionate leader dedicated to fostering a professional ecosystem in Bangladesh through innovation and strategic growth.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12 team-block">
                                <div className="team-block-one wow fadeInUp animated" data-wow-delay="400ms" data-wow-duration="1500ms">
                                    <div className="inner-box">
                                        <div className="image-box">
                                            <div className="bec-avatar">TA</div>
                                        </div>
                                        <div className="lower-content">
                                            <h3><Link href="https://www.linkedin.com/company/bangladesh-executive-chamber/" target="_blank" rel="noreferrer">Tanvir Ahmed</Link></h3>
                                            <span className="designation">Director, Business Consulting</span>
                                            <p className="bec-bio">Passionate leader dedicated to fostering a professional ecosystem in Bangladesh through innovation and strategic growth.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-12 team-block">
                                <div className="team-block-one wow fadeInUp animated" data-wow-delay="600ms" data-wow-duration="1500ms">
                                    <div className="inner-box">
                                        <div className="image-box">
                                            <div className="bec-avatar">NJ</div>
                                        </div>
                                        <div className="lower-content">
                                            <h3><Link href="https://www.linkedin.com/company/bangladesh-executive-chamber/" target="_blank" rel="noreferrer">Nusrat Jahan</Link></h3>
                                            <span className="designation">Lead, Training &amp; Development</span>
                                            <p className="bec-bio">Passionate leader dedicated to fostering a professional ecosystem in Bangladesh through innovation and strategic growth.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="join-section centred pt_120 pb_120">
                    <div className="auto-container">
                        <div className="content-box">
                            <div className="sec-title pb_20 sec-title-animation animation-style2">
                                <span className="sub-title mb_10 title-animation">Join Our Network</span>
                                <h2 className="title-animation">Grow with Bangladesh's Premier Executive Network.</h2>
                            </div>
                            <div className="text-box">
                                <p>Be part of a professional community where talent, ambition, and opportunity <br />come together to build the future of Bangladesh's workforce.</p>
                                <Link href="/contact" className="theme-btn btn-one">Contact Us</Link>
                            </div>
                        </div>
                    </div>
                </section>
                <Subscribe/>

            </Layout>
        </div>
    )
}