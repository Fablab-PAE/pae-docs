// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightImageZoom from 'starlight-image-zoom';
import diagrams from './src/diagrams/diagrams.mjs';

// https://astro.build/config
export default defineConfig({
    site: 'https://fablab-pae.github.io',
    base: '/pae-docs',
    integrations: [
      diagrams(), // ```mermaid blocks drawn by pele (src/diagrams/); before starlight
      starlight({
        title: '',
        // Kit docs features (kit docs upgrade): the docs version next to the title, and an
        // "Enlarge" button on each diagram (zoom and move it full screen)
        components: {
          SiteTitle: './src/components/SiteTitle.astro',
          MarkdownContent: './src/components/MarkdownContent.astro',
          // Guide images open full screen when clicked (starlight-image-zoom's viewer)
          Footer: './src/components/Footer.astro',
        },
        plugins: [starlightImageZoom()],
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
                label: 'CNC Machine Guide',
                translations: {
                  'fr': 'Machine CNC',
                  'en': 'CNC Machine',
                },
                link: '/guides/cnc-machine/',
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
                label: '3D Printing Guide',
                translations: {
                  'fr': 'Impression 3D',
                  'en': '3D Printing',
                },
                link: '/guides/impression-3d/',
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