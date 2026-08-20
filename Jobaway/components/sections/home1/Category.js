'use client'
import Link from "next/link"


export default function Category(){
    return (
        <> 

        <section className="category-section centred pt_120 pb_70">
            <div className="bg-box">
            <div className="bg-layer parallax-bg" style={{ backgroundImage: "url(assets/images/background/category-bg.jpg)" }}></div>
            </div>
            <div className="auto-container">
                <div className="sec-title light pb_60 sec-title-animation animation-style2">
                    <span className="sub-title mb_10 title-animation">Focus Areas</span>
                    <h2 className="title-animation">Industries We Serve</h2>
                </div>
                <div className="row clearfix">
                    <div className="col-lg-6 col-md-6 col-sm-12 category-block">
                        <div className="category-block-one">
                            <div className="inner-box">
                                <h2>For Professionals</h2>
                                <p>Career growth, training and development programs, <br />and meaningful professional connections across Bangladesh.</p>
                                <Link href="/service" className="theme-btn btn-one">Explore Services</Link>
                                <figure className="image-box image-hov-one"><img src="assets/images/resource/category-1.jpg" alt=""/></figure>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 category-block">
                        <div className="category-block-one">
                            <div className="inner-box">
                                <h2>For Organizations</h2>
                                <p>Talent acquisition, business consulting, and brand <br />strategy built to drive corporate growth.</p>
                                <Link href="/service" className="theme-btn btn-one">Explore Services</Link>
                                <figure className="image-box image-hov-two"><img src="assets/images/resource/category-2.jpg" alt=""/></figure>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        </>
    )
}
