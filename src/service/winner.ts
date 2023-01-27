export const makeDiagonals = function(twoDimensArray: Array<string[]>, line: number) {

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