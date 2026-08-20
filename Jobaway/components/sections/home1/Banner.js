'use client'
import Link from "next/link"


export default function Banner(){
    return (
        <> 

        <section className="banner-section p_relative centred">
            <div className="pattern-layer" style={{ backgroundImage: "url(assets/images/shape/shape-1.png)" }}></div>
            <div className="auto-container">
                <div className="content-box">
                    <h6 className="bec-banner-eyebrow">PROMOTING BRANDS. EMPOWERING CAREERS.</h6>
                    <h2>Building People. Strengthening Brands. Shaping Bangladesh.</h2>
                    <p>Bangladesh Executive Chamber (BEC) is a professional ecosystem that empowers careers, strengthens brands, and drives corporate growth through consulting, talent solutions, training, and meaningful connections.</p>
                    <div className="btn-box">
                        <Link href="/service" className="theme-btn btn-one mr_20"><span>Explore Our Services</span></Link>
                        <Link href="/contact" className="theme-btn banner-btn">Join Our Network</Link>
                    </div>
                </div>
            </div>
        </section>

        </>
    )
}
