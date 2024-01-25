import axios from 'axios'
import { VALORANT_API } from '../valorant/server.js'
import { regiaoSelector } from './regiao.js'

export default async function getLeaderboard(regiao) {
    let url = `${VALORANT_API}/valorant/v1/leaderboard/${regiao}`.toLowerCase()
    if (!validateRegion(regiao)) { url = `${VALORANT_API}/valorant/v1/leaderboard/br` }
    const leaderboard = await axios.get(url).then((response) => {
        return response.data
    })

    if (!(validateRegion(regiao))) {console.log("⛔ Atenção: Região inválida. Usando região padrão (br)");}
    return leaderboard
}

export async function getTop10(regiao) {
    const leaderboard = await getLeaderboard(regiao)
    const top10 = leaderboard.slice(0, 10)

    let tabela = `🏆 Top 10 ${regiaoSelector(regiao)} Valorant \n\n`

    top10.map((player,index) => {

        tabela += `${index}: ${player.gameName} #${player.tagLine} - *${player.rankedRating}*rr - *${player.numberOfWins}* wins\n`
    })

    return tabela
}