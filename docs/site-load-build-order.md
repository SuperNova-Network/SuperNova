# Server vs. Client Load Order

**Order of operations:**

1. The server (`index.js`) runs first. It listens for incoming HTTP requests.
2. When a user visits the site, the server receives the request and serves `index.html` (or another HTML file).
3. The browser loads `index.html` and then loads all referenced scripts and assets.

**Summary:** The server must be running before any HTML or JS is loaded in the browser. The browser never "calls" `index.js` directly; it only receives files from it.
# SuperNova Site Load & Build Order

This document explains the order in which SuperNova loads and builds its files, from server startup to client-side asset loading. It also includes Mermaid diagrams for visual clarity.

---

## 1. Server Startup (Node.js/Express)

- The entry point is `index.js`.
- Loads all required modules and sets up Express middleware.
- Static assets are served from the `public/` directory with cache headers.
- Proxy backends and API endpoints are registered.

**Key Files Loaded at Startup:**
- `index.js` (main server logic)
- `package.json` (for version info)
- Proxy backend modules (e.g., `@mercuryworkshop/*`)
- Static files from `public/`

```mermaid
flowchart TD
    A[Start: node index.js] --> B[Load Express & Middleware]
    B --> C[Register Static Asset Middleware]
    C --> D[Register Proxy & API Routes]
    D --> E[Start HTTP Server]
```

---

## 2. HTTP Request Handling

- Requests for static files (HTML, JS, CSS, images) are served from `public/`.
- Requests for `/`, `/settings`, `/go`, etc. serve specific HTML files.
- API and proxy requests are routed to their handlers.

**Example Route Handling:**
- `/` → `public/html/index.html`
- `/settings` → `public/html/settings.html`
- `/go` → `public/html/go.html`
- `/api/version` → returns version from `package.json`
- `/cdn` → proxied to external target

```mermaid
sequenceDiagram
    participant Client
    participant Express
    participant FileSystem
    participant Proxy
    Client->>Express: GET /settings
    Express->>FileSystem: Read settings.html
    FileSystem-->>Express: HTML file
    Express-->>Client: HTML file
    Client->>Express: GET /js/settings.js
    Express->>FileSystem: Read settings.js
    FileSystem-->>Express: JS file
    Express-->>Client: JS file
    Client->>Express: GET /cdn/...
    Express->>Proxy: Forward request
    Proxy-->>Express: Response
    Express-->>Client: Proxied response
```

---

## 3. Client-Side Asset Loading

- The browser loads the main HTML file.
- HTML references JS, CSS, and other assets (with cache-busting if used).
- JS files initialize client-side logic and UI.

**Typical Load Order for `/settings`:**
1. `settings.html` (HTML)
2. `css/settings.css` (CSS)
3. `js/settings.js` (main settings logic)
4. Other JS/CSS/media as referenced

```mermaid
flowchart TD
    A[settings.html loaded] --> B[settings.css loaded]
    A --> C[settings.js loaded]
    C --> D[Client-side JS runs]
```

---

## 4. Build/Deploy Process

- No explicit build step unless you add one (e.g., for cache-busting or minification).
- Deployment is typically copying all files to the server and running `node index.js`.

**If using a build tool:**
- Source files are processed (minified, hashed, etc.)
- Output is placed in `public/`
- Server serves the processed files

---

## Summary Table

| Step                | Main Files/Dirs                | Description                       |
|---------------------|-------------------------------|-----------------------------------|
| Server Startup      | `index.js`, `public/`          | Loads server, sets up routes      |
| Static Asset Serve  | `public/`                      | Serves HTML, JS, CSS, images      |
| API/Proxy Routing   | `index.js`, proxy modules      | Handles API and proxy requests    |
| Client Load         | `settings.html`, `settings.js` | Browser loads and runs assets     |

---

For more details, see the code comments in `index.js` and the `/public` directory structure.
