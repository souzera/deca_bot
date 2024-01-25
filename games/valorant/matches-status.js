const perdeuMuito = Array.from({ length: 35 }, (_, i) => -60 + i);
const perdeuPerdeno = Array.from({ length: 10 }, (_, i) => -25 + i);
const perdeuLutando = Array.from({ length: 15 }, (_, i) => -15 + i);

const empatouLutando = Array.from({ length: 6 }, (_, i) => 1 + i);

const ganhou = Array.from({ length: 9 }, (_, i) => 7 + i);
const ganhouGanhano = Array.from({ length: 10 }, (_, i) => 16 + i);
const smurfando = Array.from({ length: 35 }, (_, i) => 26 + i);

export function statusPartida(pontos) {

    if (perdeuMuito.includes(pontos)) return 'tava jogando com o pé esquerdo'
    if (perdeuPerdeno.includes(pontos)) return 'tava jogando com o pé direito'
    if (perdeuLutando.includes(pontos)) return 'quis demais kkk'
    if (pontos == 0) return "tava jogando Major"
    if (empatouLutando.includes(pontos)) return "empatou, mais tava amassando"
    if (ganhou.includes(pontos)) return 'jogo como sempre'
    if (ganhouGanhano.includes(pontos)) return 'fez a obrigação 👍'
    if (smurfando.includes(pontos)) return 'compro o jogo parece'
}

export function statusPartidaDetalhado(data){

    let reply = ""

    let partidas = data.data

    reply += `📉 Stats Partidas Recentes: ${data.name}#${data.tag}\nModo Competitivo ⚔️\n\n`

    partidas = partidas.reverse()

    partidas.map((partida, index) => {
        reply += `*Partida ${index+1}: ${partida.meta.map.name} | ${partida.stats.character.name}*\n\n`

        reply += verificarResultado(partida.stats.team, partida.teams)

        reply += "\n"

        reply += `Abates: ${partida.stats.kills}\n`
        reply += `Mortes: ${partida.stats.deaths}\n`
        reply += `Assistências: ${partida.stats.assists}\n`

        reply += "\n"

        reply += `HS: ${calculrarHS(partida.stats.shots)}%\n`
        reply += `Dano Causado: ${partida.stats.damage.made}\n`
        reply += `Dano Sofrido: ${partida.stats.damage.received}\n`

        reply += "==================================\n\n"
    })

    return reply
}

function calculrarHS(shots){
        const total = shots.head + shots.body + shots.leg
        const hs = (100*shots.head)/total
        return Number(hs.toFixed(2))
}

function verificarResultado(equipe, placar){

    let meuPontos = 0
    let inimigoPontos = 0

    if (equipe.toLowerCase() === "blue"){
        meuPontos += placar.blue
        inimigoPontos += placar.red
    } else {
        meuPontos += placar.red
        inimigoPontos += placar.blue
    }

    let resultado = ""

    resultado += `Placar: ${meuPontos}x${inimigoPontos} \n`

    if (meuPontos > inimigoPontos) {
        resultado += "Vitória "

        const diff = meuPontos-inimigoPontos

        switch (diff) {
            case 1:
                //13x12
                resultado += " | Final de Major"
                break
            case 2:
                //13x11
                resultado += " | Quase vira Major Pae"
                break
            case 3:
                //13x10
                resultado += " | Quase suei kkk"
                break
            case 4:
                //13x9
                resultado += " | Achei fácil, ruins"
                break
            case 5:
                //13x8
                resultado += " | De boa"
                break
            case 6:
                //13x7
                resultado += " | Jogo Normal"
                break
            case 7:
                //13x6
                resultado += " | Passeio🏖️"
                break
            case 8:
                //13x5
                resultado += " | ❌ Inimigo do 12x5"
                break
            case 9:
                //13x4
                resultado += " | Primeira do dia☀️"
                break
            case 10:
                //13x3
                resultado += " | Contra Bronze até eu🧐"
                break
            case 11:
                //13x2
                resultado += " | KKK tava indo mata-mata??"
                break
            case 12:
                //13x2
                resultado += " | KKK tava no the range??"
                break
            case 13:
                //13x2
                resultado += " | Comprou o jogo foi, imundo?👺"
                break
        }
    }

    else if (meuPontos < inimigoPontos){
        resultado += "Derrota"

        const diff = inimigoPontos - meuPontos

        switch (diff) {
            case 1:
                //13x12
                resultado += " | Final de Major"
                break
            case 2:
                //13x11
                resultado += " | Quase vira Major Pae"
                break
            case 3:
                //13x10
                resultado += " | Na proxima ligo o monitor📺"
                break
            case 4:
                //13x9
                resultado += " | Achei fácil, ruins"
                break
            case 5:
                //13x8
                resultado += " | Sou bot pra eles🤖"
                break
            case 6:
                //13x7
                resultado += " | Existia um sonho😔"
                break
            case 7:
                //13x6
                resultado += " | Meu time era ruim👍"
                break
            case 8:
                //13x5
                resultado += " | ❌ CANALHAS! Inimigos do 12x5"
                break
            case 9:
                //13x4
                resultado += " | Melhor ir joga di bola⚽"
                break
            case 10:
                //13x3
                resultado += " | É a primeira do dia🧐"
                break
            case 11:
                //13x2
                resultado += " | Abri só pra ver a loja"
                break
            case 12:
                //13x1
                resultado += " | Vai pro LOL mano"
                break
            case 13:
                //13x0
                resultado += " | HAHAHAHHAHAHAHAHAHHA🤡"
                break
        }
    }

    resultado += "\n"

    return resultado
}