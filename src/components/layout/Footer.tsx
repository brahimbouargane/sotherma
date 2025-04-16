// import cmi from "../../assets/icons/cmi.png";
// import mail from "../../assets/icons/mail.svg";
// import phone from "../../assets/icons/phone.png";
// import paiment from "../../assets/icons/paiement.png";
// import whatsapp from "../../assets/icons/wahtasapp.svg";
// import conditions from "../../assets/images/image 20.png";
// import livraison from "../../assets/icons/livraison.png";
// import localisation from "../../assets/icons/localisation.svg";

// const Footer = () => {
//   return (
//     <footer className="mt-10 mb-16 bg-white">
//       {/* Main Footer */}
//       <div className=" mx-auto py-14 rounded-3xl shadow-xl ">
//         {/* Services */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 text-center">
//           <div className="flex flex-col items-center">
//             <h3 className="text-[#0F67B1] font-normal text-2xl">
//               Service Conso
//             </h3>
//             <p className="text-[#0F67B1] text-base mt-2">08 08 200 500</p>
//             <img
//               src={phone}
//               alt="Phone"
//               className="h-28 w-28 text-blue-500 mt-2"
//             />
//           </div>

//           <div className="flex flex-col items-center">
//             <h3 className="text-[#0F67B1] font-normal text-2xl">
//               Paiement sécurisé
//             </h3>
//             <p className="text-[#0F67B1] text-base mt-2">Visa / CMI</p>
//             <img
//               src={cmi}
//               alt="Phone"
//               className="h-28 w-28 text-blue-500 mt-2"
//             />
//           </div>

//           <div className="flex flex-col items-center">
//             <h3 className="text-[#0F67B1] font-normal text-2xl">
//               Livraison rapide
//             </h3>
//             <p className="text-[#0F67B1] text-base mt-2">En 48h</p>
//             <img
//               src={livraison}
//               alt="Phone"
//               className="h-28 w-28 text-blue-500 mt-2"
//             />
//           </div>

//           <div className="flex flex-col items-center">
//             <h3 className="text-[#0F67B1] font-normal text-2xl">
//               Paiement à la livraison
//             </h3>
//             <p className="text-[#0F67B1] text-base mt-2">
//               par carte ou en espèce
//             </p>
//             <img
//               src={paiment}
//               alt="Phone"
//               className="h-28 w-28 text-blue-500 mt-2"
//             />
//           </div>
//         </div>

//         {/* Contact Info */}
//         <div className="py-10 ">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center pl-24">
//             <div className="flex items-center justify-center md:justify-start">
//               <img src={whatsapp} alt="Phone" className="h-8 w-8 mr-4" />
//               <span className="text-[#0F67B1] text-base">08 08 200 500</span>
//             </div>

//             <div className="flex items-center justify-center md:justify-start">
//               <img src={mail} alt="Phone" className="h-8 w-8 mr-4" />
//               <span className="text-[#0F67B1] text-base">
//                 contact@saiss-water.ma
//               </span>
//             </div>

//             <div className="flex items-center justify-center md:justify-start">
//               <img src={localisation} alt="Phone" className="h-8 w-8 mr-4" />
//               <span className="text-[#0F67B1] text-base">
//                 Centre Ain Saiss, Route de Fès, Km 20 route de Taza - Fès, Maroc
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Centered Separator */}
//         <div className="flex justify-center">
//           <div className="w-[95%] h-px bg-[#0F67B1] my-6"></div>
//         </div>

//         {/* Copyright */}
//         <div className=" flex flex-col md:flex-row justify-between items-center px-8">
//           <p className="text-[#0F67B1] text-base mb-4 md:mb-0">
//             © Copyright 2025. Ain Saiss. Tous les droits sont réservés.
//           </p>

//           <div className="flex space-x-10 items-center">
//             <img src={conditions} alt="Payment method" className="h-10" />

//             <p className="text-[#0F67B1] text-base mb-4 md:mb-0">
//               Conditions générales de ventes
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import cmi from "../../assets/icons/cmi.png";
import mail from "../../assets/icons/mail.svg";
import phone from "../../assets/icons/phone.png";
import paiment from "../../assets/icons/paiement.png";
import whatsapp from "../../assets/icons/wahtasapp.svg";
import conditions from "../../assets/images/image 20.png";
import livraison from "../../assets/icons/livraison.png";
import localisation from "../../assets/icons/localisation.svg";

const Footer = () => {
  return (
    <footer className="mt-6 sm:mt-8 md:mt-10 mb-8 sm:mb-12 md:mb-16 bg-white px-4 sm:px-6 md:px-8">
      {/* Main Footer */}
      <div className="mx-auto py-6 sm:py-8 md:py-10 lg:py-14 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-md sm:shadow-lg md:shadow-xl">
        {/* Services - Always 2 per row on all screen sizes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8 md:mb-12 text-center px-4 sm:px-6 md:px-8">
          <div className="flex flex-col items-center mb-4 md:mb-0">
            <h3 className="text-[#0F67B1] font-normal text-sm md:text-3xl">
              Service Conso
            </h3>
            <p className="text-[#0F67B1] text-sm md:text-xl mt-1 sm:mt-2">
              08 08 200 500
            </p>
            <img
              src={phone}
              alt="Phone"
              className="h-20 w-20  md:h-24 md:w-24 lg:h-36 lg:w-36 text-blue-500 mt-1 sm:mt-2"
            />
          </div>

          <div className="flex flex-col items-center mb-4 md:mb-0">
            <h3 className="text-[#0F67B1] font-normal text-sm md:text-3xl">
              Paiement sécurisé
            </h3>
            <p className="text-[#0F67B1] text-sm md:text-xl mt-1 sm:mt-2">
              Visa / CMI
            </p>
            <img
              src={cmi}
              alt="Secure payment"
              className="h-20 w-20  md:h-24 md:w-24 lg:h-36 lg:w-36 text-blue-500 mt-1 sm:mt-2"
            />
          </div>

          <div className="flex flex-col items-center mb-4 md:mb-0">
            <h3 className="text-[#0F67B1] font-normal text-sm md:text-3xl">
              Livraison rapide
            </h3>
            <p className="text-[#0F67B1] text-sm md:text-xl mt-1 sm:mt-2">
              En 48h
            </p>
            <img
              src={livraison}
              alt="Fast delivery"
              className="h-20 w-20  md:h-24 md:w-24 lg:h-36 lg:w-36 text-blue-500 mt-1 sm:mt-2"
            />
          </div>

          <div className="flex flex-col items-center mb-4 md:mb-0">
            <h3 className="text-[#0F67B1] font-normal text-sm md:text-3xl">
              Paiement à la livraison
            </h3>
            <p className="text-[#0F67B1] text-sm md:text-xl mt-1 sm:mt-2">
              par carte ou en espèce
            </p>
            <img
              src={paiment}
              alt="Payment on delivery"
              className="h-20 w-20  md:h-24 md:w-24 lg:h-36 lg:w-36 text-blue-500 mt-1 sm:mt-2"
            />
          </div>
        </div>

        {/* Contact Info - Centered on mobile with full width */}
        <div className="py-4 sm:py-6 md:py-8 lg:py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="flex items-center justify-center md:justify-start w-full">
              <img
                src={whatsapp}
                alt="WhatsApp"
                className="h-5 w-5  md:h-8 md:w-8 mr-2 sm:mr-3 md:mr-4"
              />
              <span className="text-[#0F67B1] text-xs md:text-base">
                08 08 200 500
              </span>
            </div>

            <div className="flex items-center justify-center w-full md:justify-start">
              <img
                src={mail}
                alt="Email"
                className="h-5 w-5  md:h-8 md:w-8 mr-2 sm:mr-3 md:mr-4"
              />
              <span className="text-[#0F67B1] text-xs md:text-base">
                contact@saiss-water.ma
              </span>
            </div>

            <div className="flex items-center justify-center w-full md:justify-start">
              <img
                src={localisation}
                alt="Location"
                className="h-5 w-5  md:h-8 md:w-8 mr-2 sm:mr-3 md:mr-4 flex-shrink-0"
              />
              <span className="text-[#0F67B1] text-xs md:text-base">
                Centre Ain Saiss, Route de Fès, Km 20 route de Taza - Fès, Maroc
              </span>
            </div>
          </div>
        </div>

        {/* Centered Separator */}
        <div className="flex justify-center px-4 sm:px-6 md:px-8">
          <div className="w-full sm:w-[95%] h-px bg-[#0F67B1] my-4 sm:my-5 md:my-6"></div>
        </div>

        {/* Copyright - Both sections in row on mobile */}
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center px-4 sm:px-6 md:px-8 lg:px-12 gap-6">
          <div className="flex items-center">
            <p className="text-[#0F67B1] text-xs sm:text-base text-center md:text-left">
              © Copyright 2025. Ain Saiss. Tous les droits sont réservés.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 md:gap-6 lg:gap-10">
            <img
              src={conditions}
              alt="Payment method"
              className="h-8 sm:h-10"
            />
            <p className="text-[#0F67B1] text-xs sm:text-base">
              Conditions générales de ventes
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
