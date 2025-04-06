// import { Helmet } from "react-helmet-async";
// import {
//   formatSEOMetadata,
//   generateOrganizationSchema,
//   generateProductSchema,
//   PAGE_SEO,
//   DEFAULT_SITE_NAME,
// } from "../../lib/seo-utils";

// interface SEOProps {
//   pageType: keyof typeof PAGE_SEO;
//   title?: string;
//   description?: string;
//   keywords?: string;
//   image?: string;
//   url?: string;
//   product?: any;
//   noIndex?: boolean;
// }

// const SEO = ({
//   pageType,
//   title,
//   description,
//   keywords,
//   image,
//   url,
//   product,
//   noIndex = false,
// }: SEOProps) => {
//   const customData = {
//     title,
//     description,
//     keywords,
//     image,
//     url,
//   };

//   const metadata = formatSEOMetadata(pageType, customData);

//   return (
//     <Helmet>
//       <title>{metadata.title}</title>
//       <meta name="description" content={metadata.description} />
//       <meta name="keywords" content={metadata.keywords} />

//       {/* Canonical URL */}
//       <link rel="canonical" href={metadata.canonical} />

//       {/* Open Graph / Facebook */}
//       <meta
//         property="og:type"
//         content={pageType === "home" ? "website" : "article"}
//       />
//       <meta property="og:title" content={metadata.title} />
//       <meta property="og:description" content={metadata.description} />
//       <meta property="og:url" content={metadata.canonical} />
//       <meta property="og:image" content={metadata.ogImage} />
//       <meta property="og:site_name" content={DEFAULT_SITE_NAME} />

//       {/* Twitter */}
//       <meta name="twitter:card" content="summary_large_image" />
//       <meta name="twitter:title" content={metadata.title} />
//       <meta name="twitter:description" content={metadata.description} />
//       <meta name="twitter:image" content={metadata.ogImage} />

//       {/* No index if specified */}
//       {noIndex && <meta name="robots" content="noindex, nofollow" />}

//       {/* Structured Data */}
//       {product && (
//         <script type="application/ld+json">
//           {JSON.stringify(generateProductSchema(product))}
//         </script>
//       )}

//       {pageType === "home" && (
//         <script type="application/ld+json">
//           {JSON.stringify(generateOrganizationSchema())}
//         </script>
//       )}
//     </Helmet>
//   );
// };

// export default SEO;
