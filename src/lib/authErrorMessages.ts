// src/utils/authErrorMessages.js

/**
 * French error messages for authentication errors
 * Organized by error types and HTTP status codes
 */
export const authErrorMessages = {
  // Authentication errors (general)
  "Invalid credentials":
    "Identifiants invalides. Veuillez vérifier votre email et mot de passe.",
  "User not found":
    "Utilisateur non trouvé. Veuillez vérifier votre email ou créer un compte.",
  "Invalid password": "Mot de passe incorrect. Veuillez réessayer.",
  "Too many attempts":
    "Trop de tentatives de connexion. Veuillez réessayer ultérieurement.",
  "Account locked":
    "Votre compte a été temporairement verrouillé suite à plusieurs tentatives de connexion.",
  "Account not activated":
    "Votre compte n'est pas activé. Veuillez vérifier votre email pour activer votre compte.",
  "Email not verified":
    "Veuillez vérifier votre adresse email avant de vous connecter.",

  // Network/Server errors
  "Network error":
    "Erreur de connexion au serveur. Veuillez vérifier votre connexion internet.",
  "Server error": "Erreur serveur. Veuillez réessayer plus tard.",
  "Connection timeout": "La connexion au serveur a expiré. Veuillez réessayer.",
  "Service unavailable":
    "Le service est temporairement indisponible. Veuillez réessayer ultérieurement.",

  // Input validation errors
  "Invalid email format":
    "Format d'email invalide. Veuillez saisir une adresse email valide.",
  "Password required": "Le mot de passe est requis.",
  "Email required": "L'email est requis.",

  // Account status errors
  "Account suspended":
    "Votre compte a été suspendu. Veuillez contacter le support client.",
  "Account deleted":
    "Ce compte a été supprimé. Veuillez contacter le support client pour plus d'informations.",
  "Subscription expired":
    "Votre abonnement a expiré. Veuillez le renouveler pour continuer.",

  // Generic
  "Unknown error":
    "Une erreur inconnue s'est produite. Veuillez réessayer ou contacter le support.",

  // HTTP Status Codes
  status: {
    400: "Requête invalide. Veuillez vérifier vos informations.",
    401: "Identifiants invalides. Veuillez vérifier votre email et mot de passe.",
    403: "Accès refusé. Vous n'avez pas les droits nécessaires pour cette action.",
    404: "Utilisateur non trouvé. Veuillez vérifier vos identifiants ou créer un compte.",
    408: "La requête a expiré. Veuillez réessayer.",
    409: "Conflit avec l'état actuel. Veuillez réessayer plus tard.",
    422: "Données invalides. Veuillez vérifier vos informations.",
    423: "Compte verrouillé. Veuillez réessayer plus tard ou contacter le support.",
    429: "Trop de tentatives. Veuillez réessayer ultérieurement.",
    500: "Erreur serveur. Veuillez réessayer plus tard.",
    502: "Service temporairement indisponible. Veuillez réessayer ultérieurement.",
    503: "Service indisponible. Veuillez réessayer plus tard.",
    504: "La requête a pris trop de temps. Veuillez vérifier votre connexion et réessayer.",
  },
};

/**
 * Get a user-friendly error message in French based on error object or HTTP status
 * @param {Error|Object|string} error - The error object, message, or status code
 * @returns {string} User-friendly error message
 */
export const getAuthErrorMessage = (error) => {
  // Default message
  const defaultMessage =
    "Une erreur s'est produite lors de la connexion. Veuillez réessayer.";

  if (!error) {
    return defaultMessage;
  }

  // If error is a number, treat it as HTTP status code
  if (typeof error === "number") {
    return authErrorMessages.status[error] || defaultMessage;
  }

  // Handle error objects
  if (typeof error === "object") {
    // Check for HTTP status code
    if (error.status || error.statusCode) {
      const statusCode = error.status || error.statusCode;
      if (authErrorMessages.status[statusCode]) {
        return authErrorMessages.status[statusCode];
      }
    }

    // Check for axios error response
    if (error.response && error.response.status) {
      if (authErrorMessages.status[error.response.status]) {
        return authErrorMessages.status[error.response.status];
      }

      // Check for server error message in response
      if (error.response.data && error.response.data.message) {
        return error.response.data.message;
      }
    }

    // Extract message from error object
    const errorMsg = error.message || error.code || "";

    // Try to find a matching message
    return authErrorMessages[errorMsg] || errorMsg || defaultMessage;
  }

  // Handle string errors
  if (typeof error === "string") {
    return authErrorMessages[error] || error || defaultMessage;
  }

  return defaultMessage;
};

export default getAuthErrorMessage;
