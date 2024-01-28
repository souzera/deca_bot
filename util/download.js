import imageToBase64 from "image-to-base64"
import fs from 'fs'
import axios from "axios"


function createFolder() {
    if (!(fs.existsSync('./downloads'))) {
        fs.mkdirSync('./downloads');
    }
}

export async function downloadImage(url) {
    axios({
        method: 'get',
        url,
        responseType: 'stream',
    }).then(
        response => {
            createFolder()
            response.data.pipe(fs.createWriteStream('downloads/image.png'))
        }
    )
}

export async function convertImageToBase64(url) {
    const toBase64 = imageToBase64(url).then(response => { return response }).catch(error => { return error })
    return toBase64
}

export function createMessageMediaKahzix() {
    return MessageMedia.fromFilePath('downloads/kahzix.png')
}


