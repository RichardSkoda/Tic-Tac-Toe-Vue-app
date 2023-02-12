import { stringMatrix, numberMatrix } from '../types/types'

export default class Winner {
    public static fromTopRightDiagonal = function(twoDimensArray: stringMatrix, line: number ,rowToWinX: string, rowToWinO: string, rowToWin: number): numberMatrix {
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
    
    public static fromTopLeftDiagonal = function(twoDimensArray: stringMatrix,  line: number ,rowToWinX: string, rowToWinO: string, rowToWin: number): numberMatrix {
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
    public static column = function(twoDimensArray: stringMatrix,  line: number, rowToWinX: string, rowToWinO: string, rowToWin: number): numberMatrix {
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
    
    public static row = function(twoDimensArray: stringMatrix,  line: number ,rowToWinX: string, rowToWinO: string, rowToWin: number): numberMatrix {
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
    
    public static checkWinner = function(twoDimensArray: stringMatrix, winRow: numberMatrix, rowToWin: number, rowToWinX: string, rowToWinO: string): Array<number[]> {
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

    public static winCoordinates = function(winCoordinatesPlus: numberMatrix, y: number, x: number, rowToWin: number): boolean {
        let coordinatesArray: string[] = []
        for(let i = 0; i <= rowToWin - 1; i++){
            // console.log(winCoordinatesPlus)
            const aaa = winCoordinatesPlus[i].join(',')
            coordinatesArray.push(aaa)
        }
        const q = y.toString()
        const w = x.toString()
        const e = `${y},${x}`
        // console.log(coordinatesArray)

        coordinatesArray.includes(e) ? true : false
        return coordinatesArray.includes(e) ? true : false
    }

    public static draw = function(twoDimensArray: stringMatrix, roundPlayed: number, playgroundSize: number) :stringMatrix {
        let fullPlayground: stringMatrix = []
        if(roundPlayed >= Math.pow(playgroundSize, 2) * 0.8) {
            for(let i = 0; i <= twoDimensArray.length -1; i++) {
                console.log(roundPlayed)
                const line = twoDimensArray[i].map(cell => cell.replace('-', roundPlayed % 2 === 0 ? 'O' : 'X'))
                fullPlayground.push(line)
            }
        } return fullPlayground
    }
}
