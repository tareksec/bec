'use client'
import Link from "next/link"


export default function Industries(){
    return (
        <> 

        <section className="industries-section pt_20 pb_120">
            <div className="auto-container">
                <div className="sec-title centred pb_60 sec-title-animation animation-style2">
                    <span className="sub-title mb_10 title-animation">Industries</span>
                    <h2 className="title-animation">Industries Served</h2>
                </div>
                <div className="inner-container clearfix">
                    <div className="industries-block-one">
                        <div className="inner-box">
                            <div className="icon-box"><i className="icon-9"></i></div>
                            <h3><Link href="/">Hotel</Link></h3>
                            <p>2853 Staffs</p>
                        </div>
                    </div>
                    <div className="industries-block-one">
                        <div className="inner-box">
                            <div className="icon-box"><i className="icon-10"></i></div>
                            <h3><Link href="/">Hospitality</Link></h3>
                            <p>2256 Staffs</p>
                        </div>
                    </div>
                    <div className="industries-block-one">
                        <div className="inner-box">
                            <div className="icon-box"><i className="icon-11"></i></div>
                            <h3><Link href="/">Kitchen</Link></h3>
                            <p>1408 Staffs</p>
                        </div>
                    </div>
                    <div className="industries-block-one">
                        <div className="inner-box">
                            <div className="icon-box"><i className="icon-12"></i></div>
                            <h3><Link href="/">Retail</Link></h3>
                            <p>1740 Staffs</p>
                        </div>
                    </div>
                    <div className="industries-block-one">
                        <div className="inner-box">
                            <div className="icon-box"><i className="icon-13"></i></div>
                            <h3><Link href="/">Special Events</Link></h3>
                            <p>3948 Staffs</p>
                        </div>
                    </div>
                    <div className="industries-block-one">
                        <div className="inner-box">
                            <div className="icon-box"><i className="icon-14"></i></div>
                            <h3><Link href="/">General Labor</Link></h3>
                            <p>2984 Staffs</p>
                        </div>
                    </div>
                    <div className="industries-block-one">
                        <div className="inner-box">
                            <div className="icon-box"><i className="icon-15"></i></div>
                            <h3><Link href="/">Driving</Link></h3>
                            <p>4509 Staffs</p>
                        </div>
                    </div>
                    <div className="industries-block-one">
                        <div className="inner-box">
                            <div className="icon-box"><i className="icon-16"></i></div>
                            <h3><Link href="/">Senior Living</Link></h3>
                            <p>1039 Staffs</p>
                        </div>
                    </div>
                </div>
                <div className="btn-box centred mt_60"><Link href="/" className="theme-btn btn-one">View All Categories</Link></div>
            </div>
        </section>

        </>
    )
}
