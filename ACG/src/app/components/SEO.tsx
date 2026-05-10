import { useEffect } from 'react';
import { defaultOgImageUrl, SITE_ORIGIN } from '@/lib/site';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogType?: string;
  ogImage?: string;
  ogImageAlt?: string;
  canonical?: string;
}

export function SEO({
  title = 'Ascend Capital Group | Ghana-Based Global Relocation Services',
  description = 'ACG provides expert visa, immigration, and relocation services from Ghana to the world. Helping Ghanaian professionals relocate to the UK, Canada, USA, Dubai, and Lisbon with 98% success rate.',
  keywords = 'Ghana relocation services, immigration services Ghana, visa assistance Ghana, relocation to UK from Ghana, Canada immigration Ghana, USA visa Ghana, Dubai relocation, Lisbon relocation, Accra immigration services, global mobility Ghana',
  ogType = 'website',
  ogImage = defaultOgImageUrl,
  ogImageAlt = 'ACG — Ascend Capital Group, global relocation from Ghana',
  canonical = SITE_ORIGIN,
}: SEOProps) {
  useEffect(() => {
    document.title = title;

    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);

    updateMetaTag('og:site_name', 'ACG — Ascend Capital Group', 'property');
    updateMetaTag('og:locale', 'en_GH', 'property');
    updateMetaTag('og:title', title, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('og:type', ogType, 'property');
    updateMetaTag('og:image', ogImage, 'property');
    updateMetaTag('og:image:type', ogImage.endsWith('.svg') ? 'image/svg+xml' : 'image/jpeg', 'property');
    updateMetaTag('og:image:width', '1200', 'property');
    updateMetaTag('og:image:height', '630', 'property');
    updateMetaTag('og:image:alt', ogImageAlt, 'property');
    updateMetaTag('og:url', canonical, 'property');

    updateMetaTag('twitter:card', 'summary_large_image', 'name');
    updateMetaTag('twitter:title', title, 'name');
    updateMetaTag('twitter:description', description, 'name');
    updateMetaTag('twitter:image', ogImage, 'name');
    updateMetaTag('twitter:image:alt', ogImageAlt, 'name');

    updateCanonicalLink(canonical);
  }, [title, description, keywords, ogType, ogImage, ogImageAlt, canonical]);

  return null;
}

function updateMetaTag(name: string, content: string, attribute: 'name' | 'property' = 'name') {
  let element = document.querySelector(`meta[${attribute}="${name}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

function updateCanonicalLink(href: string) {
  let link = document.querySelector('link[rel="canonical"]');

  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }

  link.setAttribute('href', href);
}

// Structured Data Component
interface StructuredDataProps {
  type: 'Organization' | 'LocalBusiness' | 'Service';
  data?: any;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  useEffect(() => {
    const defaultOrganizationData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Ascend Capital Group',
      alternateName: 'ACG Ghana',
      url: SITE_ORIGIN,
      logo: `${SITE_ORIGIN}/og.svg`,
      description: 'Expert visa, immigration, and relocation services from Ghana to the world',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Accra',
        addressCountry: 'Ghana'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+233-24-123-4567',
        contactType: 'Customer Service',
        email: 'hello@acghana.com',
        areaServed: ['GH', 'US', 'GB', 'CA', 'AE', 'PT'],
        availableLanguage: ['English']
      },
      sameAs: [
        'https://linkedin.com/company/acghana',
        'https://twitter.com/acghana'
      ],
      areaServed: {
        '@type': 'Country',
        name: ['Ghana', 'United Kingdom', 'Canada', 'United States', 'United Arab Emirates', 'Portugal']
      }
    };

    const defaultLocalBusinessData = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Ascend Capital Group',
      image: `${SITE_ORIGIN}/og.svg`,
      '@id': SITE_ORIGIN,
      url: SITE_ORIGIN,
      telephone: '+233-24-123-4567',
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Accra',
        addressLocality: 'Accra',
        addressRegion: 'Greater Accra',
        postalCode: '00233',
        addressCountry: 'GH'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 5.6037,
        longitude: -0.1870
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00'
      }
    };

    const defaultServiceData = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Immigration and Relocation Services',
      provider: {
        '@type': 'Organization',
        name: 'Ascend Capital Group'
      },
      areaServed: {
        '@type': 'Country',
        name: ['Ghana', 'United Kingdom', 'Canada', 'United States', 'United Arab Emirates', 'Portugal']
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Relocation Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Visa & Immigration Services',
              description: 'Complete visa application and immigration support'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Destination Setup',
              description: 'Home search, school enrollment, and settlement services'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'VIP White Glove Services',
              description: 'Premium concierge relocation services'
            }
          }
        ]
      }
    };

    let structuredData;
    switch (type) {
      case 'Organization':
        structuredData = data || defaultOrganizationData;
        break;
      case 'LocalBusiness':
        structuredData = data || defaultLocalBusinessData;
        break;
      case 'Service':
        structuredData = data || defaultServiceData;
        break;
      default:
        structuredData = defaultOrganizationData;
    }

    // Remove existing script if any
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [type, data]);

  return null;
}
