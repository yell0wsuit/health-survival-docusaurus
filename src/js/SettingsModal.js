import React, { useEffect, useState } from "react";
import { useColorMode } from "@docusaurus/theme-common";
import { Modal, Button, Dropdown, Card, Form } from "react-bootstrap";

const SettingsModal = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { setColorMode } = useColorMode();
    // Define default settings
    const defaultSettings = {
        themeSetting: "auto",
        selectedFont: "Inter",
        fontSize: 16, // default size in px
    };

    // Load settings from localStorage or use defaults
    const [settings, setSettings] = useState(() => {
        const savedSettings = localStorage.getItem("healthandsurvival");
        return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
    });

    const applySettings = () => {
        const { themeSetting, selectedFont } = settings;
        applyThemeSetting(themeSetting);
        applyFontSetting(selectedFont);
        applyFontSize(settings.fontSize);
    };

    const applyThemeSetting = (themeSetting) => {
        let finalTheme;

        if (themeSetting === "auto") {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            finalTheme = prefersDark ? "dark" : "light";
        } else {
            finalTheme = themeSetting;
        }

        setColorMode(finalTheme);
        document.documentElement.setAttribute("data-bs-theme", finalTheme);
    };

    const applyFontSetting = (fontName) => {
        const selectedFont = fonts.find((font) => font.fontFamily === fontName);
        if (selectedFont) {
            document.documentElement.style.setProperty("--ifm-font-family-base", selectedFont.fontFamily);
        } else {
            console.error("Font not found:", fontName);
        }
    };

    const applyFontSize = (fontSize) => {
        const root = document.documentElement;
        root.style.setProperty("--ifm-font-size-base", `${fontSize}px`);
    };

    const handleThemeChange = (newThemeSetting) => {
        const newSettings = { ...settings, themeSetting: newThemeSetting };
        setSettings(newSettings);
        localStorage.setItem("healthandsurvival", JSON.stringify(newSettings));
        applyThemeSetting(newThemeSetting);
    };

    const handleFontSizeChange = (newFontSize) => {
        const newSettings = { ...settings, fontSize: newFontSize };
        setSettings(newSettings);
        localStorage.setItem("healthandsurvival", JSON.stringify(newSettings));
        applyFontSize(newFontSize);
    };

    useEffect(() => {
        applySettings();
        initializeSettings();
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = () => {
            const localSettings = JSON.parse(localStorage.getItem("healthandsurvival") || "{}");
            if (localSettings.themeSetting === "auto") {
                applyThemeSetting("auto");
            }
        };
        mediaQuery.addEventListener("change", handleChange);

        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []); // This effect runs once on component mount

    // Determine which icon to display in the Dropdown.Toggle
    const getToggleIcon = () => {
        switch (settings.themeSetting) {
            case "light":
                return (
                    <>
                        <i className="bi bi-sun-fill me-2"></i>Light
                    </>
                );
            case "dark":
                return (
                    <>
                        <i className="bi bi-moon-stars-fill me-2"></i>Dark
                    </>
                );
            case "auto":
            default:
                return (
                    <>
                        <i className="bi bi-circle-half me-2"></i>Follow OS theme
                    </>
                );
        }
    };

    // Font switch
    /*const fonts = {
        "System Font": "system-ui",
        Inter: '"Inter", system-ui',
        "Noto Serif": "'Noto Serif'",
        "Roboto Mono": '"Roboto Mono"',
    };*/

    const fonts = [
        {
            fontFamily: "system-ui",
            displayName: "System Font",
        },
        {
            fontFamily: "Inter",
            displayName: "Inter",
        },
        {
            fontFamily: "Roboto Mono",
            url: "/fonts/RobotoMono-Variable.woff2",
            urlItalic: "/fonts/RobotoMono-Italic-Variable.woff2",
            displayName: "Roboto Mono",
        },
        {
            fontFamily: "Noto Serif",
            url: "/fonts/NotoSerif-Variable.woff2",
            urlItalic: "/fonts/NotoSerif-Italic-Variable.woff2",
            displayName: "Noto Serif",
        },
    ];

    function injectFontFace(selectedFontFamily) {
        // Filter the fonts array to get the selected font based on fontFamily
        const selectedFont = fonts.filter((font) => font.fontFamily === selectedFontFamily)[0];

        if (selectedFont) {
            // Load normal style font
            const dynamicFont = new FontFace(selectedFont.fontFamily, `url(${selectedFont.url})`, {
                style: "normal",
                weight: "300 900",
                display: "swap"
            });

            // Load italic style font, if available
            let dynamicFontItalic;
            if (selectedFont.urlItalic) {
                dynamicFontItalic = new FontFace(selectedFont.fontFamily, `url(${selectedFont.urlItalic})`, {
                    style: "italic",
                    weight: "300 900",
                    display: "swap"
                });
            }

            const loadPromises = [dynamicFont.load()];
            if (dynamicFontItalic) loadPromises.push(dynamicFontItalic.load());

            Promise.all(loadPromises)
                .then((loadedFonts) => {
                    loadedFonts.forEach((loadedFont) => {
                        document.fonts.add(loadedFont);
                    });
                    console.log("Dynamic fonts loaded:", selectedFont.fontFamily);
                })
                .catch((error) => {
                    console.error("Dynamic fonts failed to load for", selectedFont.fontFamily, error);
                });
        } else {
            console.error("Selected font not found:", selectedFontFamily);
        }
    }

    function getFontDisplayName(fontFamily) {
        // Find the font object that matches the fontFamily
        const font = fonts.find((font) => font.fontFamily === fontFamily);
        // Return the displayName if found, otherwise return the fontFamily itself
        return font ? font.displayName : fontFamily;
    }

    // Ensure this function is called when the app/component loads
    function initializeSettings() {
        // Attempt to load settings from local storage
        const savedSettings = JSON.parse(localStorage.getItem("healthandsurvival"));
        if (savedSettings && savedSettings.selectedFont) {
            // Apply the font settings
            applyFontSetting(savedSettings.selectedFont);

            // Load the font using your existing logic
            const selectedFont = fonts.find((font) => font.fontFamily === savedSettings.selectedFont);
            if (selectedFont) {
                injectFontFace(selectedFont.fontFamily);
            }

            // Update your app's state with the loaded settings
            setSettings(savedSettings);
        }
    }

    const handleFontChange = (newFont) => {
        injectFontFace(newFont);
        const newSettings = { ...settings, selectedFont: newFont };
        setSettings(newSettings);
        localStorage.setItem("healthandsurvival", JSON.stringify(newSettings));
        applyFontSetting(newFont);
    };

    return (
        <>
            <Button variant="none" onClick={handleShow}>
                <i className="bi bi-gear-fill"></i>
                <span className="ms-1 d-none d-md-inline-block">Settings</span>
            </Button>
            <Modal show={show} onHide={handleClose} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title className="fs-4 fw-bold">Settings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="fs-5 mb-3 fw-semibold">Appearance</div>
                    <Card>
                        <Card.Body>
                            <div className="row">
                                <div className="col-auto d-flex align-items-center fw-semibold">Theme</div>
                                <div className="col-auto d-block ms-auto">
                                    <Dropdown>
                                        <Dropdown.Toggle
                                            variant="none"
                                            id="dropdown-basic"
                                            style={{
                                                "--bs-btn-border-color": "var(--bs-body-color)",
                                                "--bs-btn-hover-border-color": "var(--bs-secondary-color)",
                                            }}>
                                            {getToggleIcon()}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item
                                                onClick={() => handleThemeChange("light")}
                                                className={settings.themeSetting === "light" ? "active" : ""}>
                                                <i className="bi bi-sun-fill me-2"></i>Light
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                onClick={() => handleThemeChange("dark")}
                                                className={settings.themeSetting === "dark" ? "active" : ""}>
                                                <i className="bi bi-moon-stars-fill me-2"></i>Dark
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                onClick={() => handleThemeChange("auto")}
                                                className={settings.themeSetting === "auto" ? "active" : ""}>
                                                <i className="bi bi-circle-half me-2"></i>Follow OS theme
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                    <hr />
                    <div className="fs-5 mt-3 mb-3 fw-semibold">Font</div>
                    <Card>
                        <Card.Body>
                            <div className="row">
                                <div className="col-auto d-flex align-items-center fw-semibold">Font</div>
                                <div className="col-auto d-block ms-auto">
                                    <Dropdown>
                                        <Dropdown.Toggle
                                            variant="none"
                                            id="font-dropdown"
                                            style={{
                                                "--bs-btn-border-color": "var(--bs-body-color)",
                                                "--bs-btn-hover-border-color": "var(--bs-secondary-color)",
                                            }}>
                                            {getFontDisplayName(settings.selectedFont)}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {fonts.map((font) => (
                                                <Dropdown.Item key={font.displayName} onClick={() => handleFontChange(font.fontFamily)}>
                                                    {font.displayName}
                                                </Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-auto d-flex align-items-center fw-semibold">Font Size</div>
                                <div className="col-4 d-block ms-auto">
                                    <Form>
                                        <Form.Group>
                                            <Form.Range
                                                min="16"
                                                max="24"
                                                value={settings.fontSize}
                                                onChange={(e) => handleFontSizeChange(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Form>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SettingsModal;
