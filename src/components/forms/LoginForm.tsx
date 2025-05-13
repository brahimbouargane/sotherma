// // src/components/LoginForm.jsx
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import Heroimage from "../../assets/images/mask-hero-seaction.webp";
// import HeroimageMobile from "../../assets/images/hero-original-image.webp";
// import { Link } from "@tanstack/react-router";
// import { useAuthStore } from "../../store/authStore";
// import { Eye, EyeOff } from "lucide-react"; // Import eye icons for password visibility

// const LoginForm = ({ onLoginSuccess }: any) => {
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   // const [isLoading, setIsLoading] = useState(false);
//   // const [error, setError] = useState("");

//   const [searchParams] = useState(
//     () => new URLSearchParams(window.location.search)
//   );
//   const redirectPath = searchParams.get("redirect") || "/account"; // Form state

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [showPassword, setShowPassword] = useState(false); // State for password visibility

//   // Form validation
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");

//   // Handle window resize
//   React.useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const { login, isLoading, error, clearError } = useAuthStore();

//   useEffect(() => {
//     if (error) {
//       clearError();
//     }
//   }, [email, password, clearError, error]);

//   // Toggle password visibility
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   // Validate form
//   const validateForm = () => {
//     let isValid = true;

//     // Validate email
//     if (!email) {
//       setEmailError("L'email est requis");
//       isValid = false;
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       setEmailError("L'email n'est pas valide");
//       isValid = false;
//     } else {
//       setEmailError("");
//     }

//     // Validate password
//     if (!password) {
//       setPasswordError("Le mot de passe est requis");
//       isValid = false;
//     } else {
//       setPasswordError("");
//     }

//     return isValid;
//   };

//   // Handle form submission
//   // Handle login
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validate form
//     if (!validateForm()) {
//       return;
//     }

//     try {
//       // Call login from auth store
//       await login({ email, password, rememberMe });

//       // Call onLoginSuccess if provided
//       if (onLoginSuccess) {
//         onLoginSuccess();
//       }
//       window.location.href = redirectPath;
//     } catch (err) {
//       // Error is already handled by the auth store
//       console.error("Login submission error:", err);
//     }
//   };

//   // const handleGoogleLogin = () => {
//   //   console.log("Google login clicked");
//   //   // Implement Google OAuth logic here
//   // };

//   // const handleFacebookLogin = () => {
//   //   console.log("Facebook login clicked");
//   //   // Implement Facebook OAuth logic here
//   // };

//   return (
//     <section className="relative min-h-[90vh] mt-16 md:mt-20 w-full py-4 sm:py-6 md:py-8 lg:py-16 overflow-hidden">
//       {/* Background Image */}
//       <div className="absolute h-full w-full top-0 left-0 z-0">
//         <img
//           src={isMobile ? HeroimageMobile : Heroimage}
//           alt="Mountain landscape"
//           className="w-full h-full object-cover object-center rounded-3xl"
//         />
//       </div>

//       {/* Form Container */}
//       <motion.div
//         className="bg-white z-10 relative w-[95%] max-w-xl mx-auto rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-6 md:p-8 lg:p-10 mt-4 sm:mt-6"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h2 className="text-2xl sm:text-3xl md:text-4xl text-blue-700 text-center font-normal mb-1 sm:mb-2">
//           Vous avez déjà un compte ?
//         </h2>
//         <p className="text-xs md:text-base text-gray-600 text-center mb-4 sm:mb-6">
//           Connectez-vous pour accéder à votre tableau de bord.
//         </p>

//         {/* Error Message */}
//         {error && (
//           <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded">
//             <p className="text-red-700 text-sm">{error}</p>
//           </div>
//         )}

//         <form
//           className="px-2 sm:px-4 md:px-8 lg:px-12 pt-2 sm:pt-4 md:pt-6"
//           onSubmit={handleSubmit}
//         >
//           {/* Email field */}
//           <div className="mb-3 sm:mb-4">
//             <label
//               htmlFor="email"
//               className="block text-gray-700 text-sm sm:text-base mb-1"
//             >
//               Email*
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => {
//                 setEmail(e.target.value);
//                 if (emailError) setEmailError("");
//               }}
//               className={`w-full px-3 sm:px-4 py-2 border ${
//                 emailError ? "border-red-500" : "border-gray-300"
//               } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-default`}
//               disabled={isLoading}
//             />
//             {emailError && (
//               <p className="text-red-500 text-xs sm:text-sm">{emailError}</p>
//             )}
//           </div>

//           {/* Password field */}
//           <div className="mb-3 sm:mb-4">
//             <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
//               <label
//                 htmlFor="password"
//                 className="block text-gray-700 text-sm sm:text-base mb-1"
//               >
//                 Mot de passe*
//               </label>
//               {/* <Link
//                 to="/forgot-password"
//                 className="text-xs sm:text-sm text-primary-default hover:underline mb-1 sm:mb-0"
//               >
//                 Mot de passe oublié ?
//               </Link> */}
//             </div>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 value={password}
//                 onChange={(e) => {
//                   setPassword(e.target.value);
//                   if (passwordError) setPasswordError("");
//                 }}
//                 className={`w-full px-3 sm:px-4 py-2 border ${
//                   passwordError ? "border-red-500" : "border-gray-300"
//                 } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10`}
//                 disabled={isLoading}
//               />
//               <div
//                 className="absolute top-1/2 -translate-y-1/2 right-3 flex items-center justify-center cursor-pointer z-10 pointer-events-auto"
//                 onClick={togglePasswordVisibility}
//               >
//                 {showPassword ? (
//                   <EyeOff
//                     size={18}
//                     className="text-gray-500 hover:text-gray-700"
//                     aria-label="Hide password"
//                   />
//                 ) : (
//                   <Eye
//                     size={18}
//                     className="text-gray-500 hover:text-gray-700"
//                     aria-label="Show password"
//                   />
//                 )}
//               </div>
//             </div>
//             {passwordError && (
//               <p className="text-red-500 text-xs sm:text-sm">{passwordError}</p>
//             )}
//           </div>

//           {/* Remember me checkbox */}
//           <div className="mb-4 sm:mb-6">
//             <div className="flex items-start">
//               <input
//                 type="checkbox"
//                 id="rememberMe"
//                 checked={rememberMe}
//                 onChange={(e) => setRememberMe(e.target.checked)}
//                 className="h-4 w-4 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
//                 disabled={isLoading}
//               />
//               <label
//                 htmlFor="rememberMe"
//                 className="ml-2 block text-xs sm:text-sm text-gray-700"
//               >
//                 Se souvenir de moi
//               </label>
//             </div>
//           </div>

//           <div className="flex flex-col gap-3 sm:gap-4">
//             <motion.button
//               type="submit"
//               className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 sm:px-8 rounded-full text-sm sm:text-base transition-colors duration-300 disabled:bg-blue-300"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               disabled={isLoading}
//             >
//               {isLoading ? "Connexion en cours..." : "Connexion"}
//             </motion.button>

//             {/* <div className="flex items-center my-2">
//               <div className="flex-grow h-px bg-gray-300"></div>
//               <p className="px-3 text-gray-500 text-xs sm:text-sm">ou</p>
//               <div className="flex-grow h-px bg-gray-300"></div>
//             </div> */}

//             {/* <motion.button
//               type="button"
//               onClick={handleGoogleLogin}
//               className="flex items-center justify-center w-full border border-gray-300 py-1.5 sm:py-2 px-6 sm:px-8 rounded-full text-xs sm:text-sm transition-colors duration-300 disabled:opacity-50"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               disabled={isLoading}
//             >
//               <img
//                 src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg"
//                 alt="Google logo"
//                 className="w-4 sm:w-5 h-4 sm:h-5 mr-2"
//               />
//               Connexion avec Google
//             </motion.button>

//             <motion.button
//               type="button"
//               onClick={handleFacebookLogin}
//               className="flex items-center justify-center w-full border border-gray-300 py-1.5 sm:py-2 px-6 sm:px-8 rounded-full text-xs sm:text-sm transition-colors duration-300 disabled:opacity-50"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               disabled={isLoading}
//             >
//               <img
//                 src="https://cdn.cdnlogo.com/logos/f/84/facebook.svg"
//                 alt="Facebook logo"
//                 className="w-4 sm:w-5 h-4 sm:h-5 mr-2"
//               />
//               Connexion avec Facebook
//             </motion.button> */}

//             <div className="text-center mt-3 sm:mt-4">
//               <p className="text-gray-600 text-xs sm:text-sm">
//                 Vous n'avez pas de compte ?{" "}
//                 <Link to="/signup" className="text-blue-600 hover:underline">
//                   Inscrivez-vous
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </form>
//       </motion.div>
//     </section>
//   );
// };

// export default LoginForm;

// src/components/LoginForm.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Heroimage from "../../assets/images/mask-hero-seaction.webp";
import HeroimageMobile from "../../assets/images/hero-original-image.webp";
import { Link } from "@tanstack/react-router";
import { useAuthStore } from "../../store/authStore";
import { Eye, EyeOff } from "lucide-react";
import toast, { Toaster } from "react-hot-toast"; // Import the toast library
import { toastConfig } from "../../lib/toastConfig"; // Import toast configuration
import { getAuthErrorMessage } from "../../lib/authErrorMessages"; // Import error message utility

const LoginForm = ({ onLoginSuccess }: any) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [searchParams] = useState(
    () => new URLSearchParams(window.location.search)
  );
  const redirectPath = searchParams.get("redirect") || "/account";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form validation
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Handle window resize
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { login, isLoading, error, clearError } = useAuthStore();

  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [email, password, clearError, error]);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Validate form
  const validateForm = () => {
    let isValid = true;

    // Validate email
    if (!email) {
      setEmailError("L'email est requis");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("L'email n'est pas valide");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Validate password
    if (!password) {
      setPasswordError("Le mot de passe est requis");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      // Show toast for validation errors
      toast.error(
        "Veuillez corriger les erreurs dans le formulaire",
        toastConfig.errorStyle
      );
      return;
    }

    try {
      // Call login from auth store
      await login({ email, password, rememberMe });

      // Show success toast
      toast.success("Connexion réussie!", toastConfig.successStyle);

      // Call onLoginSuccess if provided
      if (onLoginSuccess) {
        onLoginSuccess();
      }
      window.location.href = redirectPath;
    } catch (err: any) {
      console.error("Login submission error:", err);

      // Show error toast based on the error status code or type
      let errorMessage;

      // Check if error is an Axios error with response
      if (err.response) {
        // Get error message based on HTTP status code
        errorMessage = getAuthErrorMessage(err.response.status);

        // If the server returned a specific message, use it
        if (err.response.data && err.response.data.message) {
          errorMessage = err.response.data.message;
        }
      } else if (err.request) {
        // Request was made but no response received (network error)
        errorMessage = getAuthErrorMessage("Network error");
      } else {
        // Something else caused the error
        errorMessage = getAuthErrorMessage(err);
      }

      // Show error toast with the appropriate message
      toast.error(errorMessage, toastConfig.errorStyle);
    }
  };

  // We're now using the imported getAuthErrorMessage function
  // This getErrorMessage function can be removed as it's replaced by the imported utility

  return (
    <section className="relative min-h-[90vh] mt-16 md:mt-20 w-full py-4 sm:py-6 md:py-8 lg:py-16 overflow-hidden">
      {/* Toast container */}
      <Toaster position={toastConfig.defaultPosition} />

      {/* Background Image */}
      <div className="absolute h-full w-full top-0 left-0 z-0">
        <img
          src={isMobile ? HeroimageMobile : Heroimage}
          alt="Mountain landscape"
          className="w-full h-full object-cover object-center rounded-3xl"
        />
      </div>

      {/* Form Container */}
      <motion.div
        className="bg-white z-10 relative w-[95%] max-w-xl mx-auto rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-6 md:p-8 lg:p-10 mt-4 sm:mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-blue-700 text-center font-normal mb-1 sm:mb-2">
          Vous avez déjà un compte ?
        </h2>
        <p className="text-xs md:text-base text-gray-600 text-center mb-4 sm:mb-6">
          Connectez-vous pour accéder à votre tableau de bord.
        </p>

        <form
          className="px-2 sm:px-4 md:px-8 lg:px-12 pt-2 sm:pt-4 md:pt-6"
          onSubmit={handleSubmit}
        >
          {/* Email field */}
          <div className="mb-3 sm:mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm sm:text-base mb-1"
            >
              Email*
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError("");
              }}
              className={`w-full px-3 sm:px-4 py-2 border ${
                emailError ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-default`}
              disabled={isLoading}
            />
            {emailError && (
              <p className="text-red-500 text-xs sm:text-sm">{emailError}</p>
            )}
          </div>

          {/* Password field */}
          <div className="mb-3 sm:mb-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm sm:text-base mb-1"
              >
                Mot de passe*
              </label>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) setPasswordError("");
                }}
                className={`w-full px-3 sm:px-4 py-2 border ${
                  passwordError ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10`}
                disabled={isLoading}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 right-3 flex items-center justify-center cursor-pointer z-10 pointer-events-auto"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOff
                    size={18}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Hide password"
                  />
                ) : (
                  <Eye
                    size={18}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Show password"
                  />
                )}
              </div>
            </div>
            {passwordError && (
              <p className="text-red-500 text-xs sm:text-sm">{passwordError}</p>
            )}
          </div>

          {/* Remember me checkbox */}
          <div className="mb-4 sm:mb-6">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                disabled={isLoading}
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 block text-xs sm:text-sm text-gray-700"
              >
                Se souvenir de moi
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:gap-4">
            <motion.button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 sm:px-8 rounded-full text-sm sm:text-base transition-colors duration-300 disabled:bg-blue-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
            >
              {isLoading ? "Connexion en cours..." : "Connexion"}
            </motion.button>

            <div className="text-center mt-3 sm:mt-4">
              <p className="text-gray-600 text-xs sm:text-sm">
                Vous n'avez pas de compte ?{" "}
                <Link to="/signup" className="text-blue-600 hover:underline">
                  Inscrivez-vous
                </Link>
              </p>
            </div>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

export default LoginForm;
