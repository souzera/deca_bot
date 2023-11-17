import axios from "axios";
import { options } from "../../client.js";
import stringTable from "string-table";

export async function getTabela(){
    // id Brasileirão serie A 2023 = 10 
    try{
        let tabela_response = ""
        await axios.get("https://api.api-futebol.com.br/v1/campeonatos/10/tabela", {
            headers:{
                "Authorization": `Bearer ${options.futebol.live}`
            }
        }).then(response => {
            tabela_response +=  replySimpleTabela(converterTabela(response.data))
        }).catch(error => {
            console.log(error.statusCode);
        }) 
    
        return tabela_response
    }catch(err){
        return `❌ Falha na consulta: ${err}`
    }
}

export function converterTabela(tabela){
    let tabelaConvertida = []

    tabela.forEach((time) => {
        tabelaConvertida.push({
            posicao: time.posicao,
            nome: time.time.nome_popular,
            pontos: time.pontos,
            jogos: time.jogos,
            vitorias: time.vitorias,
            empates: time.empates,
            derrotas: time.derrotas,
            gols_pro: time.gols_pro,
            gols_contra: time.gols_contra,
            saldo_gols: time.saldo_gols,
            aproveitamento: time.aproveitamento
        })
    })

    return tabelaConvertida
}

export function replySimpleTabela(tabela){
    let tabelaReply = "🏆 Campeonato Brasileiro 2023\n\n"

    let novatabela = []

    tabela.map((time) => {
        novatabela.push({
            posicao: time.posicao,
            nome: time.nome,
            pontos: time.pontos
        })
    })

    tabelaReply += stringTable.create(novatabela)

    return tabelaReply
}

