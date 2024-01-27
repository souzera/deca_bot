
export async function showUnique(msg){


    if (msg.hasQuotedMsg) {
        msg.getQuotedMessage().then((response) => {
            if (response.hasMedia) {
                response.downloadMedia().then((media) => {
                    console.log(media)
                    msg.reply(media, null)
                })
            } else {
                msg.reply("👍👍")
            }
        })
    }

}