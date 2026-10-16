import { Landing } from "@/components/landing/Landing";
import { services, copy } from "@/lib/i18n";
import { SITE } from "@/lib/site";

export default function Home() {
  // Schema.org — LocalBusiness (HealthAndBeautyBusiness) + FAQPage, rendered server-side
  const business = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "@id": `${SITE.domain}/#business`,
    name: SITE.legalName,
    alternateName: SITE.name,
    description:
      "Jasa home massage profesional di Bali — Canggu, Seminyak, Berawa, Kerobokan & Umalas. Terapis bersertifikat datang ke vila, hotel & rumah Anda. Pesan via WhatsApp.",
    url: SITE.domain,
    telephone: `+${SITE.waNumber}`,
    image: `${SITE.domain}/og-image.jpg`,
    logo: `${SITE.domain}/icon.png`,
    priceRange: "Rp 175.000 – Rp 750.000",
    currenciesAccepted: "IDR",
    paymentAccepted: "Cash, Bank Transfer, QRIS",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "22:00",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Canggu",
      addressRegion: "Bali",
      addressCountry: "ID",
    },
    areaServed: SITE.areas.map((a) => ({ "@type": "Place", name: a })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: SITE.rating,
      reviewCount: SITE.reviewCount,
    },
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.name.id,
        description: s.tagline.id,
      },
      price: s.durations[0].price,
      priceCurrency: "IDR",
    })),
    sameAs: ["https://instagram.com/amerta.massage"],
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faq.items.id.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
      <Landing />
    </>
  );
}
