import Link from "next/link"

export default function Menu() {

    return (
        <>

            <ul className="navigation clearfix">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/service">Our Services</Link></li>
                <li><Link href="/team">Community</Link></li>
                <li><Link href="/service-details">Events</Link></li>
                <li><Link href="/testimonial">Reviews</Link></li>
                <li><Link href="/blog">Blogs</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
            </ul>
        </>
    )
}
