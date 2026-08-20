'use client'
import Link from "next/link"
import Image from "next/image"


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
                                    <Image src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80" alt="Md. Rakibul Hasan" width={300} height={300} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
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
                                    <Image src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80" alt="Farhana Islam" width={300} height={300} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
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
                                    <Image src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80" alt="Tanvir Ahmed" width={300} height={300} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
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
                                    <Image src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80" alt="Nusrat Jahan" width={300} height={300} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
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
