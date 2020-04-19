import React from "react";

import { ReactComponent as Icon01d } from "files/icons/openweathermap/01d.svg";
import { ReactComponent as Icon01n } from "files/icons/openweathermap/01n.svg";

import { ReactComponent as Icon02d } from "files/icons/openweathermap/02d.svg";
import { ReactComponent as Icon02n } from "files/icons/openweathermap/02n.svg";

import { ReactComponent as Icon03d } from "files/icons/openweathermap/03d.svg";
import { ReactComponent as Icon03n } from "files/icons/openweathermap/03n.svg";

import { ReactComponent as Icon04d } from "files/icons/openweathermap/04d.svg";
import { ReactComponent as Icon04n } from "files/icons/openweathermap/04n.svg";

import { ReactComponent as Icon09d } from "files/icons/openweathermap/09d.svg";
import { ReactComponent as Icon09n } from "files/icons/openweathermap/09n.svg";

import { ReactComponent as Icon10d } from "files/icons/openweathermap/10d.svg";
import { ReactComponent as Icon10n } from "files/icons/openweathermap/10n.svg";

import { ReactComponent as Icon11d } from "files/icons/openweathermap/11d.svg";
import { ReactComponent as Icon11n } from "files/icons/openweathermap/11n.svg";

import { ReactComponent as Icon13d } from "files/icons/openweathermap/13d.svg";
import { ReactComponent as Icon13n } from "files/icons/openweathermap/13n.svg";

import { ReactComponent as Icon50d } from "files/icons/openweathermap/50d.svg";
import { ReactComponent as Icon50n } from "files/icons/openweathermap/50n.svg";

type IconMap = {
    [key: string]: any;
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
    return React.cloneElement(ICONS[icon].render(), {
        height: "48",
        width: "48",
        className: `weather-icon ${icon}`,
    });
};

export default OpenWeatherIcon;
