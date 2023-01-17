<template>
  <div class="main">
    <h1 class="main-title">Tic Tac Toe</h1>

    <Selection
      class="selection-position"
      />

    <h2 class="title">Player X's run</h2>
    <div class="playground">
      <Playground/>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref, watch} from 'vue'
  import Playground from './components/Playground.vue'
  import Selection from './components/Selection.vue'


</script>

<style scoped>
.main {
    background-image: url('../src/images/Hippopx.jpg');
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    height: 100vh;
  }

  .main-title {
    color:  #1d1b20 ;
    margin-top: 20px;
  }

  .title {
    color:  #1d1b20  ;
    margin-top: 50px;
  }

  .selection-position {
    position: absolute;
    top: 20px;
    left: 20px;
  }

  .playground {
    position:fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
