interface SeoOptions {
  title?: string;
  description?: string;
  url?: string;
}

export const useSeo = (options: SeoOptions) => {
  const config = useRuntimeConfig();
  const route = useRoute();

  const defaultTitle = 'Easy Bingo - Create and Play Custom Bingo Cards Online';
  const defaultDescription = 'Create, customize, and play bingo cards online. Perfect for classrooms, events, and parties. Features include custom grid sizes, card saving, and easy sharing.';
  
  const title = options.title ? `${options.title} | Easy Bingo` : defaultTitle;
  const description = options.description || defaultDescription;
  const url = options.url || `https://your-domain.com${route.path}`; // Replace with your actual domain

  useHead({
    title,
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {
        name: 'description',
        content: description
      },
      {
        name: 'language',
        content: 'en'
      },
      // Open Graph
      {
        property: 'og:type',
        content: 'website'
      },
      {
        property: 'og:title',
        content: title
      },
      {
        property: 'og:description',
        content: description
      },
      {
        property: 'og:url',
        content: url
      },
      // Twitter
      {
        name: 'twitter:card',
        content: 'app'
      },
      {
        name: 'twitter:title',
        content: title
      },
      {
        name: 'twitter:description',
        content: description
      }
    ],
    link: [
      {
        rel: 'canonical',
        href: url
      },
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/favicon.ico'
      }
    ]
  });
}; 