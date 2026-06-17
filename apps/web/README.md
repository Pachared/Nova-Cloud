# Nova Web

Next.js App Router frontend migrated from the original Nova Vite app.

## Commands

```bash
npm --workspace @nova/web run dev
npm --workspace @nova/web run build
npm --workspace @nova/web run start
```

## SEO

The public marketing homepage includes metadata, Open Graph, Twitter Card, canonical URL support, `robots.txt`, `sitemap.xml`, and JSON-LD structured data.

Dashboard and account route prefixes are disallowed in `robots.txt` so future protected pages are not indexed by default.
