'use client'
import React from 'react'
import Link from "next/link"
import Layout from "@/components/layout/Layout"
import Subscribe from '@/components/sections/home2/Subscribe'
import { useState } from "react"

export default function Contact_Page() {

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="boxed_wrapper">
            <Layout headerStyle={3} footerStyle={2} breadcrumbTitle="Contact">
                <section className="contact-section p_relative pt_110 pb_30">
                    <div className="auto-container">
                        <div className="row clearfix">
                            <div className="col-lg-4 col-md-12 col-sm-12 info-column">
                                <div className="contact-info-inner">
                                    <div className="sec-title mb_40 sec-title-animation animation-style2">
                                        <span className="sub-title mb_10 title-animation">Get in Touch</span>
                                        <h2 className="title-animation">Contact Information</h2>
                                        <p className="bec-contact-intro">Have questions about our services or memberships? We're here to help.</p>
                                    </div>
                                    <div className="info-box">
                                        <div className="single-item">
                                            <div className="icon-box"><img src="assets/images/icons/icon-27.png" alt=""/></div>
                                            <div className="text">
                                                <h4>Location</h4>
                                                <p>Dhaka, Bangladesh</p>
                                            </div>
                                        </div>
                                        <div className="single-item">
                                            <div className="icon-box"><img src="assets/images/icons/icon-28.png" alt=""/></div>
                                            <div className="text">
                                                <h4>Email Address</h4>
                                                <p><Link href="mailto:info@bec.com.bd">info@bec.com.bd</Link></p>
                                            </div>
                                        </div>
                                        <div className="single-item">
                                            <div className="icon-box"><img src="assets/images/icons/icon-29.png" alt=""/></div>
                                            <div className="text">
                                                <h4>Phone Number</h4>
                                                <p>+880 1700-000000</p>
                                            </div>
                                        </div>
                                        <div className="single-item">
                                            <div className="icon-box"><img src="assets/images/icons/icon-27.png" alt=""/></div>
                                            <div className="text">
                                                <h4>LinkedIn</h4>
                                                <p><Link href="https://www.linkedin.com/company/bangladesh-executive-chamber/" target="_blank" rel="noreferrer">Bangladesh Executive Chamber</Link></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8 col-md-12 col-sm-12 form-column">
                                <div className="form-inner">
                                    <div className="sec-title mb_40 sec-title-animation animation-style2">
                                        <span className="sub-title mb_10 title-animation">Send Us a Message</span>
                                        <h2 className="title-animation">We'd Love to Hear From You</h2>
                                    </div>
                                    {submitted ? (
                                        <div className="bec-form-success">
                                            <div className="icon-box"><i className="icon-28"></i></div>
                                            <h3>Your message has been sent successfully!</h3>
                                            <p>Thank you for reaching out. Our team will get back to you shortly.</p>
                                        </div>
                                    ) : (
                                        <form method="post" action="/contact" onSubmit={handleSubmit}>
                                            <div className="row clearfix">
                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                    <label>Full Name <span>*</span></label>
                                                    <input type="text" name="name" placeholder="Your full name" required/>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                    <label>Email Address <span>*</span></label>
                                                    <input type="email" name="email" placeholder="Your email address" required/>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                    <label>Phone Number <span>*</span></label>
                                                    <input type="text" name="phone" placeholder="Your phone number" required/>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                    <label>Subject <span>*</span></label>
                                                    <input type="text" name="subject" placeholder="How can we help?" required/>
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                    <label>Message <span>*</span></label>
                                                    <textarea name="message" placeholder="Write your message here..."></textarea>
                                                </div>
                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                    <div className="message-btn">
                                                        <button type="submit" className="theme-btn btn-one">Send Message</button>
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
                <section className="google-map-section pb_80">
                    <div className="auto-container">
                        <iframe src="https://www.google.com/maps?q=Dhaka,Bangladesh&output=embed" width="100%" height="570" style={{ border: 0 }} allowFullScreen loading="lazy"></iframe>
                    </div>
                </section>
                <Subscribe/>

            </Layout>
        </div>
    )
}