export async function createSticker(msg){
    try{
        if (msg.hasQuotedMsg) {
            msg.getQuotedMessage().then((response) => {
                if (response.hasMedia) {
                    response.downloadMedia().then((media) => {
                        msg.reply(media, null, {sendMediaAsSticker: true})
                    })
                } else{
                    msg.reply("💥 FATAL ERROR: Não foi possível criar o sticker")
                }
            })
        }
    } catch (error){
        msg.reply("💥COMMAND ERROR: Não foi possível executar o comando")
    }
}