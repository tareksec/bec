'use client'
import Link from "next/link"


export default function Chooseus(){
    return (
        <> 

        <section className="chooseus-section pt_200 pb_90">
            <div className="pattern-layer" style={{ backgroundImage: "url(assets/images/shape/shape-2.png)" }}></div>
            <div className="auto-container">
                <div className="sec-title centred pb_60 sec-title-animation animation-style2">
                    <span className="sub-title mb_10 title-animation">What We Do</span>
                    <h2 className="title-animation">Solutions That Drive Impact</h2>
                </div>
                <div className="inner-container">
                    <div className="row clearfix">
                        <div className="col-lg-3 col-md-6 col-sm-12 chooseus-block">
                            <div className="chooseus-block-one">
                                <div className="inner-box">
                                    <div className="icon-box"><i className="icon-4"></i></div>
                                    <h3><Link href="/">Talent Solutions</Link></h3>
                                    <p>Connecting the right talent with the right opportunities.</p>
                                    <div className="link"><Link href="/service">Learn More<i className="icon-7"></i></Link></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12 chooseus-block">
                            <div className="chooseus-block-one">
                                <div className="inner-box">
                                    <div className="icon-box"><i className="icon-5"></i></div>
                                    <h3><Link href="/">Business Consulting</Link></h3>
                                    <p>Strategic solutions for sales, marketing & business growth.</p>
                                    <div className="link"><Link href="/service">Learn More<i className="icon-7"></i></Link></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12 chooseus-block">
                            <div className="chooseus-block-one">
                                <div className="inner-box">
                                    <div className="icon-box"><i className="icon-6"></i></div>
                                    <h3><Link href="/">Training & Development</Link></h3>
                                    <p>Upskill, lead, and grow with industry-relevant programs.</p>
                                    <div className="link"><Link href="/service">Learn More<i className="icon-7"></i></Link></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12 chooseus-block">
                            <div className="chooseus-block-one">
                                <div className="inner-box">
                                    <div className="icon-box"><i className="icon-3"></i></div>
                                    <h3><Link href="/">Networking & Community</Link></h3>
                                    <p>Bridging professionals and organizations for impact.</p>
                                    <div className="link"><Link href="/team">Learn More<i className="icon-7"></i></Link></div>
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
