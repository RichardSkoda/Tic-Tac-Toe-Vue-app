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
        <p v-show="winner.includes('X')">WINNER</p>
    </div>
    <div class="player-two-round-container">
        <h2 v-show="roundsPlayed % 2 != 0">{{ playerTwoName }}'s turn</h2>
        <p v-show="winner.includes('O')">WINNER</p>
    </div>
  </div>
  
</template>

<script setup lang="ts">
  import {ref, watch} from 'vue'
  import Playground from './components/Playground.vue'
  import Settings from './components/Settings.vue'
  import {makeDiagonalsFromTopRight, makeDiagonalsFromTopLeft, makeColumns} from '../src/service/winner'
  import {size, rowToWin, playground} from '../src/service/createPlayground'

  const playerOneName = ref<string>('X')
  const playerTwoName = ref<string>('O')
  const roundsPlayed = ref<number>(0)
  const winnerXRow = ref<string>('X,X,X')
  const winnerORow = ref<string>('O,O,O')
  const winner = ref<string[]>([])
  const playgroundColumns = ref<Array<Array<number>>>([])
  const playgroundDiagonalsFromTopRight = ref<Array<Array<number>>>([])
  const playgroundDiagonalsFromTopLeft = ref<Array<Array<number>>>([])
  // const playgroundAllArray = ref<Array<Array<string>>>([[]])

  const changeNameOne = (playerOneNameRecieved: string) => {
    playerOneName.value = playerOneNameRecieved
  }

  const changeNameTwo = (playerTwoNameRecieved: string) => {
    playerTwoName.value = playerTwoNameRecieved
  }

  const computeWinnerRowX = (rowToWin: number) => {
    return 'X,'.repeat(rowToWin)
  }

  const computeWinnerRowO = (rowToWin: number) => {
    return 'O,'.repeat(rowToWin)
  }

  const runsIncrement = (symbol: string) => {
    if(symbol === 'X' || symbol === 'O')
      roundsPlayed.value += 1
  }

  watch(() => rowToWin.number, () => {
    winnerXRow.value = computeWinnerRowX(rowToWin.number)
    winnerORow.value = computeWinnerRowO(rowToWin.number)
  })

  watch(() => roundsPlayed.value, () => {
    playgroundColumns.value = makeColumns(playground.playgroundArray, size.number, winnerXRow.value, winnerORow.value, rowToWin.number)
    playgroundDiagonalsFromTopRight.value = makeDiagonalsFromTopRight(playground.playgroundArray, size.number, winnerXRow.value, winnerORow.value, rowToWin.number)
    playgroundDiagonalsFromTopLeft.value = makeDiagonalsFromTopLeft(playground.playgroundArray, size.number, winnerXRow.value, winnerORow.value, rowToWin.number)

    // get coordinates of winning diagonal. Need to get winning row in diagonal and cross out these DIVs in template. Also need to tell who is winner and stop the game
    // console.log(playgroundColumns.value)

    // VSE POD JE K NICEMU

    // playgroundAllArray.value = playgroundColumns.value.concat(playgroundDiagonalsFromTopRight.value, playgroundDiagonalsFromTopLeft.value, playground.playgroundArray)
    // winner.value = checkWinner(playgroundAllArray.value, winnerXRow.value, winnerORow.value)

    // console.log(winner.value)
    // dodelat vyhodnoceni viteze- checkWinner funci
    if(winner.value.length && winner.value.includes('X')) {
      // console.log(winner.value)
        winner.value = ['X']
    }
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
