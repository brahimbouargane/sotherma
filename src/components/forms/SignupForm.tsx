import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Heroimage from "../../assets/images/mask-hero-seaction.webp";
import HeroimageMobile from "../../assets/images/hero-original-image.webp";
import { Helmet } from "react-helmet-async";
import { Link } from "@tanstack/react-router";
import authService from "../../lib/api/client";
import { Eye, EyeOff } from "lucide-react"; // Import eye icons for password visibility

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  originWebsite: string;
}

interface SignupFormProps {
  className?: string;
  onSubmit?: (formData: SignupData) => void;
}

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
}

const SignupForm: React.FC<SignupFormProps> = ({ className }) => {
  const [formData, setFormData] = useState<SignupData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState<Partial<SignupData>>({});
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Separate state for confirm password visibility
  // Check if device is mobile based on screen width
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name as keyof SignupData]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };
  // Toggle password visibility - separate toggles for each field
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<SignupData> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Le nom est requis";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Le prénom est requis";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Le téléphone est requis";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Veuillez confirmer votre mot de passe";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Extract data and prepare for API
        const { confirmPassword, ...formWithoutConfirm } = formData;

        // Create the API payload matching RegisterData
        const registerData: RegisterData = {
          ...formWithoutConfirm,
          originWebsite: "AIN_SAISS", // Add the required field
        };

        // Call the API with the proper format
        await authService.register(registerData);

        // Handle success - redirect to login
        window.location.href = "/login";
      } catch (error) {
        console.error("Registration failed:", error);
        // You might want to show an error message to the user
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Ain Saiss | Eau Minérale Naturelle</title>
        <meta
          name="description"
          content="Eau minérale naturelle pour une meilleure récupération pendant et après l'effort."
        />
      </Helmet>
      <div
        className={`relative mt-16 md:mt-20 min-h-[90vh] w-full py-4 sm:py-6 md:py-8 lg:py-16 overflow-hidden ${className}`}
      >
        {/* Background Image - Conditional rendering based on screen size */}
        <div className="absolute h-full w-full top-0 left-0 z-0 ">
          <img
            src={isMobile ? HeroimageMobile : Heroimage}
            alt="Mountain landscape"
            className="w-full h-full object-cover object-center rounded-3xl"
          />
        </div>

        {/* Form Container */}
        <motion.div
          className="bg-white z-10 relative w-[95%] max-w-xl mx-auto rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-6 md:p-8 lg:p-10 md:mt-4 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-5xl text-blue-700 text-center font-normal mb-1 sm:mb-2">
            Inscription
          </h2>
          <p className="text-sm md:text-lg text-gray-600 text-center mb-4 sm:mb-6">
            Créez votre compte en quelques clics !
          </p>

          <form className="px-1 sm:px-2 pt-2 sm:pt-4" onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="flex-1">
                <label
                  htmlFor="firstName"
                  className="block text-gray-700 text-sm sm:text-base mb-1"
                >
                  Nom*
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-3 sm:px-4 py-2 border ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs sm:text-sm">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div className="flex-1">
                <label
                  htmlFor="lastName"
                  className="block text-gray-700 text-sm sm:text-base mb-1"
                >
                  Prénom*
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-3 sm:px-4 py-2 border ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs sm:text-sm">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

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
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs sm:text-sm">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="mb-3 sm:mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-gray-700 text-sm sm:text-base mb-1"
              >
                Téléphone*
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2 border ${
                  errors.phoneNumber ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs sm:text-sm">
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            <div className="mb-3 sm:mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm sm:text-base mb-1"
              >
                Mot de passe*
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-3 sm:px-4 py-2 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
                {errors.password && (
                  <p className="text-red-500 text-xs sm:text-sm">
                    {errors.password}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-4 sm:mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 text-sm sm:text-base mb-1"
              >
                Confirmer le Mot de passe*
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-3 sm:px-4 py-2 border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 right-3 flex items-center justify-center cursor-pointer z-10 pointer-events-auto"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
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
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs sm:text-sm">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3 sm:gap-4">
              <motion.button
                type="submit"
                className="w-full bg-blue-400 hover:bg-blue-500 text-white py-2 sm:py-3 px-6 sm:px-8 rounded-full text-sm sm:text-base transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Créer mon compte
              </motion.button>

              <div className="text-center mt-3 sm:mt-4">
                <p className="text-gray-600 text-xs sm:text-sm">
                  Vous avez déjà un compte ?{" "}
                  <Link
                    to="/login"
                    className="text-blue-600 hover:underline cursor-pointer ml-1 sm:ml-2"
                  >
                    Connectez-vous
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default SignupForm;
