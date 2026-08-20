'use client'
import React from 'react'
import Link from "next/link"
import Image from "next/image"
import Layout from "@/components/layout/Layout"
import CounterUp from "@/components/elements/CounterUp"
import Subscribe from '@/components/sections/home2/Subscribe'

export default function About_Page() {

    return (
        <div className="boxed_wrapper">
            <Layout headerStyle={3} footerStyle={2} breadcrumbTitle="About Us">
                <section className="about-style-four pt_120 pb_120">
                    <div className="auto-container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-md-12 col-sm-12 image-column">
                                <div className="image_block_two">
                                    <div className="image-inner">
                                        <div className="image-box mr_15">
                                            <figure className="image image-1 mb_15">
                                                <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80" alt="Team collaborating" width={300} height={400} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                                            </figure>
                                            <figure className="image image-2">
                                                <Image src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80" alt="Business meeting" width={300} height={400} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                                            </figure>
                                        </div>
                                        <div className="image-box">
                                            <figure className="image image-3 mb_15">
                                                <Image src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&q=80" alt="Professionals working" width={300} height={400} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                                            </figure>
                                            <figure className="image image-4">
                                                <Image src="https://images.unsplash.com/photo-1556761175-5973dc0f32b7?w=600&q=80" alt="Professional training" width={300} height={400} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                                            </figure>
                                        </div>
                                        <div className="support-box">
                                            <div className="icon-box"><i className="icon-28"></i></div>
                                            <span>Email Us</span>
                                            <h4><Link href="mailto:info@bec.com.bd">info@bec.com.bd</Link></h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 content-column">
                                <div className="content_block_five">
                                    <div className="content-box">
                                        <div className="sec-title pb_40 sec-title-animation animation-style2">
                                            <span className="sub-title mb_10 title-animation">Who We Are</span>
                                            <h2 className="title-animation">Promoting Brands. <span>Empowering Careers.</span></h2>
                                            <p className="title-animation">Our vision is to build a professional ecosystem where growth is accessible to all, bridging the gap between exceptional talent and industry-leading organizations.</p>
                                        </div>
                                        <div className="bec-mission-vision">
                                            <div className="bec-mv-item">
                                                <h4>Our Mission</h4>
                                                <p>To empower professionals across Bangladesh through specialized skill development, strategic branding, and industry-wide collaboration.</p>
                                            </div>
                                            <div className="bec-mv-item">
                                                <h4>Our Vision</h4>
                                                <p>To become the foremost professional hub in South Asia, recognized for producing elite leaders and fostering sustainable corporate innovation.</p>
                                            </div>
                                        </div>
                                        <div className="inner-box clearfix">
                                            <div className="single-item">
                                                <div className="icon-box"><i className="icon-29"></i></div>
                                                <h4>Career Empowerment</h4>
                                                <span>Skills &amp; opportunities</span>
                                            </div>
                                            <div className="single-item">
                                                <div className="icon-box"><i className="icon-30"></i></div>
                                                <h4>Professional Branding</h4>
                                                <span>Market presence</span>
                                            </div>
                                            <div className="single-item">
                                                <div className="icon-box"><i className="icon-31"></i></div>
                                                <h4>Corporate Solutions</h4>
                                                <span>Sales, marketing &amp; HR</span>
                                            </div>
                                            <div className="single-item">
                                                <div className="icon-box"><i className="icon-32"></i></div>
                                                <h4>Community Building</h4>
                                                <span>Leaders &amp; innovators</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="chooseus-section alternat-3 pt_120 pb_90">
                    <div className="pattern-layer" style={{ backgroundImage: "url(assets/images/shape/shape-23.png)" }}></div>
                    <div className="auto-container">
                        <div className="sec-title light centred pb_60 sec-title-animation animation-style2">
                            <span className="sub-title mb_10 title-animation">Our Values</span>
                            <h2 className="title-animation">What We Stand For</h2>
                        </div>
                        <div className="inner-container">
                            <div className="row clearfix">
                                <div className="col-lg-3 col-md-6 col-sm-12 chooseus-block">
                                    <div className="chooseus-block-one">
                                        <div className="inner-box">
                                            <div className="icon-box"><i className="icon-4"></i></div>
                                            <h3>Career Empowerment</h3>
                                            <p>Equipping professionals with the skills and opportunities they need to excel in their careers.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-12 chooseus-block">
                                    <div className="chooseus-block-one">
                                        <div className="inner-box">
                                            <div className="icon-box"><i className="icon-5"></i></div>
                                            <h3>Professional Branding</h3>
                                            <p>Helping individuals and companies define, enhance, and leverage their brand presence in the market.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-12 chooseus-block">
                                    <div className="chooseus-block-one">
                                        <div className="inner-box">
                                            <div className="icon-box"><i className="icon-6"></i></div>
                                            <h3>Corporate Solutions</h3>
                                            <p>Providing expert consulting in sales, marketing, and HR to drive business growth and operational excellence.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-12 chooseus-block">
                                    <div className="chooseus-block-one">
                                        <div className="inner-box">
                                            <div className="icon-box"><i className="icon-8"></i></div>
                                            <h3>Community Building</h3>
                                            <p>Fostering a strong network of leaders, innovators, and young professionals for collaborative success.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="funfact-section alternat-2 centred pt_110 pb_90">
                    <div className="auto-container">
                        <div className="sec-title centred pb_50 sec-title-animation animation-style2">
                            <span className="sub-title mb_10 title-animation">Our Journey</span>
                            <h2 className="title-animation">Milestones on the Path to Growth</h2>
                            <p className="bec-milestone-vision">Founded with a mission to bridge talent and industry.</p>
                        </div>
                        <div className="row clearfix">
                            <div className="col-lg-4 col-md-6 col-sm-12 funfact-block">
                                <div className="funfact-block-one">
                                    <div className="inner-box">
                                        <div className="bec-static-count">
                                            <CounterUp end={10} /><span className="symble">K+</span>
                                        </div>
                                        <p>Professionals onboarded and connected</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 funfact-block">
                                <div className="funfact-block-one">
                                    <div className="inner-box">
                                        <div className="bec-static-count">
                                            <CounterUp end={500} /><span className="symble">+</span>
                                        </div>
                                        <p>Partner organizations across Bangladesh</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 funfact-block">
                                <div className="funfact-block-one">
                                    <div className="inner-box">
                                        <div className="bec-static-count">
                                            <CounterUp end={150} /><span className="symble">+</span>
                                        </div>
                                        <p>Workshops and training sessions delivered</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="team-section z_1 centred pt_110 pb_90">
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
                                            <Image src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80" alt="Md. Rakibul Hasan" width={300} height={300} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
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
                                            <Image src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80" alt="Farhana Islam" width={300} height={300} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
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
                                            <Image src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80" alt="Tanvir Ahmed" width={300} height={300} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
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
                                            <Image src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80" alt="Nusrat Jahan" width={300} height={300} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
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

                <Subscribe/>

            </Layout>
        </div>
    )
}