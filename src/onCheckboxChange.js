import { publisher, redis } from "./redisConnection.js"
import { CHECKBOX_KEY } from "./index.js"

export async function onCheckboxChange(data){
    console.log(`Socket Event client:checkbox-change | index:${data.index} | checked:${data.checked}`)

    const existingState = await redis.get(CHECKBOX_KEY);
    const parsedStateArr = JSON.parse(existingState);
    parsedStateArr[data.index] = data.checked;
    await redis.set(CHECKBOX_KEY, JSON.stringify(parsedStateArr));
    await publisher.publish("internal-server:checkbox-change", JSON.stringify(data))
}