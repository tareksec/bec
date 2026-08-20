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
            {/* Custom CSS for the layout */}
            <style jsx>{`
                .hero-container {
                    display: flex;
                    min-height: 100vh;
                    width: 100%;
                    background-color: #1c3a2a;
                }
                .hero-left {
                    width: 55%;
                    display: flex;
                    align-items: center;
                    padding: 80px 5% 80px 8%;
                    position: relative;
                    z-index: 2;
                }
                .hero-right {
                    width: 45%;
                    position: relative;
                    overflow: hidden;
                }
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
                    background: linear-gradient(to right, #1c3a2a 0%, rgba(28, 58, 42, 0.7) 40%, transparent 100%);
                    z-index: 1;
                }
                .hero-badge {
                    display: inline-block;
                    padding: 8px 16px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 50px;
                    font-size: 12px;
                    font-weight: 700;
                    letter-spacing: 1px;
                    color: #a3e635; /* Lime green */
                    margin-bottom: 24px;
                    border: 1px solid rgba(163, 230, 53, 0.3);
                }
                .hero-title {
                    font-size: 56px;
                    line-height: 1.1;
                    font-weight: 700;
                    color: #fff;
                    margin-bottom: 24px;
                }
                .hero-subtitle {
                    font-size: 18px;
                    line-height: 1.6;
                    color: rgba(255, 255, 255, 0.8);
                    margin-bottom: 40px;
                    max-width: 90%;
                }
                .btn-box {
                    display: flex;
                    gap: 20px;
                    flex-wrap: wrap;
                }
                .btn-arrow {
                    margin-left: 8px;
                    font-size: 16px;
                    display: inline-block;
                    transition: transform 0.3s;
                }
                .theme-btn:hover .btn-arrow {
                    transform: translateX(4px);
                }
                .hero-bg-mobile {
                    display: none;
                }
                
                @media (max-width: 991px) {
                    .hero-title {
                        font-size: 42px;
                    }
                }
                
                @media (max-width: 767px) {
                    .hero-container {
                        flex-direction: column;
                        justify-content: center;
                        position: relative;
                        min-height: 100vh;
                        padding-top: 100px; /* Offset for navbar */
                    }
                    .hero-left {
                        width: 100%;
                        padding: 60px 20px;
                        text-align: center;
                        justify-content: center;
                        background: rgba(28, 58, 42, 0.85); /* Dark overlay */
                        z-index: 2;
                    }
                    .hero-right {
                        display: none;
                    }
                    .hero-bg-mobile {
                        display: block;
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        object-position: center top;
                        z-index: 1;
                    }
                    .hero-subtitle {
                        margin: 0 auto 40px auto;
                    }
                    .btn-box {
                        justify-content: center;
                    }
                }
            `}</style>

            <div className="hero-container">
                {/* Mobile Background Image */}
                <motion.img 
                    src="/assets/images/New%20folder/hero/mobile.png" 
                    alt="Mobile Hero Background" 
                    className="hero-bg-mobile"
                    initial={{ scale: 1.05, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />

                <div className="hero-left">
                    <motion.div 
                        className="content-box w-100"
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
                            <Link href="/service" className="theme-btn btn-one" style={{ background: '#a3e635', color: '#1c3a2a' }}>
                                <span>Explore Our Services <i className="icon-4 btn-arrow"></i></span>
                            </Link>
                            <Link href="/contact" className="theme-btn banner-btn" style={{ background: 'transparent', border: '1px solid #fff', color: '#fff' }}>
                                Join Our Network
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>

                <div className="hero-right">
                    <div className="hero-gradient-overlay"></div>
                    <motion.img 
                        src="/assets/images/New%20folder/hero/dekstop.png" 
                        alt="Desktop Hero Background" 
                        className="hero-bg-desktop"
                        variants={imageVariants}
                        initial="hidden"
                        animate="visible"
                    />
                </div>
            </div>
        </section>
    )
}
