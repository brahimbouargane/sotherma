import { motion } from "framer-motion";
import DeliveryImage from "../../assets/images/delivery-man.png";
import { Link } from "@tanstack/react-router";

const DeliveryInfo = () => {
  return (
    <section className="py-8 sm:py-10 md:py-[51px] 2xl:py-[69px] mt-12 sm:mt-16 md:mt-24 bg-primary bg-gradient-to-r from-[#0F67B1] to-[#E6F2F8] rounded-xl sm:rounded-2xl md:rounded-3xl shadow-lg sm:shadow-xl ">
      <div className="mx-auto container px-4 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row items-center relative">
          {/* Left Content */}
          <motion.div
            className="w-full md:w-1/2 text-white relative z-10 px-2  md:pl-8 lg:pl-16 2xl:pl-0  text-justify md:text-left mb-2 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal mb-2 sm:mb-4 relative max-w-xs sm:max-w-sm z-20">
              <span className="sm:hidden">
                La&nbsp;livraison&nbsp;automatique
              </span>
              <span className="hidden sm:inline">La livraison automatique</span>
            </h2>
            <p className="mt-3 my-6 md:mb-10  md:mt-12 max-w-full md:max-w-lg lg:max-w-[34rem] 2xl:max-w-[38rem]  text-md md:text-lg leading-relaxed relative z-20">
              Lorem ipsum dolor sit amet consectetur. Massa felis massa enim
              tristique. Lectus eget viverra nunc nisi risus mattis fusce eu.
              Blandit pellentesque lacus est ut ultrices.
            </p>
            <Link
              to="/abonnement"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="bg-white text-lg md:text-2xl mt-12 text-blue-700 font-medium py-1 md:py-3 px-6  md:px-10 lg:px-10 rounded-full hover:bg-gray-100 relative z-20"
            >
              Lorem ipsum
            </Link>
          </motion.div>

          {/* Right Image - Positioned Over the Section */}
          <motion.div
            className="w-full md:w-1/2 flex justify-center md:justify-end relative z-20"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-full h-full">
              <img
                src={DeliveryImage}
                alt="Delivery person"
                className="relative md:absolute min-w-[100%] h-auto  mx-auto md:mx-0  top-[2rem] 
                md:-top-[8rem] lg:-top-[12rem] xl:-top-[21.2rem] z-20"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryInfo;
