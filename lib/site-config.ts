export const SHOW_PRICES = false;

export const siteConfig = {
  name: "Roshi Journeys",
  tagline: "All India Tours & Travels",
  description:
    "Roshi Journeys is an all-India tours and travels operator based in Uttarakhand, specializing in the Char Dham Yatra along with curated tours across Himachal Pradesh, Jammu & Kashmir, Rajasthan, Madhya Pradesh, Assam, Odisha and Rameshwaram.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://roshijourneys.example.com",
  ogImage: "/images/og-default.jpg",
  keywords: [
    "char dham yatra",
    "04 dham yatra",
    "uttarakhand tour packages",
    "kedarnath badrinath tour",
    "himachal pradesh tour packages",
    "kashmir tour packages",
    "rajasthan tour packages",
    "all india tours and travels",
    "chopta tungnath auli tour",
    "rameshwaram pilgrimage tour",
  ],
  contact: {
    phone: "+91 8077063404",
    phoneSecondary: "+91 8085817836",
    contactPersons: [
      { name: "Roshan Pawar", phone: "+91 8077063404" },
      { name: "Aashi Luniya", phone: "+91 8085817836" },
    ],
    whatsapp: "919758469667",
    whatsappSecondary: "918085817836",
    email: "roshanpanwar420@gmail.com",
    address: "Ulhera Mod, Uttarakhand Border, 247670",
    businessHours: "Mon – Sun: 7:00 AM – 9:00 PM",
  },
  social: {
    facebook: "https://facebook.com/roshijourneys",
    instagram: "https://instagram.com/roshijourneys",
    twitter: "https://twitter.com/roshijourneys",
    youtube: "https://youtube.com/@roshijourneys",
    linkedin: "https://linkedin.com/company/roshijourneys",
  },
  location: {
    lat: 30.0176,
    lng: 78.2513,
    address: "Ulhera Mod, Uttarakhand Border, 247670",
  },
} as const;
