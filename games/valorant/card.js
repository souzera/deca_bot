import { getPlayer } from "./puuid";

export async function getWideCardBase64(gameName, tagName){
    const card = getPlayer(gameName, tagName).then((response) => {
        const base64 = convertImageToBase64(response.data.card.wide).then((response) => { return response })
        return base64
    })
    return card
}