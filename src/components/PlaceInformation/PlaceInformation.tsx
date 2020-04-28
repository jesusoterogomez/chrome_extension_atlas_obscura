import React from "react";
import { Place } from "Types";
import { motion } from "framer-motion";
import "./PlaceInformation.scss";
import { fadeIn, fadeInFromLeft } from "Animations";

type Props = {
    place: Place;
};

const PlaceInformation = ({ place }: Props) => {
    return (
        <motion.div
            className="place-information"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
        >
            <motion.p className="location" variants={fadeInFromLeft}>
                {place.location}
            </motion.p>
            <motion.h1 className="title" variants={fadeInFromLeft}>
                {place.title}
            </motion.h1>
            <motion.h2 className="subtitle" variants={fadeInFromLeft}>
                {place.subtitle}
            </motion.h2>
        </motion.div>
    );
};

export default PlaceInformation;
