import React from 'react'
import Link from "next/link"
import Image from "next/image"

export default function Category(){
    return (
    <> 
       <section className="category-section home-3 centred pt_120 pb_0">
            <div className="auto-container">
                <div className="row clearfix">
                    <div className="col-lg-6 col-md-6 col-sm-12 category-block">
                        <div className="category-block-one">
                            <div className="inner-box">
                                <h2>For Local Workers</h2>
                                <p>Join professionals who use BEC to <br />find career growth and networking opportunities</p>
                                <Link href="/job-details" className="theme-btn btn-one">Find Work</Link>
                                <figure className="image-box image-hov-one"><Image src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80" alt="Local Workers" width={400} height={300} style={{ width: '100%', height: 'auto', objectFit: 'cover' }}/></figure>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 category-block">
                        <div className="category-block-one">
                            <div className="inner-box">
                                <h2>For Business Owner</h2>
                                <p>Finding individuals who share your company's values and <br />vision can contribute to a cohesive team</p>
                                <Link href="/job-details" className="theme-btn btn-one">Find Employee</Link>
                                <figure className="image-box image-hov-two"><Image src="https://images.unsplash.com/photo-1556761175-5973dc0f32b7?w=600&q=80" alt="Business Owner" width={400} height={300} style={{ width: '100%', height: 'auto', objectFit: 'cover' }}/></figure>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}
