import axios from "axios"
import { options } from "../../client.js";

const apikey = options.futebol.test


//endpoint indisponivel
export async function getProximoJogo(time) {
    try {
        let jogos = []
        getTimes().then(res => {
            res.forEach((_time) => {
                //console.log(`Time: ${_time.nome} | ID: ${_time.id}`)
                if (_time.nome == normalizarNome(time)) {
                    console.log(`${_time.nome} encontrado!`)

                    axios.get(`https://api.api-futebol.com.br/v1/times/${_time.id}/partidas/proximas`, {
                        headers: {
                            "Authorization": `Bearer ${apikey}`
                        }
                    }).then(response => {
                        console.log(response.data)
                    })
                }
            })
        })

        return jogos
    } catch (err) {
        return `❌Algo deu errado: ${err}`
    }

}

async function getTimes() {
    try {
        let times = []
        await axios.get("https://api.api-futebol.com.br/v1/campeonatos/10/tabela",
            {
                headers: {
                    "Authorization": `Bearer ${apikey}`
                }
            }
        ).then(response => {
            response.data.map((time) => {
                times.push(
                    {
                        id: time.time.time_id,
                        nome: normalizarNome(time.time.nome_popular.toLowerCase()),
                    })
            })
        })

        return times

    } catch (err) {
        return `❌Algo deu errado: ${err}`
    }
}

function normalizarNome(time) {
    return time.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s/g, '').replace("-", "").trim();
}