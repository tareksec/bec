export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bec.com.bd';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/api/'], // Disallow API and private routes
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
