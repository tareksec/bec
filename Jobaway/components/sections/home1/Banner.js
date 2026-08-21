'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Banner.module.scss'

export default function Banner() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const section = sectionRef.current
        if (!section) return
        // Simple fade-in on mount
        requestAnimationFrame(() => {
            section.classList.add(styles.visible)
        })
    }, [])

    return (
        <section ref={sectionRef} className={`banner-section ${styles.hero}`}>
            {/* Desktop hero image (≥768px) */}
            <div className={styles.desktopImage}>
                <Image
                    src="/assets/images/hero-desktop.png"
                    alt="Bangladesh Executive Chamber — Building People. Strengthening Brands. Shaping Bangladesh."
                    fill
                    priority
                    sizes="100vw"
                    quality={90}
                    style={{ objectFit: 'fill' }}
                />
                <Link href="/service" className={styles.desktopBtn1} aria-label="Explore Our Services"></Link>
                <Link href="/contact" className={styles.desktopBtn2} aria-label="Join Our Network"></Link>
            </div>

            {/* Mobile hero image (<768px) */}
            <div className={styles.mobileImage}>
                <Image
                    src="/assets/images/hero-mobile.png?v=3"
                    alt="Bangladesh Executive Chamber — Building People. Strengthening Brands. Shaping Bangladesh."
                    fill
                    priority
                    sizes="100vw"
                    quality={90}
                    style={{ objectFit: 'fill', pointerEvents: 'none' }}
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    draggable={false}
                />
                <Link href="/service" className={styles.mobileBtn1} aria-label="Explore Our Services"></Link>
                <Link href="/contact" className={styles.mobileBtn2} aria-label="Join Our Network"></Link>
            </div>
        </section>
    )
}
