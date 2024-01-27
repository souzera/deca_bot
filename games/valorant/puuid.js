import axios from 'axios'
import { VALORANT_API } from '../valorant/server.js'

export async function getPlayer(gameName, tagName){
    const player = axios.get(`${VALORANT_API}/valorant/v1/account/${gameName}/${tagName}`).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    })

    return player
}

export async function getPUUID(gameName, tagName){
    const player = await getPlayer(gameName, tagName).then((response) => {
        console.log(response.data)
        return response.data
    }).catch((error) => {
        console.log(error)
        return error.response.data
    })
    return player.puuid
}