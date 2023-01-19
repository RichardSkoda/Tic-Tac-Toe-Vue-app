<template>
    <div>
        <div>
            <p>Player 1 name</p>
            <input
            type="text"
            v-model="playerOne"
            >
        </div>
        <div>
            <p>Player 2 name</p>
            <input type="text"
            v-model="playerTwo"
            >
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
        <div class="player-one-round-container">
            <h2>{{ playerOne }}'s turn</h2>
        </div>
        <div class="player-two-round-container">
            <h2>{{ playerTwo }}'s turn</h2>
        </div>
    </div>
</template>

<script setup lang="ts">
    import {ref, watch} from 'vue'
    import {size} from '../service/createPlayground'

    const playgroundSizeString = ref<string>('0')
    const playerOne = ref<string>('O')
    const playerTwo = ref<string>('X')

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

input, select {
    border: none;
    outline: none;
}

.player-one-round-container, .player-two-round-container {
    position: fixed;
    top: 50%;
    right: 1%;
    width: 20%;
    display: flex;
    justify-content: center;
    color:  #1d1b20;
  }

  .player-one-round-container {
    left: 1%;
  }

</style>