export const makeDiagonalsFromTopRight = function(twoDimensArray: Array<Array<string>>, line: number ,rowToWinX: string, rowToWinO: string, rowToWin: number): Array<Array<number>> {
    let x = 0
    let y = 0
    let tempArray: string[] = []
    let tempCoor: number[][] = []

    for(let i=0; i <= 2*(line - 1); i++) {
        for(tempArray = [], tempCoor = [], x = line - 1; (y = i - x), x >= 0; x--) {
            if(y >= 0 && y < line) {
                tempArray.push(twoDimensArray[y][x])
                tempCoor.push([y, x])
            }
        }
        if(tempArray.length >= rowToWin && (tempArray.join(',').includes(rowToWinX) || tempArray.join(',').includes(rowToWinO))) {
            return tempCoor
        }
    }
    return tempCoor
}

export const makeDiagonalsFromTopLeft = function(twoDimensArray: Array<Array<string>>,  line: number ,rowToWinX: string, rowToWinO: string, rowToWin: number): Array<Array<number>> {
    let x = 0
    let y = 0
    let tempArray: string[] = []
    let tempCoor: number[][] = []

    for(let i=0; i <= 2*(line - 1); i++) {
        for(tempArray = [], tempCoor = [], x = 0; (y = x + (i - (line - 1))), x <= line - 1; x++) {
            if(y >= 0 && y < line) {
                tempArray.push(twoDimensArray[y][x])
                tempCoor.push([y, x])
            }
        }
        if(tempArray.length >= rowToWin && (tempArray.join(',').includes(rowToWinX) || tempArray.join(',').includes(rowToWinO))) {
            return tempCoor
        }
    }
    return tempCoor
}

// This function does not do what I want!!!!!!!!!!!!
export const makeColumns = function(twoDimensArray: Array<Array<string>>,  line: number ,rowToWinX: string, rowToWinO: string, rowToWin: number): Array<Array<number>> {
    let x = 0
    let y = 0
    let tempArray: string[] = []
    let tempCoor: number[][] = []

    for(let i=0; i <= line - 1; i++) {
        for(tempArray = [], tempCoor = [], y = 0; (x = i), y <= line - 1; y++) {
            tempArray.push(twoDimensArray[y][x])
            tempCoor.push([y, x])
        }
        if(tempArray.join(',').includes(rowToWinX) || tempArray.join(',').includes(rowToWinO)) {
            return tempCoor
        }
    }
    // podminka se tu opakuje, protoze vysledny tempCoor ma vzdy steny pocet bunek. U diagonal je to vzdy pouze posledni diagonala, tedy bud posledni bunka vlevo nebo v pravo
    if(tempArray.join(',').includes(rowToWinX) || tempArray.join(',').includes(rowToWinO)) {
        return tempCoor
    } else return [[]]
}

export const makeRows = function(twoDimensArray: Array<Array<string>>,  line: number ,rowToWinX: string, rowToWinO: string, rowToWin: number): Array<Array<number>> {
    let x = 0
    let y = 0
    let tempArray: string[] = []
    let tempCoor: number[][] = []

    for(let i=0; i <= line - 1; i++) {
        for(tempArray = [], tempCoor = [], x = 0; (y = i), x <= line - 1; x++) {
            tempArray.push(twoDimensArray[y][x])
            tempCoor.push([y, x])
        }
        if(tempArray.join(',').includes(rowToWinX) || tempArray.join(',').includes(rowToWinO)) {
            return tempCoor
        }
    }
    // podminka se tu opakuje, protoze vysledny tempCoor ma vzdy steny pocet bunek. U diagonal je to vzdy pouze posledni diagonala, tedy bud posledni bunka vlevo nebo v pravo
    if(tempArray.join(',').includes(rowToWinX) || tempArray.join(',').includes(rowToWinO)) {
        return tempCoor
    } else return [[]]
}

// TOTO PRAVDEPODOBNE NEVYUZIJU

// return non empty array if winner is found
export const checkWinner = function(arrays: Array<Array<string>>, rowToWinX: string, rowToWinO: string): string[] {
    const winner: string[] = []
    arrays.forEach(function(oneArray: string[]): string[] {
        const mergedArray: string = oneArray.join('')
        if(mergedArray.length >= rowToWinX.length && mergedArray.includes(rowToWinX)) {
            winner.push(rowToWinX)
        } else if(mergedArray.length >= rowToWinO.length && mergedArray.includes(rowToWinO)) {
            winner.push(rowToWinO)
        }
        return winner
    })
    return winner
}