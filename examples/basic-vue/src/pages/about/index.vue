<script setup lang="ts">
  import { BButton } from "bootstrap-vue-next";

  let name = "about";
</script>

<template>
  <h1>Hello {{ name }}</h1>
  <BButton>{{ name }}</BButton>
</template>
