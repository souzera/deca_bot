import qrcode from 'qrcode-terminal'
import * as pkg from 'whatsapp-web.js'
import { getTabela } from './futebol/campeonato/tabela.js';
import { getProximoJogo } from './futebol/time/proximos-jogos.js';

getProximoJogo("botafogo").then(response => {
    console.log(response)
})

const { Client } = pkg;

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
        clima: "!clima",
        brasileirao: "!brasileirao"
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
            const question_gpt = msg.body.substring(msg.body.indexOf(" ") + 1);
            getDavinciResponse(question_gpt).then((response) => {
                msg.reply(response)
            })
            break
        case bot_commands.dalle:
            const question_dalle = msg.body.substring(msg.body.indexOf(" ") + 1);
            //getDalleResponse(question_dalle).then((response) => {})
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
    }
})

//client.initialize();