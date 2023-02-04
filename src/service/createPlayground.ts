import {createApp, reactive} from 'vue'

export const size = reactive({number: 3})

export const rowToWin = reactive({number: 3})

export const newGame = reactive({number: -1})

// try to set playground reactive and then use it in each component and App.vue. Remove ref playground from Playground.vue and replace it by reactive playground 
export const playground = reactive({playgroundArray: [['', '', ''], ['', '', ''], ['', '', '']]})

export const createPlayground = function(lineAndRow: number) {
    const playground: string[][] = []
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