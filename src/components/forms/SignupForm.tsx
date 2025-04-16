import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Heroimage from "../../assets/images/mask-hero-seaction.png";
import HeroimageMobile from "../../assets/images/hero-original-image.png"; // Import mobile image
import { Helmet } from "react-helmet-async";

interface SignupFormProps {
  className?: string;
  onSubmit?: (formData: SignupData) => void;
}

interface SignupData {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupForm: React.FC<SignupFormProps> = ({ className, onSubmit }) => {
  const [formData, setFormData] = useState<SignupData>({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Partial<SignupData>>({});
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Check if device is mobile based on screen width
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // Consider < 768px as mobile
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Clean up event listener
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

  const validateForm = (): boolean => {
    const newErrors: Partial<SignupData> = {};

    if (!formData.nom.trim()) {
      newErrors.nom = "Le nom est requis";
    }

    if (!formData.prenom.trim()) {
      newErrors.prenom = "Le prénom est requis";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Call the onSubmit prop if provided
      if (onSubmit) {
        onSubmit(formData);
      }

      // For demo purposes, log the form data
      console.log("Signup submitted:", formData);
    }
  };

  const handleLogin = () => {
    // Redirect to login page
    console.log("Redirecting to login page");
    // Use your routing solution here, e.g.: navigate('/login')
  };

  return (
    <div
      className={`relative min-h-[90vh] w-full py-4 sm:py-6 md:py-8 lg:py-16 overflow-hidden ${className}`}
    >
      <Helmet>
        <title>Ain Saiss | Eau Minérale Naturelle</title>
        <meta
          name="description"
          content="Eau minérale naturelle pour une meilleure récupération pendant et après l'effort."
        />
      </Helmet>
      {/* Background Image - Conditional rendering based on screen size */}
      <div className="absolute h-full md:h-[90vh] w-full top-0 left-0 z-0 ">
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
                htmlFor="nom"
                className="block text-gray-700 text-sm sm:text-base mb-1"
              >
                Nom*
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2 border ${
                  errors.nom ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.nom && (
                <p className="text-red-500 text-xs sm:text-sm">{errors.nom}</p>
              )}
            </div>

            <div className="flex-1">
              <label
                htmlFor="prenom"
                className="block text-gray-700 text-sm sm:text-base mb-1"
              >
                Prénom
              </label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2 border ${
                  errors.prenom ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.prenom && (
                <p className="text-red-500 text-xs sm:text-sm">
                  {errors.prenom}
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
              <p className="text-red-500 text-xs sm:text-sm">{errors.email}</p>
            )}
          </div>

          <div className="mb-3 sm:mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm sm:text-base mb-1"
            >
              Mot de passe*
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 sm:px-4 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs sm:text-sm">
                {errors.password}
              </p>
            )}
          </div>

          <div className="mb-4 sm:mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm sm:text-base mb-1"
            >
              Confirmer le Mot de passe*
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-3 sm:px-4 py-2 border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
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
                <a
                  onClick={handleLogin}
                  className="text-blue-600 hover:underline cursor-pointer ml-1 sm:ml-2"
                >
                  Connectez-vous
                </a>
              </p>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default SignupForm;
