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
      :class="{gameover: newGame.number != -1}"
    >
      <Playground
        :rounds="roundsPlayed"
        @runs-increment="runsIncrement"
      />
    </div>

    <div class="player-one-round-container">
        <h2 v-show="roundsPlayed === 0 || roundsPlayed % 2 === 0 ">{{ playerOneName }}'s turn</h2>
        <div v-show="newGame.number === 0">
          <p>{{ playerOneName }}'s</p>
          <p>WINNER</p>
        </div>
        
    </div>
    <div class="player-two-round-container">
        <h2 v-show="roundsPlayed % 2 != 0">{{ playerTwoName }}'s turn</h2>
        <div v-show="newGame.number === 1">
          <p>{{ playerTwoName }}'s</p>
          <p>WINNER</p>
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
  import {size, rowToWin, playground, newGame} from '../src/service/createPlayground'

  const playerOneName = ref<string>('X')
  const playerTwoName = ref<string>('O')
  const roundsPlayed = ref<number>(0)
  const winnerXRow = ref<string>('XXX')
  const winnerORow = ref<string>('OOO')
  const winner = ref<Array<Array<number>>>([])
  const column = ref<Array<Array<number>>>([])
  const row = ref<Array<Array<number>>>([])
  const fromTopRightDiagonal = ref<Array<Array<number>>>([])
  const fromTopLeftDiagonal = ref<Array<Array<number>>>([])

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
      winner.value.push([1])
      newGame.number = (winner.value[winner.value.length - 2])[0]
      console.log(newGame.number)
    } else if(row.value.length > 1) {
      winner.value = Winner.checkWinner(playground.playgroundArray, row.value, rowToWin.number, winnerXRow.value, winnerORow.value)
      winner.value.push([2])
      newGame.number = (winner.value[winner.value.length - 2])[0]
    } else if(fromTopLeftDiagonal.value.length > 1) {
      winner.value = Winner.checkWinner(playground.playgroundArray, fromTopLeftDiagonal.value, rowToWin.number, winnerXRow.value, winnerORow.value)
      newGame.number = (winner.value[winner.value.length - 2])[0]
    } else if(fromTopRightDiagonal.value.length > 1) {
      winner.value = Winner.checkWinner(playground.playgroundArray, fromTopRightDiagonal.value, rowToWin.number, winnerXRow.value, winnerORow.value)
      winner.value.push([4])
      newGame.number = (winner.value[winner.value.length - 2])[0]
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
    right: 5%;
    color:  #1d1b20 ;
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

  .gameover {
    pointer-events: none;
    opacity: 0.5;
  }

  .reset-button {
    position: absolute;
    top: 12%;
    right: 5.5%;
  }
</style>
