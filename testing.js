import { getTabela } from "./futebol/campeonato/tabela.js";

getTabela().then((tabela) => {
    console.log(tabela)
})