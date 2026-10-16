# Amerta Massage

A static React + TypeScript + Vite website. No backend, database, or environment variables are required. Bookings open a prefilled WhatsApp message; the website does not store orders or manage availability.

## Develop

Use Node.js 22.13 or newer and pnpm.

```sh
pnpm install
pnpm run dev
```

## Verify

```sh
pnpm run lint
pnpm run build
pnpm exec playwright install chromium
pnpm run test
```

The browser tests build the app and check the production preview at desktop and mobile sizes, including language switching, service details, FAQs, images, and WhatsApp booking.

## Deploy

```sh
pnpm run build
```

Upload the contents of `dist/` to a static host at the domain root. The entry point is `dist/index.html`; a Node.js server is not needed in production. Use `pnpm run preview` to check the build locally. Serve it over HTTP/HTTPS rather than opening it with `file://`.

## Edit content

- `src/lib/site.ts`: business details and WhatsApp number (currently a placeholder; replace before launch).
- `src/lib/i18n.ts`: treatments, prices, translations, FAQs, and testimonials.
- `src/components/landing/`: page sections and interactions.
- `src/styles.css`: fonts, colors, and global styles.
- `public/`: photos, logos, icons, and crawler files.

Keep the domain in `index.html`, `public/robots.txt`, and `public/sitemap.xml` in sync with `src/lib/site.ts`. Social metadata is included directly in the HTML. Business and FAQ structured data are generated from the content during the Vite build.
