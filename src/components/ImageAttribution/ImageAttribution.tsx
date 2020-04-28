import React from "react";
import { Place } from "Types";
import { motion } from "framer-motion";
import { BASE_URL } from "Constants";
import "./ImageAttribution.scss";

type Props = {
    attribution: Place["image_attribution"];
};

const getAttributionLink = (attribution: string) => {
    const match = /href="(.+)"/.exec(attribution); // Find link

    if (!match) {
        return null;
    }

    // Get link from firt capturing group.
    const [, link] = match;

    // If the link attribute starts with /users/, prefix it with atlas obscura base URL.
    if (/^\/users\//.test(link)) {
        return BASE_URL + link;
    }

    return link;
};

const parseAttribution = (attribution: string) => {
    const text = attribution.replace(/<.*?>/g, ""); // Remove all HTML tags

    return {
        link: getAttributionLink(attribution),
        text,
    };
};

const ImageAttribution = ({ attribution }: Props) => {
    if (!attribution) {
        return null;
    }

    const data = parseAttribution(attribution);

    return (
        <div className="image-attribution">
            <motion.div
                initial={true}
                animate={{
                    opacity: 1,
                }}
                transition={{ duration: 0.8 }}
                style={{
                    opacity: 0,
                }}
            >
                <a className="image-attribution-link" href={data.link || "#"}>
                    {data.text}
                </a>
            </motion.div>
        </div>
    );
};

export default ImageAttribution;
