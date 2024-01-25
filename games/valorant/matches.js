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