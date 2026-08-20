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
    title: {
      default: "Bangladesh Executive Chamber (BEC) | Empowering Professionals",
      template: "%s | BEC"
    },
    description: "BEC is Bangladesh's premier professional ecosystem for career development, business consulting, talent acquisition, and professional networking.",
    keywords: ["BEC", "Bangladesh Executive Chamber", "Career Development Bangladesh", "Business Consulting", "Talent Acquisition", "Professional Networking", "Executive Search", "Dhaka"],
    authors: [{ name: "BEC" }],
    creator: "Bangladesh Executive Chamber",
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://www.bec.com.bd",
      title: "Bangladesh Executive Chamber (BEC)",
      description: "Bangladesh's premier professional ecosystem for career development, business consulting, talent acquisition, and professional networking.",
      siteName: "Bangladesh Executive Chamber",
      images: [
        {
          url: "https://www.bec.com.bd/assets/images/logo.png",
          width: 800,
          height: 600,
          alt: "BEC Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Bangladesh Executive Chamber (BEC)",
      description: "Bangladesh's premier professional ecosystem for career development.",
      images: ["https://www.bec.com.bd/assets/images/logo.png"],
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
      canonical: "https://www.bec.com.bd",
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