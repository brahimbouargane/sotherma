import React from "react";
import { motion } from "framer-motion";

interface StepProps {
  number: string;
  title: string;
  description: string;
  color: "light" | "medium" | "dark";
}

const Step: React.FC<StepProps> = ({ number, title, description, color }) => {
  // Define color variations
  const colorClasses = {
    light: "bg-blue-100 text-blue-600/80",
    medium: "bg-blue-400 text-white/80",
    dark: "bg-blue-700 text-white/80",
  };

  return (
    <div
      className={`${colorClasses[color]} h-full pb-10 pt-6 px-4 flex flex-col items-center text-center gap-6 shadow-xl rounded-3xl`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-[120px] font-bold -mb-4">{number}</h2>
        <h3 className="text-4xl font-bold mb-4 max-w-3/5 mx-auto">{title}</h3>
        <p
          className={`${
            color === "light" ? "text-gray-600" : "text-blue-50"
          } text-sm   max-w-3/5 mx-auto`}
        >
          {description}
        </p>
      </motion.div>
    </div>
  );
};

interface DeliveryStepsProps {
  className?: string;
}

const DeliverySteps: React.FC<DeliveryStepsProps> = ({ className }) => {
  const steps: StepProps[] = [
    {
      number: "01",
      title: "Composez votre panier",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      color: "light",
    },
    {
      number: "02",
      title: "Choisissez un mode de livraison",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      color: "medium",
    },
    {
      number: "03",
      title: "Recevez votre livraison",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      color: "dark",
    },
  ];

  return (
    <div className={` ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <div key={index}>
            <Step
              number={step.number}
              title={step.title}
              description={step.description}
              color={step.color}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliverySteps;
