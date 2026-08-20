'use client'
import Link from "next/link"
import Image from "next/image"
import VideoPopup from "@/components/elements/VideoPopup"


export default function About(){
    return (
        <> 

        <section className="about-section pt_120 pb_120">
            <div className="auto-container">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-12 col-sm-12 video-column">
                        <div className="video_block_one">
                            <div className="video-box p_relative pt_40 pb_40 pl_30 centred">
                                <div className="image-layer">
                                    <figure className="image-1">
                                        {/* Photo by Brooke Cagle on Unsplash */}
                                        <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" alt="People collaborating in a modern office" width={400} height={400} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                                    </figure>
                                    <figure className="image-2">
                                        {/* Photo by Campaign Creators on Unsplash */}
                                        <Image src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80" alt="Team discussing corporate growth" width={400} height={400} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                                    </figure>
                                </div>
                                <div className="video-inner" style={{ backgroundImage: "url(assets/images/resource/video-1.jpg)" }}>
                                    <div className="video-content">
                                        <VideoPopup />
                                        <h6>Watch Video</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 content-column">
                        <div className="content_block_one">
                            <div className="content-box ml_80">
                                <div className="sec-title pb_20 sec-title-animation animation-style2">
                                    <span className="sub-title mb_10 title-animation">About BEC</span>
                                    <h2 className="title-animation">A Professional Ecosystem for <span>Careers & Brands</span></h2>
                                </div>
                                <div className="text-box">
                                    <p>A premium professional ecosystem dedicated to empowering careers and strengthening brands through strategic consulting, talent solutions, and dynamic networking.</p>
                                    <ul className="list-style-one clearfix">
                                        <li>Connecting professionals with the right opportunities</li>
                                        <li>Driving corporate growth through consulting & training</li>
                                    </ul>
                                    <div className="btn-box mt_30">
                                        <Link href="/about" className="theme-btn btn-one">Learn More About BEC</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        </>
    )
}
