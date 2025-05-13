// // utils/productUtils.ts
// import { Product } from "../../lib/api/productService";

// /**
//  * Extract volume value from product description
//  * @param description The product description
//  * @returns The volume in liters, or null if not found
//  */
// export const extractVolumeFromDescription = (
//   description: string | null
// ): number | null => {
//   if (!description) return null;

//   // Looking for patterns like: 5L, 1.5L, 0.33L, 0,5L
//   const volumeRegex = /(\d+(?:[.,]\d+)?)\s*L/i;
//   const match = description.match(volumeRegex);

//   if (match && match[1]) {
//     // Convert comma to period for proper parsing
//     const volumeStr = match[1].replace(",", ".");
//     return parseFloat(volumeStr);
//   }

//   return null;
// };

// /**
//  * Get the product image source with fallback
//  * @param product The product object
//  * @returns URL for the product image
//  */
// export const getImageSrc = (
//   product: Product,
//   fallbackImage: string
// ): string => {
//   try {
//     if (product.images && product.images.length > 0) {
//       const image = product.images[0] as { content?: string; id?: string };

//       // If we have base64 content, use it
//       if (image.content) {
//         // If it's already a data URL, use it directly
//         if (image.content.startsWith("data:")) {
//           return image.content;
//         }
//         // Otherwise, add the data URL prefix
//         return `data:image/jpeg;base64,${image.content}`;
//       }

//       // If we have an ID, try to use the image endpoint
//       if (image.id) {
//         return `${import.meta.env.VITE_API_URL || ""}/images/${image.id}`;
//       }
//     }
//   } catch (err: any) {
//     // Silent error handling with fallback
//     console.error("Error getting image source:", err.message);
//   }

//   // Fallback to default image
//   return fallbackImage;
// };

// /**
//  * Get the best available product name
//  * @param product The product object
//  * @returns The product name
//  */
// export const getProductName = (product: Product): string => {
//   return (
//     product.nameFrench ||
//     product.nameEnglish ||
//     product.nameArabic ||
//     "Produit sans nom"
//   );
// };

// /**
//  * Get the best available product description
//  * @param product The product object
//  * @returns The product description
//  */
// export const getProductDescription = (product: Product): string => {
//   return (
//     product.lightDescriptionEnglish || product.detailedDescriptionEnglish || ""
//   );
// };

// /**
//  * Creates API filter parameters from UI filters
//  * @param selectedBrands Array of selected brand IDs
//  * @param searchQuery Search query
//  * @param brands Brand mapping data
//  * @returns Object with API parameters
//  */
// export const createApiFilterParams = (
//   selectedBrands: string[],
//   searchQuery: string,
//   brands: any[]
// ) => {
//   // Get current formatted filters for API
//   const apiFormattedBrands = selectedBrands
//     .map((brandId) => {
//       const brand = brands.find((b) => b.id === brandId);
//       return brand?.apiName || "";
//     })
//     .filter(Boolean);

//   // Construct API query
//   return {
//     orderBy: "id",
//     order: "ASC",
//     // Only add search term if it exists
//     ...(searchQuery.trim() ? { query: searchQuery } : {}),
//     // Add brand filter if any selected
//     ...(apiFormattedBrands.length > 0
//       ? { brands: apiFormattedBrands.join(",") }
//       : {}),
//   };
// };

// /**
//  * Filter products by format (bottle size)
//  * @param products Array of products
//  * @param selectedFormats Array of format IDs
//  * @param formats Format definitions
//  * @returns Filtered products array
//  */
// export const filterProductsByFormat = (
//   products: Product[],
//   selectedFormats: string[],
//   formats: any[]
// ) => {
//   if (!selectedFormats.length) return products;

//   return products.filter((product) => {
//     // Try to get volume from volume field first
//     let volume = product.volume ? parseFloat(product.volume.toString()) : null;

//     // If no volume field, try to extract from description
//     if (volume === null || isNaN(volume)) {
//       volume =
//         extractVolumeFromDescription(
//           product.detailedDescriptionEnglish ?? null
//         ) ||
//         extractVolumeFromDescription(product.lightDescriptionEnglish ?? null);
//     }

//     // If still no volume, we can't determine format
//     if (volume === null || isNaN(volume)) return false;

//     return selectedFormats.some((formatId) => {
//       const format = formats.find((f) => f.id === formatId);
//       if (!format) return false;

//       return volume >= format.min && volume <= format.max;
//     });
//   });
// };

// /**
//  * Filter products by brand
//  * @param products Array of products
//  * @param selectedBrands Array of brand IDs
//  * @param brands Brand definitions
//  * @returns Filtered products array
//  */
// export const filterProductsByBrand = (
//   products: Product[],
//   selectedBrands: string[],
//   brands: any[]
// ) => {
//   if (!selectedBrands.length) return products;

//   // Create a brand mapping from ID to API name
//   const brandMapping = brands.reduce((acc, brand) => {
//     acc[brand.id] = brand.apiName;
//     return acc;
//   }, {});

//   return products.filter((product) =>
//     selectedBrands.some((brandId) => product.brand === brandMapping[brandId])
//   );
// };

// utils/productUtils.ts
import { Product } from "../../lib/api/productService";
/**
 * Extract volume value from product description
 * @param description The product description
 * @returns The volume in liters, or null if not found
 */
export const extractVolumeFromDescription = (
  description: string | null
): number | null => {
  if (!description) return null;

  // More robust regex to handle various volume formats (5L, 1.5L, 0.33L, 0,5L, 5 L, etc.)
  const volumeRegex = /(\d+(?:[.,]\d+)?)\s*L(?:itres?)?/i;
  const match = description.match(volumeRegex);

  if (match && match[1]) {
    // Convert comma to period for proper parsing
    const volumeStr = match[1].replace(",", ".");
    return parseFloat(volumeStr);
  }

  return null;
};

/**
 * Get the product image source with fallback
 * @param product The product object
 * @returns URL for the product image
 */
// export const getImageSrc = (
//   product: Product,
//   fallbackImage: string
// ): string => {
//   try {
//     if (product.images && product.images.length > 0) {
//       const image = product.images[0];
//       // If we have base64 content, use it
//       if (image.content) {
//         // If it's already a data URL, use it directly
//         if (image.content.startsWith("data:")) {
//           return image.content;
//         }
//         // Otherwise, add the data URL prefix
//         return `data:image/jpeg;base64,${image.content}`;
//       }

//       // If we have an ID, try to use the image endpoint
//       if (image.id) {
//         return `${import.meta.env.VITE_API_URL || ""}/images/${image.id}`;
//       }
//     }
//   } catch (err) {
//     // Silent error handling with fallback
//   }

//   // Fallback to default image
//   return fallbackImage;
// };

export const getImageSrc = (
  product: Product,
  fallbackImage: string
): string => {
  try {
    if (product.images && product.images.length > 0) {
      const image = product.images[0];
      // If we have base64 content, use it
      if (image.content) {
        // If it's already a data URL, use it directly
        if (image.content.startsWith("data:")) {
          return image.content;
        }
        // Otherwise, add the data URL prefix
        return `data:image/jpeg;base64,${image.content}`;
      }

      // If we have an ID, try to use the image endpoint
      if (image.id) {
        return `${import.meta.env.VITE_API_URL || ""}/images/${image.id}`;
      }
    }
  } catch (err) {
    // Silent error handling with fallback
  }
  return fallbackImage;
};

/**
 * Get the best available product name
 * @param product The product object
 * @returns The product name
 */
export const getProductName = (product: Product): string => {
  return (
    product.nameFrench ||
    product.nameEnglish ||
    product.nameArabic ||
    "Produit sans nom"
  );
};

/**
 * Get the best available product description
 * @param product The product object
 * @returns The product description
 */
export const getProductDescription = (product: Product): string => {
  return (
    product.lightDescriptionFrench ||
    product.lightDescriptionEnglish ||
    product.detailedDescriptionFrench ||
    product.detailedDescriptionEnglish ||
    ""
  );
};

/**
 * Get the product volume either from the volume field or from the description
 * @param product The product
 * @returns The volume in liters or null if not found
 */
export const getProductVolume = (product: Product): number | null => {
  // Try to get volume from volume field first
  let volume = product.volume ? parseFloat(product.volume) : null;

  // If no volume field or invalid, try to extract from description
  if (volume === null || isNaN(volume)) {
    volume =
      extractVolumeFromDescription(product.detailedDescriptionFrench) ||
      extractVolumeFromDescription(product.lightDescriptionFrench) ||
      extractVolumeFromDescription(product.detailedDescriptionEnglish) ||
      extractVolumeFromDescription(product.lightDescriptionEnglish);
  }

  return volume;
};

/**
 * Creates API filter parameters from UI filters
 * @param selectedBrands Array of selected brand IDs
 * @param searchQuery Search query
 * @param brands Brand mapping data
 * @returns Object with API parameters
 */
export const createApiFilterParams = (
  selectedBrands: string[],
  searchQuery: string,
  brands: any[],
  page: number = 0,
  pageSize: number = 10
) => {
  // Get current formatted filters for API
  const apiFormattedBrands = selectedBrands
    .map((brandId) => {
      const brand = brands.find((b) => b.id === brandId);
      return brand?.apiName || "";
    })
    .filter(Boolean);

  // Construct API query
  return {
    page,
    size: pageSize,
    orderBy: "id",
    order: "ASC",
    // Only add search term if it exists
    ...(searchQuery.trim() ? { query: searchQuery } : {}),
    // Add brand filter if any selected
    ...(apiFormattedBrands.length > 0
      ? { brands: apiFormattedBrands.join(",") }
      : {}),
  };
};

/**
 * Filter products by format (bottle size)
 * @param products Array of products
 * @param selectedFormats Array of format IDs
 * @param formats Format definitions
 * @returns Filtered products array
 */
export const filterProductsByFormat = (
  products: Product[],
  selectedFormats: string[],
  formats: any[]
): Product[] => {
  if (!selectedFormats.length) return products;

  return products.filter((product) => {
    // Get the volume
    const volume = getProductVolume(product);

    // If no volume, we can't determine format
    if (volume === null || isNaN(volume)) return false;

    // Check if the volume matches any of the selected formats
    return selectedFormats.some((formatId) => {
      const format = formats.find((f) => f.id === formatId);
      if (!format) return false;

      return volume >= format.min && volume <= format.max;
    });
  });
};

/**
 * Apply all filters to products (both API filters and client-side filters)
 * @param products Array of all products
 * @param selectedBrands Array of selected brand IDs
 * @param selectedFormats Array of selected format IDs
 * @param searchQuery Search query
 * @param brands Brand definitions
 * @param formats Format definitions
 * @returns Filtered products array
 */
export const applyAllFilters = (
  products: Product[],
  selectedBrands: string[],
  selectedFormats: string[],
  searchQuery: string,
  brands: any[],
  formats: any[]
): Product[] => {
  // No filters applied
  if (
    !selectedBrands.length &&
    !selectedFormats.length &&
    !searchQuery.trim()
  ) {
    return products;
  }

  let filteredProducts = [...products];

  // Apply brand filter if needed
  if (selectedBrands.length > 0) {
    // Create a brand mapping from ID to API name
    const brandMapping = brands.reduce((acc, brand) => {
      acc[brand.id] = brand.apiName;
      return acc;
    }, {});

    filteredProducts = filteredProducts.filter((product) =>
      selectedBrands.some((brandId) => product.brand === brandMapping[brandId])
    );
  }

  // Apply format filter if needed
  if (selectedFormats.length > 0) {
    filteredProducts = filterProductsByFormat(
      filteredProducts,
      selectedFormats,
      formats
    );
  }

  // Apply search filter if needed - Note: this would typically be done server-side
  // This is just a client-side fallback for when we already have the products loaded
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase().trim();
    filteredProducts = filteredProducts.filter((product) => {
      const name = getProductName(product).toLowerCase();
      const description = getProductDescription(product).toLowerCase();
      return name.includes(query) || description.includes(query);
    });
  }

  return filteredProducts;
};

/**
 * Check if any filters are active
 * @param selectedBrands Array of selected brand IDs
 * @param selectedFormats Array of selected format IDs
 * @param searchQuery Search query
 * @returns True if any filters are active
 */
export const hasActiveFilters = (
  selectedBrands: string[],
  selectedFormats: string[],
  searchQuery: string
): boolean => {
  return (
    selectedBrands.length > 0 ||
    selectedFormats.length > 0 ||
    !!searchQuery.trim()
  );
};

/**
 * Categorize products by a criteria such as brand
 * @param products Array of products
 * @param getCategoryKey Function to get the category key from a product
 * @returns Object with category keys and arrays of products
 */
export const categorizeProducts = <T>(
  products: Product[],
  getCategoryKey: (product: Product) => T
): Record<string, Product[]> => {
  return products.reduce((acc, product) => {
    const key = String(getCategoryKey(product));
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(product);
    return acc;
  }, {} as Record<string, Product[]>);
};

/**
 * Sort products by a criteria such as price
 * @param products Array of products
 * @param sortKey Key to sort by (e.g. 'price')
 * @param direction 'asc' or 'desc'
 * @returns Sorted array of products
 */
export const sortProducts = (
  products: Product[],
  sortKey: keyof Product = "price",
  direction: "asc" | "desc" = "asc"
): Product[] => {
  return [...products].sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];

    // Handle undefined or null values
    if (aValue === undefined || aValue === null)
      return direction === "asc" ? -1 : 1;
    if (bValue === undefined || bValue === null)
      return direction === "asc" ? 1 : -1;

    // Compare values
    if (aValue < bValue) return direction === "asc" ? -1 : 1;
    if (aValue > bValue) return direction === "asc" ? 1 : -1;
    return 0;
  });
};
