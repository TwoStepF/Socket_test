import express from "express";
import cors from "cors"
import * as http from "http";
import {Server} from "socket.io";

const app = express()
const PORT = 8082
const server = http.createServer(app)
app.use(cors())
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log(`user with id ${socket.id} connected`)

    socket.on("join_room", (data) => {
        socket.join(data)
        console.log(`user with id: ${socket.id} join room: ${data}`)
    })
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data)
    })
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id)
    })
})

server.listen(PORT, () => {
    console.log(`SERVER RUNNING PORT ${PORT}`);
});