import { defineMiddleware } from 'astro/middleware';

export const onRequest = defineMiddleware((context, next) => {
    return new Response(null, {
      status: 301,
      headers: {
        Location: 'https://schoolink.stki.org/',
      },
    });
});