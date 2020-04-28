import React from "react";
import { Place } from "Types";
import { motion } from "framer-motion";
import { fadeIn, fadeInFromLeft } from "Animations";
import "./PlaceInformation.scss";

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
            <a className="link-unstyled" href={place.url}>
                <motion.p className="location" variants={fadeInFromLeft}>
                    {place.location}
                </motion.p>
                <motion.h1 className="title" variants={fadeInFromLeft}>
                    {place.title}

                    <div className="hover-indicator">
                        <div className="css-icon-arrow" />
                    </div>
                </motion.h1>
                <motion.h2 className="subtitle" variants={fadeInFromLeft}>
                    {place.subtitle}
                </motion.h2>
            </a>
        </motion.div>
    );
};

export default PlaceInformation;
