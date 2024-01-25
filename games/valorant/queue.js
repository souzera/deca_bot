import axios from 'axios'
import { VALORANT_API } from '../valorant/server.js'
import { regiaoSelector } from './regiao.js'

import getPUUID from './puuid.js'	
import { statusPartidaDetalhado } from './matches-status.js'

export default async function getQueueHistory(regiao, puuid){

    const url = `${VALORANT_API}/valorant/v1/by-puuid/lifetime/matches/${regiaoSelector(regiao)}/${puuid}?mode=competitive&size=5`
    const queueHistory = axios.get(url).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    })  

    return queueHistory
}

export async function getQueueHirstoryByGameTag(gameName, tagName){
    const ppuid = await getPUUID(gameName, tagName).then((response) => {
        return response.data.puuid
    })

    const queueHistory = await getQueueHistory('br', ppuid).then((response) => {
        console.log(response)
        return statusPartidaDetalhado(response)
    })

    return queueHistory
}