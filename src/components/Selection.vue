<template>
    <div>
        <div>
            <p>Player 1 name</p>
            <input type="text">
        </div>
        <div>
            <p>Player 2 name</p>
            <input type="text">
        </div>
        <div>
            <p>Fields number</p>
            <input
                type="text"
                v-model="playgroundSizeString"

                >
        </div>
        <div>
            <label for="rowToWin">Row to win:</label>
            <select name="rowToWin" id="">
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>
    </div>
</template>

<script setup lang="ts">
    import {ref, watch} from 'vue'
    import {size} from '../service/createPlayground'

    const playgroundSizeString = ref<string>('0')

    watch(playgroundSizeString, ()=> {
        const playgroundSizeNumber = +playgroundSizeString.value
        if(playgroundSizeNumber > 38) {
            size.number = 38
        } else if(playgroundSizeNumber < 3) {
            size.number = 3
        } else {
            size.number = playgroundSizeNumber
        }
    })


</script>

<style>
p, label {
    color: #1d1b20 1;
}

</style>