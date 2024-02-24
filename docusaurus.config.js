// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: "Health & Survival articles | yell0wsuit's website",
    tagline: "A collections of health and survival articles by yell0wsuit",
    favicon: "img/favicon.svg",

    // Set the production url of your site here
    url: "https://health.yell0wsuit.page",
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: "/",

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    // organizationName: 'facebook', // Usually your GitHub org/user name.
    // projectName: 'docusaurus', // Usually your repo name.

    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: "en",
        locales: ["en"],
        localeConfigs: {
            vi: {
                htmlLang: "vi-VN",
            },
        },
    },

    presets: [
        [
            "classic",
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    routeBasePath: "/",
                    sidebarPath: "./sidebars.js",
                    editUrl: "https://github.com/yell0wsuit/health-survival-docusaurus/edit/main/",
                },
                theme: {
                    customCss: ["./src/css/custom.css", "./src/css/custom.scss"],
                },
                gtag: {
                    trackingID: "G-SX3SJWCLEY",
                    anonymizeIP: true,
                },
            }),
        ],
    ],

    plugins: [require.resolve("docusaurus-lunr-search"), "docusaurus-plugin-sass"],
    scripts: [
        /*{
      src: '/scripts/customThemeSwitch.js',
      async: true,
      defer: true
    },*/
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            // Replace with your project's social card
            image: "img/socialcard.jpg",
            navbar: {
                title: "yell0wsuit",
                logo: {
                    alt: "yell0wsuit logo",
                    src: "img/favicon.svg",
                },
                items: [
                    {
                        type: "docSidebar",
                        sidebarId: "healthSurvival",
                        position: "left",
                        label: "Health & Survival",
                    },
                    /*{
                        type: "localeDropdown",
                        position: "left",
                    },*/
                ],
            },
            announcementBar: {
                id: "beta_wip",
                content: "Working to add more contents. Stay tuned!",
                isCloseable: true,
            },
            footer: {
                links: [
                    {
                        title: "Main links",
                        items: [
                            {
                                label: "Homepage",
                                to: "https://yell0wsuit.page",
                            },
                            {
                                label: "HTML5 games",
                                to: "https://yell0wsuit.page/games.html",
                            },
                            {
                                label: "English learning tools",
                                to: "https://yell0wsuit.page/english.html",
                            },
                            {
                                label: "Blog",
                                to: "https://blog.yell0wsuit.page",
                            },
                            {
                                label: "About",
                                to: "https://yell0wsuit.page/about.html",
                            },
                        ],
                    },
                    {
                        title: "Social links",
                        items: [
                            {
                                label: "GitHub",
                                href: "https://github.com/yell0wsuit",
                            },
                            {
                                label: "Soundcloud",
                                href: "https://soundcloud.com/yell0wsuit",
                            },
                            {
                                label: "Steam",
                                href: "https://steamcommunity.com/id/yell0wsuit",
                            },
                        ],
                    },
                ],
                copyright: `© yell0wsuit. Built with Docusaurus.`,
            },
            prism: {
                theme: prismThemes.github,
                darkTheme: prismThemes.dracula,
            },
            colorMode: {
                disableSwitch: true,
                respectPrefersColorScheme: false,
            },
        }),
};

export default config;
