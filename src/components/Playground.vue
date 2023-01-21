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
                class="field-column"
                :style="{
                    'width': CellSize,
                    'height': CellSize
                    }"
                v-for="(field, y) in row"
                :key="y"
                >
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import {ref, watch, reactive} from 'vue'
    import {size} from '../service/createPlayground'
    import {createPlayground} from '../service/createPlayground'

    const CellSize = ref<string>('75px')
    const playground =ref<Array<string[]>>([['', '', ''], ['', '', ''], ['', '', '']])
    const fieldId = reactive({ id: 0 })

    watch(() => size.number, () => {
        if(size.number <= 3 && size.number <= 10) {
            CellSize.value = '75px'
        } else if(size.number > 10 && size.number <= 15) {
            CellSize.value = '50px'
        } else if(size.number > 15) {
            CellSize.value = '20px'
        }
        playground.value = createPlayground(size.number)
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
</style>