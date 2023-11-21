import axios from "axios";
import { options } from "../client.js";

export async function getModels(){
    try{
        await axios.get("https://api.openai.com/v1/engines",{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${options.openAi.apiKey}`,
            }
        }).then((response) => {
            console.log(response.data)
        })
    }catch(e){
        console.log(`❌ Não foi possivel consultar os modulos: ${e}`)
    }
}