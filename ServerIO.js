import { createServer } from "http";
import { Server } from "socket.io";

const httpsServer = createServer();
const io = new Server(httpsServer);

io.on("connection", (socket) => {
    console.log(`socket ${socket.id} connected`);
    socket.emit("name", socket.id);
    // send an event to the client
    socket.on("foo", (mes) => {
        console.log(mes);
        io.emit("mess", { name: socket.id, mes });
    });
    // upon disconnection
    socket.on("disconnect", (reason) => {
        console.log(`socket ${socket.id} disconnected due to ${reason}`);
    });
});
httpsServer.listen(8080);
