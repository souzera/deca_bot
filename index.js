import qrcode from 'qrcode-terminal'
import { Client } from 'whatsapp-web.js'

import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

// OPENAI

const options = {
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORGANIZATION_ID
}

const getDavinciResponse = async (clientText) => {
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
                    messages: [{"role": "user","content": davinci.prompt},]
                },
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${options.apiKey}`,
                }
            }
        ).then((response) => {
            console.log("Resposta: ")
            console.log(response.data.choices[0].message)
            botResponse += response.data.choices[0].message.content
        })
        return `Chat GPT 🤖\n\n ${botResponse.trim()}`
    } catch (e) {
        return `❌ OpenAI Response Error: ${e}`
    }
}

const getDalleResponse = async (clientText) => {
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
                    "Authorization": `Bearer ${options.apiKey}`,
                }
            }
        ).then((response) =>{
            console.log(response.data.data[0])
            return response.data.data[0]
        })
    } catch (e) {
        return `❌ OpenAI Response Error: ${e.response.data.error.message}`
    }
}

// WHATSAPP

const client = new Client()

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true })
    console.log("Escaneie o QR Code acima para iniciar a sessão")
    console.log('QR RECEIVED: ', qr)
})

client.on('ready', () => {
    console.log('Client is ready!')
})

client.on('message', (msg) => {

    const contato = (msg) => {
        msg.getContact().then((result) => {
            return result
        })
    }

    const chat = (msg) => {
        msg.getChat().then((result) => {return result})
    }

    const bot_commands = {
        ping: "!ping",
        aniversario: "!aniversario",
        help: "!help",
        gpt: "!gpt",
        dalle: '!dalle'

    }

    let firstWord = ((msg.body.includes(' ')) ? msg.body.substring(0, msg.body.indexOf(" ")) : msg.body);

    console.log(firstWord)
    console.log(msg.body)

    switch (firstWord) {
        case '!ping':
            msg.reply('🏓 Pong in poucos ms')
            break
        case '!aniversario':
            msg.reply(`Feliz aniversário, ${contato(msg).pushname}! \n\n`)
            break
        case '!help':
            msg.reply(`Comandos disponíveis: \n\n !ping \n !aniversario \n !help`)
            break
        case bot_commands.gpt:
            const question = msg.body.substring(msg.body.indexOf(" "));
            console.log(question)
            getDavinciResponse(question).then((response) => {
                msg.reply(response)
            })
            break
        case bot_commands.dalle:
            const desc = msg.body.substring(msg.body.indexOf(" "));
            getDalleResponse(desc).then((response) => {
                msg.reply(`Imagem: ${response.url}`)
            })
            break
    }
})

client.initialize();