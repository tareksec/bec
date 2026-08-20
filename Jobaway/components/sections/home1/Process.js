'use client'
import Link from "next/link"


export default function Process(){

    return (
        <> 

        <section className="process-section pt_120 pb_90">
            <div className="pattern-layer" style={{ backgroundImage: "url(assets/images/shape/shape-3.png)" }}></div>
            <div className="auto-container">
                <div className="sec-title light centred pb_60 sec-title-animation animation-style2">
                    <span className="sub-title mb_10 title-animation">Process</span>
                    <h2 className="title-animation">Your Journey With BEC</h2>
                </div>
                <div className="row clearfix">
                    <div className="col-lg-4 col-md-6 col-sm-12 processing-block">
                        <div className="processing-block-one">
                            <div className="inner-box">
                                <span className="count-text">01</span>
                                <h3><Link href="/">Connect</Link></h3>
                                <p>Reach out through our platform or LinkedIn. Share your professional goals with the BEC team.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 processing-block">
                        <div className="processing-block-one">
                            <div className="inner-box">
                                <span className="count-text">02</span>
                                <h3><Link href="/">Assess</Link></h3>
                                <p>Our experts review your profile and match you with the right talent placement or training program.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 processing-block">
                        <div className="processing-block-one">
                            <div className="inner-box">
                                <span className="count-text">03</span>
                                <h3><Link href="/">Grow</Link></h3>
                                <p>Get placed, trained, or consulted. We stay with you through your entire growth journey.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        </>
    )
}
