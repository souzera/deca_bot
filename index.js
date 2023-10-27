import qrcode from 'qrcode-terminal'
import { Client } from 'whatsapp-web.js'

import dotenv from 'dotenv'

const client = new Client()

dotenv.config()
const options = {
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORGANIZATION_ID
}

const contato = (msg) => {
    msg.getContact().then((result) =>{
        return result
    })
}

// WHATSAPP - SIDE

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true })
    console.log("Escaneie o QR Code acima para iniciar a sessão")
    console.log('QR RECEIVED: ', qr)
})

client.on('ready', () => {
    console.log('Client is ready!')
})

client.on('message', (msg)=> {
    console.log(msg.body) 

    if (msg.body === '!ping') {
        msg.reply(`🏓 Pong in poucos ms`)
    }
    else if (msg.body === '!aniversario'){
        msg.reply(`Feliz aniversário, ${contato(msg).pushname}! \n\n https://youtu.be/PMKrAU1IlnA`)
    }
})

client.initialize();