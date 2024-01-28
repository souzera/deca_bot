
export async function showUnique(msg){


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

}