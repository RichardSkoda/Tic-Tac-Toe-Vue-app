<template>
    <div
        class="playground"
        >
        <div
            class="field-row"
            v-for="(row, x) in playground"
            :key="x"
            >
            <div
                class="field-column material-icons-outlined"
                :style="{
                    'width': cellSize,
                    'height': cellSize
                    }"
                v-for="(cell, y) in row"
                :key="y"
                @click="runIncrement(); addSymbol(x, y)"
                >
                <span
                :class="{
                    cellx: props.rounds === 0 || props.rounds % 2 === 0 && cell === 'X',
                    cello: props.rounds % 2 != 0 && cell === 'O'
                }"
                >
                    {{ cell === 'X' ? 'close' : cell === 'O' ? 'circle' : '' }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import {ref, watch, reactive} from 'vue'
    import {size} from '../service/createPlayground'
    import {createPlayground} from '../service/createPlayground'

    const cellSize = ref<string>('75px')
    const playground =ref<Array<string[]>>([['', '', ''], ['', '', ''], ['', '', '']])

    interface Props {
        rounds: number
    }

    const props = withDefaults(defineProps<Props>(), {
        rounds: 0
    })

    const emits = defineEmits<{
        (e: 'runs-increment'): void
    }>()

    const addSymbol = (x: number, y: number) => {
        console.log(playground.value[x][y])
        if((props.rounds === 0 || props.rounds % 2 === 0 && playground.value[x][y] === '')) {
            playground.value[x][y] = 'X'
            return playground.value[x][y]
        } else if((props.rounds % 2 != 0 && playground.value[x][y] === '')) {
            playground.value[x][y] = 'O'
            return playground.value[x][y]
        }
    }

    const runIncrement = () => {
        emits('runs-increment')
    }

    watch(() => size.number, () => {
        if(size.number <= 3 && size.number <= 10) {
            cellSize.value = '75px'
        } else if(size.number > 10 && size.number <= 15) {
            cellSize.value = '50px'
        } else if(size.number > 15) {
            cellSize.value = '20px'
        }
        playground.value = createPlayground(size.number)
    })

    console.log(playground)

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
        color: red
    }

    .cello {
        cursor: default;
        color: blue;
    }
</style>