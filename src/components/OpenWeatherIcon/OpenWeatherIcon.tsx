import React from "react";

import Icon01d from "files/icons/openweathermap/01d.svg?react";
import Icon01n from "files/icons/openweathermap/01n.svg?react";

import Icon02d from "files/icons/openweathermap/02d.svg?react";
import Icon02n from "files/icons/openweathermap/02n.svg?react";

import Icon03d from "files/icons/openweathermap/03d.svg?react";
import Icon03n from "files/icons/openweathermap/03n.svg?react";

import Icon04d from "files/icons/openweathermap/04d.svg?react";
import Icon04n from "files/icons/openweathermap/04n.svg?react";

import Icon09d from "files/icons/openweathermap/09d.svg?react";
import Icon09n from "files/icons/openweathermap/09n.svg?react";

import Icon10d from "files/icons/openweathermap/10d.svg?react";
import Icon10n from "files/icons/openweathermap/10n.svg?react";

import Icon11d from "files/icons/openweathermap/11d.svg?react";
import Icon11n from "files/icons/openweathermap/11n.svg?react";

import Icon13d from "files/icons/openweathermap/13d.svg?react";
import Icon13n from "files/icons/openweathermap/13n.svg?react";

import Icon50d from "files/icons/openweathermap/50d.svg?react";
import Icon50n from "files/icons/openweathermap/50n.svg?react";

type IconMap = {
    [key: string]: React.FC<React.SVGProps<SVGSVGElement>>;
};

const ICONS: IconMap = {
    "01d": Icon01d,
    "01n": Icon01n,
    "02d": Icon02d,
    "02n": Icon02n,
    "03d": Icon03d,
    "03n": Icon03n,
    "04d": Icon04d,
    "04n": Icon04n,
    "09d": Icon09d,
    "09n": Icon09n,
    "10d": Icon10d,
    "10n": Icon10n,
    "11d": Icon11d,
    "11n": Icon11n,
    "13d": Icon13d,
    "13n": Icon13n,
    "50d": Icon50d,
    "50n": Icon50n,
};

const OpenWeatherIcon = ({ icon }: { icon: string }) => {
    const IconComponent = ICONS[icon];
    if (!IconComponent) return null;

    return (
        <IconComponent
            height="48"
            width="48"
            className={`weather-icon ${icon}`}
        />
    );
};

export default OpenWeatherIcon;
