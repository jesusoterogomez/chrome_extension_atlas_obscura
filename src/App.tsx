import React, { useState, useEffect } from "react";
import { Place } from "Types";
import { motion, AnimationProps } from "framer-motion";
import { getPlaceData } from "./utils/atlas";
// import { getPlaceData } from "__mocks__/atlas"; // Uncomment when running app through npm start

import "./App.scss";

import CurrentWeather from "components/CurrentWeather";

const App = () => {
    const [imageSrc, setImageSrc] = useState<string>();
    const [data, setData] = useState<Place>();

    useEffect(() => {
        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async () => {
        const placeData = await getPlaceData();
        loadImage(placeData.background_image_url);

        setData(placeData);
    };

    // Lazy load image
    const loadImage = (src: string) => {
        let image = new Image();
        image.src = src;
        image.onload = () => {
            setImageSrc(src);
        };
    };

    const imageLoaded = !!imageSrc;

    // @see: https://www.framer.com/api/motion/animation/
    const text_container: AnimationProps["variants"] = {
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

    const text_item: AnimationProps["variants"] = {
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
        hidden: { opacity: 0, x: -50, transition: { duration: 0.5 } },
    };

    return (
        <div className="page-container">
            <motion.div
                className="default-backdrop"
                animate={{
                    opacity: 1,
                    scale: 1.1,
                }}
                transition={{ duration: 1.5 }}
                style={{
                    opacity: 0,
                    scale: 1,
                }}
            >
                <div className="default-backdrop-image" />
            </motion.div>

            {/* Display image when fully loaded */}
            {imageLoaded && (
                <motion.div
                    initial={true}
                    className="image-container"
                    animate={{
                        opacity: 1,
                    }}
                    transition={{ duration: 0.8 }}
                    style={{
                        opacity: 0,
                        backgroundImage: `url(${imageSrc})`,
                    }}
                />
            )}

            {imageLoaded && data && (
                <>
                    <CurrentWeather />

                    <motion.div
                        className="gradient-overlay"
                        initial="hidden"
                        animate="visible"
                        variants={text_container}
                    />
                    <motion.div
                        className="text-container"
                        initial="hidden"
                        animate="visible"
                        variants={text_container}
                    >
                        <motion.p className="location" variants={text_item}>
                            {data?.location}
                        </motion.p>
                        <motion.h1 className="title" variants={text_item}>
                            {data?.title}
                        </motion.h1>
                        <motion.h2 className="subtitle" variants={text_item}>
                            {data?.subtitle}
                        </motion.h2>
                    </motion.div>
                </>
            )}
        </div>
    );
};

export default App;
