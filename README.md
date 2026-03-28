# FaithHub MyLiveDealz Buyer

Production-ready TypeScript + Vite + MUI + Tailwind scaffold for the FaithHub app pages provided in the attached page pack.

## Start

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Main Routes

- `/` redirects to the default user dashboard route
- `/access` workspace access gateway
- `/app/user/*` user pages in routed app shell
- `/app/provider/*` provider pages in routed app shell
- `/app/admin/*` admin pages in routed app shell

## Design System

- Primary EVzone Green: `#03cd8c`
- Secondary EVzone Orange: `#f77f00`
- Neutral Gray: `#a6a6a6`
- Light Surface: `#f2f2f2`

## Notes

- Only attached FaithHub pages were used as the application screens.
- Pages are routed through a single persistent app shell (fixed header + fixed sidebar) and code-split with lazy loading.
- MUI theming and Tailwind utility styling are both included.

## Enterprise Role Routes (Preview)

- `/super-admin/*` platform-wide control tower scaffold
- `/tenant-admin/*` tenant-level workspace scaffold
- `/ops/*` trust and safety operations scaffold

Use `/access` and choose a workspace card. Role context can be switched with `?as=<role>` and optional tenant scope with `&tenant=<tenant-id>`.
