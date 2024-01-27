import  getQueueHistory from './games/valorant/queue.js'
import {getModels} from './openai/models.js'

getQueueHistory("br", "9328f225-cbe0-572b-94a4-df730374034e").then((response) => {
    console.log(response.data[0])
    console.log("\n\n")
    console.log(response.data[1])
    console.log("\n\n")
    console.log(response.data[2])
    console.log("\n\n")
    console.log(response.data[3])
    console.log("\n\n")
    console.log(response.data[4])
    console.log("\n\n")
})

getModels().then((response) => {
    console.log(response.data)
})