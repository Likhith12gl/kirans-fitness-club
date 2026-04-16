export default function SchemaOrg() {
  const SITE_URL = "https://kirans-fitness-club.vercel.app";

  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HealthClub"],
    "name": "Kiran's Fitness Club",
    "alternateName": "Kirans Fitness Club Anjananagar",
    "image": `${SITE_URL}/icon.png`,
    "@id": `${SITE_URL}/#localbusiness`,
    "url": SITE_URL,
    "telephone": "+919019688582",
    "email": "contact@kiransfitness.com",
    "description": "Kiran's Fitness Club is Anjananagar's premier gym, offering world-class equipment, certified personal trainers, group fitness classes, and affordable membership plans near Magadi Main Road and Bath Road, Bangalore.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "#123, Magadi Main Road, Anjananagar",
      "addressLocality": "Bangalore",
      "addressRegion": "Karnataka",
      "postalCode": "560091",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 12.9784,
      "longitude": 77.4891
    },
    "hasMap": "https://maps.google.com/maps?q=Kiran%27s+Fitness+Club+Anjananagar",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "05:30",
        "closes": "22:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "06:00",
        "closes": "12:00"
      }
    ],
    "priceRange": "₹₹",
    "currenciesAccepted": "INR",
    "paymentAccepted": "Cash, UPI, Bank Transfer",
    "areaServed": [
      "Anjananagar", "Magadi Road", "Bath Road", "Rajajinagar",
      "Vijayanagar", "Chord Road", "Nagarbhavi", "Bangalore"
    ],
    "sameAs": [
      SITE_URL
    ],
    "founder": {
      "@type": "Person",
      "name": "Kiran Kumar",
      "alumniOf": "Professional Bodybuilding",
      "jobTitle": "Founder & Head Personal Trainer"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "120",
      "bestRating": "5"
    }
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": `${SITE_URL}/services` },
      { "@type": "ListItem", "position": 3, "name": "About", "item": `${SITE_URL}/about` },
      { "@type": "ListItem", "position": 4, "name": "Blog", "item": `${SITE_URL}/blog` },
      { "@type": "ListItem", "position": 5, "name": "Events", "item": `${SITE_URL}/events` },
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}
