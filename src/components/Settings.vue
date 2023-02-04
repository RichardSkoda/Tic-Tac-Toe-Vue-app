<template>
    <div class="container">
        <div class="form-container">
            <div>
                <p>Player 1 name</p>
                <input
                    type="text"
                    v-model="playerOneName"
                    @change="changeNameOne(playerOneName)"
                >
            </div>
            <div>
                <p>Player 2 name</p>
                <input
                    type="text"
                    v-model="playerTwoName"
                    @change="changeNameTwo(playerTwoName)"
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
                <select
                    name="rowToWin" 
                    id=""
                    v-model="rowToWinString"
                    >
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                </select>
        </div>
    </div>
    </div>
</template>

<script setup lang="ts">
    import {ref, watch} from 'vue'
    import {size, rowToWin} from '../service/createPlayground'

    const playgroundSizeString = ref<string>('3')
    const rowToWinString = ref<string>('3')
    const playerOneName = ref<string>('X')
    const playerTwoName = ref<string>('O')

    const emits = defineEmits<{
        (e: 'change-name-one', playerOneName: string): void
        (e: 'change-name-two', playerTwoName: string): void
    }>()

    const changeNameOne = (playerTwoName: string) => {
        emits('change-name-one', playerTwoName)
    }

    const changeNameTwo = (playerTwoName: string) => {
        emits('change-name-two', playerTwoName)
    }
    
    watch(playgroundSizeString, ()=> {
        const playgroundSizeNumber = +playgroundSizeString.value
        if(playgroundSizeNumber > 38) {
            size.number = 38
            playgroundSizeString.value = '38'
        } else if(playgroundSizeNumber < 3) {
            size.number = 3            
        } else {
            size.number = playgroundSizeNumber
        }
    })

    watch(rowToWinString, ()=> {
        rowToWin.number = +rowToWinString.value
    })

</script>

<style scoped>
p, label {
    font-family: 'Times New Roman', Times, serif;
    color:#4d72cd;
    font-size: 10px;
}

select {
    text-indent: 2.5%;
}

option {
    font-family: 'Indie Flower';
    padding-left: calc(50% - 1em);
    font-size: 20px;
}

.container {
    display: flex;
    justify-content: center;
    background-color:  #4d72cd;
    padding: 2% 2%;
    border-bottom-right-radius: 10%;
}

.form-container {
    background-color: white;
    padding: 5%;
    width: 300px;
    border-radius: 10%;
}

input, select {
    text-align: center;
    background-color: white;
    font-size: 20px;
    font-weight: bold;
    width: 100%;
    border: none;
    border-bottom: 1px solid #4d72cd;
    outline: none;
}
</style>