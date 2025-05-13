// animations/animationVariants.ts

export const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
  hover: {
    y: -5,
    transition: { duration: 0.3 },
  },
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const toastVariants = {
  initial: { opacity: 0, y: 50, scale: 0.8 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 20,
    },
  },
  exit: {
    opacity: 0,
    y: 50,
    scale: 0.8,
    transition: {
      duration: 0.3,
    },
  },
};

export const filterButtonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
  active: {
    backgroundColor: "#0d4f91",
    color: "#ffffff",
  },
  inactive: {
    backgroundColor: "#0F67B1",
    color: "#ffffff",
  },
};

export const buttonVariants = {
  idle: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
  added: {
    scale: [1, 1.2, 1],
    backgroundColor: "#22c55e", // green-500
    transition: {
      duration: 0.5,
      backgroundColor: { duration: 0.2 },
    },
  },
};

export const imageVariants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.3 },
  },
  idle: {
    scale: 1,
    transition: { duration: 0.3 },
  },
};
