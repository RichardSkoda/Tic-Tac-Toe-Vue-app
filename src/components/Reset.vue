<template>
    <div class="button-container">
        <button @click="newGame.number = -1;
                    playground.playgroundArray = createPlayground(size.number);
                    runReset()"
        >Reset Game</button>
    </div>

</template>

<script setup lang="ts">
    import { size, newGame, playground } from '../service/createPlayground'
    import { createPlayground } from '../service/createPlayground'

    const emits = defineEmits<{
        (e: 'run-reset'): void
    }>()

    const runReset = () => {
        emits('run-reset')
    }

</script>
    
<style scoped>

    .button-container {
        display: flex;
        justify-content: center;
        background-color: #4d72cd;
        width: 150px;
        height: 65px;
        border-radius: 10px;
        padding: 7% 5%;
        box-shadow: 4px 4px 7px rgba(0, 0, 0, .5);
    }

    button {
        background-color: #4d72cd;
        color: white;
        border: 1px solid rgba(255, 255, 255, .1);
        border-radius: 10px;
        padding: 5px 8px;
        font-size: 20px;
        cursor: pointer;
        box-shadow: 4px 4px 7px rgba(0, 0, 0, .5);
        transition: all ease .05s;
    }

    button:hover {
        box-shadow: 2px 2px 5px rgba(0, 0, 0, .5);
        margin-top: 1px;
        margin-left: 1.5px;
    }

    button:active {
        box-shadow: 0px 0px 0px rgba(0, 0, 0, .5);
        border: 1px solid rgba(255, 255, 255, .1);
        margin-top: 2px;
        margin-left: 3px;
    }

</style>