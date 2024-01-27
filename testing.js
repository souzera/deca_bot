import { getPlayer } from "./games/valorant/puuid.js";
import { downloadImage } from "./util/download.js";

getPlayer("cafezin", "ain").then((response) => {
    console.log(response.data.card.wide)
})

downloadImage("https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Khazix_0.jpg")
