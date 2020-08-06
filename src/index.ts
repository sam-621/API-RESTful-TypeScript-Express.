import { Server } from './App';

function Main() {
    const server = new Server(3000);
    server.StartServer();
}

Main();