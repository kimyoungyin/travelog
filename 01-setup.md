# phase 1: setup

download required module for setting project

-   Typescript
-   Next.js
-   tailwindcss
-   supabase
    -   auth
    -   storage
    -   db(postgresql)
-   Tanstack-query(v5): since project will use user-related data
-   shadcnui: I already set this project with own custom theme

## Installation Steps

### 1. Create Next.js project with shadcn/ui preset

```bash
npx shadcn@latest create --preset "https://ui.shadcn.com/init?base=radix&style=maia&baseColor=neutral&theme=violet&iconLibrary=tabler&font=noto-sans&menuAccent=subtle&menuColor=default&radius=small&template=next" --template next
```

This command sets up:

-   Next.js (v16.1.0)
-   TypeScript (v5)
-   Tailwind CSS (v4)
-   shadcn/ui with custom theme (Radix base, Maia style, Violet theme, Tabler icons)

### 2. Install Supabase packages

```bash
npm install @supabase/supabase-js @supabase/ssr
```

-   `@supabase/supabase-js`: Main Supabase client library for auth, storage, and database
-   `@supabase/ssr`: Server-side rendering support for Next.js

### 3. Install TanStack Query (v5)

```bash
npm install @tanstack/react-query
npm install -D @tanstack/react-query-devtools
```

-   `@tanstack/react-query`: Data fetching and state management for user-related data
-   `@tanstack/react-query-devtools`: Development tools (optional)

## Installed Versions

-   TypeScript: v5
-   Next.js: v16.1.0
-   Tailwind CSS: v4
-   Supabase JS: v2.89.0
-   Supabase SSR: v0.8.0
-   TanStack Query: v5.90.12
-   TanStack Query Devtools: v5.91.1

## Next step

just client only.(with dummy data): `02-page-description-only.md`

then, i will set database and server features.
