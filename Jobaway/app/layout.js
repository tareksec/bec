import "react-modal-video/css/modal-video.css";
import ToggleBodyClass from "@/components/elements/Togglebtn";
import "@/public/assets/css/bootstrap.css";
import "@/public/assets/css/color.css";
import "@/public/assets/css/rtl.css";
import "@/public/assets/css/style.css";
import "@/public/assets/css/responsive.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { arimo, noto_bengali } from "@/lib/font";

export const metadata = {
  metadataBase: new URL('https://www.thebec.site'),
  title: 'BEC — Bangladesh Executive Chamber',
  description: 'Bangladesh Executive Chamber (BEC) is a professional ecosystem that empowers careers, strengthens brands, and drives corporate growth.',
  keywords: ["BEC", "Bangladesh Executive Chamber", "Career Development Bangladesh", "Business Consulting", "Talent Acquisition", "Professional Networking", "Executive Search", "Dhaka"],
  authors: [{ name: "BEC" }],
  creator: "Bangladesh Executive Chamber",
  openGraph: {
    title: 'BEC — Bangladesh Executive Chamber',
    description: 'Empowering careers, strengthening brands, and driving corporate growth through consulting, talent solutions, training, and meaningful connections.',
    url: 'https://www.thebec.site',
    siteName: 'Bangladesh Executive Chamber',
    images: [
      {
        url: '/assets/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Bangladesh Executive Chamber',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BEC — Bangladesh Executive Chamber',
    description: 'Empowering careers, strengthening brands, and driving corporate growth.',
    images: ['/assets/images/og-default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://www.thebec.site",
  },
};

export default function RootLayout({ children }) {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Bangladesh Executive Chamber",
      "alternateName": "BEC",
      "url": "https://www.bec.com.bd",
      "logo": "https://www.bec.com.bd/assets/images/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+880-123-4567890",
        "contactType": "customer service",
        "areaServed": "BD",
        "availableLanguage": ["en", "bn"]
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Dhaka",
        "addressLocality": "Dhaka",
        "addressRegion": "Dhaka",
        "postalCode": "1000",
        "addressCountry": "BD"
      }
    };

    return (
        <html lang="en" className={`${arimo.variable} ${noto_bengali.variable}`}>
            <body>
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <ToggleBodyClass />
                {children}
            </body>
        </html>
    );
}