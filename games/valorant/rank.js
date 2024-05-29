import axios from 'axios'
import { VALORANT_API } from '../valorant/server.js'
import { regiaoSelector } from './regiao.js'
import { statusPartida } from './matches-status.js'
import { api_options } from './others.js'

export default async function getRank(gameName, tagName, regiao="br") {
    const url = `${VALORANT_API}/valorant/v1/mmr/${regiaoSelector(regiao)}/${gameName}/${tagName}`
    const rank = await axios.get(url, {headers:api_options}).then((response) => {
        console.log(response.data)
        if (response.data.data.name === null) return 0
        return response.data.data
    }).catch((error) => {
        return error.response.data
    })

    return rank
}

export async function getCurrentRank(gameName, tagName, regiao="br") {
    const rank = await getRank(gameName, tagName, regiao)

    if (rank.status === 404) { return "🧐🧐Jogador não encontrado ..."}

    if (rank === 0) { return "🕵️🤫 O jogador ocultou os dados..."}

    let status = `${rank.name}#${rank.tag} está ${rank.currenttierpatched} com ${rank.ranking_in_tier} pontos. \nNa ultima partida ${statusPartida(rank.mmr_change_to_last_game)} e conseguiu ${rank.mmr_change_to_last_game} pontos.`


    return status
}