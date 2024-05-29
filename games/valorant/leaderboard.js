import axios from 'axios'
import { VALORANT_API } from '../valorant/server.js'
import { regiaoSelector } from './regiao.js'
import { api_options } from './others.js'

export default async function getLeaderboard(regiao) {

    const url = `${VALORANT_API}/valorant/v1/leaderboard/${regiaoSelector(regiao)}` 
    const leaderboard = await axios.get(url, {headers:api_options}).then((response) => {
        return response.data
    })
    
    return leaderboard
}

export async function getTop10(regiao) {
    const leaderboard = await getLeaderboard(regiao)
    const top10 = leaderboard.slice(0, 10)

    let tabela = `🏆 Top 10 ${regiaoSelector(regiao)} Valorant \n\n`

    top10.map((player,index) => {

        tabela += `${index+1}: ${player.gameName} #${player.tagLine} - ${player.rankedRating}rr - ${player.numberOfWins} wins\n`
    })

    return tabela
}