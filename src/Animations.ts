import { AnimationProps } from "framer-motion";

// @see: https://www.framer.com/api/motion/animation/

export const fadeIn: AnimationProps["variants"] = {
    visible: {
        opacity: 1,
        transition: {
            duration: 1,
            delayChildren: 0.3,
            staggerChildren: 0.1,
        },
    },
    hidden: { opacity: 0 },
};

export const fadeInFromLeft: AnimationProps["variants"] = {
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    hidden: { opacity: 0, x: -50, transition: { duration: 0.5 } },
};

export const fadeInFromRight: AnimationProps["variants"] = {
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    hidden: { opacity: 0, x: +50, transition: { duration: 0.5 } },
};
