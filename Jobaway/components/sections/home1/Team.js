'use client'
import Link from "next/link"


export default function Team(){

    return (
        <> 

        <section className="team-section centred pt_120 pb_70">
            <div className="auto-container">
                <div className="sec-title pb_60 sec-title-animation animation-style2">
                    <span className="sub-title mb_10 title-animation">Our Team</span>
                    <h2 className="title-animation">Meet The Team</h2>
                </div>
                <div className="row clearfix">
                    <div className="col-lg-3 col-md-6 col-sm-12 team-block">
                        <div className="team-block-one wow fadeInUp animated" data-wow-delay="00ms" data-wow-duration="1500ms">
                            <div className="inner-box">
                                <div className="image-box">
                                    <div className="bec-avatar">MRH</div>
                                </div>
                                <div className="lower-content">
                                    <h3><Link href="/">Md. Rakibul Hasan</Link></h3>
                                    <span className="designation">Founder & Chief Executive</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 team-block">
                        <div className="team-block-one wow fadeInUp animated" data-wow-delay="200ms" data-wow-duration="1500ms">
                            <div className="inner-box">
                                <div className="image-box">
                                    <div className="bec-avatar">FI</div>
                                </div>
                                <div className="lower-content">
                                    <h3><Link href="/">Farhana Islam</Link></h3>
                                    <span className="designation">Head of Talent Solutions</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 team-block">
                        <div className="team-block-one wow fadeInUp animated" data-wow-delay="400ms" data-wow-duration="1500ms">
                            <div className="inner-box">
                                <div className="image-box">
                                    <div className="bec-avatar">TA</div>
                                </div>
                                <div className="lower-content">
                                    <h3><Link href="/">Tanvir Ahmed</Link></h3>
                                    <span className="designation">Director, Business Consulting</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 team-block">
                        <div className="team-block-one wow fadeInUp animated" data-wow-delay="600ms" data-wow-duration="1500ms">
                            <div className="inner-box">
                                <div className="image-box">
                                    <div className="bec-avatar">NJ</div>
                                </div>
                                <div className="lower-content">
                                    <h3><Link href="/">Nusrat Jahan</Link></h3>
                                    <span className="designation">Lead, Training & Development</span>
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
