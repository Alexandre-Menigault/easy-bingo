// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  css: ['~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Easy Bingo - Create and Play Custom Bingo Cards Online',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'language', content: 'en' },
        { 
          name: 'description', 
          content: 'Create, customize, and play bingo cards online. Perfect for classrooms, events, and parties. Features include custom grid sizes, card saving, and easy sharing.'
        },
        { name: 'theme-color', content: '#2563eb' },
        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Easy Bingo - Create and Play Custom Bingo Cards Online' },
        { 
          property: 'og:description', 
          content: 'Create, customize, and play bingo cards online. Perfect for classrooms, events, and parties.'
        },
        { property: 'og:site_name', content: 'Easy Bingo' },
        // Twitter
        { name: 'twitter:card', content: 'app' },
        { name: 'twitter:title', content: 'Easy Bingo - Create and Play Custom Bingo Cards Online' },
        { 
          name: 'twitter:description', 
          content: 'Create, customize, and play bingo cards online. Perfect for classrooms, events, and parties.'
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://your-domain.com' } // Replace with your actual domain
      ]
    }
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  typescript: {
    strict: true,
    typeCheck: true,
  },

  imports: {
    dirs: ['stores', 'composables'],
  },

  compatibilityDate: '2025-04-08',
})