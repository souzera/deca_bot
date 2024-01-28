import { AssemblyAI } from "assemblyai"
import { options } from "../client.js";
import axios from "axios";


const assemblyai = new AssemblyAI({
    apiKey: options.assemblyaI.apiKey,
});

const data = {
    audio_url: '../downloads/smzinho.mp3',
    language_code: 'pt'
}

export async function transcribetest(){
    axios(
        {
            method: "POST",
            url: "https://api.openai.com/v1/audio/transcriptions",
            headers: {
                Authorization: `Bearer ${options.openAi.apiKey}`,
                "Content-Type": 'multipart/form-data'
            },
            form: {
                file: "C:/Users/55879/OneDrive/Documentos/2023.1/outros/deca_bot/downloads/smzinho.mp3",
                model: "whisper-1"
            }
        }
    ).then(response => {
        console.log(response.data.data)
    })
}

export async function transcribe(msg) {

    if (msg.hasQuotedMsg) {
        msg.getQuotedMessage().then((response) => {
            if (response.hasMedia) {
                response.downloadMedia().then((media) => {
                    console.log(media.data)
                    msg.reply(media.data)
                })
            }
        })
    }

}