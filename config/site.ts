export const siteConfig = {
  name: "Amish Built Garages",
  tagline: "Built by Hand. Built to Last.",
  description:
    "Premium Amish-crafted garages in the Chicago area. Custom-built with decades of tradition, quality materials, and a 10-year warranty. Get your free quote today.",
  url: "https://amishbuiltgarages.com",
  ogImage: "/og-image.png",
  phone: "(312) 555-0147",
  email: "info@amishbuiltgarages.com",
  address: {
    city: "Chicago",
    state: "IL",
    region: "Chicagoland Area",
  },
  social: {
    facebook: "#",
    instagram: "#",
  },
  keywords: [
    "amish built garages",
    "custom garages chicago",
    "garage builders near me",
    "amish garage construction",
    "detached garage chicago",
    "garage builder chicagoland",
    "custom garage contractor illinois",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
