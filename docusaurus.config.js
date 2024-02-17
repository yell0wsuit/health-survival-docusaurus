// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Health & Survival articles [BETA] | yell0wsuit\'s website',
  tagline: 'Collections of health and survival articles',
  favicon: 'img/favicon.svg',

  // Set the production url of your site here
  url: 'https://health.yell0wsuit.page',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  // organizationName: 'facebook', // Usually your GitHub org/user name.
  // projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
        },
        theme: {
          customCss: ['./src/css/custom.css', './src/css/custom.scss'],
        },
      }),
    ],
  ],

  plugins: [require.resolve('docusaurus-lunr-search'), /*require.resolve('docusaurus-plugin-image-zoom'),*/ 'docusaurus-plugin-sass'],
  scripts: [
    {
      src: '/scripts/customThemeSwitch.js',
      async: true,
      defer: true
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'yell0wsuit',
        logo: {
          alt: 'yell0wsuit logo',
          src: 'img/favicon.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'healthSurvival',
            position: 'left',
            label: 'Health & Survival [BETA]',
          }
        ],
      },
      announcementBar: {
        id: 'beta_wip',
        content:
          'Beta: more contents will be added soon.',
        isCloseable: false,
      },
      footer: {
        links: [
          {
            title: 'Links',
            items: [
              {
                label: 'Homepage',
                to: 'https://yell0wsuit.page',
              },
              {
                label: 'HTML5 games',
                to: 'https://yell0wsuit.page/games.html',
              },
              {
                label: 'English learning tools',
                to: 'https://yell0wsuit.page/english.html',
              },
              {
                label: 'Blog',
                to: 'https://blog.yell0wsuit.page',
              },
              {
                label: 'About',
                to: 'https://yell0wsuit.page/about.html',
              },
            ],
          },
          {
            title: 'Social links',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/yell0wsuit',
              },
              {
                label: 'Soundcloud',
                href: 'https://soundcloud.com/yell0wsuit',
              },
              {
                label: 'Steam',
                href: 'https://steamcommunity.com/id/yell0wsuit',
              },
            ],
          },
        ],
        copyright: `© John Wiseman / Williams Collins / Apple. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      colorMode: {
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      /*zoom: {
        selector: '.markdown img',
        background: {
          light: 'rgb(255, 255, 255)',
          dark: 'rgb(50, 50, 50)'
        },
        config: {
          // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
        }
      }*/
    }),
};

export default config;
