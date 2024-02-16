import React, { useEffect, useState } from "react";
import { useColorMode } from "@docusaurus/theme-common";
import Dropdown from "react-bootstrap/Dropdown";

const ThemeSwitcher = () => {
    const { setColorMode } = useColorMode();
    // Initialize themeSetting state with localStorage value or default to "auto"
    const [themeSetting, setThemeSetting] = useState(localStorage.getItem("themeSetting") || "auto");

    const applyThemeSetting = () => {
        const setting = localStorage.getItem("themeSetting") || "auto";
        let finalTheme;

        if (setting === "auto") {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            finalTheme = prefersDark ? "dark" : "light";
        } else {
            finalTheme = setting;
        }

        setColorMode(finalTheme);
        document.documentElement.setAttribute("data-bs-theme", finalTheme);
    };

    const handleThemeChange = (newSetting) => {
        localStorage.setItem("themeSetting", newSetting);
        setThemeSetting(newSetting); // Update the component state to reflect the new setting
        applyThemeSetting();
    };

    useEffect(() => {
        applyThemeSetting();

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = () => {
            if (localStorage.getItem("themeSetting") === "auto") {
                applyThemeSetting();
            }
        };
        mediaQuery.addEventListener("change", handleChange);

        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [themeSetting]); // Ensure themeSetting is a dependency so the effect applies when it changes

    // Determine which icon to display in the Dropdown.Toggle
    const getToggleIcon = () => {
        switch (themeSetting) {
            case "light":
                return <i className="bi bi-sun-fill me-2"></i>;
            case "dark":
                return <i className="bi bi-moon-stars-fill me-2"></i>;
            case "auto":
            default:
                return <i className="bi bi-circle-half me-2"></i>;
        }
    };

    return (
        <Dropdown className="me-2 me-lg-0">
            <Dropdown.Toggle variant="secondary" size="sm" id="theme-switcher">
                {getToggleIcon()}Theme
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleThemeChange("light")} className={themeSetting === "light" ? "active" : ""}>
                    <i className="bi bi-sun-fill me-2"></i>Light
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleThemeChange("dark")} className={themeSetting === "dark" ? "active" : ""}>
                    <i className="bi bi-moon-stars-fill me-2"></i>Dark
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleThemeChange("auto")} className={themeSetting === "auto" ? "active" : ""}>
                    <i className="bi bi-circle-half me-2"></i>Auto
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default ThemeSwitcher;
