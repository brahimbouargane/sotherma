import { motion } from "framer-motion";
import DeliveryImage from "../../assets/images/delivery-man.png";
const DeliveryInfo = () => {
  return (
    <section className="py-12 mt-24  bg-primary bg-gradient-to-r from-[#0F67B1] to-[#E6F2F8] rounded-3xl  shadow-xl">
      <div className="mx-auto">
        <div className=" flex flex-col md:flex-row items-center relative">
          {/* Left Content */}
          <motion.div
            className="md:w-1/2 text-white relative z-10 md:pl-28"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-6xl font-normal mb-4 relative max-w-sm z-20">
              La livraison automatique
            </h2>
            <p className="mt-6 max-w-[34rem] text-lg leading-relaxed relative z-20">
              Lorem ipsum dolor sit amet consectetur. Massa felis massa enim
              tristique. Lectus eget viverra nunc nisi risus mattis fusce eu.
              Blandit pellentesque lacus est ut ultrices.
            </p>
            <button className="bg-white text-3xl mt-6 text-blue-700 font-medium py-6 px-14 rounded-full hover:bg-gray-100 relative z-20">
              Lorem ipsum
            </button>
          </motion.div>

          {/* Right Image - Positioned Over the Section */}
          <motion.div
            className="md:w-1/2 flex justify-end relative z-20"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-full h-full">
              <img
                src={DeliveryImage}
                alt="Delivery person"
                className="absolute max-w-[80%] top-[-6rem] md:-top-[17rem]  z-20"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryInfo;
