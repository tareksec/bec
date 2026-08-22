'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer1() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
    }
  }

  return (
    <footer className="main-footer">
      {/* ── Top Executive Contact Strip ── */}
      <div className="bec-contact-strip">
        <div className="auto-container">
          <div className="bec-contact-strip-grid">
            <div className="bec-contact-item">
              <div className="bec-contact-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className="bec-contact-info">
                <h6>Executive Inquiries</h6>
                <a href="tel:+8801700000000">+880 1700-000000</a>
              </div>
            </div>

            <div className="bec-contact-item">
              <div className="bec-contact-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div className="bec-contact-info">
                <h6>Official Correspondence</h6>
                <a href="mailto:contact@bec.com.bd">contact@bec.com.bd</a>
              </div>
            </div>

            <div className="bec-contact-item">
              <div className="bec-contact-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="bec-contact-info">
                <h6>National Headquarters</h6>
                <span>Gulshan-2, Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Widget Section ── */}
      <div className="widget-section">
        <div className="auto-container">
          <div className="row clearfix">
            {/* Column 1: Organization Overview */}
            <div className="col-lg-4 col-md-6 col-sm-12 footer-column">
              <div className="footer-widget logo-widget mr_30">
                <figure className="footer-logo">
                  <Link href="/">
                    <Image
                      src="/assets/images/logo.png"
                      alt="Bangladesh Executive Chamber"
                      width={160}
                      height={48}
                      style={{ objectFit: 'contain' }}
                      unoptimized
                    />
                  </Link>
                </figure>
                <p>
                  The Bangladesh Executive Chamber (BEC) is the premier national ecosystem connecting visionary leaders, enterprises, and executives through transformative consulting, talent development, and high-impact executive networks.
                </p>
                <div className="bec-badge-pill">
                  <span>🏛️</span>
                  <span>National Chamber of Executive Leaders</span>
                </div>
              </div>
            </div>

            {/* Column 2: Solutions */}
            <div className="col-lg-2 col-md-3 col-sm-6 footer-column">
              <div className="footer-widget links-widget">
                <div className="widget-title">
                  <h4>Solutions</h4>
                </div>
                <div className="widget-content">
                  <ul className="links-list">
                    <li><Link href="/service-details">Talent Acquisition</Link></li>
                    <li><Link href="/service-details-3">Strategic Consulting</Link></li>
                    <li><Link href="/service-details-2">Executive Workshops</Link></li>
                    <li><Link href="/service-details-4">Networking Forums</Link></li>
                    <li><Link href="/service-details-5">Workforce Systems</Link></li>
                    <li><Link href="/service">All Capabilities</Link></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Column 3: Ecosystem */}
            <div className="col-lg-2 col-md-3 col-sm-6 footer-column">
              <div className="footer-widget links-widget">
                <div className="widget-title">
                  <h4>Ecosystem</h4>
                </div>
                <div className="widget-content">
                  <ul className="links-list">
                    <li><Link href="/about">About BEC</Link></li>
                    <li><Link href="/team">Leadership Council</Link></li>
                    <li><Link href="/blog">Editorial Insights</Link></li>
                    <li><Link href="/testimonial">Member Reviews</Link></li>
                    <li><Link href="/faq">Executive FAQ</Link></li>
                    <li><Link href="/contact">Contact Chamber</Link></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Column 4: Newsletter & Social */}
            <div className="col-lg-4 col-md-6 col-sm-12 footer-column">
              <div className="footer-widget">
                <div className="widget-title">
                  <h4>Executive Briefing</h4>
                </div>
                <div className="widget-content">
                  <p className="bec-newsletter-desc">
                    Subscribe for exclusive executive market intelligence, summit invitations, and strategic economic reports.
                  </p>

                  {!subscribed ? (
                    <form className="bec-newsletter-form" onSubmit={handleSubscribe}>
                      <div className="bec-newsletter-inner">
                        <input
                          type="email"
                          placeholder="Enter executive email..."
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <button type="submit" className="bec-newsletter-btn">
                          <span>Subscribe</span>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="bec-newsletter-success">
                      ✓ Thank you! You are subscribed to BEC Executive Briefings.
                    </div>
                  )}

                  <div className="bec-social-wrap">
                    <h6>Connect With BEC</h6>
                    <ul className="bec-social-list">
                      <li>
                        <a
                          href="https://www.linkedin.com/company/bangladesh-executive-chamber/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bec-social-link"
                          aria-label="LinkedIn"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.92 0 1.66-.74 1.66-1.66s-.74-1.67-1.66-1.67a1.67 1.67 0 0 0-1.67 1.67c0 .92.75 1.66 1.67 1.66m1.39 9.74v-8.37H5.07v8.37h2.78Z"/>
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://medium.com/@mdtareksec"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bec-social-link"
                          aria-label="Medium"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42c1.87 0 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://facebook.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bec-social-link"
                          aria-label="Facebook"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12Z"/>
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://twitter.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bec-social-link"
                          aria-label="X / Twitter"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer Bottom Bar ── */}
      <div className="footer-bottom">
        <div className="auto-container">
          <div className="bottom-inner">
            <div className="copyright">
              <p>
                &copy; {new Date().getFullYear()}{' '}
                <Link href="/">Bangladesh Executive Chamber</Link>. All Rights Reserved. | Developed by{' '}
                <a href="https://artx.techvrs.com/" target="_blank" rel="noopener noreferrer">
                  Artx TechVRS
                </a>{' '}
                &amp;{' '}
                <a href="https://www.linkedin.com/in/mdtarek404/" target="_blank" rel="noopener noreferrer">
                  Md Tarek
                </a>
              </p>
            </div>

            <div className="bec-legal-nav">
              <Link href="/privacy-policy">Privacy Policy</Link>
              <span className="bec-dot-sep">·</span>
              <Link href="/terms-of-service">Terms of Service</Link>
              <span className="bec-dot-sep">·</span>
              <Link href="/admin" className="bec-admin-link">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Admin Portal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
