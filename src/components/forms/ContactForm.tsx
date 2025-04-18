import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Heroimage from "../../assets/images/mask-hero-seaction.png";
import HeroimageMobile from "../../assets/images/hero-original-image.png"; // Import mobile image
import { Helmet } from "react-helmet-async";

interface ContactFormProps {
  className?: string;
  onSubmit?: (formData: FormData) => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  acceptTerms: any;
}

const ContactForm: React.FC<ContactFormProps> = ({ className, onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      acceptTerms: e.target.checked,
    });

    if (errors.acceptTerms) {
      setErrors({
        ...errors,
        acceptTerms: undefined,
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Le numéro de téléphone est requis";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Le message est requis";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Vous devez accepter les termes et conditions";
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
      console.log("Form submitted:", formData);

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        acceptTerms: false,
      });
    }
  };

  return (
    <section
      className={`relative  mt-16 md:mt-20 min-h-[90vh] w-full py-4 sm:py-6 md:py-8 lg:py-16 overflow-hidden ${className}`}
    >
      <Helmet>
        <title>Ain Saiss | Eau Minérale Naturelle</title>
        <meta
          name="description"
          content="Eau minérale naturelle pour une meilleure récupération pendant et après l'effort."
        />
      </Helmet>
      {/* Background Image - Conditional rendering based on screen size */}
      <div className="absolute h-full w-full top-0 left-0 z-0">
        <img
          src={isMobile ? HeroimageMobile : Heroimage}
          alt="Mountain landscape"
          className="w-full h-full object-cover object-center rounded-3xl"
        />
      </div>

      {/* Form Container */}
      <motion.div
        className="bg-white z-10 relative w-[95%] max-w-4xl mx-auto rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-6 md:p-8 lg:px-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-blue-700 text-center font-normal mb-1 sm:mb-2">
          Formulaire de contact
        </h2>
        <p className="text-xs md:text-lg text-gray-600 text-center mb-4 sm:mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>

        <form className="px-0 sm:px-2 md:px-4" onSubmit={handleSubmit}>
          <div className="mb-2 sm:mb-3">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm sm:text-base mb-1"
            >
              Nom et Prénom
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 sm:px-4 py-2 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs sm:text-sm">{errors.name}</p>
            )}
          </div>

          <div className="mb-2 sm:mb-3">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm sm:text-base mb-1"
            >
              Email
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

          <div className="mb-2 sm:mb-3">
            <label
              htmlFor="phone"
              className="block text-gray-700 text-sm sm:text-base mb-1"
            >
              Numéro de téléphone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-3 sm:px-4 py-2 border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs sm:text-sm">{errors.phone}</p>
            )}
          </div>

          <div className="mb-2 sm:mb-3">
            <label
              htmlFor="message"
              className="block text-gray-700 text-sm sm:text-base mb-1"
            >
              Votre message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={isMobile ? 4 : 6}
              placeholder="Tapez votre message..."
              className={`w-full px-3 sm:px-4 py-2 border ${
                errors.message ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-xs sm:text-sm">
                {errors.message}
              </p>
            )}
          </div>

          <div className="mb-4 sm:mb-6">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="acceptTerms"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleCheckboxChange}
                className={`h-4 w-4 mt-0.5 ${
                  errors.acceptTerms ? "border-red-500" : "border-gray-300"
                } rounded focus:ring-blue-500`}
              />
              <label
                htmlFor="acceptTerms"
                className="ml-2 block text-xs sm:text-sm text-gray-700"
              >
                J'accepte les{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  termes et conditions
                </a>
                .
              </label>
            </div>
            {errors.acceptTerms && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.acceptTerms}
              </p>
            )}
          </div>

          <div className="flex justify-center mb-2">
            <motion.button
              type="submit"
              className="bg-blue-400 hover:bg-blue-500 text-white py-2 px-6 sm:px-8 rounded-full text-sm sm:text-base transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Envoyer mon message
            </motion.button>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

export default ContactForm;
