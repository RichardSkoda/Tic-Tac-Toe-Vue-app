<template>
    <div class="playground">
        <div class="field"></div>
        <div class="field"></div>
        <div class="field"></div>
        <div class="field"></div>
        <div class="field"></div>
        <div class="field"></div>
        <div class="field"></div>
        <div class="field"></div>
        <div class="field"></div>
        <div class="field"></div>
        <div class="field"></div>
        <div class="field"></div>
        <div class="field"></div>
        <div class="field"></div>
    </div>
</template>

<script setup lang="ts">

</script>

<style>
  .playground {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 0;
    row-gap: 0;
  }

  .field {
    width: 50px;
    height: 50px;
    border: solid 1px white;
  }
</style>