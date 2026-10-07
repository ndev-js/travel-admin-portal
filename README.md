# Travel CRM Admin Portal

Admin dashboard for managing a multi-tenant Travel CRM platform. It has a Vercel-style layout with a sidebar, top bar, light/dark theme and a tenant overview page.

> **Status:** early development. Only the **Overview** (Tenants) page is built. Other sections show a placeholder.

## Tech stack

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev) for dev server and build
- [Tailwind CSS v4](https://tailwindcss.com) (configured in `src/index.css`)
- [shadcn/ui](https://ui.shadcn.com) (`new-york` style) on [Radix UI](https://www.radix-ui.com)
- [lucide-react](https://lucide.dev) icons
- [Oxlint](https://oxc.rs) for linting

## Getting started

Requires Node.js 20+ and npm.

```bash
npm install
npm run dev
```

The app runs at http://localhost:5173 by default.

## Scripts

| Command           | Description                         |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start the Vite dev server           |
| `npm run build`   | Type-check and build for production |
| `npm run preview` | Preview the production build        |
| `npm run lint`    | Lint the project with Oxlint        |

## Project structure

```
src/
├── components/
│   ├── ui/          # shadcn/ui primitives (button, card, table, tabs, ...)
│   ├── Sidebar.tsx
│   ├── Topbar.tsx
│   ├── Overview.tsx
│   └── ...          # tenant cards, usage panel, recent activity, etc.
├── hooks/           # useTheme, useFocusHotkey
├── lib/utils.ts     # cn() class-name helper
├── data.ts          # mock data
├── nav.ts           # sidebar navigation config
├── App.tsx
└── main.tsx
```

## Navigation sections

Tenants (Overview), Users, Subscriptions, Logs, Analytics, Performance, Observability, Security, Infrastructure, Feature Flags, Domains, API Keys and Integrations.

## Adding UI components

This project uses shadcn/ui. Add components with:

```bash
npx shadcn@latest add <component>
```

They are written to `src/components/ui/`.
