import  axios from "axios"
import { options } from "../client.js"

//unused
export async function getDalleResponse(clientText){
    const data = {
        prompt: clientText,
        n: 1,
        size: "1024x1024",
    }

    try {
        await axios(
            {
                method: "POST",
                url: 'https://api.openai.com/v1/images/generations',
                data,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${options.openAi.apiKey}`,
                }
            }
        ).then((response) => {
            return response.data.data[0].url
        })
    } catch (e) {
        return `❌ OpenAI Response Error: ${e.response.data.error.message}`
    }
}