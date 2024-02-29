import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "/lang/en.json";
import translationVI from "/lang/vi.json";

const resources = {
    en: {
        translation: translationEN,
    },
    vi: {
        translation: translationVI,
    },
};

i18n.use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        supportedLngs: ["en", "vi"],
        fallbackLng: "en",
        debug: true,
        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: "lang/{{lng}}.json",
        },
    });

export default i18n;
