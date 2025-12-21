# Changelog

## Unreleased

- Added Vite-based frontend pipeline with dev server/HMR and multi-page production builds for home, settings, go, and 404.
- Updated Express to serve built assets from `dist/` by default while keeping proxy backends mounted.
- Added a safe fallback response when built assets are missing to avoid `ENOENT` crashes.
- Fixed Vite build inputs by using relative module paths and excluding proxy scripts from bundling.
- Introduced new `pnpm` scripts for dev, build, and preview plus shared settings/starfield modules for the UI.
- Refreshed Docker build to compile the frontend and prune dev dependencies before producing the runtime image.
