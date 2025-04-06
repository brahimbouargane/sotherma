// // Default SEO values
// export const DEFAULT_SITE_NAME = "Ain Saiss | Eau Minérale Naturelle";
// export const DEFAULT_DESCRIPTION =
//   "Découvrez l'eau minérale naturelle Ain Saiss, idéale pour une hydratation optimale pendant et après l'effort. Livraison à domicile disponible.";
// export const DEFAULT_KEYWORDS =
//   "eau minérale, eau naturelle, hydratation, eau premium, livraison eau, Ain Saiss, Maroc";
// export const DEFAULT_URL = "https://www.ain-saiss.ma";
// export const DEFAULT_IMAGE = "/src/assets/images/og-image.jpg";

// // SEO configuration for different page types
// export const PAGE_SEO = {
//   home: {
//     title: "Ain Saiss | Eau Minérale Naturelle - Accueil",
//     description:
//       "Eau minérale naturelle, pour une meilleure récupération pendant et après l'effort. Livraison à domicile disponible.",
//     keywords: "eau minérale, hydratation, eau Maroc, livraison eau, Ain Saiss",
//   },
//   products: {
//     title: "Nos Produits | Ain Saiss",
//     description:
//       "Découvrez notre gamme complète d'eau minérale Ain Saiss. Des bouteilles dans tous les formats pour tous vos besoins d'hydratation.",
//     keywords:
//       "eau minérale, bouteilles eau, eau naturelle, eau premium, Ain Saiss",
//   },
//   about: {
//     title: "À Propos | Ain Saiss",
//     description:
//       "Découvrez l'histoire d'Ain Saiss, notre mission et notre engagement pour une eau minérale de qualité supérieure.",
//     keywords:
//       "Ain Saiss, histoire, eau maroc, eau minérale maroc, source naturelle",
//   },
//   blog: {
//     title: "Blog & Actualités | Ain Saiss",
//     description:
//       "Restez informé avec les dernières actualités et conseils d'hydratation du blog Ain Saiss.",
//     keywords: "actualités, blog, hydratation, santé, eau minérale, Ain Saiss",
//   },
//   cart: {
//     title: "Votre Panier | Ain Saiss",
//     description:
//       "Consultez votre panier Ain Saiss et finalisez votre commande pour une livraison rapide.",
//     keywords: "panier, commande, eau minérale, livraison eau",
//   },
//   checkout: {
//     title: "Paiement | Ain Saiss",
//     description:
//       "Finalisez votre commande d'eau minérale Ain Saiss en toute sécurité.",
//     keywords: "paiement, commande, livraison, eau minérale",
//   },
// };

// // Function to generate schema.org structured data for products
// export const generateProductSchema = (product: any) => {
//   return {
//     "@context": "https://schema.org",
//     "@type": "Product",
//     name: product.name,
//     description: product.description,
//     image: product.images[0],
//     sku: product.id,
//     offers: {
//       "@type": "Offer",
//       price: product.price,
//       priceCurrency: "MAD",
//       availability:
//         product.stock > 0
//           ? "https://schema.org/InStock"
//           : "https://schema.org/OutOfStock",
//     },
//     brand: {
//       "@type": "Brand",
//       name: "Ain Saiss",
//     },
//   };
// };

// // Function to generate schema.org structured data for the organization
// export const generateOrganizationSchema = () => {
//   return {
//     "@context": "https://schema.org",
//     "@type": "Organization",
//     name: "Ain Saiss",
//     url: DEFAULT_URL,
//     logo: `${DEFAULT_URL}/src/assets/images/logo.svg`,
//     contactPoint: {
//       "@type": "ContactPoint",
//       telephone: "+212-808-255-001",
//       contactType: "customer service",
//       availableLanguage: ["French", "Arabic"],
//     },
//     sameAs: [
//       "https://www.facebook.com/AinSaiss",
//       "https://www.instagram.com/ainsaiss_officiel",
//       "https://twitter.com/AinSaiss",
//     ],
//   };
// };

// // Function to format metadata for the Helmet component
// export const formatSEOMetadata = (
//   pageType: keyof typeof PAGE_SEO,
//   customData?: Record<string, string>
// ) => {
//   const seoData = PAGE_SEO[pageType] || PAGE_SEO.home;

//   return {
//     title: customData?.title || seoData.title,
//     description: customData?.description || seoData.description,
//     keywords: customData?.keywords || seoData.keywords,
//     canonical:
//       customData?.url ||
//       DEFAULT_URL + (pageType === "home" ? "" : `/${pageType}`),
//     ogImage: customData?.image || DEFAULT_IMAGE,
//   };
// };
