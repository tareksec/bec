'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
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
            </div>

            {/* Mobile hero image (<768px) */}
            <div className={styles.mobileImage}>
                <Image
                    src="/assets/images/hero-mobile.png"
                    alt="Bangladesh Executive Chamber — Building People. Strengthening Brands. Shaping Bangladesh."
                    fill
                    priority
                    sizes="100vw"
                    quality={90}
                    style={{ objectFit: 'fill' }}
                />
            </div>
        </section>
    )
}
