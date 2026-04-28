import {createServer} from "node:http";
import path from "node:path";

import express from "express"
import {Server} from "socket.io";

import { onConnection } from "./onConnection.js";
import { subscriber, redis } from "./redisConnection.js";

export const CHECKBOX_KEY = "state-in-redis/v2"
const CHECKBOX_NUMBER = 200
async function main(){
    const app = express();

    const server = createServer(app);

    const io = new Server()
    io.attach(server)

    await subscriber.subscribe("internal-server:checkbox-change")
    subscriber.on('message', (channel, message) => {
        if(channel === "internal-server:checkbox-change"){
        const {index, checked} = JSON.parse(message);
        io.emit('server:checkbox-change', {index, checked})
    }
    })

    app.use(express.static(path.resolve("../public/")))

    io.on("connection", onConnection)

    app.get("/health", (req, res) => {
        res.json({ok:true})
    })

    app.get("/checkboxes", async (req, res) => {
        const existingState = await redis.get(CHECKBOX_KEY);
        if(existingState){
            const data = JSON.parse(existingState)
            return res.json({checkboxes:data})
        }
        const data = new Array(CHECKBOX_NUMBER).fill(false)
        console.log(data)
        await redis.set(CHECKBOX_KEY, JSON.stringify(data));
        return res.json({checkboxes: data})
    })

    server.listen(process.env.PORT, () => {
        console.log(`Server is running on http://localhost:${process.env.PORT}`)
    })
}
main()