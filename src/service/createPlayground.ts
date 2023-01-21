import {reactive} from 'vue'

let playground: string[][] = []

export const size = reactive({number: 3})

export const createPlayground = function(lineAndRow: number) {
    playground = []
    for(let i = 0; i < lineAndRow; i++) {
        const line: string[] = []
        for(let i = 0; i < lineAndRow; i++) {
            const singleCell = ''
            line.push(singleCell)
        }
        playground.push(line)
    }
    return playground
}