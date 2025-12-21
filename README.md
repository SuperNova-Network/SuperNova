<div align="center">
  <img width="540" src="public/media/Title.png" alt="SuperNova" />
  <p align="center" style="margin-top:20px;">
    A next-generation modular web proxy platform built with Node.js, Express, <br>
    and advanced proxy backends.
  </p>

  <a href="LICENSE"><img src="https://img.shields.io/badge/license-ISC-blue.svg" alt="License"></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg" alt="Node.js"></a>
</div>

---


## Overview

SuperNova is a modern, extensible web proxy platform for unblocking and static site serving. It integrates multiple proxy backends (Ultraviolet, Scramjet, Bare, Epoxy, Libcurl, BareMux) and features a clean, responsive UI with built-in search and settings. Built for flexibility, speed, and ease of deployment.

---


## Features

- **Multi-Proxy Support:** Ultraviolet, Scramjet, Bare, Epoxy, Libcurl, BareMux
- **Dynamic Transport Switching:** Switch between Wisp, Epoxy, and more
- **Modern UI:** Responsive interface with search and settings
- **Static Asset Serving:** Efficient HTML, JS, CSS, and service worker delivery
- **API Endpoints:** Autocomplete, version, and commit info
- **WebSocket Upgrades:** Wisp and Bare WebSocket support
- **Modular & Extensible:** Add new proxy backends or transports easily

---


## Architecture

The main server (`index.js`) handles:
- Express routing and static asset serving
- Integration of all proxy backends
- API endpoints (`/api/autocomplete`, `/api/version`, `/api/commit`)
- WebSocket upgrades for Wisp and Bare
- Error handling and graceful shutdown

See [`docs/server-architecture-indexjs.md`](docs/server-architecture-indexjs.md) for a technical deep dive.

---


## Prerequisites

- **Node.js** (v14.0.0 or higher) — [Download Node.js](https://nodejs.org/)
- **npm** or **pnpm** — Package manager (comes with Node.js)
- **Git** — [Download Git](https://git-scm.com/)


## Installation & Usage

### Using npm
```bash
git clone https://github.com/SuperNova-Network/SuperNova.git
cd SuperNova
npm install
npm start
```

### Using pnpm (Recommended)
```bash
git clone https://github.com/SuperNova-Network/SuperNova.git
cd SuperNova
npm install -g pnpm # if not installed
pnpm install
pnpm start
```

### Using Docker
```bash
git clone https://github.com/SuperNova-Network/SuperNova.git
cd SuperNova
docker build -t supernova .
docker run -p 8080:8080 supernova
```

After starting, open your browser and go to [http://localhost:8080](http://localhost:8080)

---

## Development & Build

- `pnpm dev`: Runs Vite with HMR for the client and `nodemon` for the Express backend side by side.
- `pnpm build`: Produces a production-ready Vite build (multi-page: home, settings, go, 404) into `dist/`.
- `pnpm preview`: Serves the built site locally for smoke testing.
- `pnpm start`: Serves the built assets from `dist/` via Express (ensure you run `pnpm build` first or set `STATIC_DIR`).

Set `STATIC_DIR` to override the directory Express serves static assets from.

---

## Technologies Used

- **[Express.js](https://expressjs.com/)** — Web framework
- **[Ultraviolet](https://github.com/titaniumnetwork-dev/ultraviolet)** — Proxy backend
- **[Scramjet](https://github.com/MercuryWorkshop/scramjet)** — Proxy backend
- **[Bare Server](https://github.com/tomphttp/bare-server-node)** — Proxy backend
- **[Wisp](https://github.com/MercuryWorkshop/wisp-js)** — WebSocket protocol
- **[Epoxy Transport](https://github.com/MercuryWorkshop/epoxy-transport)** — Alternative transport
- **[Bare-Mux](https://github.com/MercuryWorkshop/bare-mux)** — Transport multiplexer
- **[Libcurl Transport](https://github.com/MercuryWorkshop/libcurl-transport)** — Proxy transport
- **Compression, dotenv, node-fetch, http-proxy**

---


## Contributing

Contributions are welcome! Please fork the repo, create a feature branch, and submit a Pull Request. See [CODE_OF_CONDUCT](CODE_OF_CONDUCT) before contributing.

---


## Documentation & Support

- [Documentation](docs/)
- [Server Architecture Deep Dive](docs/server-architecture-indexjs.md)
- [Proxy Backend & Service Worker Details](docs/proxy-backend-serviceworker-details.md)

For help, open an issue or join the community.

---

<div align="center">
  Made with ❤ by the SuperNova Network team
</div>
