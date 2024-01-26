import { getCurrentRank } from "./games/valorant/rank.js"
import {getPUUID} from "./games/valorant/puuid.js"
import getQueueHistory, { getQueueHirstoryByGameTag } from "./games/valorant/queue.js"
import { statusPartidaDetalhado } from "./games/valorant/matches-status.js"

//getCurrentRank("inimigodaverdade", "3527", 'br').then((response) => {console.log(response)})

//getPUUID("inimigodaverdade", "3527", 'br').then((response) => {console.log(response)})

getQueueHirstoryByGameTag("jeffsbala", "1898", 'br').then((response) => {console.log(response)})
getCurrentRank("jeffsbala", "1898", 'br').then((response) => {console.log(response)})