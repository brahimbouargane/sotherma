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
    <footer className="mt-10 mb-16 ">
      {/* Main Footer */}
      <div className=" mx-auto py-14 rounded-3xl shadow-xl ">
        {/* Services */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 text-center">
          <div className="flex flex-col items-center">
            <h3 className="text-[#0F67B1] font-normal text-2xl">
              Service Conso
            </h3>
            <p className="text-[#0F67B1] text-base mt-2">08 08 200 500</p>
            <img
              src={phone}
              alt="Phone"
              className="h-28 w-28 text-blue-500 mt-2"
            />
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-[#0F67B1] font-normal text-2xl">
              Paiement sécurisé
            </h3>
            <p className="text-[#0F67B1] text-base mt-2">Visa / CMI</p>
            <img
              src={cmi}
              alt="Phone"
              className="h-28 w-28 text-blue-500 mt-2"
            />
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-[#0F67B1] font-normal text-2xl">
              Livraison rapide
            </h3>
            <p className="text-[#0F67B1] text-base mt-2">En 48h</p>
            <img
              src={livraison}
              alt="Phone"
              className="h-28 w-28 text-blue-500 mt-2"
            />
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-[#0F67B1] font-normal text-2xl">
              Paiement à la livraison
            </h3>
            <p className="text-[#0F67B1] text-base mt-2">
              par carte ou en espèce
            </p>
            <img
              src={paiment}
              alt="Phone"
              className="h-28 w-28 text-blue-500 mt-2"
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="py-10 ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center pl-24">
            <div className="flex items-center justify-center md:justify-start">
              <img src={whatsapp} alt="Phone" className="h-8 w-8 mr-4" />
              <span className="text-[#0F67B1] text-base">08 08 200 500</span>
            </div>

            <div className="flex items-center justify-center md:justify-start">
              <img src={mail} alt="Phone" className="h-8 w-8 mr-4" />
              <span className="text-[#0F67B1] text-base">
                contact@saiss-water.ma
              </span>
            </div>

            <div className="flex items-center justify-center md:justify-start">
              <img src={localisation} alt="Phone" className="h-8 w-8 mr-4" />
              <span className="text-[#0F67B1] text-base">
                Centre Ain Saiss, Route de Fès, Km 20 route de Taza - Fès, Maroc
              </span>
            </div>
          </div>
        </div>

        {/* Centered Separator */}
        <div className="flex justify-center">
          <div className="w-[95%] h-px bg-[#0F67B1] my-6"></div>
        </div>

        {/* Copyright */}
        <div className=" flex flex-col md:flex-row justify-between items-center px-8">
          <p className="text-[#0F67B1] text-base mb-4 md:mb-0">
            © Copyright 2023. Ain Saiss. Tous les droits sont réservés.
          </p>

          <div className="flex space-x-10 items-center">
            <img src={conditions} alt="Payment method" className="h-10" />

            <p className="text-[#0F67B1] text-base mb-4 md:mb-0">
              Conditions générales de ventes
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
