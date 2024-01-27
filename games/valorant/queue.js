import axios from 'axios'
import { VALORANT_API } from '../valorant/server.js'
import { regiaoSelector } from './regiao.js'

import {getPUUID} from './puuid.js'	
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
        if (response.status === 200) return response.data.puuid
        else return "not_found"
    }).catch((error) => {
        console.log(error)
        return "not_found"
    })

    if (ppuid === "not_found") return "🥸🥸 Jogador não encontrado..."

    else{

        const queueHistory = await getQueueHistory('br', ppuid).then((response) => {
            console.log(response)
            if (response.data.length === 0) return "🕵️🤫 O jogador ocultou os dados..."
            else
            return statusPartidaDetalhado(response)
        })
    
        return queueHistory
    }
}