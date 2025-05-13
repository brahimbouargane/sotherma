// src/utils/toastConfig.js

/**
 * Toast configuration with styles that match your application
 */
export const toastConfig = {
  // Success toast styles
  successStyle: {
    style: {
      background: "#EBF7ED", // Light green background
      color: "#0D652D", // Dark green text
      border: "1px solid #A3E4B4", // Green border
      padding: "12px 16px",
      borderRadius: "8px",
      fontWeight: "500",
      maxWidth: "380px",
    },
    iconTheme: {
      primary: "#0D652D", // Dark green icon
      secondary: "#EBF7ED", // Light green background
    },
    duration: 3000, // 3 seconds
  },

  // Error toast styles
  errorStyle: {
    style: {
      background: "#fff", // Light red background
      color: "#B42318", // Dark red text
      border: "1px solid #F5AEA8", // Red border
      padding: "12px 16px",
      borderRadius: "20px",
      fontWeight: "500",
      maxWidth: "380px",
    },
    iconTheme: {
      primary: "#B42318", // Dark red icon
      secondary: "#FEECEB", // Light red background
    },
    duration: 4000, // 4 seconds - slightly longer for errors
  },

  // Warning toast styles (for 429, 423, etc.)
  warningStyle: {
    style: {
      background: "#FEF7E6", // Light yellow background
      color: "#B25E09", // Dark orange/amber text
      border: "1px solid #FCDAA2", // Yellow border
      padding: "12px 16px",
      borderRadius: "8px",
      fontWeight: "500",
      maxWidth: "380px",
    },
    iconTheme: {
      primary: "#B25E09", // Dark orange icon
      secondary: "#FEF7E6", // Light yellow background
    },
    duration: 5000, // 5 seconds for warnings
  },

  // Info toast styles (for neutral messages)
  infoStyle: {
    style: {
      background: "#EFF6FF", // Light blue background
      color: "#1E40AF", // Dark blue text
      border: "1px solid #BFDBFE", // Blue border
      padding: "12px 16px",
      borderRadius: "8px",
      fontWeight: "500",
      maxWidth: "380px",
    },
    iconTheme: {
      primary: "#1E40AF", // Dark blue icon
      secondary: "#EFF6FF", // Light blue background
    },
    duration: 3000, // 3 seconds
  },

  // Server error toast styles (for 500-level errors)
  serverErrorStyle: {
    style: {
      background: "#F9FAFB", // Light gray background
      color: "#374151", // Dark gray text
      border: "1px solid #D1D5DB", // Gray border
      padding: "12px 16px",
      borderRadius: "8px",
      fontWeight: "500",
      maxWidth: "380px",
    },
    iconTheme: {
      primary: "#374151", // Dark gray icon
      secondary: "#F9FAFB", // Light gray background
    },
    duration: 4000, // 4 seconds
  },

  // Default position for all toasts
  defaultPosition: "top-center",

  /**
   * Get appropriate toast style based on HTTP status code
   * @param {number} statusCode - HTTP status code
   * @returns {Object} Toast style configuration
   */
  getStyleForStatus: (statusCode) => {
    if (!statusCode) return toastConfig.errorStyle;

    // Success codes (2xx)
    if (statusCode >= 200 && statusCode < 300) {
      return toastConfig.successStyle;
    }

    // Client errors (4xx)
    if (statusCode >= 400 && statusCode < 500) {
      // Special cases for rate limiting or temporary issues
      if ([423, 429, 408].includes(statusCode)) {
        return toastConfig.warningStyle;
      }
      return toastConfig.errorStyle;
    }

    // Server errors (5xx)
    if (statusCode >= 500) {
      return toastConfig.serverErrorStyle;
    }

    // Default to error style
    return toastConfig.errorStyle;
  },
};

export default toastConfig;
