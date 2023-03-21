import { io } from "socket.io-client";

const socket = io(`http://localhost:8080`);

socket.on("connect", () => {
    console.log("connected");
});

// send an event to the server
socket.emit("foo", "bar");

socket.on("foo", (mes) => {
    console.log(mes);
    // an event was received from the server
});

// upon disconnection
socket.on("disconnect", (reason) => {
    console.log(`disconnected due to ${reason}`);
});
