import * as pkg from 'whatsapp-web.js'

const { MessageMedia } = pkg;

export const createVideo = async (path) => {
    try{
        const media = MessageMedia.fromFilePath(path)
        return media
    }catch(err){
        console.error('Erro ao criar o video:', err);
    }
}
