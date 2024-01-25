export function regiaoSelector(regiao){
    let _regiao = (validateRegion(regiao))? regiao : "br"

    return _regiao.toLowerCase()
}

function validateRegion(region) {
    const regions = ["br", "na", "eu", "latam", "ap", "kr"]
    if (regions.includes(region)) {
        return true
    } else {
        return false
    }
}