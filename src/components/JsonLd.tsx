// Structured data stays in canonical English regardless of UI locale — schema
// markup doesn't need to track the live translation, and duplicating a few
// short strings here is simpler than coupling this to the i18n system.
const SITE_URL = "https://landing-page-three-lac-54.vercel.app";

const OFFERS = [
  { name: "Launch", price: "497", description: "High-converting one-pager" },
  { name: "Business", price: "997", description: "Full 5-page website" },
  { name: "Growth", price: "1997", description: "Website + growth engine" },
];

const FAQS = [
  {
    q: "How can you deliver in 72 hours?",
    a: "A tight process, and one project at a time. A 10-minute brief gives me everything I need, there's no committee to wait on and no back-and-forth between three departments. You get agency quality without the agency overhead.",
  },
  {
    q: "Do I own the website?",
    a: "100%. Domain, code and content are all yours after final payment.",
  },
  {
    q: "What if I don't like it?",
    a: "Every plan includes 2 revision rounds, and you approve the preview before paying the balance.",
  },
  {
    q: "I'm not in the US. Does that matter?",
    a: "Not at all. We work with clients in 4 countries, async-first, with same-day responses.",
  },
  {
    q: "What do you need from me?",
    a: "10 minutes on a form. Logo and photos help, but we can work without them.",
  },
  {
    q: "How do payments work?",
    a: "50% to lock your slot, 50% on approval. Card via Stripe, protected and simple.",
  },
];

export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#business`,
        name: "think.studio",
        url: SITE_URL,
        description:
          "Conversion-engineered websites designed, written and shipped in 72 hours. Custom-built for your business, perfected by hand.",
        areaServed: ["US", "GB", "CA", "AU"],
        priceRange: "$497-$1997",
        makesOffer: OFFERS.map((offer) => ({
          "@type": "Offer",
          name: offer.name,
          price: offer.price,
          priceCurrency: "USD",
          description: offer.description,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: FAQS.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
