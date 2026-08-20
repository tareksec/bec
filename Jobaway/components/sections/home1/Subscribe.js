'use client'
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"


export default function Subscribe(){

    const [subscribed, setSubscribed] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
        setSubscribed(true)
    }

    return (
        <> 

        <section className="subscribe-section pt_100 pb_100 centred">
            <div className="bg-layer parallax-bg" data-parallax='{"y": 100}'>
                <Image src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80" alt="Subscribe Background" fill style={{ objectFit: 'cover', zIndex: -1 }} />
            </div>
            <div className="auto-container">
                <div className="content-box">
                    <h2>Subscribe to Our Newsletter</h2>
                    <p className="bec-subscribe-prompt">Subscribe for the latest insights, exclusive events, and elite career opportunities.</p>
                    {!subscribed ? (
                        <div className="form-inner">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <div className="icon-box"><i className="far fa-envelope"></i></div>
                                    <input type="email" name="email" placeholder="Email Address" required/>
                                    <button type="submit" className="theme-btn btn-one">Subscribe</button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="bec-subscribe-success">Thank you for subscribing!</div>
                    )}
                    <p className="bec-subscribe-note">You can unsubscribe at any time.</p>
                </div>
            </div>
        </section>

        </>
    )
}
