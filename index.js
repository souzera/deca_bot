import qrcode from 'qrcode-terminal'

import dotenv from 'dotenv'
import axios from 'axios'

import * as pkg from 'whatsapp-web.js'

const { Client, MessageMedia } = pkg;

dotenv.config()

// HG API Weather

const hg_api_key = process.env.HGAPI_TOKEN

const getWeather = async (city) => {

    console.log(`Query city: ${city}`)

    
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
            const getPushname = async () => {
                await msg.getContact().then((response) => {
                    msg.reply(`Feliz aniversário! ${response.pushname} 🎈🍰\n\n`)
                })
            }
            getPushname()
            break
        case bot_commands.help:
            msg.reply(`Comandos disponíveis: \n\n !ping \n !gpt SEU_TEXTO \n !help`)
            break
        case bot_commands.gpt:
            const question = msg.body.substring(msg.body.indexOf(" ") + 1);
            getDavinciResponse(question).then((response) => {
                msg.reply(response)
            })
            break
        case bot_commands.dalle:
            msg.reply('Ops! Comando desativado ❌')
            break
        case bot_commands.clima:
            const weather = async () => {

                const city = (msg.body.includes(' ')) ? msg.body.substring(msg.body.indexOf(" ") + 1): null;
                const url = `https://api.hgbrasil.com/weather?key=${hg_api_key}&city_name=${city}`

                console.log(url)

                try {
                    await axios(
                        {
                            method: "GET",
                            url
                        }
                    ).then((response) => {
                        const temperature = response.data.results.temp
                        console.log(`Temperatura: ${temperature}`)

                        if (temperature < 15){
                            msg.reply(`🥶 Como está frio no Alaska. Fazem exatamente ${temperature} ℃`)
                            console.log("frio")
                        } else if (temperature >=15 && temperature < 28){
                            msg.reply(`😎 Suave na nave 🚀 só de boa. Fazem exatamente ${temperature} ℃`)
                            console.log("bom")
                        } else {
                            msg.reply(`🥵 Calor da febe homi, desliga o sol. Fazem exatamente ${temperature} ℃`)
                            console.log("calor")
                        }
                    })
                } catch (err) {
                    console.log(err)
                    msg.reply("❌ Não foi possivel obter o clima.")
                }
            }
            msg.reply("Ops! Comando desativado❌")
            break
    }
})

client.initialize();