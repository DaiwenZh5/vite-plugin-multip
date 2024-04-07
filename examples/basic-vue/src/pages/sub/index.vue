<script setup lang="ts">
  import { BButton } from "bootstrap-vue-next";

  let name = "world (sub)";
</script>

<template>
  <h1>Hello {{ name }}</h1>
  <BButton>Hello</BButton> <!-- this need to not work -->
</template>
