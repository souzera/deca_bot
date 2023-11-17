import axios  from "axios"
import { options } from "../client.js"

export async function getDavinciResponse(clientText){
    const davinci = {
        model: "user",
        prompt: clientText,
        temperature: 1,
        max_tokens: 4000
    }

    try {
        let botResponse = ""
        await axios(
            {
                method: "POST",
                url: "https://api.openai.com/v1/chat/completions",
                data: {
                    model: "gpt-3.5-turbo",
                    messages: [{ "role": "user", "content": davinci.prompt },]
                },
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${options.openAi.apiKey}`,
                }
            }
        ).then((response) => {
            botResponse += response.data.choices[0].message.content
        })
        return `${botResponse.trim()}`
    } catch (e) {
        return `❌ OpenAI Response Error: ${e}`
    }
}