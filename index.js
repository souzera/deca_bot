import qrcode from 'qrcode-terminal'

import dotenv from 'dotenv'
import axios from 'axios'

import * as pkg from 'whatsapp-web.js'

const { Client, MessageMedia } = pkg;

dotenv.config()

// HG API Weather

const hg_api_key = process.env.HG_API_KEY

const getWeather = async (city) => {

    console.log(`Query city: ${city}`)

    try {
        let bot_response = ""
        await axios.get(`https://api.hgbrasil.com/weather?key=${hg_api_key}&city_name=${city}`).then((response) => {
            const temperature = response.data.results.temp
            switch (temperature) {
                case temperature < 15:
                    bot_response += `🥶 Como está frio no Alaska. Fazem exatamente ${temperature} ℃`
                    break
                case temperature >= 15 && temperature < 28:
                    bot_response += `😎 Suave na nave 🚀 só de boa. Fazem exatamente ${temperature} ℃`
                    break
                case temperature >= 28:
                    bot_response += `🥵 Calor da febe homi, desliga o sol. Fazem exatamente ${temperature} ℃`
                    break
            }

            return bot_response
        })
    } catch (err) {
        console.log(err)
        return "❌ Não foi possivel obter o clima."
    }
}

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
                    messages: [{ "role": "user", "content": davinci.prompt },]
                },
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${options.apiKey}`,
                }
            }
        ).then((response) => {
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
        ).then((response) => {
            return response.data.data[0].url
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

    const contato = async () => {
        await msg.getContact().then((result) => {
            return result
        })
    }

    contato().then((result) => {
        console.log(`Send by: ${result}`)
    })

    const chat = async () => {
        await msg.getChat().then((result) => { return result })
    }

    chat().then((result) => {
        console.log(`Origin Chat: ${result}`)
    })

    const bot_commands = {
        ping: "!ping",
        aniversario: "!aniversario",
        help: "!help",
        gpt: "!gpt",
        dalle: '!dalle',
        clima: "!clima"
    }

    let firstWord = ((msg.body.includes(' ')) ? msg.body.substring(0, msg.body.indexOf(" ")) : msg.body);

    console.log(firstWord)
    console.log(msg.body)

    switch (firstWord) {
        case bot_commands.ping:
            msg.reply('🏓 Pong in poucos ms')
            break
        case bot_commands.aniversario:
            msg.reply(`Feliz aniversário, ${contato.pushname}! \n\n`)
            break
        case bot_commands.help:
            msg.reply(`Comandos disponíveis: \n\n !ping \n !gpt SEU_TEXTO \n !help`)
            break
        case bot_commands.gpt:
            const question = msg.body.substring(msg.body.indexOf(" "));
            console.log(question)
            getDavinciResponse(question).then((response) => {
                msg.reply(response)
            })
            break
        case bot_commands.dalle:
            msg.reply('Ops! Comando desativado ❌')
            break
        case bot_commands.clima:
            msg.reply('Ops! Comando desativado ❌')
            break
    }
})

client.initialize();