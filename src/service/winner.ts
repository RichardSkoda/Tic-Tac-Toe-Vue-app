export const makeDiagonalsFromTop = function(twoDimensArray: Array<string[]>, line: number) {
    const columns: Array<string[]> = []
    let x = 0
    let y = 0
    let tempArray: string[] = []

    for(let i=0; i <= 2*(line - 1); i++) {
        for(tempArray = [], x = line - 1; (y = i - x), x >= 0; x--) {
            if(y >= 0 && y < line) {
                tempArray.push(twoDimensArray[y][x])
            }
        }
        if(tempArray.length > 0) {
            columns.push(tempArray)
        }
    }
    return columns
}

export const makeDiagonalsFromBottom = function(twoDimensArray: Array<string[]>, line: number) {
    const columns: Array<string[]> = []
    let x = 0
    let y = 0
    let tempArray: string[] = []

    for(let i=0; i <= 2*(line - 1); i++) {
        console.log(i)
        for(tempArray = [], x = 0; (y = x + (i - (line - 1))), x <= line - 1; x++) {
            if(y >= 0 && y < line) {
                tempArray.push(twoDimensArray[y][x])
                console.log(tempArray)
            }
        }
        if(tempArray.length > 0) {
            columns.push(tempArray)
        }
    }
    return columns
}

export const makeColumns = function(twoDimensArray: Array<string[]>, line: number) {
    const columns: Array<string[]> = [] 
    let column: string[] = []
    for(let i=0; i < line; i++) {
        for(let k=0; k < line; k++) {
            const cellSymbol = twoDimensArray[k][i]
            column.push(cellSymbol)
        }
        columns.push(column)
        column = []
    }
    return columns
}

export const checkRows = function(rows: Array<string[]>, rowToWin: number) {

}

export const checkColumns = function(columns: Array<string[]>, rowToWin: number) {

}

export const checkDiagonals = function(diagonals: Array<string[]>, rowToWin: number) {

}