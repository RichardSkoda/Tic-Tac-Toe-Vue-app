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
                    cello: cell === 'O',
                    gameover: newGame.number != -1,
                    winnerCell: Winner.winCoordinates(winner, y, x, rowToWin.number)
                }"
                :style="{
                    'width': cellSize,
                    'height': cellSize,
                    'font-size': symbolSize,
                    'border-radius': cellRadius
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
    import {ref, watch, withDefaults} from 'vue'
    import {size, playground, createPlayground, rowToWin, winner, newGame} from '../service/createPlayground'
    import Winner from '../service/winner'

    const cellSize = ref<string>('75px')
    const symbolSize = ref<string>('300%')
    const cellRadius = ref<string>('7%')

    interface Props {
        rounds: number
    }

    const props = withDefaults(defineProps<Props>(), {
        rounds: 0
    })

    const emits = defineEmits<{
        (e: 'runs-increment'): void
    }>()

    const playerMove = (x: number, y: number) => {
        if((props.rounds === 0 || props.rounds % 2 === 0 && playground.playgroundArray[x][y] === '-')) {
            playground.playgroundArray[x][y] = 'X'
            emits('runs-increment')
        } else if((props.rounds % 2 != 0 && playground.playgroundArray[x][y] === '-')) {
            playground.playgroundArray[x][y] = 'O'
            emits('runs-increment')
        }
    }

    watch(() => size.number, () => {
        console.log(size.number)
        if(size.number <= 3 && size.number <= 10) {
            cellSize.value = '75px'
            symbolSize.value = '300%'
            cellRadius.value = '7%'
        } else if(size.number > 10 && size.number <= 15) {
            cellSize.value = '50px'
            symbolSize.value = '200%'
            cellRadius.value = '10%'
        } else if(size.number > 15) {
            cellSize.value = '20px'
            symbolSize.value = '90%'
            cellRadius.value = '20%'
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
        box-shadow: 4px 4px 5px rgba(0, 0, 0, .3);
    }

    .field-column:not(.cello, .cellx):hover {
        background-color: rgba(77, 114, 205, 0.5);
    }

    .cellx {
        cursor: default;
        color: #9c0b1d;
    }

    .cello {
        cursor: default;
        color:  #0b7e9c ;
    }

    .gameover {
        pointer-events: none;
        opacity: 0.3;
  }

  .winnerCell {
        /* background-color: #2a472f; */
        border: solid 3px  #ae8507;
        opacity: 1;
        box-shadow: 6px 6px 4px rgba(0, 0, 0, .6);
        margin: 2px 2px;
    }
</style>