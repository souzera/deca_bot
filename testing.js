import fs from "fs"

async function readFileAndEncodeBase64(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const base64Data = Buffer.from(data).toString('base64');
        return base64Data
    } catch (err) {
        console.error('Erro ao ler o arquivo:', err);
    }
}

const testingDatas = {
    audio: readFileAndEncodeBase64('./downloads/base64-audio.txt')
}

