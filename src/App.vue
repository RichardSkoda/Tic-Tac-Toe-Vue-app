<template>
  <div class="main">
    <h1 class="main-title">Tic Tac Toe</h1>

    <Settings
      class="selection-position"
      :class="{gameover: newGame.number != -1}"
      :name-one="playerOneName"
      :name-two="playerTwoName"
      @change-name-one="changeNameOne"
      @change-name-two="changeNameTwo"
      />

      <div class="reset-button">
        <Reset
        @run-reset="runReset"
        />
      </div>

    <div class="playground"
      
    >
      <Playground
        :rounds="roundsPlayed"
        :winnerCoorArray="winner"
        @runs-increment="runsIncrement"
      />
    </div>

    <div
      class="player-one-round-win-container"
      >
      <div
        :class="{
          playerTurnContainerEmpty: roundsPlayed % 2 != 0 && winner.length > 1,
          playerTurnContainer: (roundsPlayed === 0 || roundsPlayed % 2 === 0 && winner.length < 1)}"
          v-if="draw === false"
          >
        <div
          class="player-turn"
          v-show="(roundsPlayed === 0 || roundsPlayed % 2 === 0) && winner.length < 1"
          >
          {{ playerOneName }}'s turn
        </div>
      </div>
      <div
        v-show="newGame.number === 0"
        v-if="draw === false && winner.length > 1"
        >
        <p>{{ playerOneName }}'s</p>
        <p>WINNER</p>
      </div>
      <div
        v-if="draw === true && winner.length < 1"
        >
        <p>DRAW</p>
      </div>
    </div>

    <div
      class="player-two-round-win-container"
      >
      <div
        :class="{
          playerTurnContainerEmpty: (roundsPlayed === 0 || roundsPlayed % 2 === 0) && winner.length > 1,
          playerTurnContainer: roundsPlayed % 2 != 0 && winner.length < 1}"
          v-if="draw === false"
          >
        <div 
          class="player-turn"
          v-show="roundsPlayed % 2 != 0 && winner.length < 1"
          >
          {{ playerTwoName }}'s turn
        </div>
      </div>
      <div
        v-show="newGame.number === 1"
        v-if="draw === false && winner.length > 1"
        >
        <p>{{ playerTwoName }}'s</p>
        <p>WINNER</p>
      </div>
      <div
        v-if="draw === true && winner.length < 1"
        >
        <p>DRAW</p>
      </div>
    </div>
  </div>
  
</template>

<script setup lang="ts">
  import {ref, watch} from 'vue'
  import Playground from './components/Playground.vue'
  import Settings from './components/Settings.vue'
  import Reset from './components/Reset.vue'
  import Winner from '../src/service/winner'
  import {size, rowToWin, playground, newGame, winner} from '../src/service/createPlayground'
  import { numberMatrix } from '../src/types/types'

  const playerOneName = ref<string>('X')
  const playerTwoName = ref<string>('O')
  const roundsPlayed = ref<number>(0)
  const winnerXRow = ref<string>('XXX')
  const winnerORow = ref<string>('OOO')
  const column = ref<numberMatrix>()
  const row = ref<numberMatrix>()
  const fromTopRightDiagonal = ref<numberMatrix>()
  const fromTopLeftDiagonal = ref<numberMatrix>()
  const draw = ref<boolean>(false)
  

  const changeNameOne = (playerOneNameRecieved: string) => {
    playerOneName.value = playerOneNameRecieved
  }

  const changeNameTwo = (playerTwoNameRecieved: string) => {
    playerTwoName.value = playerTwoNameRecieved
  }

  const computeWinnerRowX = (rowToWin: number) => {
    return 'X'.repeat(rowToWin)
  }

  const computeWinnerRowO = (rowToWin: number) => {
    return 'O'.repeat(rowToWin)
  }

  const runsIncrement = () => {
    roundsPlayed.value += 1
  }

  const runReset = () => {
    roundsPlayed.value = 0
    winner.value = []
    draw.value = false
  }

  watch(() => rowToWin.number, () => {
    winnerXRow.value = computeWinnerRowX(rowToWin.number)
    winnerORow.value = computeWinnerRowO(rowToWin.number)
  })

  watch(() => roundsPlayed.value, () => {
    column.value = Winner.column(playground.playgroundArray, size.number, winnerXRow.value, winnerORow.value, rowToWin.number)
    row.value = Winner.row(playground.playgroundArray, size.number, winnerXRow.value, winnerORow.value, rowToWin.number)
    fromTopRightDiagonal.value = Winner.fromTopRightDiagonal(playground.playgroundArray, size.number, winnerXRow.value, winnerORow.value, rowToWin.number)
    fromTopLeftDiagonal.value = Winner.fromTopLeftDiagonal(playground.playgroundArray, size.number, winnerXRow.value, winnerORow.value, rowToWin.number)

    // get coordinates of winning diagonal. Need to get winning row in diagonal and cross out these DIVs in template. Also need to tell who is winner and stop the game
    if(column.value.length > 1) {
      winner.value = Winner.checkWinner(playground.playgroundArray, column.value, rowToWin.number, winnerXRow.value, winnerORow.value)
      newGame.number = (winner.value[winner.value.length - 1])[0]
    } else if(row.value.length > 1) {
      winner.value = Winner.checkWinner(playground.playgroundArray, row.value, rowToWin.number, winnerXRow.value, winnerORow.value)
      newGame.number = (winner.value[winner.value.length - 1])[0]
    } else if(fromTopLeftDiagonal.value.length > 1) {
      winner.value = Winner.checkWinner(playground.playgroundArray, fromTopLeftDiagonal.value, rowToWin.number, winnerXRow.value, winnerORow.value)
      newGame.number = (winner.value[winner.value.length - 1])[0]
    } else if(fromTopRightDiagonal.value.length > 1) {
      winner.value = Winner.checkWinner(playground.playgroundArray, fromTopRightDiagonal.value, rowToWin.number, winnerXRow.value, winnerORow.value)
      newGame.number = (winner.value[winner.value.length - 1])[0]
    }

    // draw when whole field is full
    if(roundsPlayed.value === Math.pow(size.number, 2) && winner.value.length < 1) {
      draw.value = true
    }
  })

</script>

<style scoped>

p {
    text-align: center;
    font-size: 30px;
    font-weight: bold;
}
.main {
    background-image: url('../src/images/Hippopx.jpg');
    display: flex;
    align-items: center;
    height: 100vh;
  }

  .main-title {
    position: absolute;
    top: 5%;
    right: 6%;
    color:  #1d1b20 ;
    text-shadow: 4px 4px 5px rgba(0, 0, 0, .7);
  }

  .selection-position {
    position: absolute;
    top: 0;
    left: 0;
  }

  .playground {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .player-one-round-win-container, .player-two-round-win-container {
    position: fixed;
    top: 50%;
    right: 1%;
    width: 20%;
    display: flex;
    justify-content: center;
    color:  #1d1b20;
    
  }

  .player-one-round-win-container {
    left: 1%;
  }

  .playerTurnContainer {
    background-color:  #4d72cd;
    border-radius: 10px;
    padding: 10px 10px;
    box-shadow: 4px 4px 7px rgba(0, 0, 0, .5);
  }

  .playerTurnContainerEmpty {
    background-color: none;
  }

  .player-turn {
    background-color: white;
    font-size: 25px;
    font-weight: bold;
    padding: 5px 8px;
    border-radius: 10px;
    box-shadow: 4px 4px 7px rgba(0, 0, 0, .5);
  }

  .gameover {
    pointer-events: none;
    opacity: 0.5;
  }

  .reset-button {
    position: absolute;
    top: 12%;
    right: 6.5%;
  }
</style>
