import {reactive} from 'vue'

export const size = reactive({number: 3})

export const rowToWin = reactive({number: 3})

export const newGame = reactive({number: -1})

// try to set playground reactive and then use it in each component and App.vue. Remove ref playground from Playground.vue and replace it by reactive playground 
export const playground = reactive({playgroundArray: [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']]})

export const createPlayground = function(lineAndRow: number) {
    const playground: string[][] = []
    for(let i = 0; i < lineAndRow; i++) {
        const line: string[] = []
        for(let i = 0; i < lineAndRow; i++) {
            const singleCell = '-'
            line.push(singleCell)
        }
        playground.push(line)
    }
    return playground
}

// blbe- nepotrebuju vztahovat z 2D pole, ale primo div element z flexboxu podle klice (koordinatu)
export const displayWinsRow = function(twoDimensArray: Array<Array<string>>, row: Array<Array<number>>) {
    for(let i = 0; i <= row.length - 3; i++) {
        (twoDimensArray[(row[i])[0]][(row[i])[1]])
    }
}