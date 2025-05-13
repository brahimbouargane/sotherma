// import { useRef } from "react";
// import { motion, useInView } from "framer-motion";
// import cmi from "../../assets/icons/card.svg";
// import mail from "../../assets/icons/mail.svg";
// import phone from "../../assets/icons/phone2.svg";
// import paiment from "../../assets/icons/cash.svg";
// import whatsapp from "../../assets/icons/wahtasapp.svg";
// import conditions from "../../assets/images/image 20.png";
// import livraison from "../../assets/icons/delivery.svg";
// import localisation from "../../assets/icons/localisation.svg";

// const Footer = () => {
//   const footerRef = useRef(null);
//   const isInView = useInView(footerRef, { once: true, amount: 0.1 });

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2,
//         duration: 0.7,
//         ease: [0.25, 0.1, 0.25, 1],
//       },
//     },
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.5,
//         ease: [0.25, 0.1, 0.25, 1],
//       },
//     },
//   };

//   const iconVariants = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: {
//         duration: 0.5,
//         ease: [0.34, 1.56, 0.64, 1],
//         delay: 0.2,
//       },
//     },
//   };

//   const separatorVariants = {
//     hidden: { width: "0%" },
//     visible: {
//       width: "100%",
//       transition: {
//         duration: 0.8,
//         ease: [0.25, 0.1, 0.25, 1],
//         delay: 0.5,
//       },
//     },
//   };

//   const contactItemVariants = {
//     hidden: { opacity: 0, x: -20 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: {
//         duration: 0.5,
//         ease: [0.25, 0.1, 0.25, 1],
//       },
//     },
//   };

//   const copyrightVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.5,
//         ease: [0.25, 0.1, 0.25, 1],
//         delay: 0.7,
//       },
//     },
//   };

//   return (
//     <motion.footer
//       ref={footerRef}
//       className="mt-6 sm:mt-8 md:mt-10 mb-8 sm:mb-12 md:mb-16 px-0"
//       initial="hidden"
//       animate={isInView ? "visible" : "hidden"}
//       variants={containerVariants}
//     >
//       {/* Main Footer */}
//       <motion.div
//         className="mx-auto py-6 sm:py-8 md:py-10 lg:py-14 rounded-3xl bg-white shadow-md sm:shadow-lg md:shadow-xl"
//         initial={{ y: 50, opacity: 0 }}
//         animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
//         transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
//       >
//         {/* Services - Always 2 per row on all screen sizes */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6 sm:mb-8 md:mb-12 text-center md:px-8">
//           {[
//             {
//               title: "Service Conso",
//               subtitle: "08 08 200 500",
//               img: phone,
//               alt: "Phone",
//             },
//             {
//               title: "Paiement sécurisé",
//               subtitle: "Visa / CMI",
//               img: cmi,
//               alt: "Secure payment",
//             },
//             {
//               title: "Livraison rapide",
//               subtitle: "En 48h",
//               img: livraison,
//               alt: "Fast delivery",
//             },
//             {
//               title: "Paiement à la livraison",
//               subtitle: "par carte ou en espèce",
//               img: paiment,
//               alt: "Payment on delivery",
//             },
//           ].map((service, index) => (
//             <motion.div
//               key={index}
//               className="flex flex-col items-center mb-4 md:mb-0"
//               variants={cardVariants}
//               custom={index}
//               whileHover={{
//                 y: -5,
//                 transition: { duration: 0.2 },
//               }}
//             >
//               <motion.h3
//                 className="text-[#0F67B1] font-normal text-sm md:text-3xl"
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={
//                   isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }
//                 }
//                 transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
//               >
//                 {service.title}
//               </motion.h3>
//               <motion.p
//                 className="text-[#0F67B1] text-sm md:text-xl mt-1 sm:mt-2"
//                 initial={{ opacity: 0 }}
//                 animate={isInView ? { opacity: 1 } : { opacity: 0 }}
//                 transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
//               >
//                 {service.subtitle}
//               </motion.p>
//               <motion.div
//                 variants={iconVariants}
//                 whileHover={{
//                   scale: 1.05,
//                   rotate: [0, 2, 0, -2, 0],
//                   transition: { duration: 0.5 },
//                 }}
//               >
//                 <img
//                   src={service.img}
//                   alt={service.alt}
//                   className="h-20 w-20 md:h-24 md:w-24 lg:h-36 lg:w-36 text-blue-500 mt-1 sm:mt-2"
//                 />
//               </motion.div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Contact Info - Centered on mobile with full width */}
//         <div className="py-4 sm:py-6 md:py-8 lg:py-10">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 px-4 sm:px-6 md:px-8 lg:px-12">
//             {[
//               { img: whatsapp, alt: "WhatsApp", text: "08 08 200 500" },
//               { img: mail, alt: "Email", text: "contact@saiss-water.ma" },
//               {
//                 img: localisation,
//                 alt: "Location",
//                 text: "Centre Ain Saiss, Route de Fès, Km 20 route de Taza - Fès, Maroc",
//               },
//             ].map((contact, index) => (
//               <motion.div
//                 key={index}
//                 className="flex items-center justify-center md:justify-start w-full"
//                 variants={contactItemVariants}
//                 custom={index}
//                 whileHover={{
//                   x: 5,
//                   transition: { duration: 0.2 },
//                 }}
//               >
//                 <motion.img
//                   src={contact.img}
//                   alt={contact.alt}
//                   className="h-5 w-5 md:h-8 md:w-8 mr-2 sm:mr-3 md:mr-4 flex-shrink-0"
//                   whileHover={{
//                     scale: 1.2,
//                     rotate: 10,
//                     transition: { duration: 0.3 },
//                   }}
//                 />
//                 <motion.span
//                   className="text-[#0F67B1] text-xs md:text-base"
//                   initial={{ opacity: 0 }}
//                   animate={isInView ? { opacity: 1 } : { opacity: 0 }}
//                   transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
//                 >
//                   {contact.text}
//                 </motion.span>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* Centered Separator */}
//         <div className="flex justify-center px-4 sm:px-6 md:px-8 overflow-hidden">
//           <motion.div
//             className="w-full sm:w-[95%] h-px bg-[#0F67B1] my-4 sm:my-5 md:my-6"
//             variants={separatorVariants}
//           ></motion.div>
//         </div>

//         {/* Copyright - Both sections in row on mobile */}
//         <div className="flex flex-col md:flex-row justify-center md:justify-between items-center px-4 sm:px-6 md:px-8 lg:px-12 gap-6">
//           <motion.div
//             className="flex items-center"
//             variants={copyrightVariants}
//           >
//             <p className="text-[#0F67B1] text-xs sm:text-base text-center md:text-left">
//               © Copyright 2025. Ain Saiss. Tous les droits sont réservés.
//             </p>
//           </motion.div>

//           <motion.div
//             className="flex items-center gap-2 sm:gap-4 md:gap-6 lg:gap-10"
//             variants={copyrightVariants}
//             whileHover={{
//               scale: 1.02,
//               transition: { duration: 0.2 },
//             }}
//           >
//             <motion.img
//               src={conditions}
//               alt="Payment method"
//               className="h-8 sm:h-10"
//               whileHover={{
//                 scale: 1.1,
//                 transition: { duration: 0.3 },
//               }}
//             />
//             <p className="text-[#0F67B1] text-xs sm:text-base">
//               Conditions générales de ventes
//             </p>
//           </motion.div>
//         </div>
//       </motion.div>
//     </motion.footer>
//   );
// };

// export default Footer;

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import cmi from "../../assets/icons/card.svg";
import mail from "../../assets/icons/mail.svg";
import phone from "../../assets/icons/phone2.svg";
import paiment from "../../assets/icons/cash.svg";
import whatsapp from "../../assets/icons/wahtasapp.svg";
import conditions from "../../assets/images/image 20.png";
import livraison from "../../assets/icons/delivery.svg";
import localisation from "../../assets/icons/localisation.svg";

const Footer = () => {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.1 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1],
        delay: 0.2,
      },
    },
  };

  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1],
        delay: 0.3,
      },
    },
  };

  const separatorVariants = {
    hidden: { width: "0%" },
    visible: {
      width: "100%",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.5,
      },
    },
  };

  const contactItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const copyrightVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.7,
      },
    },
  };

  return (
    <motion.footer
      ref={footerRef}
      className="mt-6 sm:mt-8 md:mt-10 mb-8 sm:mb-12 md:mb-16 px-0"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Main Footer */}
      <motion.div
        className="mx-auto py-6 sm:py-8 md:py-10 lg:py-14 rounded-3xl bg-white shadow-md sm:shadow-lg md:shadow-xl"
        initial={{ y: 50, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Services - Always 2 per row on all screen sizes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6 sm:mb-8 md:mb-12 text-center md:px-8">
          {[
            {
              title: "Service Conso",
              subtitle: "08 08 200 500",
              img: phone,
              alt: "Phone",
              rotation: -45, // First two services with -45deg rotation
            },
            {
              title: "Paiement sécurisé",
              subtitle: "Visa / CMI",
              img: cmi,
              alt: "Secure payment",
              rotation: -45,
            },
            {
              title: "Livraison rapide",
              subtitle: "En 48h",
              img: livraison,
              alt: "Fast delivery",
              rotation: 225, // Last two services with 225deg rotation
            },
            {
              title: "Paiement à la livraison",
              subtitle: "par carte ou en espèce",
              img: paiment,
              alt: "Payment on delivery",
              rotation: 225,
            },
          ].map((service, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center mb-4 md:mb-0"
              variants={cardVariants}
              custom={index}
              whileHover={{
                y: -5,
                transition: { duration: 0.2 },
              }}
            >
              <motion.h3
                className="text-[#0F67B1] font-normal text-sm md:text-3xl"
                initial={{ opacity: 0, y: -10 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }
                }
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              >
                {service.title}
              </motion.h3>
              <motion.p
                className="text-[#0F67B1] text-sm md:text-xl mt-1 sm:mt-2"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                {service.subtitle}
              </motion.p>
              {/* Icon with 75% Border Circle */}
              <div className="relative mt-14">
                <motion.div
                  className="relative flex items-center justify-center"
                  variants={iconVariants}
                  whileHover={{
                    scale: 1.05,
                    rotate: [0, 2, 0, -2, 0],
                    transition: { duration: 0.5 },
                  }}
                >
                  {/* Circular div with 75% border */}
                  <div
                    className="absolute"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      border: "4px solid #0F67B1",
                      borderRightColor:
                        service.rotation === 145 ? "#0F67B1" : "transparent",
                      // borderBottomColor: "transparent",
                      borderLeftColor:
                        service.rotation === 145 ? "transparent" : "#0F67B1",
                      // borderTopColor:
                      //   service.rotation === 145 ? "transparent" : "#0F67B1",
                      transform: `rotate(${service.rotation}deg)`,
                    }}
                  ></div>

                  {/* Icon Image */}
                  <img
                    src={service.img}
                    alt={service.alt}
                    className="h-14 w-14 text-blue-500 relative z-10"
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Info - Centered on mobile with full width */}
        <div className="py-4 sm:py-6 md:py-8 lg:py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-6 lg:gap-8 px-4 sm:px-6 md:px-8 lg:px-12">
            {[
              { img: whatsapp, alt: "WhatsApp", text: "08 08 200 500" },
              { img: mail, alt: "Email", text: "contact@saiss-water.ma" },
              {
                img: localisation,
                alt: "Location",
                text: "Centre Ain Saiss, Route de Fès, Km 20 route de Taza - Fès, Maroc",
              },
            ].map((contact, index) => (
              <motion.div
                key={index}
                className="flex flex-col gap-0 md:flex-row  items-center justify-center md:justify-start w-full"
                variants={contactItemVariants}
                custom={index}
                whileHover={{
                  x: 5,
                  transition: { duration: 0.2 },
                }}
              >
                <motion.img
                  src={contact.img}
                  alt={contact.alt}
                  className="h-5 w-5 md:h-8 md:w-8 mr-2  flex-shrink-0"
                  whileHover={{
                    scale: 1.2,
                    rotate: 10,
                    transition: { duration: 0.3 },
                  }}
                />
                <motion.span
                  className="text-[#0F67B1] text-xs md:text-base"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  {contact.text}
                </motion.span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Centered Separator */}
        <div className="flex justify-center px-4 sm:px-6 md:px-8 overflow-hidden">
          <motion.div
            className="w-full sm:w-[95%] h-px bg-[#0F67B1] my-4 sm:my-5 md:my-6"
            variants={separatorVariants}
          ></motion.div>
        </div>

        {/* Copyright - Both sections in row on mobile */}
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center px-4 sm:px-6 md:px-8 lg:px-12 gap-6">
          <motion.div
            className="flex items-center"
            variants={copyrightVariants}
          >
            <p className="text-[#0F67B1] text-xs sm:text-base text-center md:text-left">
              © Copyright 2025. Ain Saiss. Tous les droits sont réservés.
            </p>
          </motion.div>

          <motion.div
            className="flex items-center gap-2 sm:gap-4 md:gap-6 lg:gap-10"
            variants={copyrightVariants}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
          >
            <motion.img
              src={conditions}
              alt="Payment method"
              className="h-8 sm:h-10"
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.3 },
              }}
            />
            <p className="text-[#0F67B1] text-xs sm:text-base">
              Conditions générales de ventes
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
