import fs from "fs"
import { getPlayer } from "./games/valorant/puuid.js";
import { downloadAudio, downloadImage } from "./util/download.js";
import { transcribetest } from "./util/transcribe.js";


async function readFileAndEncodeBase64(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const base64Data = Buffer.from(data).toString('base64');
        return base64Data
    } catch (err) {
        console.error('Erro ao ler o arquivo:', err);
    }
}

const testingDatas = {
    audio: readFileAndEncodeBase64('./downloads/base64-audio.txt')
}

getPlayer("cafezin", "ain").then((response) => {
    console.log(response.data.card.wide)
})

downloadImage("https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Khazix_0.jpg")


downloadAudio(await testingDatas.audio)

