export function regiaoSelector(regiao){
    let _regiao = (validateRegion(regiao))? regiao : "br"

    
    if (!(validateRegion(regiao))) {console.log("⛔ Atenção: Região inválida. Usando região padrão (br)");}
    return _regiao.toLowerCase()
}

export function validateRegion(region) {
    const regions = ["br", "na", "eu", "latam", "ap", "kr"]
    if (regions.includes(region)) {
        return true
    } else {
        return false
    }
}