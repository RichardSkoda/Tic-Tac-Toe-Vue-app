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

    for(let i=0; i < line; i++) {
        for(x=0, tempArray = []; tempCoor = [], y = x,x < line; x++) {
            tempArray.push(twoDimensArray[y][x])
            tempCoor.push([y, x])
            console.log(tempArray)
            console.log(tempCoor)
        }
        if(tempArray.length >= rowToWin && (tempArray.join(',').includes(rowToWinX) || tempArray.join(',').includes(rowToWinO))) {
            return tempCoor
        }
    }
    return tempCoor
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