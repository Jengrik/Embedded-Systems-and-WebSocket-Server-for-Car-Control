//* Import Packages
import { Server as SocketServer } from "socket.io";
import { createServer } from "node:http";
import { fileURLToPath } from "url";
import express from "express";
import morgan from "morgan";
import path from "path";

//* General Path Creation
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//* Server Creation
const app = express();
const server = createServer(app);
const io = new SocketServer(server);

//* Middlewares
app.use(morgan("dev"));

//* Serving Static Files
app.use(express.static(path.join(__dirname, "public")));

//* Routes
app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "views", "homepage.html"));
});

//* Socket Events
io.on("connection", (socket) => {
  console.log("Something is connected!");
});

//* Server Listening
//! When you specify hostname as "127.0.0.1", you're making the server listen only on the loopback address.
//! This means the server will only accept connections originating from the same machine it's running on
//! and won't accept connections from other machines on the network, even if they're on the same subnet.

const port = 3000;
server.listen(port, () => {
  console.log(`===> Server running at http://localhost:${port}/`);
});
