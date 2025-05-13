// // components/products/Pagination.tsx
// import { FC } from "react";

// interface PaginationProps {
//   pagination: {
//     page: number;
//     totalPages: number;
//     size: number;
//   };
//   onPageChange: (page: number) => void;
// }

// export const Pagination: FC<PaginationProps> = ({
//   pagination,
//   onPageChange,
// }) => {
//   if (!pagination || pagination.totalPages <= 1) return null;

//   return (
//     <div className="flex justify-center mt-12 mb-8">
//       <div className="flex items-center gap-2 bg-white shadow-md px-4 py-2 rounded-full">
//         {/* First page button */}
//         <button
//           onClick={() => onPageChange(0)}
//           disabled={pagination.page === 0}
//           className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 ${
//             pagination.page === 0
//               ? "text-gray-400 cursor-not-allowed"
//               : "text-blue-600 hover:bg-blue-50"
//           }`}
//           aria-label="First page"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="16"
//             height="16"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <polyline points="11 17 6 12 11 7"></polyline>
//             <polyline points="18 17 13 12 18 7"></polyline>
//           </svg>
//         </button>

//         {/* Previous page button */}
//         <button
//           onClick={() =>
//             pagination.page > 0 && onPageChange(pagination.page - 1)
//           }
//           disabled={pagination.page === 0}
//           className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 ${
//             pagination.page === 0
//               ? "text-gray-400 cursor-not-allowed"
//               : "text-blue-600 hover:bg-blue-50"
//           }`}
//           aria-label="Previous page"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="16"
//             height="16"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <polyline points="15 18 9 12 15 6"></polyline>
//           </svg>
//         </button>

//         {/* Divider */}
//         <div className="w-px h-6 bg-gray-200 mx-1"></div>

//         {/* Page numbers */}
//         <div className="flex gap-1 items-center">
//           {Array.from({ length: pagination.totalPages }, (_, i) => {
//             // Show limited pages for better UX
//             if (
//               pagination.totalPages <= 7 || // Show all if 7 or fewer pages
//               i === 0 || // Always show first page
//               i === pagination.totalPages - 1 || // Always show last page
//               (i >= pagination.page - 1 && i <= pagination.page + 1) // Show current page and neighbors
//             ) {
//               return (
//                 <button
//                   key={i}
//                   onClick={() => onPageChange(i)}
//                   className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-300 ${
//                     pagination.page === i
//                       ? "bg-[#0F67B1] text-white"
//                       : "text-gray-700 hover:bg-blue-50"
//                   }`}
//                 >
//                   {i + 1}
//                 </button>
//               );
//             }

//             // Show ellipsis (but only once per gap)
//             if (i === 1 && pagination.page > 3) {
//               return (
//                 <span key={`start-ellipsis`} className="px-1">
//                   ...
//                 </span>
//               );
//             }

//             if (
//               i === pagination.totalPages - 2 &&
//               pagination.page < pagination.totalPages - 4
//             ) {
//               return (
//                 <span key={`end-ellipsis`} className="px-1">
//                   ...
//                 </span>
//               );
//             }

//             return null;
//           })}
//         </div>

//         {/* Divider */}
//         <div className="w-px h-6 bg-gray-200 mx-1"></div>

//         {/* Next page button */}
//         <button
//           onClick={() =>
//             pagination.page < pagination.totalPages - 1 &&
//             onPageChange(pagination.page + 1)
//           }
//           disabled={pagination.page >= pagination.totalPages - 1}
//           className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 ${
//             pagination.page >= pagination.totalPages - 1
//               ? "text-gray-400 cursor-not-allowed"
//               : "text-blue-600 hover:bg-blue-50"
//           }`}
//           aria-label="Next page"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="16"
//             height="16"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <polyline points="9 18 15 12 9 6"></polyline>
//           </svg>
//         </button>

//         {/* Last page button */}
//         <button
//           onClick={() => onPageChange(pagination.totalPages - 1)}
//           disabled={pagination.page >= pagination.totalPages - 1}
//           className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 ${
//             pagination.page >= pagination.totalPages - 1
//               ? "text-gray-400 cursor-not-allowed"
//               : "text-blue-600 hover:bg-blue-50"
//           }`}
//           aria-label="Last page"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="16"
//             height="16"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <polyline points="13 17 18 12 13 7"></polyline>
//             <polyline points="6 17 11 12 6 7"></polyline>
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// };

// components/products/Pagination.tsx
import { FC, useState } from "react";

interface PaginationProps {
  pagination: {
    number?: number;
    totalPages: number;
    size: number;
    totalElements?: number;
  };
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export const Pagination: FC<PaginationProps> = ({
  pagination,
  onPageChange,
  isLoading = false,
}) => {
  // Don't render pagination if no data or only one page
  if (!pagination || pagination.totalPages <= 1) {
    return null;
  }

  // Use default page 0 if undefined
  const currentPage = pagination.page !== undefined ? pagination.page : 0;

  // Calculate visible page numbers
  const getVisiblePages = () => {
    const visibleItems = [];
    const totalPages = pagination.totalPages;

    // Always show first page
    visibleItems.push(0);

    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages - 2, currentPage + 1);

    // Handle special cases for smaller pagination ranges
    if (totalPages <= 7) {
      // For small ranges, show all pages
      for (let i = 1; i < totalPages - 1; i++) {
        visibleItems.push(i);
      }
    } else {
      // If we're near the start
      if (currentPage < 4) {
        visibleItems.push(1, 2, 3);
        visibleItems.push("ellipsis-end");
      }
      // If we're near the end
      else if (currentPage > totalPages - 5) {
        visibleItems.push("ellipsis-start");
        for (let i = totalPages - 4; i < totalPages - 1; i++) {
          visibleItems.push(i);
        }
      }
      // We're in the middle
      else {
        visibleItems.push("ellipsis-start");
        for (let i = startPage; i <= endPage; i++) {
          visibleItems.push(i);
        }
        visibleItems.push("ellipsis-end");
      }
    }

    // Always show last page if more than one page
    if (totalPages > 1) {
      visibleItems.push(totalPages - 1);
    }

    return visibleItems;
  };

  const visiblePages = getVisiblePages();

  // Page button styles - using inline styles to guarantee they work
  const baseButtonStyle = {
    width: "36px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "9999px",
    fontSize: "0.875rem",
    fontWeight: "500",
    transition: "all 300ms",
  };

  const activeButtonStyle = {
    ...baseButtonStyle,
    backgroundColor: "#22c55e", // Green-500 equivalent
    color: "white",
  };

  const inactiveButtonStyle = {
    ...baseButtonStyle,
    backgroundColor: "transparent",
    color: "#374151", // Gray-700 equivalent
  };

  const disabledButtonStyle = {
    ...baseButtonStyle,
    color: "#9ca3af", // Gray-400 equivalent
    cursor: "not-allowed",
    opacity: "0.7",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "3rem",
        marginBottom: "2rem",
      }}
    >
      {/* Page info text */}
      {pagination.totalElements !== undefined && (
        <div
          style={{
            fontSize: "0.875rem",
            color: "#6b7280",
            marginBottom: "0.75rem",
          }}
        >
          Affichage des produits {currentPage * (pagination.size || 10) + 1} à{" "}
          {Math.min(
            (currentPage + 1) * (pagination.size || 10),
            pagination.totalElements
          )}{" "}
          sur {pagination.totalElements}
        </div>
      )}

      {/* Pagination controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          backgroundColor: "white",
          boxShadow:
            "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          padding: "0.5rem 1rem",
          borderRadius: "9999px",
        }}
      >
        {/* First page button */}
        <button
          onClick={() => !isLoading && onPageChange(0)}
          disabled={currentPage === 0 || isLoading}
          style={
            currentPage === 0 || isLoading
              ? disabledButtonStyle
              : inactiveButtonStyle
          }
          aria-label="Première page"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="11 17 6 12 11 7"></polyline>
            <polyline points="18 17 13 12 18 7"></polyline>
          </svg>
        </button>

        {/* Previous page button */}
        <button
          onClick={() =>
            !isLoading && currentPage > 0 && onPageChange(currentPage - 1)
          }
          disabled={currentPage === 0 || isLoading}
          style={
            currentPage === 0 || isLoading
              ? disabledButtonStyle
              : inactiveButtonStyle
          }
          aria-label="Page précédente"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {/* Divider */}
        <div
          style={{
            width: "1px",
            height: "24px",
            backgroundColor: "#e5e7eb",
            margin: "0 0.25rem",
          }}
        ></div>

        {/* Page numbers */}
        <div style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}>
          {visiblePages.map((page, index) => {
            // Handle ellipsis
            if (page === "ellipsis-start" || page === "ellipsis-end") {
              return (
                <span
                  key={`${page}-${index}`}
                  style={{ padding: "0 0.25rem", color: "#6b7280" }}
                >
                  ...
                </span>
              );
            }

            // Get page number as number (we know it's not ellipsis at this point)
            const pageNum = page as number;

            // Determine which style to use based on active state
            const buttonStyle =
              currentPage === pageNum
                ? activeButtonStyle
                : isLoading
                ? {
                    ...inactiveButtonStyle,
                    opacity: 0.7,
                    cursor: "not-allowed",
                  }
                : inactiveButtonStyle;

            // Add hover effect for inactive buttons
            const handleMouseEnter = (
              e: React.MouseEvent<HTMLButtonElement>
            ) => {
              if (currentPage !== pageNum && !isLoading) {
                e.currentTarget.style.backgroundColor = "#f0f9ff"; // Light blue hover effect
              }
            };

            const handleMouseLeave = (
              e: React.MouseEvent<HTMLButtonElement>
            ) => {
              if (currentPage !== pageNum && !isLoading) {
                e.currentTarget.style.backgroundColor = "transparent";
              }
            };

            // Render page numbers
            return (
              <button
                key={`page-${pageNum}`}
                onClick={() => !isLoading && onPageChange(pageNum)}
                style={buttonStyle}
                disabled={isLoading}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {pageNum + 1}
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div
          style={{
            width: "1px",
            height: "24px",
            backgroundColor: "#e5e7eb",
            margin: "0 0.25rem",
          }}
        ></div>

        {/* Next page button */}
        <button
          onClick={() =>
            !isLoading &&
            currentPage < pagination.totalPages - 1 &&
            onPageChange(currentPage + 1)
          }
          disabled={currentPage >= pagination.totalPages - 1 || isLoading}
          style={
            currentPage >= pagination.totalPages - 1 || isLoading
              ? disabledButtonStyle
              : inactiveButtonStyle
          }
          aria-label="Page suivante"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        {/* Last page button */}
        <button
          onClick={() => !isLoading && onPageChange(pagination.totalPages - 1)}
          disabled={currentPage >= pagination.totalPages - 1 || isLoading}
          style={
            currentPage >= pagination.totalPages - 1 || isLoading
              ? disabledButtonStyle
              : inactiveButtonStyle
          }
          aria-label="Dernière page"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="13 17 18 12 13 7"></polyline>
            <polyline points="6 17 11 12 6 7"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};
