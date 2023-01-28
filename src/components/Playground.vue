<template>
    <div
        class="playground"
        >
        <div
            class="field-row"
            v-for="(row, x) in playground.playgroundArray"
            :key="x"
            >
            <div
                class="field-column material-icons-outlined"
                :class="{
                    cellx: cell === 'X',
                    cello: cell === 'O'
                }"
                :style="{
                    'width': cellSize,
                    'height': cellSize,
                    'font-size': symbolSize
                    }"
                v-for="(cell, y) in row"
                :key="y"
                @click="playerMove(x, y)"
                >
                    {{ cell === 'X' ? 'close' : cell === 'O' ? 'circle' : '' }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import {ref, watch} from 'vue'
    import {size, playground, createPlayground} from '../service/createPlayground'

    const cellSize = ref<string>('75px')
    const symbolSize = ref<string>('300%')
    // const playground = ref<Array<string[]>>([['', '', ''], ['', '', ''], ['', '', '']])
    

    interface Props {
        rounds: number

    }

    const props = withDefaults(defineProps<Props>(), {
        rounds: 0
    })

    const emits = defineEmits<{
        (e: 'runs-increment', coordinate: string): void
    }>()

    const playerMove = (x: number, y: number) => {
        if(playground.playgroundArray[x][y] != '') {
            emits('runs-increment', '')
            return
        }

        if((props.rounds === 0 || props.rounds % 2 === 0 && playground.playgroundArray[x][y] === '')) {
            playground.playgroundArray[x][y] = 'X'
            emits('runs-increment', playground.playgroundArray[x][y])
            return playground.playgroundArray[x][y]
        } else if((props.rounds % 2 != 0 && playground.playgroundArray[x][y] === '')) {
            playground.playgroundArray[x][y] = 'O'
            emits('runs-increment', playground.playgroundArray[x][y])
            return playground.playgroundArray[x][y]
        }
    }

    watch(() => size.number, () => {
        if(size.number <= 3 && size.number <= 10) {
            cellSize.value = '75px'
            symbolSize.value = '300%'
        } else if(size.number > 10 && size.number <= 15) {
            cellSize.value = '50px'
            symbolSize.value = '200%'
        } else if(size.number > 15) {
            cellSize.value = '20px'
            symbolSize.value = '90%'
        }
        playground.playgroundArray = createPlayground(size.number)
    })

</script>

<style scoped>
    .playground {
        display: flex;
        flex-direction: column;
    }

    .field-row {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .field-column {
        display: flex;
        align-items: center;
        justify-content: center;
        border: solid 1px #4d72cd;
    }

    .field-column:hover {
        background-color: rgba(77, 114, 205, 0.5);
    }
/* nabindovat classu na zmenu hrace */
    .cellx {
        cursor: default;
        font-size: 300%;
        color: red
    }

    .cello {
        cursor: default;
        color: blue;
    }
</style>