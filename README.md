<div align="center">
  <img width="600" src="https://github.com/SuperNova-Network/SuperNova/blob/main/public/resources/media/images/Title.png?raw=true" alt="SuperNova" />
  
  <p>A powerful web proxy application built with Ultraviolet and modern web technologies</p>
  
  [![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)
  [![Node.js](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)](https://nodejs.org)
</div>

---

## Features

- **Scramjet Proxy** - Powered by Scramjet for superior web unblocking
- **Multiple Transport Protocols** - Support for Wisp and Epoxy transports
- **Bare-Mux Integration** - Dynamic transport switching capabilities
- **Modern UI** - Clean, responsive interface
- **Search & Settings** - Built-in search and configuration pages

## Prerequisites

Before installing SuperNova, make sure you have the following installed:

- **Node.js** (version 14.0.0 or higher) - [Download Node.js](https://nodejs.org/)
- **npm** or **pnpm** - Package manager (comes with Node.js)
- **Git** - [Download Git](https://git-scm.com/)

## Installation

### Option 1: Using npm

1. **Clone the repository**
   ```bash
   git clone https://github.com/SuperNova-Network/SuperNova.git
   cd SuperNova
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the application**
   
   Development mode (with auto-reload):
   ```bash
   npm run dev
   ```
   
   Production mode:
   ```bash
   npm start
   ```

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

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. Make sure to:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please read [CODE_OF_CONDUCT](CODE_OF_CONDUCT) before contributing.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Terms of Use

Please read the [Terms of Use](Terms-of-Use.md) before using SuperNova.

## Links

- **GitHub Repository**: [https://github.com/SuperNova-Network/SuperNova](https://github.com/SuperNova-Network/SuperNova)
- **Issues**: [Report a bug or request a feature](https://github.com/SuperNova-Network/SuperNova/issues)
- **Discord**: [Join our community](https://discord.gg/7zD99WY2bR)

## Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check existing issues for solutions
- Read the documentation carefully

---

<div align="center">
  Made with love by the SuperNova Network team
</div>
