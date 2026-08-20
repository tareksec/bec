'use client'
import Link from "next/link"
import Image from "next/image"


export default function News(){

    return (
        <> 

        <section className="news-section pb_90">
            <div className="auto-container">
                <div className="sec-title centred pb_60 sec-title-animation animation-style2">
                    <span className="sub-title mb_10 title-animation">Media</span>
                    <h2 className="title-animation">Latest News</h2>
                </div>
                <div className="row clearfix">
                    <div className="col-lg-4 col-md-6 col-sm-12 news-block">
                        <div className="news-block-one wow fadeInUp animated" data-wow-delay="00ms" data-wow-duration="1500ms">
                            <div className="inner-box">
                                <div className="bg-layer"><Image src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80" alt="News 1" fill style={{ objectFit: 'cover' }} /></div>
                                <div className="overlay-bg-layer"><Image src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80" alt="News 1" fill style={{ objectFit: 'cover' }} /></div>
                                <div className="content-box">
                                    <span className="post-date">News & Insights</span>
                                    <h4><Link href="/blog-details">Building a Personal Brand That Opens Doors</Link></h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 news-block">
                        <div className="news-block-one wow fadeInUp animated" data-wow-delay="300ms" data-wow-duration="1500ms">
                            <div className="inner-box">
                                <div className="bg-layer"><Image src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80" alt="News 2" fill style={{ objectFit: 'cover' }} /></div>
                                <div className="overlay-bg-layer"><Image src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80" alt="News 2" fill style={{ objectFit: 'cover' }} /></div>
                                <div className="content-box">
                                    <span className="post-date">News & Insights</span>
                                    <h4><Link href="/blog-details">Five Hiring Mistakes Growing Companies Make</Link></h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 news-block">
                        <div className="news-block-one wow fadeInUp animated" data-wow-delay="600ms" data-wow-duration="1500ms">
                            <div className="inner-box">
                                <div className="bg-layer"><Image src="https://images.unsplash.com/photo-1515169067868-5387ec356754?w=600&q=80" alt="News 3" fill style={{ objectFit: 'cover' }} /></div>
                                <div className="overlay-bg-layer"><Image src="https://images.unsplash.com/photo-1515169067868-5387ec356754?w=600&q=80" alt="News 3" fill style={{ objectFit: 'cover' }} /></div>
                                <div className="content-box">
                                    <span className="post-date">News & Insights</span>
                                    <h4><Link href="/blog-details">Why Networking Still Wins in a Digital Economy</Link></h4>
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
