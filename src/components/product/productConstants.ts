// constants/productConstants.ts

export const brands = [
  {
    id: "ain-saiss",
    name: "Ain Saiss",
    logo: "/assets/images/brands/LogoAS.png",
    apiName: "AIN_SAISS",
  },
  {
    id: "ghayt",
    name: "Ghayt",
    logo: "/assets/images/brands/ghayt-logo.png",
    apiName: "GHAYT",
  },
  {
    id: "sidi-hrazam",
    name: "Sidi Hrazam",
    logo: "/assets/images/brands/sidihrazam-logo.png",
    apiName: "SIDI_HARAZEM",
  },
];

export const formats = [
  {
    id: "petit",
    name: "Petit format (moins de 1L)",
    min: 0,
    max: 0.99,
  },
  {
    id: "moyen",
    name: "Moyen format (1L à 1,5L)",
    min: 1,
    max: 1.5,
  },
  {
    id: "grand",
    name: "Grand format (2L et plus)",
    min: 2,
    max: 4.99,
  },
  {
    id: "fontaines",
    name: "Fontaines / Bidons (5L et 6L)",
    min: 5,
    max: 100,
  },
];

// The minimum order amount in MAD (use in cart related components)
export const MINIMUM_ORDER_AMOUNT = 150;
