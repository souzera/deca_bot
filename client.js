import dotenv from 'dotenv'

dotenv.config()

export const options = {
    openAi:{
        apiKey: process.env.OPENAI_API_KEY,
        organization: process.env.OPENAI_ORGANIZATION_ID
    },
    futebol:{
        test: process.env.FUTEBOL_TEST,
        live: process.env.FUTEBOL_LIVE
    },
    assemblyaI:{
        apiKey: process.env.ASSEMBLYAI_API_KEY
    },
    valorant:{
        apiKey: process.env.VALORANT_API_KEY
    }
}