//API created by @rogeliosamuel21

import { Server } from "./App";
import { port } from "./config/index.config";

function Main() {
  const server = new Server(port);
  server.StartServer();
}

Main();
