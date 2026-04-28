import { onCheckboxChange } from "./onCheckboxChange.js"

export function onConnection(socket){
    console.log(`SocketID: ${socket.id}`)


    socket.on('client:checkbox-change', onCheckboxChange)
}