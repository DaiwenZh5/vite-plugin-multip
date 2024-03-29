<script setup lang="ts">
  import { ref } from "vue"

  let count = ref(0)
</script>

<template>
  <h1>Hello Vue</h1>
  <button @click="count++">count: {{ count }}</button>
</template>
