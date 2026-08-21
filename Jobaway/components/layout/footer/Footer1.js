'use client'
import { useState } from "react"
import Link from "next/link"

export default function Footer1() {
    const [subscribed, setSubscribed] = useState(false)
    const handleSubscribe = (e) => {
        e.preventDefault()
        setSubscribed(true)
    }

    return (
        <>


        <footer className="main-footer">
            <div className="widget-section p_relative pt_80 pb_100">
                <div className="auto-container">
                    <div className="row clearfix">
                        <div className="col-lg-4 col-md-6 col-sm-12 footer-column">
                            <div className="footer-widget logo-widget mr_30">
                                <figure className="footer-logo mb_20"><Link href="/"><img src="assets/images/logo.png" alt=""/></Link></figure>
                                <p>A premium professional ecosystem dedicated to empowering careers and strengthening brands through strategic consulting, talent solutions, and dynamic networking.</p>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-12 footer-column">
                            <div className="footer-widget links-widget">
                                <div className="widget-title">
                                    <h4>Quick Links</h4>
                                </div>
                                <div className="widget-content">
                                    <ul className="links-list clearfix">
                                        <li><Link href="/">Home</Link></li>
                                        <li><Link href="/about">About Us</Link></li>
                                        <li><Link href="/service">Our Services</Link></li>
                                        <li><Link href="/team">Community</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-12 footer-column">
                            <div className="footer-widget links-widget">
                                <div className="widget-title">
                                    <h4>Explore</h4>
                                </div>
                                <div className="widget-content">
                                    <ul className="links-list clearfix">
                                        <li><Link href="/service-details">Events</Link></li>
                                        <li><Link href="/testimonial">Reviews</Link></li>
                                        <li><Link href="/blog">Blogs</Link></li>
                                        <li><Link href="/">Join BEC</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 footer-column">
                            <div className="footer-widget links-widget">
                                <div className="widget-title">
                                    <h4>Stay Updated</h4>
                                </div>
                                <div className="widget-content">
                                    <p className="mb_20">Subscribe to our newsletter for the latest insights, exclusive events, and elite career opportunities.</p>
                                    {!subscribed ? (
                                        <form className="bec-newsletter-form" onSubmit={handleSubscribe}>
                                            <div className="bec-newsletter-inner">
                                                <input type="email" name="email" placeholder="Enter your email address" required />
                                                <button type="submit" className="theme-btn btn-one">Subscribe</button>
                                            </div>
                                        </form>
                                    ) : (
                                        <p className="bec-newsletter-success">Subscribed! (Note: Automated email sending is not enabled yet)</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="auto-container">
                    <div className="bottom-inner">
                        <div className="copyright">
                            <p>Copyright &copy; {new Date().getFullYear()} <Link href="/">Bangladesh Executive Chamber</Link>. All Rights Reserved.</p>
                            <p className="bec-microcopy">Made with ❤️ in BD</p>
                            <p className="bec-legal-links">
                                <Link href="/privacy-policy">Privacy Policy</Link>
                                <span className="bec-sep">·</span>
                                <Link href="/terms-of-service">Terms of Service</Link>
                            </p>
                        </div>
                        <ul className="social-links">
                            <li><h5>Follow Us On:</h5></li>
                            <li><Link href="https://www.linkedin.com/company/bangladesh-executive-chamber/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>

        </>
    )
}
