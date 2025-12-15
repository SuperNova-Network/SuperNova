<div align="center">
   <img width="540" src="public/media/Title.png" alt="SuperNova" />

  <p align="center">
    A next-generation modular web proxy platform built with Node.js, Express, <br>
   and advanced proxy backends.
  </p>

  <a href="LICENSE"><img src="https://img.shields.io/badge/license-ISC-blue.svg" alt="License"></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg" alt="Node.js"></a>
</div>


---

## Overview

SuperNova is a powerful, extensible web proxy platform designed for modern web unblocking and static site serving. It integrates multiple proxy backends (Ultraviolet, Scramjet, Bare, Epoxy, Libcurl, BareMux) and provides a clean, responsive UI with built-in search and settings.

---

## Features

- **Multi-Proxy Support:** Ultraviolet, Scramjet, Bare, Epoxy, Libcurl, BareMux
- **Dynamic Transport Switching:** Easily switch between Wisp, Epoxy, and more
- **Modern UI:** Responsive interface with search and settings pages
- **Static Asset Serving:** Efficiently serves HTML, JS, CSS, and service workers
- **API Endpoints:** Autocomplete, version, and commit info
- **WebSocket Support:** Wisp and Bare WebSocket upgrades
- **Extensible & Modular:** Add new proxy backends or transports easily

---

## Architecture

The main server (`index.js`) orchestrates:
- Express routing and static asset serving
- Integration of all proxy backends
- API endpoints (`/api/autocomplete`, `/api/version`, `/api/commit`)
- WebSocket upgrades for Wisp and Bare
- Graceful error handling and shutdown

See [`docs/server-architecture-indexjs.md`](docs/server-architecture-indexjs.md) for a deep technical dive.

---

## Prerequisites

- **Node.js** (v14.0.0 or higher) — [Download Node.js](https://nodejs.org/)
- **npm** or **pnpm** — Package manager (comes with Node.js)
- **Git** — [Download Git](https://git-scm.com/)

## Installation

### Option 1: Using npm

```bash
git clone https://github.com/SuperNova-Network/SuperNova.git
cd SuperNova
npm install
npm start
```

### Option 2: Using pnpm (Recommended)

```bash
git clone https://github.com/SuperNova-Network/SuperNova.git
cd SuperNova
npm install -g pnpm # if not installed
pnpm install
pnpm start
```

### Option 3: Using Docker

```bash
git clone https://github.com/SuperNova-Network/SuperNova.git
cd SuperNova
docker build -t supernova .
docker run -p 3000:3000 supernova
```

---

## Configuration

SuperNova includes configuration for multiple deployment platforms:

- `Dockerfile` — Docker containerization
- `fly.toml` — Fly.io deployment
- `vercel.json` — Vercel deployment
- `.env` — Environment variables (optional)

**Change the port:**

```bash
PORT=8080 npm start
```

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

## Links & Support

- [Documentation](docs/)
- [Server Architecture Deep Dive](docs/server-architecture-indexjs.md)
- [Proxy Backend & Service Worker Details](docs/proxy-backend-serviceworker-details.md)

For help, open an issue or join the community.

4. **Access the application**
   
   Open your browser and navigate to `http://localhost:3000`

### Option 2: Using pnpm (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/SuperNova-Network/SuperNova.git
   cd SuperNova
   ```

2. **Install pnpm** (if not already installed)
   ```bash
   npm install -g pnpm
   ```

3. **Install dependencies**
   ```bash
   pnpm install
   ```

4. **Start the application**
   
   Development mode:
   ```bash
   pnpm run dev
   ```
   
   Production mode:
   ```bash
   pnpm start
   ```

### Option 3: Using Docker

1. **Clone the repository**
   ```bash
   git clone https://github.com/SuperNova-Network/SuperNova.git
   cd SuperNova
   ```

2. **Build the Docker image**
   ```bash
   docker build -t supernova .
   ```

3. **Run the container**
   ```bash
   docker run -p 3000:3000 supernova
   ```

4. **Access the application**
   
   Navigate to `http://localhost:3000`

## Configuration

SuperNova includes several configuration files for different deployment platforms:

- `Dockerfile` - Docker containerization
- `fly.toml` - Fly.io deployment
- `public/scramjet/scramjet.config.js` - Scramjet configuration

### Changing the Port

By default, SuperNova runs on port 3000. To change this, set the `PORT` environment variable:

```bash
PORT=8080 npm start
```

## Technologies Used

- **[Express.js](https://expressjs.com/)** - Web framework
- **[Scramjet](https://github.com/MercuryWorkshop/scramjet)** - Web proxy backend
- **[Bare Server](https://github.com/tomphttp/bare-server-node)** - Proxy server implementation
- **[Wisp](https://github.com/MercuryWorkshop/wisp-js)** - WebSocket protocol
- **[Epoxy Transport](https://github.com/MercuryWorkshop/epoxy-transport)** - Alternative transport
- **[Bare-Mux](https://github.com/MercuryWorkshop/bare-mux)** - Transport multiplexer

## Deployment

SuperNova can be deployed on various platforms:

### Deploy to Fly.io
```bash
fly launch
fly deploy
```

### Deploy to Render
Connect your GitHub repository to Render and it will automatically deploy.

### Deploy to Vercel
```bash
vercel
```

### Manual Deployment
For any Node.js hosting platform:
1. Upload your files
2. Run `npm install`
3. Start with `npm start`
4. Ensure port 3000 is accessible (or configure as needed)

## Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check existing issues for solutions
- Read the documentation carefully

---

<div align="center">
  Made with ❤ by the SuperNova Network team
</div>
