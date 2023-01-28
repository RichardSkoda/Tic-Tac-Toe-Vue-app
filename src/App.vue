<template>
  <div class="main">
    <h1 class="main-title">Tic Tac Toe</h1>

    <Settings
      class="selection-position"
      :name-one="playerOneName"
      :name-two="playerTwoName"
      @change-name-one="changeNameOne"
      @change-name-two="changeNameTwo"
      />


    <div class="playground">
      <Playground
        :rounds="roundsPlayed"
        @runs-increment="runsIncrement"
      />
    </div>

    <div class="player-one-round-container">
        <h2 v-show="roundsPlayed == 0 || roundsPlayed % 2 == 0 ">{{ playerOneName }}'s turn</h2>
    </div>
    <div class="player-two-round-container">
        <h2 v-show="roundsPlayed % 2 != 0">{{ playerTwoName }}'s turn</h2>
    </div>
  </div>
  
</template>

<script setup lang="ts">
  import {ref, watch} from 'vue'
  import Playground from './components/Playground.vue'
  import Settings from './components/Settings.vue'
  import {makeDiagonalsFromTop, makeDiagonalsFromBottom, makeColumns} from '../src/service/winner'
  import {size, playground} from '../src/service/createPlayground'

  const playerOneName = ref<string>('X')
  const playerTwoName = ref<string>('O')
  const roundsPlayed = ref<number>(0)
  const playgroundColumns = ref<Array<string[]>>([[]])

  const changeNameOne = (playerOneNameRecieved: string) => {
    playerOneName.value = playerOneNameRecieved
  }

  const changeNameTwo = (playerTwoNameRecieved: string) => {
    playerTwoName.value = playerTwoNameRecieved
  }

  const runsIncrement = (symbol: string) => {
    if(symbol === 'X' || symbol === 'O')
      roundsPlayed.value += 1
  }

  watch(() => roundsPlayed.value, () => {
    playgroundColumns.value = makeDiagonalsFromBottom(playground.playgroundArray ,size.number)
    console.log(playgroundColumns)
  })

</script>

<style scoped>
.main {
    background-image: url('../src/images/Hippopx.jpg');
    display: flex;
    align-items: center;
    height: 100vh;
  }

  .main-title {
    position: absolute;
    top: 5%;
    right: 5%;
    color:  #1d1b20 ;
  }

  .selection-position {
    position: absolute;
    top: 20px;
    left: 20px;
  }

  .playground {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
