export default class Winner {
    public static fromTopRightDiagonal = function(twoDimensArray: Array<Array<string>>, line: number ,rowToWinX: string, rowToWinO: string, rowToWin: number): Array<Array<number>> {
        let x = 0
        let y = 0
        let tempArray: string[] = []
        let tempCoor: number[][] = []
    
        for(let i=0; i <= 2*(line - 1); i++) {
            for(tempArray = [], tempCoor = [], x = line - 1; (y = i - x), x >= 0; x--) {
                if(y >= 0 && y < line) {
                    if(twoDimensArray[y][x] === 'X' || twoDimensArray[y][x] === 'O') {
                        tempArray.push(twoDimensArray[y][x])
                    } else tempArray.push('-')
                    tempCoor.push([y, x])
                }
            }
            if(tempArray.length >= rowToWin && (tempArray.join('').includes(rowToWinX) || tempArray.join('').includes(rowToWinO))) {
                return tempCoor
            }
        }
        return tempCoor
    }
    
    public static fromTopLeftDiagonal = function(twoDimensArray: Array<Array<string>>,  line: number ,rowToWinX: string, rowToWinO: string, rowToWin: number): Array<Array<number>> {
        let x = 0
        let y = 0
        let tempArray: string[] = []
        let tempCoor: number[][] = []
    
        for(let i=0; i <= 2*(line - 1); i++) {
            for(tempArray = [], tempCoor = [], x = 0; (y = x + (i - (line - 1))), x <= line - 1; x++) {
                if(y >= 0 && y < line) {
                    if(twoDimensArray[y][x] === 'X' || twoDimensArray[y][x] === 'O') {
                        tempArray.push(twoDimensArray[y][x])
                    } else tempArray.push('-')
                    tempCoor.push([y, x])
                }
            }
            if(tempArray.length >= rowToWin && (tempArray.join('').includes(rowToWinX) || tempArray.join('').includes(rowToWinO))) {
                return tempCoor
            }
        }
        return tempCoor
    }
    
    // This function does not do what I want!!!!!!!!!!!!
    public static column = function(twoDimensArray: Array<Array<string>>,  line: number, rowToWinX: string, rowToWinO: string, rowToWin: number): Array<Array<number>> {
        let x = 0
        let y = 0
        let tempArray: string[] = []
        let tempCoor: number[][] = []
    
        for(let i=0; i <= line - 1; i++) {
            for(tempArray = [], tempCoor = [], y = 0; (x = i), y <= line - 1; y++) {
                if(twoDimensArray[y][x] === 'X' || twoDimensArray[y][x] === 'O') {
                    tempArray.push(twoDimensArray[y][x])
                } else tempArray.push('-')
                tempCoor.push([y, x])
            }
            if(tempArray.join('').includes(rowToWinX) || tempArray.join('').includes(rowToWinO)) {
                return tempCoor
            }
        }
        // podminka se tu opakuje, protoze vysledny tempCoor ma vzdy steny pocet bunek. U diagonal je to vzdy pouze posledni diagonala, tedy bud posledni bunka vlevo nebo v pravo
        if(tempArray.join('').includes(rowToWinX) || tempArray.join('').includes(rowToWinO)) {
            return tempCoor
        } else return [[]]
    }
    
    public static row = function(twoDimensArray: Array<Array<string>>,  line: number ,rowToWinX: string, rowToWinO: string, rowToWin: number): Array<Array<number>> {
        let x = 0
        let y = 0
        let tempArray: string[] = []
        let tempCoor: number[][] = []
    
        for(let i=0; i <= line - 1; i++) {
            for(tempArray = [], tempCoor = [], x = 0; (y = i), x <= line - 1; x++) {
                if(twoDimensArray[y][x] === 'X' || twoDimensArray[y][x] === 'O') {
                    tempArray.push(twoDimensArray[y][x])
                } else tempArray.push('-')
                tempCoor.push([y, x])
            }
            if(tempArray.join('').includes(rowToWinX) || tempArray.join('').includes(rowToWinO)) {
                return tempCoor
            }
        }
        // podminka se tu opakuje, protoze vysledny tempCoor ma vzdy steny pocet bunek. U diagonal je to vzdy pouze posledni diagonala, tedy bud posledni bunka vlevo nebo v pravo
        if(tempArray.join('').includes(rowToWinX) || tempArray.join('').includes(rowToWinO)) {
            return tempCoor
        } else return [[]]
    }
    
    public static checkWinner = function(twoDimensArray: Array<Array<string>>, winRow: Array<Array<number>>, rowToWin: number, rowToWinX: string, rowToWinO: string): Array<number[]> {
    // create row of symbols from row of indexes of 2D array
        let winRowSymbol: string[] = []
        let winRowIndex: Array<number[]> = []
    
        winRow.forEach(function(cell) {
            if(twoDimensArray[cell[0]][cell[1]] === 'X' || twoDimensArray[cell[0]][cell[1]] === 'O') {
                winRowSymbol.push(twoDimensArray[cell[0]][cell[1]])
            } else winRowSymbol.push('-')
            
        })
    
    // create row of winning coordinates from row of symbols + [0] for X and [1] for O at the end
        const firstIndexX: number = winRowSymbol.join('').indexOf(rowToWinX)
        const firstIndexO: number = winRowSymbol.join('').indexOf(rowToWinO)
        
        if(firstIndexX != -1) {
            for(let i = 0; i <= rowToWin - 1; i++) {
                winRowIndex.push(winRow[firstIndexX + i])
            }
            winRowIndex.push([0])
        }else if(firstIndexO != -1) {
            for(let i = 0; i <= rowToWin - 1; i++) {
                winRowIndex.push(winRow[firstIndexO + i])
            }
            winRowIndex.push([1])
        }
    
        return winRowIndex
    }

}
