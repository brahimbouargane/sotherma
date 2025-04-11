import React, { useState } from "react";
import { motion } from "framer-motion";
import Heroimage from "../../assets/images/mask-hero-seaction.png";
import { Helmet } from "react-helmet-async";

interface LoginFormProps {
  className?: string;
  onSubmit?: (formData: LoginCredentials) => void;
}

interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ className, onSubmit }) => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState<Partial<LoginCredentials>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name as keyof LoginCredentials]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      rememberMe: e.target.checked,
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginCredentials> = {};

    if (!credentials.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = "L'email n'est pas valide";
    }

    if (!credentials.password.trim()) {
      newErrors.password = "Le mot de passe est requis";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Call the onSubmit prop if provided
      if (onSubmit) {
        onSubmit(credentials);
      }

      // For demo purposes, log the form data
      console.log("Login submitted:", credentials);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // Implement Google OAuth logic here
  };

  const handleFacebookLogin = () => {
    console.log("Facebook login clicked");
    // Implement Facebook OAuth logic here
  };

  return (
    <section
      className={`relative h-[90vh]  py-8 md:py-16 overflow-hidden ${className}`}
    >
      <Helmet>
        <title>Ain Saiss | Eau Minérale Naturelle</title>
        <meta
          name="description"
          content="Eau minérale naturelle pour une meilleure récupération pendant et après l'effort."
        />
      </Helmet>
      {/* Background Image */}
      <div className="absolute h-full w-full top-0 left-0 z-0">
        <img
          src={Heroimage}
          alt="Mountain landscape"
          className="w-full h-full object-fill"
        />
      </div>

      {/* Form Container */}
      <motion.div
        className="bg-white z-10 relative max-w-xl mx-auto  rounded-3xl shadow-lg p-8 md:p-10 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl text-blue-700 text-center font-normal mb-2">
          Vous avez déjà un compte ?
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>

        <form className="px-12 pt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Email*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="block text-gray-700 mb-1">
                Mot de passe*
              </label>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Mot de passe oublié ?
              </a>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <div className="mb-6">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={credentials.rememberMe}
                onChange={handleCheckboxChange}
                className="h-4 w-4 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 block text-sm text-gray-700"
              >
                Se souvenir de moi
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <motion.button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-8 rounded-full transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Connexion
            </motion.button>

            <div className="flex items-center my-2">
              <div className="flex-grow h-px bg-gray-300"></div>
              <p className="px-3 text-gray-500 text-sm">ou</p>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            <motion.button
              type="button"
              onClick={handleGoogleLogin}
              className="flex items-center justify-center w-full border border-gray-300 py-2 px-8 rounded-full transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg"
                alt="Google logo"
                className="w-5 h-5 mr-2"
              />
              Connexion avec Google
            </motion.button>

            <motion.button
              type="button"
              onClick={handleFacebookLogin}
              className="flex items-center justify-center w-full border border-gray-300 py-2 px-8 rounded-full transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src="https://cdn.cdnlogo.com/logos/f/84/facebook.svg"
                alt="Facebook logo"
                className="w-5 h-5 mr-2"
              />
              Connexion avec Facebook
            </motion.button>

            <div className="text-center mt-4">
              <p className="text-gray-600 text-sm">
                Vous n'avez pas de compte ?{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Inscrivez-vous
                </a>
              </p>
            </div>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

export default LoginForm;
