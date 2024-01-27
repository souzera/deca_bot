export const commands = {
    ping: "!ping",
    aniversario: "!aniversario",
    help: "!help",
    gpt: "!gpt",
    dalle: '!dalle',
    clima: "!clima",
    brasileirao: "!brasileirao",
    traduzir: "!traduzir",
    show: "!show",
    transcribe: "!transcribe",
    vlrLeaderboard: "!leaderboard",
    rank: "!rank",
    queue: "!queue",
    kahzix: "!kahzix",
}

const help = [
    {
        name: commands.ping,
        syntax: commands.ping,
        desc: "Retorna pong",
        status: true
    },
    {
        name: commands.aniversario,
        syntax: commands.aniversario,
        desc: "Retorna uma mensagem de feliz aniversário",
        status: true
    },
    {
        name: commands.help,
        syntax: commands.help,
        desc: "Retorna uma lista de comandos disponíveis",
        status: true
    },
    {
        name: commands.gpt,
        syntax: commands.gpt + " _TEXTO_",
        desc: "Retorna uma resposta do GPT-3",
        status: true
    },
    {
        name: commands.dalle,
        syntax: commands.dalle + " _TEXTO_",
        desc: "Retorna uma imagem gerada pelo DALL-E.)",
        status: false
    },
    {
        name: commands.clima,
        syntax: commands.clima + " _CIDADE_",
        desc: "Retorna o clima de uma cidade",
        status: false
    },
    {
        name: commands.brasileirao,
        syntax: commands.brasileirao,
        desc: "Retorna a tabela do brasileirão",
        status: true
    },
    {
        name: commands.traduzir,
        syntax: commands.traduzir + " _TEXTO_",
        desc: "Retorna uma tradução feita pelo GPT-3",
        status: true
    },
    {
        name: commands.show,
        syntax: commands.show,
        desc: "Rexibe imagem de mensagem",
        status: true
    },
    {
        name: commands.transcribe,
        syntax: commands.transcribe,
        desc: "Transcreve audio de mensagem de voz",
        status: false
    },
    {
        name: commands.vlrLeaderboard,
        syntax: commands.vlrLeaderboard + " _REGIÃO_ (região opcional, valor padrão: br)",
        desc: "Retorna o leaderboard do VALORANT",
        status: true
    },
    {
        name: commands.rank,
        syntax: commands.rank + " _NOME#TAG_",
        desc: "Retorna o rank de jogador no VALORANT",
        status: true
    },
    {
        name: commands.queue,
        syntax: commands.queue + " _NOME#TAG_",
        desc: "Retorna últimas 5 partidas competitivas do jogador no VALORANT",
        status: true
    },
    {
        name: commands.kahzix,
        syntax: commands.kahzix,
        desc: "Retorna uma imagem do Kha'Zix",
        status: true
    },
]



export function getHelp() {
    let reply = `🤖 Comandos disponíveis: \n\n`
    help.forEach((command) => {
        if (command.status) reply += `*${command.syntax}* - ${command.desc} \n\n`
    })
    return reply
}