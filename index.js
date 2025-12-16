
// --- Core/Proxy Backends ---
import { server as wisp } from "@mercuryworkshop/wisp-js/server";
import { createBareServer } from "@tomphttp/bare-server-node";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { libcurlPath } from "@mercuryworkshop/libcurl-transport";
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";
import { bareModulePath } from "@mercuryworkshop/bare-as-module3";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";
import { scramjetPath } from "@mercuryworkshop/scramjet/path";

// --- Core Server/Express ---
import express from "express";
import { createServer } from "node:http";
import { join } from "path";
import compression from "compression";
import { fileURLToPath } from "node:url";

// --- Utilities/Other ---
import httpProxy from "http-proxy";
import fetch from "node-fetch";
import dotenv from "dotenv";
import { execSync } from "node:child_process";
import packageJson from "./package.json" with { type: "json" };

dotenv.config();

Object.assign(wisp.options, {
  allow_udp_streams: false,
  dns_servers: ["1.1.1.3", "1.0.0.3"],
});


// --- Server/Proxy Setup ---
const cdnProxy = httpProxy.createProxyServer();
const bare = createBareServer("/bare/");
const __dirname = join(fileURLToPath(import.meta.url), "..");
const app = express();
const publicPath = "public";

// --- Express Middleware ---
app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", join(__dirname, publicPath, "html"));
app.use(compression());
app.use(express.static(publicPath));
app.use("/uv/", express.static(uvPath));
app.use("/scram/", express.static(scramjetPath));
app.use("/epoxy/", express.static(epoxyPath));
app.use("/baremux/", express.static(baremuxPath));
app.use("/libcurl/", express.static(libcurlPath));
app.use("/bareasmodule/", express.static(bareModulePath));
app.use("/sj/sw.js", (req, res, next) => {
  res.set("Service-Worker-Allowed", "/");
  next();
});
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, publicPath, "html", "index.html"));
});
app.use("/cdn", (req, res) => {
  cdnProxy.web(req, res, {
    target: "https://gms.parcoil.com/",
    changeOrigin: true,
  });
});
app.get("/api/autocomplete", async (req, res) => {
  const q = req.query.q || "";
  const duckUrl = `https://duckduckgo.com/ac/?q=${encodeURIComponent(q)}`;

  try {
    const response = await fetch(duckUrl);
    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch suggestions" });
  }
});
app.get("/api/version", (req, res) => {
  res.json({ version: packageJson.version });
});
app.get("/api/commit", (req, res) => {
  try {
    const commit = execSync("git rev-parse --short HEAD").toString().trim();
    res.json({ commit });
  } catch (err) {
    res.status(500).json({ error: "Could not get commit" });
  }
});

app.get("/settings", (req, res) => {
  res.sendFile(join(__dirname, publicPath, "html", "settings.html"));
});
app.get("/go", (req, res) => {
  res.sendFile(join(__dirname, publicPath, "html", "go.html"));
});
app.get("/package.json", (req, res) => {
  res.json(packageJson);
});
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, publicPath, "html", "404.html"));
});

// --- HTTP/Upgrade Handling ---
const server = createServer();

server.on("request", (req, res) => {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on("upgrade", (req, socket, head) => {
  if (req.url.endsWith("/wisp/")) {
    wisp.routeRequest(req, socket, head);
  } else if (bare.shouldRoute(req)) {
    bare.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

let port = parseInt(process.env.PORT || "");

if (isNaN(port)) port = 8080;

server.on("listening", () => {
  const address = server.address();
  console.clear();
  console.log("Listening on:");
  console.log(`\thttp://localhost:${address.port}`);
  console.log(
    `\thttp://${address.family === "IPv6" ? `[${address.address}]` : address.address}:${address.port}`
  );
});

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

function shutdown() {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close();
  bare.close();
  process.exit(0);
}

server.listen({
  port,
  host: "0.0.0.0" /*, <-- (BROKEN) When starting the project locally, make sure to use port 8080 instead */,
});
