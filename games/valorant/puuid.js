import axios from 'axios'
import { VALORANT_API } from '../valorant/server.js'

export default async function getPlayer(gameName, tagName){
    const player = axios.get(`${VALORANT_API}/valorant/v1/account/${gameName}/${tagName}`).then((response) => {
        console.log(response.data)
        return response.data
    })

    return player
}

export async function getPUUID(gameName, tagName){
    const player = await getPlayer(gameName, tagName)
    return player.puuid
}