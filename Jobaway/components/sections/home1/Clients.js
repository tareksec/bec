'use client'
import Link from "next/link"


export default function Clients(){
    const logos = [
        { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/500px-Google_2015_logo.svg.png", alt: "Google" },
        { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/500px-Amazon_logo.svg.png", alt: "Amazon" },
        { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/500px-Netflix_2015_logo.svg.png", alt: "Netflix" },
        { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/250px-LinkedIn_logo_initials.png", alt: "LinkedIn" },
        { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/500px-Microsoft_logo.svg.png", alt: "Microsoft" },
        { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/500px-Apple_logo_black.svg.png", alt: "Apple" },
    ]

    return (
        <> 

        <section className="clients-section">
            <div className="auto-container">
                <div className="inner-container">
                    <div className="bec-clients-text">
                        <h3>Trusted by Leading Organizations</h3>
                        <p>Our partner network is growing — check back soon for updates on our latest collaborations and corporate partners.</p>

                        {/* Logo Marquee */}
                        <div className="logo-marquee-wrapper">
                            <div className="logo-marquee-track">
                                {/* First set */}
                                {logos.map((logo, i) => (
                                    <div className="logo-marquee-item" key={`a-${i}`}>
                                        <img src={logo.src} alt={logo.alt} loading="lazy" />
                                    </div>
                                ))}
                                {/* Duplicate set for seamless loop */}
                                {logos.map((logo, i) => (
                                    <div className="logo-marquee-item" key={`b-${i}`}>
                                        <img src={logo.src} alt={logo.alt} loading="lazy" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bec-stats-grid">
                            <div className="stat-item">
                                <div className="stat-num">10K+</div>
                                <div className="stat-label">Professionals Connected</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-num">500+</div>
                                <div className="stat-label">Brands Empowered</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-num">200+</div>
                                <div className="stat-label">Training Programs Delivered</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-num">50+</div>
                                <div className="stat-label">Corporate Partners</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        </>
    )
}
