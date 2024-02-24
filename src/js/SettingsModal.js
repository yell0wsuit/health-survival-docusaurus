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

    const applyFontSetting = (fontKey) => {
        document.documentElement.style.setProperty("--ifm-font-family-base", fonts[fontKey]);
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
    const fonts = {
        "System Font": "system-ui",
        Inter: '"Inter", system-ui',
        //Merriweather: '"Merriweather", serif',
        "Noto Sans": "'Noto Sans', system-ui",
        "Noto Serif": "'Noto Serif', system-ui",
        //Roboto: '"Roboto", system-ui',
        "Roboto Serif": '"Roboto Serif", serif',
        "Roboto Mono": '"Roboto Mono", monospace',
        "Source Sans": '"Source Sans", system-ui',
        "Source Code Pro": '"Source Code Pro", monospace',
        "Source Serif": '"Source Serif", serif',
    };

    const handleFontChange = (newFont) => {
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
                                            {settings.selectedFont}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {Object.keys(fonts).map((fontKey) => (
                                                <Dropdown.Item key={fontKey} onClick={() => handleFontChange(fontKey)}>
                                                    <span style={{ fontFamily: fonts[fontKey] }}>{fontKey}</span>
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
