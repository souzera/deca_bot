import qrcode from 'qrcode-terminal'
import * as pkg from 'whatsapp-web.js'
import { getTabela } from './futebol/campeonato/tabela.js';
import { getDavinciResponse } from './openai/davinci.js';
import { showUnique } from './util/show_unique.js';
import { getTop10 } from './games/valorant/leaderboard.js';
import { getCurrentRank } from './games/valorant/rank.js';
import { getQueueHirstoryByGameTag } from './games/valorant/queue.js';
import { commands, getHelp } from './util/commands.js';
import { getResponseContext } from './games/lol/others.js';
import { pollo } from './games/valorant/others.js';
import { createSticker } from './util/sticker.js';
import { options } from './client.js';


const { Client, MessageMedia } = pkg;

const client = new Client({
    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
        }
})

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true })
    console.log("Escaneie o QR Code acima para iniciar a sessão")
    console.log('QR RECEIVED: ', qr)
})

client.on('ready', () => {
    console.log('Client is ready!')
})

client.on('message', (msg) => {

    const chat = msg.getChat().then((response) => {
        console.log(`Chat: ${response.name}`)
        return response
    })

    msg.getContact().then((response) => {
        console.log(`${response.pushname} - ${msg.body}\n`)
    })


    const bot_commands = commands

    let firstWord = ((msg.body.includes(' ')) ? msg.body.substring(0, msg.body.indexOf(" ")) : msg.body);

    switch (firstWord) {
        case bot_commands.ping:
            msg.reply('🏓 Pong')
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
            msg.reply(getHelp())
            break
        case bot_commands.gpt:
            const question_gpt = msg.body.substring(msg.body.indexOf(" ") + 1);
            getDavinciResponse(question_gpt).then((response) => {
                msg.reply(`🤖 Chat GPT - Generated by OpenAI Turbo 4.0 \n\n ${response}`)
            })
            break
        case bot_commands.traduzir:
            const traduzir = "Traduza" + msg.body.substring(msg.body.indexOf(" ") + 1);
            getDavinciResponse(traduzir).then((response) => {
                msg.reply(`📬 Tradução: \n\n ${response}`)
            })
            break
        case bot_commands.dalle:
            const question_dalle = msg.body.substring(msg.body.indexOf(" ") + 1);
            //getDalleResponse(question_dalle).then((response) => {
            //    console.log("-=-=-=-=-=-=-=-\n\n")
            //    console.log(response)
            //    msg.reply(new pkg.MessageMedia('image/png', response))
            //})
            msg.reply('Ops! Comando desativado ❌')
            break
        case bot_commands.brasileirao:
            msg.reply(getTabela().then((response) => {
                const tabela_promise = Promise.resolve(getTabela())
                tabela_promise.then((response) => {
                    msg.reply(response)
                })
            }))
            break
        case bot_commands.show:
            showUnique(msg)
            break
        case bot_commands.transcribe:
            //transcribe(msg)
            msg.reply("Ops! Comando desativado ❌")
            break
        case bot_commands.vlrLeaderboard:
            let regiao = (!(msg.body.includes(" ")))? "br":msg.body.substring(msg.body.indexOf(" ") + 1);

            console.log(regiao)
            
            getTop10(regiao).then((response) => {
                msg.reply(response)
            })
            break
        case bot_commands.rank:
            const gametag = msg.body.substring(msg.body.indexOf(" ") + 1);
            const gameName = gametag.substring(0, gametag.indexOf("#"))
            const tagName = gametag.substring(gametag.indexOf("#") + 1)
            getCurrentRank(gameName, tagName, "br").then((response) => {
                msg.reply(`🤖 Generated by Bot \n${response}`)
            })
            break
        case bot_commands.queue:
            const gametagQueue = msg.body.substring(msg.body.indexOf(" ") + 1);
            const gameNameQueue = gametagQueue.substring(0, gametagQueue.indexOf("#"))
            const tagNameQueue = gametagQueue.substring(gametagQueue.indexOf("#") + 1)
            getQueueHirstoryByGameTag(gameNameQueue, tagNameQueue).then((response) => {
                msg.reply(`🤖 Generated by Bot \n${response}`)
            })
            break
        case bot_commands.kahzix:
            msg.reply(getResponseContext("kahzix"))
            break
        case bot_commands.pollo:
            msg.getChat().then(async (response) => {
                await response.sendMessage(`Paulo Cartões 🤪🪄\n ${pollo}`,{linkPreview:true})
            })
        case bot_commands.sticker:
            createSticker(msg)
            break
    }
})

client.initialize();