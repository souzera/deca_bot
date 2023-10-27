import qrcode from 'qrcode-terminal'
import { Client } from 'whatsapp-web.js'

import { OpenAi } from 'openai'
import dotenv from 'dotenv'

const client = new Client() 

dotenv.config()
const openai = new OpenAi({apiKey: process.env.OPENAI_API_KEY})

const options = {
    apiKey: process.env.OPENAI_API_KEY,
    organization: "org-G0B8EKLB1495Jc3Y5AmNlC15"
}

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true})
    console.log("Escaneie o QR Code acima para iniciar a sessão") 
    console.log('QR RECEIVED: ', qr)
}) 

client.on('ready', () => {
    console.log('Client is ready!')
})

client.on('message', msg => {
    console.log(msg.body)
})

client.on('message', message => {
	if(message.body === '/eoq') {
		message.reply('sei não');
	}
});

client.initialize();