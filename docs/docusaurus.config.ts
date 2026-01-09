import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Kaal',
  tagline: 'High-performance DatePicker & TimePicker for React Native + Web',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  // GitHub Pages deployment
  url: 'https://dreamstack-us.github.io',
  baseUrl: '/kaal/',
  organizationName: 'DreamStack-us',
  projectName: 'kaal',
  trailingSlash: false,
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/DreamStack-us/kaal/tree/main/docs/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/og-image.png',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Kaal',
      logo: {
        alt: 'Kaal Logo',
        src: 'img/logo.png',
        srcDark: 'img/logo-dark.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/docs/api/datepicker',
          label: 'API',
          position: 'left',
        },
        {
          to: '/docs/examples/basic-datepicker',
          label: 'Examples',
          position: 'left',
        },
        {
          href: 'https://github.com/DreamStack-us/kaal',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started',
            },
            {
              label: 'API Reference',
              to: '/docs/api/datepicker',
            },
          ],
        },
        {
          title: 'Examples',
          items: [
            {
              label: 'DatePicker',
              to: '/docs/examples/basic-datepicker',
            },
            {
              label: 'TimePicker (iOS)',
              to: '/docs/examples/timepicker-ios',
            },
            {
              label: 'TimePicker (Material)',
              to: '/docs/examples/timepicker-material',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/DreamStack-us/kaal',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} DreamStack. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'typescript', 'tsx', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
