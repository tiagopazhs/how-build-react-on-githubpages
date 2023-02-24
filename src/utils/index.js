//return an averange of the time in a list
function averageLoja(list){
    let sumTime = 0
    for (let i = 0; i < list.length; i++) {
        sumTime += list[i].pTempo
    }
    return sumTime / list.length
}

// return a list with out an item specifieded
function removeListItem(list, itemToRemove) {

    let a = 0
    let newList = []

    while (a < list.length) {
        if (list[a].item != itemToRemove) {
            newList = newList.concat(list[a])
        }
        a++
    }
    return newList
}

// return the max value in a list
function findMax(list) {

    let maxNum = 0
    let objIndex = 1
    maxNum = Math.max(...list.map(o => o.qty))
    objIndex = list.findIndex((obj => obj.qty === maxNum));

    return list[objIndex]
}

module.exports = { averageLoja, removeListItem, findMax}