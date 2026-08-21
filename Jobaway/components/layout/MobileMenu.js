'use client'
import Link from "next/link"
export default function MobileMenu({ isSidebar, handleMobileMenu, handleSidebar }) {
    return (
        <>
            <div className="mobile-menu">
                <div className="menu-backdrop" onClick={handleMobileMenu} />
                <div className="close-btn" onClick={handleMobileMenu}><span className="fas fa-times" /></div>
                <nav className="menu-box">
                    <div className="nav-logo"><Link href="/"><img src="/assets/images/logo-2.png" alt="" /></Link></div>
                    <div className="menu-outer">
                        <div className="collapse navbar-collapse show clearfix" id="navbarSupportedContent">
                            <ul className="navigation clearfix">
                                <li><Link href="/">Home</Link></li>
                                <li><Link href="/about">About Us</Link></li>
                                <li><Link href="/service">Our Services</Link></li>
                                <li><Link href="/team">Community</Link></li>
                                <li><Link href="/service-details">Events</Link></li>
                                <li><Link href="/testimonial">Reviews</Link></li>
                                <li><Link href="/blog">Blogs</Link></li>
                                <li><Link href="/contact">Contact Us</Link></li>
                            </ul>
                        </div>

                    </div>
                    
                    <div className="search-form">
                        <h4>Search</h4>
                        <form method="post" action="index.html">
                            <div className="form-group">
                                <input type="search" name="search-field" placeholder="Search here ..." required/>
                                <button type="submit"><i className="icon-47"></i></button>
                            </div>
                        </form>
                    </div>
                    <div className="contact-info">
                        <h4>Contact Info</h4>
                        <ul>
                            <li>Dhaka, Bangladesh</li>
                            <li><Link href="mailto:info@bec.com.bd">info@bec.com.bd</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>{/* End Mobile Menu */}
            <div className="nav-overlay" style={{ display: `${isSidebar ? "block" : "none"}` }} onClick={handleSidebar} />

          

        </>
    )
}
