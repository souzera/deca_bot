import axios from "axios"
import { options } from "../../client.js"

export async function getCampeonatos(){
    try{
        let response =  axios.get('https://api.api-futebol.com.br/v1/campeonatos', {
            headers:{
                Authorization: `Bearer ${options.futebol.test}`
            }
        }).then(response => {
            console.log(response.data)
            return response.data
        })
    }catch(err){
        return `❌ Falha na consulta: ${err}`
    }
}