
export async function showUnique(msg){
    try{
        if (msg.hasQuotedMsg) {
            msg.getQuotedMessage().then((response) => {
                console.log(response)
                if (response.hasMedia) {
                    response.downloadMedia().then((media) => {
                        msg.reply(media, null)
                    })
                } else {
                    msg.reply("👍👍")
                }
            })
        }
    } catch (error){
        msg.reply("💥 FATAL ERROR: Não foi possível exibir mídia")
    }
}