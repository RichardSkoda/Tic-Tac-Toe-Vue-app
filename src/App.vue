<template>
  <div class="main">
    <h1 class="main-title">Tic Tac Toe</h1>

    <Settings
      class="selection-position"
      />


    <div class="playground">
      <Playground/>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref, watch} from 'vue'
  import Playground from './components/Playground.vue'
  import Settings from './components/Settings.vue'

</script>

<style scoped>
.main {
    background-image: url('../src/images/Hippopx.jpg');
    display: flex;
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
    position:fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
