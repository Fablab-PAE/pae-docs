// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import diagrams from './src/diagrams/diagrams.mjs';

// https://astro.build/config
export default defineConfig({
    site: 'https://fablab-pae.github.io',
    base: '/pae-docs',
    integrations: [
      diagrams(), // ```mermaid blocks drawn by pele (src/diagrams/); before starlight
      starlight({
        title: '',
        // Kit docs features (kit docs upgrade): the docs version next to the title, and a
        // full-screen viewer: click a diagram or a picture to zoom and move it
        components: {
          SiteTitle: './src/components/SiteTitle.astro',
          MarkdownContent: './src/components/MarkdownContent.astro',
          // Footer of every page: adds the "Crédits photos" link (the page is not in the menu)
          Footer: './src/components/Footer.astro',
          // Title of every page: adds the "Imprimer" button on the right of the guides' titles
          PageTitle: './src/components/PageTitle.astro',
        },
        // Site styles (external-link icon in the menu), then the TEST Tailwind look (only
        // applied when the "Style" switch of public/skin.js is on)
        customCss: ['./src/styles/custom.css', './src/styles/skin-tailwind.css'],
        logo: {
            // src: './src/assets/logo_robotic_light.svg',
            light: './src/assets/logo_robotic_light.svg',
            dark: './src/assets/logo_robotic_dark.svg',
          },
        // social: {
        //   github: 'https://github.com/withastro/starlight',
        // },
        defaultLocale: 'fr',
        locales: {
          'fr': {
            label: 'Français',
            lang: 'fr',
          },
          'en': {
            label: 'English',
          },
        },
        head: [
            {
              tag: 'script',
              attrs: {
                src: '/pae-docs/redirect.js',
              },
            },
            {
              // TEST "Style" switch, Astro / Tailwind look (local preview only); early, so
              // the saved look shows without a flash
              tag: 'script',
              attrs: {
                src: '/pae-docs/skin.js',
              },
            },
            {
              // Side menu groups always open (no folding)
              tag: 'script',
              attrs: {
                src: '/pae-docs/sidebar-open.js',
              },
            },
            {
              // Print buttons of the guides (whole guide, or only its safety sheet)
              tag: 'script',
              attrs: {
                src: '/pae-docs/print.js',
              },
            },
        ],
        sidebar: [
          {
            label: 'Guides',
            translations: {
              'fr': 'Guides',
              'en': 'Guides',
            },
            items: [
              {
                label: '3D Printing Guide',
                translations: {
                  'fr': 'Impression 3D',
                  'en': '3D Printing',
                },
                link: '/guides/impression-3d/',
              },
              {
                label: 'Laser Engraving Guide',
                translations: {
                  'fr': 'Gravure Laser',
                  'en': 'Laser Engraver',
                },
                link: '/guides/gravure-laser/',
              },
              {
                label: 'Vinyl Cutter Guide',
                translations: {
                  'fr': 'Découpe Vinyle',
                  'en': 'Vinyl Cutter',
                },
                link: '/guides/decoupe-vinyle/',
              },
              {
                label: 'CNC Machine Guide',
                translations: {
                  'fr': 'Machine CNC',
                  'en': 'CNC Machine',
                },
                link: '/guides/cnc-machine/',
              },
            //   {
            //     label: 'Example Guide',
            //     translations: {
            //       'fr': 'Guide Demo',
            //       'en': 'Demo Guide',
            //     },
            //     link: '/guides/example/',
            //   },
            ],
          },
        //   {
        //     label: 'Additional documents',
        //     translations: {
        //       'en': 'Additional documents',
        //       'fr': 'Documents additionnels',
        //     },
        //     autogenerate: { directory: 'reference' },
        //   },
          {
            label: 'Our projects',
            translations: {
              'fr': 'Nos projets',
              'en': 'Our projects',
            },
            items: [
              {
                label: 'MILA, robot assistant',
                translations: {
                  'fr': 'MILA, robot assistant',
                  'en': 'MILA, robot assistant',
                },
                link: '/projets/mila/',
              },
            ],
          },
          {
            // The FabLab's shop (outside site, opens in a new tab)
            label: 'Shop',
            translations: {
              'fr': 'Lien vers notre boutique',
              'en': 'Link to our shop',
            },
            link: 'https://online.forms.app/boutique-chouette-et-cie/formulaire-de-commerce?formsRef=qrcode',
            attrs: { target: '_blank', rel: 'noopener noreferrer' },
          },
        ],
      }),
    ],
    devToolbar: {
        enabled: false,
    },
});