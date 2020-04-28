import React, { useState, useEffect } from "react";
import { Place } from "Types";
import { motion } from "framer-motion";
import { fadeIn } from "Animations";
import CurrentWeather from "components/CurrentWeather";
import PlaceInformation from "components/PlaceInformation";
// import { getPlaceData } from "./utils/atlas";
import { getPlaceData } from "__mocks__/atlas"; // Uncomment when running app through npm start

import "./App.scss";
import ImageAttribution from "components/ImageAttribution";

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
                <>
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
                </>
            )}

            {imageLoaded && data && (
                <>
                    <ImageAttribution attribution={data.image_attribution} />
                    <CurrentWeather />
                    <PlaceInformation place={data} />

                    <motion.div
                        className="gradient-overlay"
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                    />
                </>
            )}
        </div>
    );
};

export default App;
