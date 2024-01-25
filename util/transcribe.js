import { AssemblyAI } from "assemblyai"
import { options } from "../client.js";

const assemblyai = new AssemblyAI({
    apiKey: options.assemblyaI.apiKey,
});

export default async function transcribe(msg) {

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