<template>
    <div
        class="playground"
        :style="{
            'grid-template-rows': 'repeat(' + size.number + ', 1fr)',
            'grid-template-columns': 'repeat(' + size.number + ', 1fr)'
            }">
        <div
            class="field-row"
            :style="{
                'width': fieldSize,
                'height': fieldSize
                }"
            v-for="row in size.number"
            >
            <div
                class="field-column"
                :style="{
                    'width': fieldSize,
                    'height': fieldSize
                    }"
                v-for="column in size.number"
                @click=""
                >
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import {ref, watch} from 'vue'
    import {size} from '../service/createPlayground'

    const fieldSize = ref<string>('75px')

    watch(() => size.number, () => {
        if(size.number <= 3 && size.number <= 10) {
            fieldSize.value = '75px'
        } else if(size.number > 10 && size.number <= 15) {
            fieldSize.value = '50px'
        } else if(size.number > 15) {
            fieldSize.value = '20px'
        }

    })

</script>

<style scoped>
    .playground {
        display: grid;
        column-gap: 0;
        row-gap: 0;
    }

    .field-row {
        border: solid 1px #4d72cd;
    }

    .field-column {
        /* firt row is moved by 1px top-right */
        transform: translate(-1px, -1px);
        border: solid 1px #4d72cd;
    }

    .field-column:hover {
        background-color: rgba(77, 114, 205, 0.5);
    }
</style>