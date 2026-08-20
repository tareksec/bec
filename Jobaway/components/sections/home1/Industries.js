'use client'
import Link from "next/link"


export default function Industries(){
    return (
        <> 

        <section className="industries-section pt_20 pb_120">
            <div className="auto-container">
                <div className="sec-title centred pb_60 sec-title-animation animation-style2">
                    <span className="sub-title mb_10 title-animation">Industries</span>
                    <h2 className="title-animation">Focus Areas</h2>
                </div>
                <div className="inner-container clearfix">
                    <div className="industries-block-one">
                        <div className="inner-box">
                            <div className="icon-box"><i className="icon-9"></i></div>
                            <h3><Link href="/">Real Estate</Link></h3>
                        </div>
                    </div>
                    <div className="industries-block-one">
                        <div className="inner-box">
                            <div className="icon-box"><i className="icon-10"></i></div>
                            <h3><Link href="/">FMCG</Link></h3>
                        </div>
                    </div>
                    <div className="industries-block-one">
                        <div className="inner-box">
                            <div className="icon-box"><i className="icon-11"></i></div>
                            <h3><Link href="/">Digital Marketing</Link></h3>
                        </div>
                    </div>
                    <div className="industries-block-one">
                        <div className="inner-box">
                            <div className="icon-box"><i className="icon-12"></i></div>
                            <h3><Link href="/">Corporate HR</Link></h3>
                        </div>
                    </div>
                    <div className="industries-block-one">
                        <div className="inner-box">
                            <div className="icon-box"><i className="icon-13"></i></div>
                            <h3><Link href="/">Business Development</Link></h3>
                        </div>
                    </div>
                </div>
                <div className="btn-box centred mt_60"><Link href="/service" className="theme-btn btn-one">View All Services</Link></div>
            </div>
        </section>

        </>
    )
}
