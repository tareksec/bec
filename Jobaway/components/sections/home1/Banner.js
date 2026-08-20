'use client'

import Link from "next/link"
import { motion } from "framer-motion"

export default function Banner() {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.1 }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    }

    const imageVariants = {
        hidden: { scale: 1.05, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { duration: 1.2, ease: "easeOut" } }
    }

    return (
        <section className="banner-section" style={{ padding: 0, position: 'relative', overflow: 'hidden' }}>
            <style jsx>{`
                .hero-container {
                    display: flex;
                    min-height: 100vh;
                    width: 100%;
                    background-color: #1e3a2a; /* Dark green right side / fallback */
                }
                
                /* DESKTOP LAYOUT (min-width: 768px) */
                @media (min-width: 768px) {
                    .hero-container {
                        flex-direction: row;
                    }
                    .hero-left-img {
                        width: 58%;
                        position: relative;
                        height: 100vh;
                        overflow: hidden;
                    }
                    .hero-right-text {
                        width: 42%;
                        height: 100vh;
                        background: #1e3a2a;
                        display: flex;
                        align-items: center;
                        padding: 0 5% 0 0;
                        position: relative;
                        z-index: 2;
                    }
                    
                    /* Desktop Image & Gradient */
                    .hero-bg-desktop {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        object-position: center top;
                    }
                    .hero-gradient-overlay {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(to right, transparent 0%, rgba(30,58,42,0.8) 75%, #1e3a2a 100%);
                        z-index: 1;
                    }
                    
                    /* Buttons Desktop */
                    .btn-box {
                        display: flex;
                        flex-direction: row;
                        gap: 16px;
                        flex-wrap: nowrap;
                    }
                }
                
                /* MOBILE LAYOUT (max-width: 767px) */
                @media (max-width: 767px) {
                    .hero-container {
                        flex-direction: column;
                        min-height: 100svh;
                        background-image: url('/assets/images/New%20folder/hero/mobile.png');
                        background-size: cover;
                        background-position: center top;
                        position: relative;
                        justify-content: center;
                        padding-top: 80px; /* offset navbar */
                    }
                    
                    /* Mobile Overlay */
                    .hero-container::before {
                        content: "";
                        position: absolute;
                        top: 0; left: 0; width: 100%; height: 100%;
                        background: rgba(30, 58, 42, 0.75);
                        z-index: 1;
                    }

                    .hero-left-img {
                        display: none;
                    }
                    
                    .hero-right-text {
                        width: 100%;
                        position: relative;
                        z-index: 2;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        text-align: center;
                        padding: 40px 20px;
                    }
                    
                    .hero-subtitle {
                        margin-left: auto;
                        margin-right: auto;
                    }

                    .btn-box {
                        display: flex;
                        flex-direction: column;
                        width: 100%;
                        gap: 12px;
                    }
                    .btn-explore, .btn-join {
                        width: 100%;
                        justify-content: center;
                    }
                }
                
                /* TYPOGRAPHY & SHARED ELEMENTS */
                .content-box {
                    width: 100%;
                    max-width: 600px;
                }
                .hero-badge {
                    display: inline-block;
                    padding: 6px 16px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 50px;
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 1px;
                    color: #a3e635;
                    margin-bottom: 20px;
                    border: 1px solid rgba(163, 230, 53, 0.3);
                }
                .hero-title {
                    font-size: clamp(2rem, 3.5vw, 3.5rem);
                    line-height: 1.15;
                    font-weight: 700;
                    color: #fff;
                    margin-bottom: 20px;
                }
                .hero-subtitle {
                    font-size: 16px;
                    line-height: 1.6;
                    color: rgba(255, 255, 255, 0.8);
                    margin-bottom: 32px;
                }
                
                /* BUTTONS */
                .btn-explore, .btn-join {
                    display: inline-flex;
                    align-items: center;
                    white-space: nowrap;
                    border-radius: 50px;
                    font-size: 15px;
                    font-weight: 600;
                    transition: all 0.3s;
                    text-decoration: none;
                }
                .btn-explore {
                    background: #6fd423;
                    color: #000;
                    padding: 14px 28px;
                    border: 2px solid #6fd423;
                }
                .btn-explore:hover {
                    background: #5ab31a;
                    border-color: #5ab31a;
                }
                .btn-join {
                    background: transparent;
                    color: #fff;
                    padding: 14px 28px;
                    border: 2px solid #fff;
                }
                .btn-join:hover {
                    background: rgba(255, 255, 255, 0.1);
                }
                .btn-arrow {
                    margin-left: 8px;
                    font-size: 14px;
                    transition: transform 0.3s;
                }
                .btn-explore:hover .btn-arrow {
                    transform: translateX(4px);
                }
            `}</style>

            <div className="hero-container">
                {/* LEFT SIDE: Image (Desktop only) */}
                <div className="hero-left-img">
                    <div className="hero-gradient-overlay"></div>
                    <motion.img 
                        src="/assets/images/New%20folder/hero/dekstop.png" 
                        alt="BEC Hero" 
                        className="hero-bg-desktop"
                        variants={imageVariants}
                        initial="hidden"
                        animate="visible"
                    />
                </div>

                {/* RIGHT SIDE: Text content (Desktop) / Centered (Mobile) */}
                <div className="hero-right-text">
                    <motion.div 
                        className="content-box"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div variants={itemVariants}>
                            <div className="hero-badge">
                                PROMOTING BRANDS. EMPOWERING CAREERS.
                            </div>
                        </motion.div>
                        
                        <motion.h1 variants={itemVariants} className="hero-title">
                            Building People.<br />Strengthening Brands.<br />Shaping Bangladesh.
                        </motion.h1>
                        
                        <motion.p variants={itemVariants} className="hero-subtitle">
                            Bangladesh Executive Chamber (BEC) is a professional ecosystem that empowers careers, strengthens brands, and drives corporate growth through consulting, talent solutions, training, and meaningful connections.
                        </motion.p>
                        
                        <motion.div variants={itemVariants} className="btn-box">
                            <Link href="/service" className="btn-explore">
                                Explore Our Services <i className="icon-4 btn-arrow"></i>
                            </Link>
                            <Link href="/contact" className="btn-join">
                                Join Our Network
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
