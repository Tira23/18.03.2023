import ws from "ws";
import { v4 as uuid } from "uuid";

const { Server } = ws;

const clients = {};
const messages = [];

const wss = new Server({ port: 8080 });
wss.on("connection", (ws) => {
    const id = uuid();
    clients[id] = ws;

    console.log(`New client ${id}`);

    ws.send(JSON.stringify(messages));
    ws.on("message", (message) => {
        console.log(message);
        const { name, mess } = JSON.parse(message);
        messages.push({ name, mess });

        for (const id in clients) {
            clients[id].send(JSON.stringify([{ name, mess }]));
        }
    });

    ws.on("close", () => {
        delete clients[id];
        console.log(`Client ${id} is closed`);
    });
});
